import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Network, Grid3X3, Waves, Compass, ChevronUp } from 'lucide-react';

export type BackgroundMode = 'constellation' | 'cybergrid' | 'aurora' | 'hyperspace';

interface BackgroundOption {
  id: BackgroundMode;
  name: string;
  icon: React.ReactNode;
  desc: string;
}

const backgroundOptions: BackgroundOption[] = [
  {
    id: 'constellation',
    name: 'Neural Constellation',
    icon: <Network className="w-3.5 h-3.5 text-cyan-400" />,
    desc: 'Interactive connected nodes with cursor magnetism'
  },
  {
    id: 'cybergrid',
    name: '3D Cyber Grid',
    icon: <Grid3X3 className="w-3.5 h-3.5 text-violet-400" />,
    desc: 'Futuristic infinite horizon perspective grid'
  },
  {
    id: 'aurora',
    name: 'Cosmic Aurora',
    icon: <Waves className="w-3.5 h-3.5 text-emerald-400" />,
    desc: 'Flowing sinusoidal liquid gradient ribbons'
  },
  {
    id: 'hyperspace',
    name: 'Hyperspace Warp',
    icon: <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />,
    desc: 'Dynamic 3D warp speed celestial stream'
  }
];

export const DynamicBackground: React.FC = () => {
  const [mode, setMode] = useState<BackgroundMode>('constellation');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Store mode in ref for 60fps canvas loop without re-subscribing
  const modeRef = useRef<BackgroundMode>(mode);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMouseOver = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseOver = true;
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initElements();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // MODE 1: CONSTELLATION NODES
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      hue: number;
    }
    let nodes: Node[] = [];

    // MODE 4: HYPERSPACE STARS
    interface WarpStar {
      x: number;
      y: number;
      z: number;
      pz: number;
      size: number;
      hue: number;
    }
    let warpStars: WarpStar[] = [];

    const initElements = () => {
      // Init Constellation
      const nodeCount = Math.min(Math.floor((width * height) / 13000), 105);
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: 1.2 + Math.random() * 1.8,
          baseAlpha: 0.3 + Math.random() * 0.6,
          hue: Math.random() > 0.4 ? (Math.random() > 0.5 ? 270 : 190) : 0 // violet, cyan, white
        });
      }

      // Init Hyperspace
      warpStars = [];
      const starCount = Math.min(Math.floor((width * height) / 4500), 320);
      for (let i = 0; i < starCount; i++) {
        const z = Math.random() * width;
        warpStars.push({
          x: (Math.random() - 0.5) * width * 2,
          y: (Math.random() - 0.5) * height * 2,
          z: z,
          pz: z,
          size: 0.8 + Math.random() * 1.6,
          hue: Math.random() > 0.6 ? 270 : 190
        });
      }
    };

    initElements();

    let time = 0;
    let gridOffset = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      const currentMode = modeRef.current;

      // ==========================================
      // 1. NEURAL CONSTELLATION
      // ==========================================
      if (currentMode === 'constellation') {
        const connectionDist = Math.min(width * 0.1, 115);
        const mouseConnectionDist = 160;

        // Update and draw nodes
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];

          // Mouse gentle repel/gravitation
          if (isMouseOver) {
            const dx = mouseX - node.x;
            const dy = mouseY - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseConnectionDist && dist > 1) {
              const force = (mouseConnectionDist - dist) / mouseConnectionDist;
              node.x -= (dx / dist) * force * 1.5;
              node.y -= (dy / dist) * force * 1.5;
            }
          }

          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0) node.x = width;
          else if (node.x > width) node.x = 0;
          if (node.y < 0) node.y = height;
          else if (node.y > height) node.y = 0;

          // Render node circle with subtle pulse
          const pulse = Math.sin(time * 3 + i) * 0.2;
          const alpha = Math.max(0.15, Math.min(0.95, node.baseAlpha + pulse));

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          if (node.hue === 270) {
            ctx.fillStyle = `rgba(167, 139, 250, ${alpha})`;
          } else if (node.hue === 190) {
            ctx.fillStyle = `rgba(103, 232, 249, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
          }
          ctx.fill();

          // Outer bloom halo for larger nodes
          if (node.radius > 2.0) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 2.8, 0, Math.PI * 2);
            ctx.fillStyle = node.hue === 270 
              ? `rgba(139, 92, 246, ${alpha * 0.18})` 
              : `rgba(6, 182, 212, ${alpha * 0.18})`;
            ctx.fill();
          }

          // Node-to-Node connections
          for (let j = i + 1; j < nodes.length; j++) {
            const nodeB = nodes[j];
            const dx = node.x - nodeB.x;
            const dy = node.y - nodeB.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDist) {
              const connAlpha = (1 - dist / connectionDist) * 0.25;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(nodeB.x, nodeB.y);
              ctx.strokeStyle = node.hue === 270 || nodeB.hue === 270
                ? `rgba(168, 85, 247, ${connAlpha})`
                : `rgba(6, 182, 212, ${connAlpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }

          // Node-to-Mouse connections (vibrant interactive web)
          if (isMouseOver) {
            const mdx = mouseX - node.x;
            const mdy = mouseY - node.y;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

            if (mDist < mouseConnectionDist) {
              const mAlpha = (1 - mDist / mouseConnectionDist) * 0.55;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(mouseX, mouseY);
              ctx.strokeStyle = `rgba(103, 232, 249, ${mAlpha})`;
              ctx.lineWidth = 1.1;
              ctx.stroke();
            }
          }
        }
      }

      // ==========================================
      // 2. 3D CYBER GRID (Perspective Horizon)
      // ==========================================
      else if (currentMode === 'cybergrid') {
        const horizonY = height * 0.55;
        gridOffset = (gridOffset + 1.2) % 45;

        // Draw upper ambient celestial space
        const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
        skyGrad.addColorStop(0, 'rgba(0, 0, 0, 0.6)');
        skyGrad.addColorStop(1, 'rgba(10, 8, 25, 0.3)');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, width, horizonY);

        // Grid plane background
        const groundGrad = ctx.createLinearGradient(0, horizonY, 0, height);
        groundGrad.addColorStop(0, 'rgba(12, 6, 28, 0.4)');
        groundGrad.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
        ctx.fillStyle = groundGrad;
        ctx.fillRect(0, horizonY, width, height - horizonY);

        // Perspective longitudinal lines
        const numLines = 28;
        const vanishX = width / 2 + (mouseX - width / 2) * 0.08;
        for (let i = -numLines; i <= numLines; i++) {
          const bottomX = width / 2 + (i * width) / (numLines * 0.7);
          ctx.beginPath();
          ctx.moveTo(vanishX, horizonY);
          ctx.lineTo(bottomX, height);
          ctx.strokeStyle = 'rgba(139, 92, 246, 0.18)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Horizontal perspective lines scrolling towards viewer
        const horizLines = 18;
        for (let i = 0; i < horizLines; i++) {
          const progress = ((i * 45 + gridOffset) % (horizLines * 45)) / (horizLines * 45);
          // Exponential spacing to simulate 3D projection
          const y = horizonY + Math.pow(progress, 2.2) * (height - horizonY);
          const alpha = Math.min(progress * 0.45, 0.4);

          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Glowing horizon laser beam
        const horizonGrad = ctx.createLinearGradient(0, horizonY - 2, 0, horizonY + 2);
        horizonGrad.addColorStop(0, 'rgba(139, 92, 246, 0)');
        horizonGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.65)');
        horizonGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = horizonGrad;
        ctx.fillRect(0, horizonY - 4, width, 8);

        // Floating digital data particles in the sky
        for (let i = 0; i < 35; i++) {
          const px = (Math.sin(i * 123 + time * 0.3) * 0.5 + 0.5) * width;
          const py = (Math.cos(i * 321 + time * 0.2) * 0.5 + 0.5) * horizonY;
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? 'rgba(167, 139, 250, 0.4)' : 'rgba(103, 232, 249, 0.4)';
          ctx.fill();
        }
      }

      // ==========================================
      // 3. COSMIC AURORA WAVES
      // ==========================================
      else if (currentMode === 'aurora') {
        const numWaves = 4;
        const waveColors = [
          { r: 139, g: 92, b: 246, a: 0.12 },  // Electric Violet
          { r: 6, g: 182, b: 212, a: 0.10 },   // Aurora Cyan
          { r: 168, g: 85, b: 247, a: 0.08 },  // Purple
          { r: 59, g: 130, b: 246, a: 0.09 },  // Blue
        ];

        for (let w = 0; w < numWaves; w++) {
          const color = waveColors[w % waveColors.length];
          const speed = 0.4 + w * 0.15;
          const yBase = height * (0.35 + w * 0.12);

          ctx.beginPath();
          ctx.moveTo(0, height);

          for (let x = 0; x <= width; x += 15) {
            const freq1 = 0.0025 + w * 0.0006;
            const freq2 = 0.005 + w * 0.0012;
            const yOffset = 
              Math.sin(x * freq1 + time * speed) * 55 +
              Math.cos(x * freq2 - time * speed * 0.7) * 35;

            ctx.lineTo(x, yBase + yOffset);
          }

          ctx.lineTo(width, height);
          ctx.closePath();

          const grad = ctx.createLinearGradient(0, yBase - 80, 0, height);
          grad.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 1.5})`);
          grad.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.5})`);
          grad.addColorStop(1, 'rgba(5, 6, 15, 0)');
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Drifting ethereal micro-sparks over the aurora
        for (let i = 0; i < 45; i++) {
          const sx = (Math.sin(i * 99 + time * 0.5) * 0.5 + 0.5) * width;
          const sy = (Math.cos(i * 77 + time * 0.4) * 0.5 + 0.5) * height;
          ctx.beginPath();
          ctx.arc(sx, sy, 0.9, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.fill();
        }
      }

      // ==========================================
      // 4. HYPERSPACE WARP STREAM
      // ==========================================
      else if (currentMode === 'hyperspace') {
        const cx = width / 2 + (mouseX - width / 2) * 0.15;
        const cy = height / 2 + (mouseY - height / 2) * 0.15;
        const speed = 9.5;

        for (let i = 0; i < warpStars.length; i++) {
          const star = warpStars[i];
          star.pz = star.z;
          star.z -= speed;

          if (star.z <= 0) {
            star.z = width;
            star.pz = width;
            star.x = (Math.random() - 0.5) * width * 2;
            star.y = (Math.random() - 0.5) * height * 2;
          }

          const k = 250 / star.z;
          const pk = 250 / star.pz;

          const px = star.x * k + cx;
          const py = star.y * k + cy;
          const prevX = star.x * pk + cx;
          const prevY = star.y * pk + cy;

          if (px >= 0 && px <= width && py >= 0 && py <= height) {
            const alpha = Math.min((1 - star.z / width) * 1.4, 0.85);

            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(px, py);
            ctx.strokeStyle = star.hue === 270 
              ? `rgba(167, 139, 250, ${alpha})` 
              : `rgba(103, 232, 249, ${alpha})`;
            ctx.lineWidth = Math.min(star.size * (1 - star.z / width) * 1.8, 2.2);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Background Container with Pitch Black Base */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
        {/* Soft subtle atmospheric gradient glows tailored to electric violet & aurora cyan */}
        <div className="absolute top-[-15%] left-[10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-violet-600/[0.08] via-indigo-950/[0.04] to-transparent blur-[160px]"></div>
        <div className="absolute bottom-[5%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl from-cyan-600/[0.06] via-transparent to-transparent blur-[160px]"></div>
        <div className="absolute top-[40%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-fuchsia-600/[0.04] to-transparent blur-[140px]"></div>

        {/* 60 FPS Canvas rendering active background mode */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-95"
        />
      </div>

      {/* Interactive Background Style Switcher Pill (Floating in bottom-right corner) */}
      <div className="fixed bottom-5 right-5 z-40">
        <div className="relative">
          {/* Active Preset Pill */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-card hover:border-violet-500/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 backdrop-blur-2xl text-xs font-mono"
            aria-label="Change Background Theme"
            title="Switch Background Animation"
          >
            <span className="p-1 rounded-full bg-white/[0.06] border border-white/[0.1]">
              <Compass className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-45 transition-transform" />
            </span>
            <span className="text-slate-300 group-hover:text-white transition-colors">
              Bg: <span className="text-cyan-300 font-semibold">{backgroundOptions.find(o => o.id === mode)?.name}</span>
            </span>
            <ChevronUp className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Preset Selection Dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-12 right-0 w-64 p-2 rounded-2xl glass-panel shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/[0.12] backdrop-blur-3xl mb-2"
              >
                <div className="px-2.5 py-1.5 border-b border-white/[0.08] mb-1.5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Select Background
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                </div>

                <div className="space-y-1">
                  {backgroundOptions.map((opt) => {
                    const isSelected = mode === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setMode(opt.id);
                          setIsMenuOpen(false);
                        }}
                        className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-all duration-200 ${
                          isSelected
                            ? 'bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/40 text-white shadow-sm'
                            : 'hover:bg-white/[0.06] text-slate-300 hover:text-white border border-transparent'
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] mt-0.5">
                          {opt.icon}
                        </div>
                        <div>
                          <div className="text-xs font-semibold flex items-center gap-1.5">
                            <span>{opt.name}</span>
                            {isSelected && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 font-normal leading-tight mt-0.5">
                            {opt.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};
