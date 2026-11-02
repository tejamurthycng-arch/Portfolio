import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number; // For depth
  size: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  vx: number;
  vy: number;
  hue: number;
}

export const StarfieldBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse for subtle interactive motion parallax
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // Generate miniature stars with varying depth layers
    const STAR_COUNT = Math.min(Math.floor((width * height) / 7500), 180);
    let stars: Star[] = [];

    const initStars = () => {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        const depth = Math.random(); // 0 (far) to 1 (near)
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: depth,
          size: 0.6 + depth * 1.5, // 0.6px to 2.1px
          alpha: 0.2 + Math.random() * 0.7,
          baseAlpha: 0.2 + Math.random() * 0.6,
          twinkleSpeed: 0.008 + Math.random() * 0.02,
          vx: (Math.random() - 0.5) * 0.18 * (0.4 + depth * 0.8), // gentle horizontal drift
          vy: -0.15 - Math.random() * 0.25 * (0.5 + depth),      // slow upward motion graphics float
          hue: Math.random() > 0.8 ? (Math.random() > 0.5 ? 350 : 280) : 0 // mostly white, with subtle ruby/crimson/violet hints
        });
      }
    };

    initStars();

    // Render loop
    let time = 0;
    const render = () => {
      time += 0.015;

      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;

      const mouseOffsetX = (mouseX - width / 2) * 0.025;
      const mouseOffsetY = (mouseY - height / 2) * 0.025;

      ctx.clearRect(0, 0, width, height);

      // Draw each miniature star
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Move star
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around screen boundaries
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        } else if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }

        if (star.x < 0) star.x = width;
        else if (star.x > width) star.x = 0;

        // Twinkle calculation
        const twinkle = Math.sin(time * star.twinkleSpeed * 100 + i) * 0.35;
        const currentAlpha = Math.max(0.1, Math.min(1, star.baseAlpha + twinkle));

        // Parallax position
        const posX = star.x - mouseOffsetX * (star.z * 1.2);
        const posY = star.y - mouseOffsetY * (star.z * 1.2);

        ctx.beginPath();
        ctx.arc(posX, posY, star.size, 0, Math.PI * 2);

        if (star.hue === 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        } else if (star.hue === 350) {
          ctx.fillStyle = `rgba(255, 60, 100, ${currentAlpha})`; // Cosmic crimson star
        } else {
          ctx.fillStyle = `rgba(216, 180, 254, ${currentAlpha})`; // Violet star
        }
        ctx.fill();

        // Subtle glow for larger foreground stars
        if (star.size > 1.4) {
          ctx.beginPath();
          ctx.arc(posX, posY, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = star.hue === 350 
            ? `rgba(255, 0, 70, ${currentAlpha * 0.25})` 
            : `rgba(255, 255, 255, ${currentAlpha * 0.15})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep cosmic ambient gradient backdrops */}
      <div className="absolute top-[-10%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-rose-600/[0.07] via-red-900/[0.04] to-transparent blur-[140px]"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl from-purple-900/[0.06] via-rose-950/[0.04] to-transparent blur-[150px]"></div>
      <div className="absolute top-[40%] -left-[10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-red-600/[0.05] to-transparent blur-[130px]"></div>

      {/* Canvas rendering moving miniature stars */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-90"
      />
    </div>
  );
};
