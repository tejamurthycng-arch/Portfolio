import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
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

    const STAR_COUNT = Math.min(Math.floor((width * height) / 7000), 200);
    let stars: Star[] = [];

    const initStars = () => {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        const depth = Math.random();
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: depth,
          size: 0.6 + depth * 1.6,
          alpha: 0.25 + Math.random() * 0.7,
          baseAlpha: 0.2 + Math.random() * 0.6,
          twinkleSpeed: 0.008 + Math.random() * 0.02,
          vx: (Math.random() - 0.5) * 0.16 * (0.4 + depth * 0.8),
          vy: -0.16 - Math.random() * 0.25 * (0.5 + depth),
          hue: Math.random() > 0.7 ? (Math.random() > 0.5 ? 270 : 185) : 0 // White, Violet, or Cyan
        });
      }
    };

    initStars();

    let time = 0;
    const render = () => {
      time += 0.015;

      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;

      const mouseOffsetX = (mouseX - width / 2) * 0.025;
      const mouseOffsetY = (mouseY - height / 2) * 0.025;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.x += star.vx;
        star.y += star.vy;

        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        } else if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }

        if (star.x < 0) star.x = width;
        else if (star.x > width) star.x = 0;

        const twinkle = Math.sin(time * star.twinkleSpeed * 100 + i) * 0.35;
        const currentAlpha = Math.max(0.12, Math.min(1, star.baseAlpha + twinkle));

        const posX = star.x - mouseOffsetX * (star.z * 1.2);
        const posY = star.y - mouseOffsetY * (star.z * 1.2);

        ctx.beginPath();
        ctx.arc(posX, posY, star.size, 0, Math.PI * 2);

        if (star.hue === 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        } else if (star.hue === 270) {
          ctx.fillStyle = `rgba(196, 181, 253, ${currentAlpha})`; // Electric Violet
        } else {
          ctx.fillStyle = `rgba(103, 232, 249, ${currentAlpha})`; // Aurora Cyan
        }
        ctx.fill();

        if (star.size > 1.4) {
          ctx.beginPath();
          ctx.arc(posX, posY, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = star.hue === 270 
            ? `rgba(168, 85, 247, ${currentAlpha * 0.25})` 
            : (star.hue === 185 ? `rgba(6, 182, 212, ${currentAlpha * 0.25})` : `rgba(255, 255, 255, ${currentAlpha * 0.15})`);
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
      {/* Deep cosmic ambient gradient nebulae in Violet & Aurora Cyan */}
      <div className="absolute top-[-10%] left-[15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-violet-600/[0.12] via-indigo-900/[0.06] to-transparent blur-[140px]"></div>
      <div className="absolute bottom-[5%] right-[5%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tl from-cyan-600/[0.09] via-violet-950/[0.06] to-transparent blur-[150px]"></div>
      <div className="absolute top-[35%] -left-[10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-fuchsia-600/[0.07] to-transparent blur-[130px]"></div>

      {/* Canvas rendering moving miniature stars */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-95"
      />
    </div>
  );
};
