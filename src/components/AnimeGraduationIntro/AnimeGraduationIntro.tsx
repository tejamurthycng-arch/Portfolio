import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TwilightAtmosphere } from './TwilightAtmosphere';
import { AnimeGraduateCharacter, CharacterPose } from './AnimeGraduateCharacter';
import { GraduationCap3D } from './GraduationCap3D';
import { CapParticleTrail } from './CapParticleTrail';
import { Sparkles, ArrowRight } from 'lucide-react';

interface AnimeGraduationIntroProps {
  onComplete: () => void;
}

export const AnimeGraduationIntro: React.FC<AnimeGraduationIntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const characterWrapRef = useRef<HTMLDivElement | null>(null);
  const flyingCapWrapRef = useRef<HTMLDivElement | null>(null);
  const capInnerRef = useRef<HTMLDivElement | null>(null);
  const irisMaskRef = useRef<HTMLDivElement | null>(null);
  const shockwaveRef = useRef<HTMLDivElement | null>(null);

  // Character animation state
  const [pose, setPose] = useState<CharacterPose>('walking');
  const [walkPhase, setWalkPhase] = useState<number>(0);
  const [showCapOnHead, setShowCapOnHead] = useState<boolean>(true);
  const [cameraZoom, setCameraZoom] = useState<number>(1);

  // Flying cap state
  const [capPos, setCapPos] = useState<{ x: number; y: number } | null>(null);
  const [isCapFlying, setIsCapFlying] = useState<boolean>(false);
  const [showUnderside, setShowUnderside] = useState<boolean>(false);
  const [tasselAngle, setTasselAngle] = useState<number>(20);
  const [glowIntensity, setGlowIntensity] = useState<number>(1);

  // Intro text / title subtitle state
  const [sceneText, setSceneText] = useState<{ title: string; subtitle: string; visible: boolean }>({
    title: 'The Journey Begins',
    subtitle: 'B.E. Computer Science & Engineering',
    visible: true,
  });

  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
    }
  }, [onComplete]);

  // Master GSAP Animation Sequence
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 640;
      const startX = -260;
      // Target center position
      const centerTargetX = window.innerWidth * (isMobile ? 0.44 : 0.47) - 130;
      const characterY = window.innerHeight * (isMobile ? 0.62 : 0.58) - 100;

      // Initial character placement
      if (characterWrapRef.current) {
        gsap.set(characterWrapRef.current, {
          x: startX,
          y: characterY,
          opacity: 1,
        });
      }

      // Initial flying cap hidden
      if (flyingCapWrapRef.current) {
        gsap.set(flyingCapWrapRef.current, {
          opacity: 0,
          scale: 1,
          x: centerTargetX + 130,
          y: characterY + 20,
        });
      }

      // Master Timeline
      const master = gsap.timeline({
        onComplete: () => {
          setIsFinished(true);
          onComplete();
        },
      });

      // ----------------------------------------------------
      // SCENE 1: Character Walk In from Left to Center
      // ----------------------------------------------------
      const walkObj = { x: startX, phase: 0 };
      const walkDuration = isMobile ? 3.2 : 3.4;

      master.to(walkObj, {
        x: centerTargetX,
        phase: 14 * Math.PI, // 7 full walk cycles
        duration: walkDuration,
        ease: 'power1.inOut',
        onUpdate: () => {
          if (characterWrapRef.current) {
            gsap.set(characterWrapRef.current, { x: walkObj.x });
          }
          setWalkPhase(walkObj.phase);
        },
      }, 0);

      // Intro title fades in then dissolves smoothly
      master.to(
        {},
        {
          duration: 1.8,
          onStart: () => setSceneText({ title: 'Tejamurthy M.', subtitle: 'Aspiring Software Engineer • BMSCE', visible: true }),
        },
        0.5
      );
      master.to(
        {},
        {
          duration: 0.6,
          onStart: () => setSceneText((prev) => ({ ...prev, visible: false })),
        },
        2.6
      );

      // ----------------------------------------------------
      // SCENE 2: Pause at Center & Reach for Cap
      // ----------------------------------------------------
      const pauseTime = walkDuration;

      // Character stops, stands ready
      master.call(() => {
        setPose('stand_ready');
      }, undefined, pauseTime);

      // Camera gently pushes in for cinematic focus
      master.to(
        {},
        {
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: function () {
            setCameraZoom(1 + this.progress() * 0.08);
          },
        },
        pauseTime + 0.1
      );

      // Character reaches up to graduation cap brim
      master.call(() => {
        setPose('reach_cap');
      }, undefined, pauseTime + 0.4);

      // Brief dramatic breath before the throw
      master.call(() => {
        setSceneText({ title: 'Class of 2026', subtitle: 'Entering the Engineering Frontier...', visible: true });
      }, undefined, pauseTime + 0.5);

      // ----------------------------------------------------
      // SCENE 3: The Dramatic Cap Launch!
      // ----------------------------------------------------
      const throwTime = pauseTime + 1.1;

      // Arm thrusts upwards, character enters 'throw_cap' pose
      master.call(() => {
        setPose('throw_cap');
        setShowCapOnHead(false);
        setIsCapFlying(true);
        setGlowIntensity(1.6);
      }, undefined, throwTime);

      // Follow-through proud pose as boy gazes up
      master.call(() => {
        setPose('follow_through');
      }, undefined, throwTime + 0.35);

      // Flying cap initial spawn coordinates (right above boy's head)
      const capStartX = centerTargetX + 130;
      const capStartY = characterY + 20;
      const capApexX = isMobile ? window.innerWidth * 0.55 : window.innerWidth * 0.58;
      const capApexY = window.innerHeight * 0.22;
      const capFinalCenterX = window.innerWidth * 0.5;
      const capFinalCenterY = window.innerHeight * 0.5;

      // Reveal flying cap
      master.set(flyingCapWrapRef.current, {
        opacity: 1,
        x: capStartX,
        y: capStartY,
        scale: 0.45,
        rotationZ: -10,
        rotationX: 20,
        rotationY: 0,
      }, throwTime);

      // Cap Trajectory Stage A: Arc up to sky apex with rapid rotation and tassel swing
      master.to(
        flyingCapWrapRef.current,
        {
          x: capApexX,
          y: capApexY,
          scale: isMobile ? 1.4 : 1.8,
          rotationZ: 380,
          rotationX: -45,
          rotationY: 180,
          duration: 1.25,
          ease: 'power2.out',
          onUpdate: () => {
            if (flyingCapWrapRef.current) {
              const rect = flyingCapWrapRef.current.getBoundingClientRect();
              setCapPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
              setTasselAngle(Math.sin(Date.now() * 0.015) * 45);
            }
          },
        },
        throwTime
      );

      // ----------------------------------------------------
      // SCENE 4: Cap Flight & Full-Screen Viewport Eclipse
      // ----------------------------------------------------
      const eclipseStartTime = throwTime + 1.25;

      // Fade out scene text as cap swoops forward
      master.call(() => {
        setSceneText((prev) => ({ ...prev, visible: false }));
        setShowUnderside(true); // show velvet underside texture as it hurtles to camera
        setGlowIntensity(2.4);
      }, undefined, eclipseStartTime);

      // Cap dives straight towards camera lens and expands to eclipse the entire viewport
      master.to(
        flyingCapWrapRef.current,
        {
          x: capFinalCenterX,
          y: capFinalCenterY,
          scale: isMobile ? 65 : 85, // massive scale completely covering 100vw x 100vh
          rotationZ: 720,
          rotationX: 0,
          rotationY: 360,
          duration: 1.2,
          ease: 'power3.in',
          onUpdate: () => {
            if (flyingCapWrapRef.current) {
              const rect = flyingCapWrapRef.current.getBoundingClientRect();
              setCapPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
            }
          },
        },
        eclipseStartTime
      );

      // ----------------------------------------------------
      // SCENE 5: Cinematic Radial Iris Reveal into Portfolio
      // ----------------------------------------------------
      const revealStartTime = eclipseStartTime + 1.15;

      // Expand Shockwave Ring
      if (shockwaveRef.current) {
        master.fromTo(
          shockwaveRef.current,
          {
            scale: 0,
            opacity: 1,
          },
          {
            scale: 4,
            opacity: 0,
            duration: 0.9,
            ease: 'power2.out',
          },
          revealStartTime
        );
      }

      // Circular Iris Reveal Aperture opening from center (0% -> 150%)
      if (irisMaskRef.current) {
        master.fromTo(
          irisMaskRef.current,
          {
            clipPath: 'circle(0% at 50% 50%)',
          },
          {
            clipPath: 'circle(150% at 50% 50%)',
            duration: 0.95,
            ease: 'expo.inOut',
          },
          revealStartTime
        );
      }

      // Smooth fade out of the intro overlay
      master.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.55,
          ease: 'power2.out',
        },
        revealStartTime + 0.65
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  // Handle immediate Skip button / ESC key
  const handleSkip = () => {
    setIsFinished(true);
    onComplete();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden bg-[#030514] select-none"
      style={{ perspective: '1200px' }}
    >
      {/* 1. Atmospheric Studio Ghibli Twilight Sky & Campus Silhouette */}
      <TwilightAtmosphere cameraZoom={cameraZoom} />

      {/* 2. Particle Trail following the Cap */}
      <CapParticleTrail currentPos={capPos} isActive={isCapFlying} />

      {/* 3. Cinematic Vignette & Anime Text Overlay */}
      <div className="absolute top-[16%] left-0 right-0 z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <div
          className={`transition-all duration-700 ease-out transform ${
            sceneText.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 tracking-wider uppercase mb-2 shadow-[0_0_15px_rgba(6,182,212,0.25)] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            {sceneText.subtitle}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {sceneText.title}
          </h2>
        </div>
      </div>

      {/* 4. Anime Graduate Character */}
      <div
        ref={characterWrapRef}
        className="absolute z-20 pointer-events-none"
        style={{
          width: '260px',
          height: '420px',
          willChange: 'transform',
        }}
      >
        <AnimeGraduateCharacter
          pose={pose}
          walkCyclePhase={walkPhase}
          showCapOnHead={showCapOnHead}
          scale={window.innerWidth < 640 ? 0.78 : 0.95}
        />
      </div>

      {/* 5. 3D Flying Graduation Cap */}
      <div
        ref={flyingCapWrapRef}
        className="absolute z-40 pointer-events-none flex items-center justify-center"
        style={{
          width: '180px',
          height: '140px',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          marginLeft: '-90px',
          marginTop: '-70px',
        }}
      >
        <div ref={capInnerRef} className="w-full h-full">
          <GraduationCap3D
            tasselAngle={tasselAngle}
            glowIntensity={glowIntensity}
            showUnderside={showUnderside}
          />
        </div>
      </div>

      {/* 6. Electric-Blue Shockwave Wave Ring during Reveal */}
      <div
        ref={shockwaveRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-[400px] h-[400px] border-[5px] border-cyan-400 opacity-0 pointer-events-none z-45"
        style={{
          boxShadow: '0 0 50px #06b6d4, inset 0 0 40px #8b5cf6',
        }}
      />

      {/* 7. Full-Screen Eclipse Iris Mask Transition */}
      <div
        ref={irisMaskRef}
        className="absolute inset-0 bg-[#02030a] z-40 pointer-events-none"
        style={{
          clipPath: 'circle(0% at 50% 50%)',
        }}
      />

      {/* 8. Discreet Skip Button (Top-Right) */}
      <button
        onClick={handleSkip}
        className="absolute top-5 right-5 sm:top-7 sm:right-7 z-50 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-pill hover:bg-white/[0.1] text-xs font-mono text-slate-300 hover:text-white transition-all shadow-md group cursor-pointer"
        aria-label="Skip cinematic introduction"
      >
        <span>Skip Intro</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-cyan-400" />
        <span className="text-[10px] text-slate-500 hidden sm:inline ml-0.5">[ESC]</span>
      </button>
    </div>
  );
};
