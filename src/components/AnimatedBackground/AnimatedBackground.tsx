import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let time = 0;

    const render = () => {
      // Gentle, calm time step for elegant, non-distracting undulating motion
      time += 0.0075;

      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;
      const scaleMultiplier = isMobile ? 0.65 : (isTablet ? 0.85 : 1.0);

      // -------------------------------------------------------------
      // 1. WAVE GEOMETRY DEFINITION
      // Originates: Left side, upper-middle to lower-middle region
      // Traverses: Diagonally towards the bottom-right region
      // -------------------------------------------------------------
      const startX = -60;
      const startY = height * (0.42 + 0.05 * Math.sin(time * 0.65));

      const endX = width + 80;
      const endY = height * (0.86 + 0.04 * Math.cos(time * 0.55 + 2.1));

      // Diagonal gradient vector
      const waveGrad = ctx.createLinearGradient(startX, startY, endX, endY);
      // Colors: Purple/violet outer edges -> Electric blue in middle -> Bright cyan/turquoise highlights -> Magenta hints
      waveGrad.addColorStop(0.00, 'rgba(124, 58, 237, 0)');          // Transparent Violet Fade Out
      waveGrad.addColorStop(0.12, 'rgba(147, 51, 234, 0.42)');        // Deep Violet / Purple
      waveGrad.addColorStop(0.28, 'rgba(217, 70, 239, 0.48)');        // Luminous Magenta Accent
      waveGrad.addColorStop(0.48, 'rgba(37, 99, 235, 0.72)');         // Electric Blue Middle
      waveGrad.addColorStop(0.68, 'rgba(6, 182, 212, 0.82)');         // Bright Cyan Highlight
      waveGrad.addColorStop(0.82, 'rgba(34, 211, 238, 0.70)');        // Radiant Turquoise
      waveGrad.addColorStop(0.92, 'rgba(139, 92, 246, 0.40)');        // Violet Return
      waveGrad.addColorStop(1.00, 'rgba(124, 58, 237, 0)');          // Soft Edge Fade into #030407

      // Counter-wave gradient for interwoven ribbon depth
      const counterGrad = ctx.createLinearGradient(startX, startY - 30, endX, endY + 20);
      counterGrad.addColorStop(0.00, 'rgba(168, 85, 247, 0)');
      counterGrad.addColorStop(0.20, 'rgba(192, 132, 252, 0.40)');    // Violet
      counterGrad.addColorStop(0.45, 'rgba(59, 130, 246, 0.55)');     // Electric Blue
      counterGrad.addColorStop(0.70, 'rgba(6, 182, 212, 0.65)');      // Turquoise
      counterGrad.addColorStop(0.88, 'rgba(236, 72, 153, 0.35)');     // Magenta
      counterGrad.addColorStop(1.00, 'rgba(168, 85, 247, 0)');

      // Highlight filament gradient
      const highlightGrad = ctx.createLinearGradient(startX + 100, startY, endX - 80, endY);
      highlightGrad.addColorStop(0.0, 'rgba(6, 182, 212, 0)');
      highlightGrad.addColorStop(0.35, 'rgba(103, 232, 249, 0.85)');  // Intense Cyan Highlight
      highlightGrad.addColorStop(0.65, 'rgba(34, 211, 238, 0.90)');   // Electric Turquoise
      highlightGrad.addColorStop(0.85, 'rgba(167, 139, 250, 0.70)');  // Violet/White core
      highlightGrad.addColorStop(1.0, 'rgba(6, 182, 212, 0)');

      const steps = isMobile ? 32 : 55;
      const stepSize = (endX - startX) / steps;

      // -------------------------------------------------------------
      // HELPER: BUILD LIQUID CURVED RIBBON PATH
      // -------------------------------------------------------------
      const drawRibbon = (
        wavePhase: number,
        frequency: number,
        amplitude: number,
        baseThickness: number,
        thicknessPulse: number,
        yOffset: number = 0
      ) => {
        const topPoints: { x: number; y: number }[] = [];
        const bottomPoints: { x: number; y: number }[] = [];

        for (let i = 0; i <= steps; i++) {
          const x = startX + i * stepSize;
          const progress = i / steps;

          // Quadratic-like diagonal trajectory with smooth arch
          const baseTrajectory = startY + (endY - startY) * progress + Math.sin(progress * Math.PI) * (height * 0.14);

          // Harmonic undulations that gently breathe and shift curvature
          const harmonic1 = Math.sin(progress * frequency * 3.6 + time * 1.1 + wavePhase) * amplitude;
          const harmonic2 = Math.cos(progress * frequency * 2.2 - time * 0.85 + wavePhase * 1.5) * (amplitude * 0.65);
          const centerY = baseTrajectory + harmonic1 + harmonic2 + yOffset;

          // Dynamic thickness expansion & contraction
          const localThickness = (baseThickness + Math.sin(progress * 3.2 + time * 0.9 + wavePhase) * thicknessPulse) * scaleMultiplier;

          topPoints.push({ x, y: centerY - localThickness * 0.5 });
          bottomPoints.push({ x, y: centerY + localThickness * 0.5 });
        }

        ctx.beginPath();
        // Trace top contour
        ctx.moveTo(topPoints[0].x, topPoints[0].y);
        for (let i = 1; i < topPoints.length; i++) {
          const xc = (topPoints[i].x + topPoints[i - 1].x) / 2;
          const yc = (topPoints[i].y + topPoints[i - 1].y) / 2;
          ctx.quadraticCurveTo(topPoints[i - 1].x, topPoints[i - 1].y, xc, yc);
        }
        ctx.lineTo(topPoints[topPoints.length - 1].x, topPoints[topPoints.length - 1].y);

        // Trace bottom contour backwards
        for (let i = bottomPoints.length - 1; i > 0; i--) {
          const xc = (bottomPoints[i].x + bottomPoints[i - 1].x) / 2;
          const yc = (bottomPoints[i].y + bottomPoints[i - 1].y) / 2;
          ctx.quadraticCurveTo(bottomPoints[i].x, bottomPoints[i].y, xc, yc);
        }
        ctx.lineTo(bottomPoints[0].x, bottomPoints[0].y);
        ctx.closePath();
      };

      // -------------------------------------------------------------
      // PASS 1: BROAD SOFT AMBIENT GLOW (Atmospheric Aura)
      // -------------------------------------------------------------
      ctx.save();
      ctx.filter = isMobile ? 'blur(45px)' : 'blur(75px)';
      drawRibbon(0, 1.0, 42, 230, 45, -10);
      ctx.fillStyle = waveGrad;
      ctx.globalAlpha = 0.40;
      ctx.fill();
      ctx.restore();

      // -------------------------------------------------------------
      // PASS 2: COUNTER-UNDULATING SECONDARY RIBBON (Aurora Weave)
      // Subtle magenta & violet flowing counter-layer
      // -------------------------------------------------------------
      ctx.save();
      ctx.filter = isMobile ? 'blur(35px)' : 'blur(55px)';
      drawRibbon(1.8, 1.15, 36, 175, 35, 18);
      ctx.fillStyle = counterGrad;
      ctx.globalAlpha = 0.55;
      ctx.fill();
      ctx.restore();

      // -------------------------------------------------------------
      // PASS 3: PRIMARY LUMINOUS GRADIENT WAVE (Core Flowing Aurora)
      // -------------------------------------------------------------
      ctx.save();
      ctx.filter = isMobile ? 'blur(24px)' : 'blur(38px)';
      drawRibbon(0.4, 0.95, 34, 155, 35, 0);
      ctx.fillStyle = waveGrad;
      ctx.globalAlpha = 0.85;
      ctx.fill();
      ctx.restore();

      // -------------------------------------------------------------
      // PASS 4: BRIGHT CYAN & TURQUOISE HIGHLIGHT FILAMENT
      // Focused, intense light stream running through the wave crest
      // -------------------------------------------------------------
      ctx.save();
      ctx.filter = isMobile ? 'blur(12px)' : 'blur(18px)';
      drawRibbon(0.65, 1.25, 26, 55, 18, -6);
      ctx.fillStyle = highlightGrad;
      ctx.globalAlpha = 0.95;
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="animated-bg-container" aria-hidden="true">
      {/* 60 FPS Canvas rendering the flowing gradient wave */}
      <canvas ref={canvasRef} className="animated-bg-canvas" />

      {/* Static gradient fallback for prefers-reduced-motion */}
      <div className="animated-bg-static-fallback" />

      {/* Subtle, evenly distributed dark blue-grey dotted grid overlay */}
      <div className="animated-bg-dotted-grid" />

      {/* Atmospheric perimeter vignette blending smoothly with deep black (#030407) */}
      <div className="animated-bg-vignette" />
    </div>
  );
};
