import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

interface Particle {
  baseX: number;
  baseY: number;
  offsetX: number;
  offsetY: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  speedMult: number;
}

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse / Pointer interaction state
    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
      radius: 135,
    };

    let mouseTimeout: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      clearTimeout(mouseTimeout);
      // Particle disturbance settles into resting position when mouse stops moving
      mouseTimeout = setTimeout(() => {
        mouse.active = false;
      }, 3000);
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Track scroll velocity for rapid scroll-reactive motion
    let lastScrollY = window.scrollY;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize tiny white particles
    let particles: Particle[] = [];

    const initParticles = () => {
      // Density calculation: ~400 on 1080p desktop, scaled gracefully on smaller screens
      const count = Math.min(Math.floor((width * height) / 3800), 460);
      particles = [];

      for (let i = 0; i < count; i++) {
        // Varying speeds for deep 3D multi-plane parallax response
        const speedMult = Math.random() * 2.2 + 1.2; // 1.2x to 3.4x rapid scroll travel
        const radius = Math.random() * 1.3 + 0.75;  // 0.75px to 2.05px tiny white particles
        const baseAlpha = Math.random() * 0.55 + 0.35; // 0.35 to 0.90 subtle starlight glow

        particles.push({
          baseX: Math.random() * width,
          baseY: Math.random() * height,
          offsetX: 0,
          offsetY: 0,
          vx: 0,
          vy: 0,
          radius,
          baseAlpha,
          speedMult,
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    initParticles();

    // If user prefers reduced motion, draw static particles and halt render loop
    if (prefersReducedMotion) {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.baseX, p.baseY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.baseAlpha})`;
        ctx.fill();
      }
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('resize', handleResize);
        clearTimeout(mouseTimeout);
      };
    }

    // -------------------------------------------------------------
    // MAIN 60 FPS ANIMATION LOOP
    // -------------------------------------------------------------
    const render = () => {
      // 1. Calculate Instantaneous Scroll Delta
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // 2. Clear Canvas with Pure Black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Track particles currently in contact with cursor radius for motion graphics
      const disturbedParticles: Particle[] = [];

      // 3. Update & Move Particles
      const particleLen = particles.length;
      for (let i = 0; i < particleLen; i++) {
        const p = particles[i];

        // SCROLL REACTION:
        // Rapidly moves along with scroll direction.
        // When user stops scrolling (deltaY === 0), particles remain completely still at their position!
        if (deltaY !== 0) {
          p.baseY -= deltaY * p.speedMult;

          // Seamless screen wrapping
          if (p.baseY < -12) {
            p.baseY += height + 24;
            p.baseX = Math.random() * width;
          } else if (p.baseY > height + 12) {
            p.baseY -= (height + 24);
            p.baseX = Math.random() * width;
          }
        }

        // CURSOR DISTURBANCE:
        // If cursor moves into contact or within radius, disturb particles with fluid spring impulse
        const currentX = p.baseX + p.offsetX;
        const currentY = p.baseY + p.offsetY;

        if (mouse.active) {
          const dx = currentX - mouse.x;
          const dy = currentY - mouse.y;
          const distSq = dx * dx + dy * dy;
          const radiusSq = mouse.radius * mouse.radius;

          if (distSq < radiusSq && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const nx = dx / dist;
            const ny = dy / dist;

            // Elastic disturbance impulse: stronger closer to cursor
            const force = Math.pow(1 - dist / mouse.radius, 1.7);
            const pushVelocity = force * 14;

            p.vx += nx * pushVelocity;
            p.vy += ny * pushVelocity;

            disturbedParticles.push(p);
          }
        }

        // SPRING DAMPING PHYSICS:
        // Disturbed particles smoothly settle back to their resting position (0, 0 offset)
        p.offsetX += p.vx;
        p.offsetY += p.vy;

        const springTension = 0.095;
        const dampingFriction = 0.82;

        p.vx += (0 - p.offsetX) * springTension;
        p.vy += (0 - p.offsetY) * springTension;

        p.vx *= dampingFriction;
        p.vy *= dampingFriction;

        // Snap micro-oscillations to zero when still
        if (Math.abs(p.offsetX) < 0.02 && Math.abs(p.vx) < 0.02) {
          p.offsetX = 0;
          p.vx = 0;
        }
        if (Math.abs(p.offsetY) < 0.02 && Math.abs(p.vy) < 0.02) {
          p.offsetY = 0;
          p.vy = 0;
        }

        // 4. Draw Regular Tiny White Particle
        ctx.beginPath();
        ctx.arc(p.baseX + p.offsetX, p.baseY + p.offsetY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.baseAlpha})`;
        ctx.fill();
      }

      // -------------------------------------------------------------
      // 5. MOTION GRAPHICS: Particles in Contact with Cursor
      // -------------------------------------------------------------
      const disturbedCount = disturbedParticles.length;

      if (disturbedCount > 0) {
        // A. Subtle laser webbing between adjacent disturbed particles
        if (disturbedCount > 1) {
          ctx.lineWidth = 0.75;
          for (let i = 0; i < disturbedCount; i++) {
            for (let j = i + 1; j < disturbedCount; j++) {
              const p1 = disturbedParticles[i];
              const p2 = disturbedParticles[j];
              const x1 = p1.baseX + p1.offsetX;
              const y1 = p1.baseY + p1.offsetY;
              const x2 = p2.baseX + p2.offsetX;
              const y2 = p2.baseY + p2.offsetY;

              const d = Math.hypot(x2 - x1, y2 - y1);
              if (d < 70) {
                const lineAlpha = (1 - d / 70) * 0.42;
                ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
              }
            }
          }
        }

        // B. Delicate starlight filament connecting particles to cursor
        if (mouse.active) {
          for (let i = 0; i < disturbedCount; i++) {
            const p = disturbedParticles[i];
            const px = p.baseX + p.offsetX;
            const py = p.baseY + p.offsetY;
            const d = Math.hypot(px - mouse.x, py - mouse.y);

            if (d < mouse.radius * 0.75) {
              const filamentAlpha = (1 - d / (mouse.radius * 0.75)) * 0.35;
              ctx.strokeStyle = `rgba(255, 255, 255, ${filamentAlpha})`;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(mouse.x, mouse.y);
              ctx.lineTo(px, py);
              ctx.stroke();
            }
          }
        }

        // C. Specular Halos on Disturbed Particles
        for (let i = 0; i < disturbedCount; i++) {
          const p = disturbedParticles[i];
          const px = p.baseX + p.offsetX;
          const py = p.baseY + p.offsetY;

          // Outer soft glow
          ctx.beginPath();
          ctx.arc(px, py, p.radius * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
          ctx.fill();

          // Intense core
          ctx.beginPath();
          ctx.arc(px, py, p.radius * 1.3, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
      }

      // D. Ambient Cursor Reticle Pulse (Subtle HUD accent)
      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 0.9, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.setLineDash([4, 6]);
        ctx.lineWidth = 0.7;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      clearTimeout(mouseTimeout);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="animated-bg-container" aria-hidden="true">
      {/* 60 FPS Particle Canvas with Scroll Velocity & Cursor Motion Graphics */}
      <canvas ref={canvasRef} className="animated-bg-canvas" />

      {/* Cinematic Edge Vignette */}
      <div className="animated-bg-vignette" />
    </div>
  );
};
