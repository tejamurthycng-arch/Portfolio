import React from 'react';

interface GraduationCap3DProps {
  tasselAngle?: number; // dynamic swing angle in degrees
  glowIntensity?: number;
  showUnderside?: boolean;
}

export const GraduationCap3D: React.FC<GraduationCap3DProps> = ({
  tasselAngle = 18,
  glowIntensity = 1,
  showUnderside = false,
}) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      <svg
        viewBox="-160 -120 320 240"
        className="w-full h-full overflow-visible"
        style={{
          filter: `drop-shadow(0 0 ${18 * glowIntensity}px rgba(6, 182, 212, ${0.45 * glowIntensity})) drop-shadow(0 0 ${35 * glowIntensity}px rgba(139, 92, 246, ${0.35 * glowIntensity}))`,
        }}
      >
        <defs>
          {/* Mortarboard Upper Diamond Gradient */}
          <linearGradient id="mortarboardTopGrad" x1="-140" y1="-70" x2="140" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="45%" stopColor="#0f172a" />
            <stop offset="85%" stopColor="#050814" />
            <stop offset="100%" stopColor="#02030a" />
          </linearGradient>

          {/* Electric Blue Satin Bevel Edge */}
          <linearGradient id="electricBlueBevel" x1="-150" y1="0" x2="150" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="35%" stopColor="#818cf8" />
            <stop offset="70%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          {/* Skull Cap Base Cylinder Gradient */}
          <linearGradient id="skullCapGrad" x1="0" y1="0" x2="0" y2="55" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="60%" stopColor="#070a16" />
            <stop offset="100%" stopColor="#020308" />
          </linearGradient>

          {/* Golden Button Gradient */}
          <radialGradient id="goldButtonGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="40%" stopColor="#fde047" />
            <stop offset="85%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </radialGradient>

          {/* Tassel Silk Cord Gradient */}
          <linearGradient id="tasselCordGrad" x1="0" y1="0" x2="60" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Mortarboard Underside (Visible during dramatic camera zoom) */}
          <radialGradient id="undersideGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0a0d24" />
            <stop offset="65%" stopColor="#040614" />
            <stop offset="100%" stopColor="#010207" />
          </radialGradient>
        </defs>

        {showUnderside ? (
          /* Underside View (when scaling up to fill screen) */
          <g id="cap-underside">
            {/* Outer Diamond */}
            <polygon
              points="0,-95 150,0 0,95 -150,0"
              fill="url(#undersideGrad)"
              stroke="url(#electricBlueBevel)"
              strokeWidth="4"
            />
            {/* Inner Skull Ring */}
            <ellipse cx="0" cy="0" rx="55" ry="38" fill="#020308" stroke="#38bdf8" strokeWidth="2.5" opacity="0.8" />
            {/* Inner Silk Lining Stitching Pattern */}
            <ellipse cx="0" cy="0" rx="42" ry="28" fill="none" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="0" cy="0" r="12" fill="url(#goldButtonGrad)" />
          </g>
        ) : (
          /* Realistic 3D Perspective Top View */
          <g id="cap-top">
            {/* 1. Skull Cap Cylinder (Under the mortarboard diamond) */}
            <g id="skull-cap-base">
              <path
                d="M -50,8 Q 0,22 50,8 L 48,36 Q 0,52 -48,36 Z"
                fill="url(#skullCapGrad)"
                stroke="#06b6d4"
                strokeWidth="1.2"
                opacity="0.95"
              />
              <path
                d="M -48,36 Q 0,52 48,36"
                fill="none"
                stroke="rgba(6, 182, 212, 0.6)"
                strokeWidth="2"
              />
            </g>

            {/* 2. Mortarboard Diamond Top (3D Beveled Rhombus) */}
            <g id="mortarboard-diamond">
              {/* Drop shadow underneath diamond */}
              <polygon
                points="0,-68 142,3 0,74 -142,3"
                fill="rgba(0,0,0,0.6)"
                transform="translate(0, 6)"
              />

              {/* Main Diamond Surface */}
              <polygon
                points="0,-72 144,-1 0,70 -144,-1"
                fill="url(#mortarboardTopGrad)"
                stroke="url(#electricBlueBevel)"
                strokeWidth="2.8"
              />

              {/* Top-Right Light Specular Sheen (Ghibli-style lighting) */}
              <polygon
                points="0,-72 144,-1 72, -36.5"
                fill="rgba(255, 255, 255, 0.12)"
              />
              {/* Bottom-Left Ambient Shadow */}
              <polygon
                points="0,70 -144,-1 -72, 34.5"
                fill="rgba(0, 0, 0, 0.35)"
              />

              {/* Fine Inner Accent Border */}
              <polygon
                points="0,-63 128,-1 0,61 -128,-1"
                fill="none"
                stroke="rgba(6, 182, 212, 0.3)"
                strokeWidth="1"
              />
            </g>

            {/* 3. Center Golden Button */}
            <circle cx="0" cy="-1" r="7.5" fill="url(#goldButtonGrad)" stroke="#78350f" strokeWidth="1" />
            <circle cx="-2.5" cy="-3.5" r="2" fill="#ffffff" opacity="0.75" />

            {/* 4. Dynamic Swinging Tassel with Physics Simulation */}
            <g id="cap-tassel" style={{ transformOrigin: '0px -1px', transform: `rotate(${tasselAngle}deg)` }}>
              {/* Tassel Cord anchoring from button to edge */}
              <path
                d="M 0,-1 C 20,4 45,18 68,36"
                fill="none"
                stroke="url(#tasselCordGrad)"
                strokeWidth="2.8"
                strokeLinecap="round"
              />

              {/* Golden Clasp Ring at edge */}
              <g transform="translate(68, 36)">
                <circle cx="0" cy="0" r="4.5" fill="url(#goldButtonGrad)" stroke="#78350f" strokeWidth="0.8" />

                {/* Hanging Silk Tassel Strands */}
                <path
                  d="M -3.5,3 C -6,22 -2,45 -1,58 L 1,58 C 2,45 6,22 3.5,3 Z"
                  fill="url(#electricBlueBevel)"
                />
                {/* Secondary Golden Silk Accents */}
                <path
                  d="M -1.5,4 C -3,20 -1,42 0,54 L 1.5,4 Z"
                  fill="#fde047"
                  opacity="0.85"
                />
                {/* Fine Tassel Fringe End */}
                <line x1="-3" y1="58" x2="-2" y2="64" stroke="#38bdf8" strokeWidth="1.2" />
                <line x1="-1" y1="58" x2="0" y2="66" stroke="#fde047" strokeWidth="1.2" />
                <line x1="1" y1="58" x2="2" y2="64" stroke="#a855f7" strokeWidth="1.2" />
              </g>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
