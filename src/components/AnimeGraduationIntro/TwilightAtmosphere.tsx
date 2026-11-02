import React, { useEffect, useRef } from 'react';

interface TwilightAtmosphereProps {
  cameraZoom?: number;
}

export const TwilightAtmosphere: React.FC<TwilightAtmosphereProps> = ({ cameraZoom = 1 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Floating twilight particles (fireflies, glowing dust, cherry blossom motes)
    interface Mote {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      pulseSpeed: number;
      angle: number;
    }

    const motes: Mote[] = [];
    const moteCount = Math.min(width > 768 ? 65 : 35, 75);
    const colors = [
      'rgba(147, 197, 253, ', // soft sky blue
      'rgba(196, 181, 253, ', // soft lavender
      'rgba(56, 189, 248, ',  // electric cyan
      'rgba(253, 224, 71, ',  // soft golden firefly
      'rgba(244, 114, 182, ', // gentle sakura pink
    ];

    for (let i = 0; i < moteCount; i++) {
      motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1,
        speedX: Math.random() * 0.8 + 0.3, // drifting gently rightward
        speedY: (Math.random() - 0.5) * 0.4 - 0.1, // slight float
        opacity: Math.random() * 0.7 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.03 + 0.015,
        angle: Math.random() * Math.PI * 2,
      });
    }

    // Gentle wind streaks
    interface WindStreak {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
    }
    const windStreaks: WindStreak[] = [
      { x: -100, y: height * 0.25, length: 140, speed: 2.2, opacity: 0.12 },
      { x: -200, y: height * 0.45, length: 220, speed: 2.8, opacity: 0.15 },
      { x: -150, y: height * 0.65, length: 180, speed: 2.0, opacity: 0.10 },
      { x: -300, y: height * 0.35, length: 160, speed: 3.0, opacity: 0.14 },
    ];

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw glowing motes & fireflies
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.x += m.speedX;
        m.y += m.speedY;
        m.angle += m.pulseSpeed;

        if (m.x > width + 20) m.x = -20;
        if (m.y < -20) m.y = height + 20;
        if (m.y > height + 20) m.y = -20;

        const currentOpacity = m.opacity * (0.6 + 0.4 * Math.sin(m.angle));

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fillStyle = `${m.color}${currentOpacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = m.color + '0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 2. Draw subtle anime wind streaks
      ctx.lineWidth = 1.2;
      for (const streak of windStreaks) {
        streak.x += streak.speed;
        if (streak.x > width + 100) {
          streak.x = -streak.length - Math.random() * 200;
          streak.y = Math.random() * (height * 0.7) + height * 0.1;
        }

        const grad = ctx.createLinearGradient(streak.x, streak.y, streak.x + streak.length, streak.y);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0)');
        grad.addColorStop(0.5, `rgba(167, 139, 250, ${streak.opacity})`);
        grad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(streak.x, streak.y);
        ctx.lineTo(streak.x + streak.length, streak.y - 4);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-700 ease-out"
      style={{ transform: `scale(${cameraZoom})`, transformOrigin: '50% 65%' }}
    >
      {/* 1. Cinematic Studio Ghibli / Shinkai Twilight Sky Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 60% at 50% 15%, rgba(99, 102, 241, 0.22) 0%, transparent 70%),
            radial-gradient(ellipse 70% 50% at 75% 35%, rgba(6, 182, 212, 0.16) 0%, transparent 60%),
            radial-gradient(ellipse 80% 45% at 50% 75%, rgba(139, 92, 246, 0.28) 0%, transparent 75%),
            linear-gradient(180deg, #030617 0%, #080e2d 30%, #151648 55%, #2a1b5e 75%, #181938 100%)
          `
        }}
      />

      {/* 2. Luminous Twilight Moon with Ethereal Cyan Corona */}
      <div className="absolute top-[12%] right-[14%] sm:right-[18%] md:right-[22%] pointer-events-none">
        {/* Soft Corona Halo */}
        <div className="w-32 h-32 sm:w-44 sm:h-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="w-24 h-24 sm:w-32 sm:h-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/15 blur-2xl" />
        {/* Crisp Crescent Moon */}
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-cyan-100 via-sky-200 to-white shadow-[0_0_35px_rgba(56,189,248,0.7)] flex items-center justify-center">
          <div className="absolute w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#0a0f30] top-0 left-2 sm:left-2.5 opacity-90" />
        </div>
      </div>

      {/* 3. Layered Silhouette of Anime University Campus & Spired Towers */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-[52%] sm:h-[48%] md:h-[44%] object-cover pointer-events-none"
        viewBox="0 0 1440 400" 
        preserveAspectRatio="none"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Deep distant mountains gradient */}
          <linearGradient id="twilightHills" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e184b" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0e0e29" stopOpacity="0.85" />
          </linearGradient>

          {/* Campus skyline midground gradient */}
          <linearGradient id="campusSkyline" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14143a" />
            <stop offset="100%" stopColor="#080718" />
          </linearGradient>

          {/* Warm glowing window gradient */}
          <radialGradient id="windowGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {/* Far Distant Layer: Rolling Twilight Hills */}
        <path 
          d="M0,230 Q320,180 620,220 T1200,195 Q1340,210 1440,230 L1440,400 L0,400 Z" 
          fill="url(#twilightHills)" 
        />

        {/* Midground: University Spired Campus Skyline */}
        {/* BMSCE Academic Clocktower & Heritage Hall Silhouette */}
        <g fill="url(#campusSkyline)">
          {/* Left Wing & Library Spire */}
          <path d="M0,280 L70,270 L95,240 L120,270 L190,275 L210,210 L220,150 L230,210 L250,275 L380,275 L400,250 L460,250 L480,285 L560,285 L560,400 L0,400 Z" />
          
          {/* Central BMSCE Engineering Clocktower */}
          <path d="M640,280 L670,280 L670,160 L685,140 L700,75 L715,140 L730,160 L730,280 L760,280 L790,255 L860,255 L880,285 L640,285 Z" />
          
          {/* Right Campus Complex & Observatory Dome */}
          <path d="M890,280 L930,265 L960,265 L980,225 Q1020,190 1060,225 L1080,265 L1160,265 L1190,240 L1230,240 L1250,275 L1440,275 L1440,400 L890,400 Z" />
        </g>

        {/* Glowing Campus Windows (Warm Amber Light from study halls) */}
        {/* Left Library Windows */}
        <rect x="150" y="285" width="8" height="14" rx="3" fill="url(#windowGlow)" />
        <rect x="170" y="285" width="8" height="14" rx="3" fill="url(#windowGlow)" />
        <rect x="290" y="285" width="9" height="16" rx="3" fill="url(#windowGlow)" />
        <rect x="315" y="285" width="9" height="16" rx="3" fill="url(#windowGlow)" />
        <rect x="340" y="285" width="9" height="16" rx="3" fill="url(#windowGlow)" />

        {/* Clocktower Luminous Face & Windows */}
        <circle cx="700" cy="185" r="14" fill="#fef08a" opacity="0.85" filter="drop-shadow(0 0 8px #fde047)" />
        <line x1="700" y1="185" x2="700" y2="176" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="700" y1="185" x2="708" y2="188" stroke="#1e1b4b" strokeWidth="2" strokeLinecap="round" />
        <rect x="694" y="220" width="12" height="24" rx="4" fill="url(#windowGlow)" />
        <rect x="694" y="255" width="12" height="18" rx="4" fill="url(#windowGlow)" />

        {/* Right Campus Windows */}
        <rect x="1000" y="280" width="8" height="14" rx="3" fill="url(#windowGlow)" />
        <rect x="1025" y="280" width="8" height="14" rx="3" fill="url(#windowGlow)" />
        <rect x="1110" y="280" width="9" height="15" rx="3" fill="url(#windowGlow)" />
        <rect x="1135" y="280" width="9" height="15" rx="3" fill="url(#windowGlow)" />
        <rect x="1280" y="285" width="8" height="14" rx="3" fill="url(#windowGlow)" />
        <rect x="1305" y="285" width="8" height="14" rx="3" fill="url(#windowGlow)" />

        {/* Foreground Graduation Pavilion & Plaza Stone Pavement */}
        <path 
          d="M0,335 C360,330 1080,330 1440,335 L1440,400 L0,400 Z" 
          fill="#060814" 
        />
        {/* Subtle plaza rim highlight */}
        <path 
          d="M0,335 C360,330 1080,330 1440,335" 
          stroke="rgba(139, 92, 246, 0.45)" 
          strokeWidth="1.5" 
        />

        {/* Stone courtyard perspective lines */}
        <line x1="180" y1="335" x2="100" y2="400" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <line x1="420" y1="333" x2="380" y2="400" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <line x1="720" y1="332" x2="720" y2="400" stroke="rgba(139,92,246,0.12)" strokeWidth="1.5" />
        <line x1="1020" y1="333" x2="1060" y2="400" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <line x1="1260" y1="335" x2="1340" y2="400" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      </svg>

      {/* 4. Canvas for Dynamic Fireflies, Glowing Dust & Wind */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* 5. Cinematic Vignette & Atmospheric Fog */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 45%, rgba(3, 5, 18, 0.75) 100%)'
        }}
      />
    </div>
  );
};
