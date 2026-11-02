import React, { useEffect, useRef } from 'react';

export interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
  size?: number;
}

interface CapParticleTrailProps {
  currentPos: { x: number; y: number } | null;
  isActive: boolean;
}

export const CapParticleTrail: React.FC<CapParticleTrailProps> = ({ currentPos, isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const sparklesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; life: number; color: string; size: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#06b6d4', '#38bdf8', '#818cf8', '#a855f7', '#fde047'];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now();

      // Add point if active and moving
      if (isActive && currentPos && currentPos.x !== 0 && currentPos.y !== 0) {
        pointsRef.current.push({
          x: currentPos.x,
          y: currentPos.y,
          timestamp: now,
        });

        // Spawn 2-3 sparkle particles per tick
        for (let i = 0; i < 3; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 2.5 + 0.5;
          sparklesRef.current.push({
            x: currentPos.x + (Math.random() - 0.5) * 15,
            y: currentPos.y + (Math.random() - 0.5) * 15,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 0.8, // slight upward float
            life: 1.0,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 3 + 1.5,
          });
        }
      }

      // Filter out points older than 600ms
      pointsRef.current = pointsRef.current.filter((p) => now - p.timestamp < 600);

      // Draw Ribbon Light Trail
      const pts = pointsRef.current;
      if (pts.length > 2) {
        for (let i = 1; i < pts.length; i++) {
          const p1 = pts[i - 1];
          const p2 = pts[i];
          const age = now - p2.timestamp;
          const progress = 1 - age / 600; // 1 -> 0
          if (progress <= 0) continue;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineWidth = Math.max(1, progress * 8);
          ctx.strokeStyle = `rgba(56, 189, 248, ${progress * 0.6})`;
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#06b6d4';
          ctx.stroke();

          // Inner core line
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineWidth = Math.max(0.8, progress * 3);
          ctx.strokeStyle = `rgba(255, 255, 255, ${progress * 0.9})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#ffffff';
          ctx.stroke();
        }
      }

      // Update and Draw Sparkles
      ctx.shadowBlur = 0;
      for (let i = sparklesRef.current.length - 1; i >= 0; i--) {
        const s = sparklesRef.current[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.025;

        if (s.life <= 0) {
          sparklesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.life;
        ctx.shadowBlur = 6;
        ctx.shadowColor = s.color;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, currentPos]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20" />;
};
