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

    // Pointer / Cursor state
    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
      radius: 130,
    };

    let mouseTimeout: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        mouse.active = false;
      }, 2500);
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

    // Track scroll velocity for shooting star tails & movement
    let lastScrollY = window.scrollY;
    let smoothedScrollVy = 0;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Particle field
    let particles: Particle[] = [];

    const initParticles = () => {
      const count = Math.min(Math.floor((width * height) / 3400), 480);
      particles = [];

      for (let i = 0; i < count; i++) {
        // Multi-tier depth velocity multipliers for shooting star parallax
        const speedMult = Math.random() * 2.0 + 1.2; 
        // Tiny particles: strictly 0.65px to 1.25px (never enlarged on hover)
        const radius = Math.random() * 0.6 + 0.65;
        const baseAlpha = Math.random() * 0.55 + 0.35;

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

    // Static fallback for prefers-reduced-motion
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
      // 1. Instantaneous scroll delta & smooth velocity damping
      const currentScrollY = window.scrollY;
      const rawDeltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Smooth decay for aerodynamic shooting star tails
      smoothedScrollVy += (rawDeltaY - smoothedScrollVy) * 0.35;
      if (Math.abs(smoothedScrollVy) < 0.05 && rawDeltaY === 0) {
        smoothedScrollVy = 0;
      }

      // 2. Clear Canvas with Pure Pitch Black (#000000)
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Track particles within cursor influence radius for motion graphic effects
      const disturbedParticles: Particle[] = [];

      // 3. Update & Draw Particles with Shooting Star Tails
      const particleLen = particles.length;
      for (let i = 0; i < particleLen; i++) {
        const p = particles[i];

        // SCROLL REACTION:
        // Rapidly moves along scroll direction.
        // When not scrolling (rawDeltaY === 0 && smoothedScrollVy === 0), particles stay 100% still!
        if (rawDeltaY !== 0) {
          p.baseY -= rawDeltaY * p.speedMult;

          // Seamless edge wrapping
          if (p.baseY < -15) {
            p.baseY += height + 30;
            p.baseX = Math.random() * width;
          } else if (p.baseY > height + 15) {
            p.baseY -= (height + 30);
            p.baseX = Math.random() * width;
          }
        }

        // CURSOR DISTURBANCE:
        // Fluid spring impulse displacing particles WITHOUT increasing their size
        const currentX = p.baseX + p.offsetX;
        const currentY = p.baseY + p.offsetY;
        let isDisturbed = false;

        if (mouse.active) {
          const dx = currentX - mouse.x;
          const dy = currentY - mouse.y;
          const distSq = dx * dx + dy * dy;
          const radiusSq = mouse.radius * mouse.radius;

          if (distSq < radiusSq && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const nx = dx / dist;
            const ny = dy / dist;

            // Non-linear spring push
            const force = Math.pow(1 - dist / mouse.radius, 1.8);
            const pushVelocity = force * 12;

            p.vx += nx * pushVelocity;
            p.vy += ny * pushVelocity;

            isDisturbed = true;
            disturbedParticles.push(p);
          }
        }

        // SPRING DAMPING: Particles smoothly return to (0, 0) resting offset
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

        const renderX = p.baseX + p.offsetX;
        const renderY = p.baseY + p.offsetY;

        // -------------------------------------------------------------
        // SHOOTING STAR THIN TAIL:
        // Appears dynamically in the direction of scrolling velocity
        // -------------------------------------------------------------
        const scrollVy = -smoothedScrollVy * p.speedMult;
        const effectiveVy = scrollVy + p.vy;
        const effectiveVx = p.vx;
        const totalSpeed = Math.hypot(effectiveVx, effectiveVy);

        // When moving fast (e.g. during scroll or disturbance), draw a razor-thin shooting star tail
        if (totalSpeed > 1.0) {
          const tailLength = Math.min(totalSpeed * 1.6, 42);
          const tailScale = tailLength / totalSpeed;

          // Tail extends backwards opposite to the particle's motion vector
          const tailX = renderX - effectiveVx * tailScale;
          const tailY = renderY - effectiveVy * tailScale;

          const tailGrad = ctx.createLinearGradient(renderX, renderY, tailX, tailY);
          tailGrad.addColorStop(0, isDisturbed ? 'rgba(255, 255, 255, 0.95)' : `rgba(255, 255, 255, ${p.baseAlpha})`);
          tailGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.beginPath();
          ctx.moveTo(renderX, renderY);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = tailGrad;
          // Thin, sharp tail matching shooting star aesthetics
          ctx.lineWidth = Math.min(p.radius * 0.85, 0.95);
          ctx.stroke();
        }

        // -------------------------------------------------------------
        // TINY WHITE PARTICLE (STRICT FIXED RADIUS: NO SIZE INCREASE)
        // -------------------------------------------------------------
        ctx.beginPath();
        ctx.arc(renderX, renderY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDisturbed ? '#ffffff' : `rgba(255, 255, 255, ${p.baseAlpha})`;
        ctx.fill();
      }

      // -------------------------------------------------------------
      // 4. MOTION GRAPHICS: Delicate web & filaments for cursor contact
      // -------------------------------------------------------------
      const disturbedCount = disturbedParticles.length;

      if (disturbedCount > 0) {
        // A. Delicate laser webbing between adjacent disturbed particles
        if (disturbedCount > 1) {
          ctx.lineWidth = 0.65;
          for (let i = 0; i < disturbedCount; i++) {
            for (let j = i + 1; j < disturbedCount; j++) {
              const p1 = disturbedParticles[i];
              const p2 = disturbedParticles[j];
              const x1 = p1.baseX + p1.offsetX;
              const y1 = p1.baseY + p1.offsetY;
              const x2 = p2.baseX + p2.offsetX;
              const y2 = p2.baseY + p2.offsetY;

              const d = Math.hypot(x2 - x1, y2 - y1);
              if (d < 65) {
                const lineAlpha = (1 - d / 65) * 0.38;
                ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
              }
            }
          }
        }

        // B. Subtle starlight filament connecting disturbed particles to cursor
        if (mouse.active) {
          for (let i = 0; i < disturbedCount; i++) {
            const p = disturbedParticles[i];
            const px = p.baseX + p.offsetX;
            const py = p.baseY + p.offsetY;
            const d = Math.hypot(px - mouse.x, py - mouse.y);

            if (d < mouse.radius * 0.72) {
              const filamentAlpha = (1 - d / (mouse.radius * 0.72)) * 0.28;
              ctx.strokeStyle = `rgba(255, 255, 255, ${filamentAlpha})`;
              ctx.lineWidth = 0.55;
              ctx.beginPath();
              ctx.moveTo(mouse.x, mouse.y);
              ctx.lineTo(px, py);
              ctx.stroke();
            }
          }
        }
      }

      // C. Ambient Cursor Reticle Accent
      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 18, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 0.75;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 0.88, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
        ctx.setLineDash([3, 5]);
        ctx.lineWidth = 0.65;
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
      {/* 60 FPS Particle Canvas: Shooting Stars on Scroll + Disturbance Physics */}
      <canvas ref={canvasRef} className="animated-bg-canvas" />

      {/* Cinematic Edge Vignette */}
      <div className="animated-bg-vignette" />
    </div>
  );
};
