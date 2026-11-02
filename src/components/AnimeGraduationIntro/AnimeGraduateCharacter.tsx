import React from 'react';

export type CharacterPose = 'walking' | 'stand_ready' | 'reach_cap' | 'throw_cap' | 'follow_through';

interface AnimeGraduateCharacterProps {
  pose: CharacterPose;
  walkCyclePhase: number; // 0 to 2*PI
  showCapOnHead: boolean;
  scale?: number;
}

export const AnimeGraduateCharacter: React.FC<AnimeGraduateCharacterProps> = ({
  pose,
  walkCyclePhase,
  showCapOnHead = true,
  scale = 1,
}) => {
  // Compute joint angles and displacements based on pose & walkCyclePhase
  const isWalking = pose === 'walking';

  // Walk physics
  const legSwingMax = 26; // degrees
  const armSwingMax = 22; // degrees

  const leftThighAngle = isWalking ? Math.sin(walkCyclePhase) * legSwingMax : -3;
  const rightThighAngle = isWalking ? Math.sin(walkCyclePhase + Math.PI) * legSwingMax : 4;

  const leftShinAngle = isWalking ? Math.max(0, -Math.sin(walkCyclePhase)) * 28 : 0;
  const rightShinAngle = isWalking ? Math.max(0, -Math.sin(walkCyclePhase + Math.PI)) * 28 : 0;

  const torsoBobY = isWalking ? Math.abs(Math.sin(walkCyclePhase * 2)) * 4.5 : 0;
  const torsoTilt = isWalking ? Math.sin(walkCyclePhase) * 1.5 : 0;
  const gownSwayX = isWalking ? Math.sin(walkCyclePhase - 0.6) * 6 : 0;

  // Left arm (background arm)
  let leftArmAngle = isWalking ? Math.sin(walkCyclePhase + Math.PI) * armSwingMax : -8;
  if (pose === 'throw_cap' || pose === 'follow_through') {
    leftArmAngle = -15; // balanced out slightly behind
  }

  // Right arm (foreground action arm)
  let rightArmAngle = 0;
  let rightForearmAngle = 0;
  let rightHandThrow = false;

  switch (pose) {
    case 'walking':
      rightArmAngle = Math.sin(walkCyclePhase) * armSwingMax;
      rightForearmAngle = Math.max(0, Math.sin(walkCyclePhase)) * 8;
      break;
    case 'stand_ready':
      rightArmAngle = 8;
      rightForearmAngle = 10;
      break;
    case 'reach_cap':
      rightArmAngle = -125; // reach high up towards head
      rightForearmAngle = -35; // bend elbow to grasp cap brim
      break;
    case 'throw_cap':
      rightArmAngle = -165; // dramatic thrust straight upward
      rightForearmAngle = -10;
      rightHandThrow = true;
      break;
    case 'follow_through':
      rightArmAngle = -150; // proud extended arm pose
      rightForearmAngle = -5;
      rightHandThrow = true;
      break;
  }

  // Head tilt based on action
  let headAngle = 0;
  if (pose === 'reach_cap') headAngle = -5;
  if (pose === 'throw_cap' || pose === 'follow_through') headAngle = -14; // look up at soaring cap

  return (
    <div
      className="relative select-none pointer-events-none"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
        width: '260px',
        height: '420px',
      }}
    >
      <svg
        viewBox="-130 -290 260 420"
        className="w-full h-full overflow-visible"
        style={{
          filter: 'drop-shadow(0 15px 25px rgba(2, 6, 23, 0.6))',
        }}
      >
        <defs>
          {/* Skin tones (Anime warm porcelain with soft twilight blush) */}
          <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff1f2" />
            <stop offset="70%" stopColor="#fecdd3" />
            <stop offset="100%" stopColor="#fda4af" />
          </linearGradient>

          {/* Deep Navy/Black Academic Gown Gradient */}
          <linearGradient id="gownFabric" x1="-60" y1="-120" x2="60" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="35%" stopColor="#0f172a" />
            <stop offset="85%" stopColor="#050814" />
            <stop offset="100%" stopColor="#02040b" />
          </linearGradient>

          {/* BMSCE Computer Science Graduation Stole Gradient (Electric Blue & Gold) */}
          <linearGradient id="stoleGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="45%" stopColor="#2563eb" />
            <stop offset="85%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>

          {/* Golden Stole Trim */}
          <linearGradient id="goldTrimGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          {/* Anime Hair Gradient (Dark espresso with electric blue rim shine) */}
          <linearGradient id="animeHairGrad" x1="-30" y1="-170" x2="30" y2="-120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3b4261" />
            <stop offset="30%" stopColor="#1e2238" />
            <stop offset="80%" stopColor="#0c0e18" />
            <stop offset="100%" stopColor="#05060b" />
          </linearGradient>

          {/* Eye Gradient (Determined Anime Blue Eye) */}
          <linearGradient id="animeEyeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="60%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </linearGradient>

          {/* Soft Ground Shadow Gradient */}
          <radialGradient id="charGroundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(2, 6, 23, 0.75)" />
            <stop offset="60%" stopColor="rgba(2, 6, 23, 0.35)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* 1. Dynamic Ground Shadow under Character */}
        <ellipse cx="0" cy="115" rx="55" ry="12" fill="url(#charGroundShadow)" />

        {/* 2. Left (Back) Arm */}
        <g
          id="left-arm"
          style={{
            transformOrigin: '-22px -100px',
            transform: `rotate(${leftArmAngle}deg)`,
          }}
        >
          {/* Back Sleeve */}
          <path
            d="M -22,-100 Q -38,-65 -32,-35 L -18,-35 Q -22,-65 -14,-100 Z"
            fill="#090d1a"
            stroke="#1e293b"
            strokeWidth="1.2"
          />
          {/* White shirt cuff */}
          <rect x="-30" y="-35" width="12" height="4" rx="1.5" fill="#e2e8f0" />
          {/* Hand */}
          <circle cx="-24" cy="-28" r="6" fill="#fecdd3" />
        </g>

        {/* 3. Left (Back) Leg */}
        <g
          id="left-leg"
          style={{
            transformOrigin: '-12px 10px',
            transform: `rotate(${leftThighAngle}deg)`,
          }}
        >
          {/* Left Thigh */}
          <path d="M -16,10 L -8,10 L -10,60 L -18,60 Z" fill="#090d16" />
          {/* Left Shin & Foot */}
          <g style={{ transformOrigin: '-14px 60px', transform: `rotate(${leftShinAngle}deg)` }}>
            <path d="M -18,60 L -10,60 L -12,105 L -19,105 Z" fill="#060910" />
            {/* Left Shoe */}
            <path d="M -22,104 L -7,104 Q -4,114 -12,114 L -23,114 Q -26,108 -22,104 Z" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
          </g>
        </g>

        {/* 4. Right (Front) Leg */}
        <g
          id="right-leg"
          style={{
            transformOrigin: '12px 10px',
            transform: `rotate(${rightThighAngle}deg)`,
          }}
        >
          {/* Right Thigh */}
          <path d="M 8,10 L 16,10 L 18,60 L 10,60 Z" fill="#0f172a" />
          {/* Right Shin & Foot */}
          <g style={{ transformOrigin: '14px 60px', transform: `rotate(${rightShinAngle}deg)` }}>
            <path d="M 10,60 L 18,60 L 19,105 L 11,105 Z" fill="#090d18" />
            {/* Right Shoe */}
            <path d="M 8,104 L 24,104 Q 28,114 20,114 L 7,114 Q 4,108 8,104 Z" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
          </g>
        </g>

        {/* 5. Torso, Gown, Stole & Head Group (With Walk Bobbing & Tilt) */}
        <g
          id="torso-and-head-group"
          style={{
            transform: `translateY(${torsoBobY}px) rotate(${torsoTilt}deg)`,
            transformOrigin: '0px 10px',
          }}
        >
          {/* Draped Academic Gown Back Fold */}
          <path
            d={`M -32,-100 L 32,-100 L 46,25 Q ${gownSwayX + 25},45 ${gownSwayX},46 Q ${gownSwayX - 25},45 -46,25 Z`}
            fill="url(#gownFabric)"
            stroke="rgba(6, 182, 212, 0.35)"
            strokeWidth="1.2"
          />

          {/* Flowing Gown Cloth Folds */}
          <path d={`M -18,-95 Q -22,-30 ${gownSwayX - 16},44`} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.8" />
          <path d={`M 18,-95 Q 22,-30 ${gownSwayX + 16},44`} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="2.2" />
          <path d={`M 0,-95 Q 0,-20 ${gownSwayX},46`} fill="none" stroke="rgba(6,182,212,0.2)" strokeWidth="1.5" />

          {/* White Collared Shirt V-Neck & Navy Tie */}
          <polygon points="-12,-105 12,-105 0,-85" fill="#ffffff" />
          {/* Formal Dark Tie */}
          <polygon points="-3,-100 3,-100 4,-75 0,-68 -4,-75" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.5" />

          {/* BMSCE Computer Science Academic Stole (V-shaped draped sash) */}
          <g id="academic-stole">
            {/* Left sash ribbon */}
            <path
              d="M -26,-105 L -10,-105 L -8,-25 L -20,-25 Z"
              fill="url(#stoleGrad)"
              stroke="url(#goldTrimGrad)"
              strokeWidth="1.2"
            />
            {/* Right sash ribbon */}
            <path
              d="M 10,-105 L 26,-105 L 20,-25 L 8,-25 Z"
              fill="url(#stoleGrad)"
              stroke="url(#goldTrimGrad)"
              strokeWidth="1.2"
            />
            {/* Stole Golden Bottom Fringe */}
            <rect x="-20" y="-25" width="12" height="3" fill="#fbbf24" rx="0.5" />
            <rect x="8" y="-25" width="12" height="3" fill="#fbbf24" rx="0.5" />
            {/* BMSCE Monogram on sash */}
            <text x="-14" y="-45" fill="#ffffff" fontSize="4.5" fontFamily="monospace" fontWeight="bold">CSE</text>
            <text x="11" y="-45" fill="#fef08a" fontSize="4.5" fontFamily="monospace" fontWeight="bold">BMS</text>
          </g>

          {/* Neck */}
          <rect x="-7" y="-120" width="14" height="18" fill="url(#skinGrad)" rx="3" />

          {/* Head & Anime Face Group */}
          <g
            id="character-head"
            style={{
              transformOrigin: '0px -115px',
              transform: `rotate(${headAngle}deg)`,
            }}
          >
            {/* Head Base (Anime jaw shape) */}
            <path
              d="M -20,-140 Q -22,-120 -12,-104 L 0,-98 L 12,-104 Q 22,-120 20,-140 Q 20,-165 0,-165 Q -20,-165 -20,-140 Z"
              fill="url(#skinGrad)"
            />

            {/* Anime Ears */}
            <ellipse cx="-20" cy="-126" rx="3.5" ry="6.5" fill="#fecdd3" />
            <ellipse cx="20" cy="-126" rx="3.5" ry="6.5" fill="#fecdd3" />

            {/* Anime Cheeks: Soft Peach/Rose Blush */}
            <ellipse cx="-12" cy="-120" rx="5" ry="2.5" fill="#fb7185" opacity="0.45" />
            <ellipse cx="12" cy="-120" rx="5" ry="2.5" fill="#fb7185" opacity="0.45" />

            {/* Anime Eyes */}
            {/* Left Eye */}
            <g id="left-eye">
              <path d="M -17,-130 Q -11,-136 -5,-131" fill="none" stroke="#0f172a" strokeWidth="2.4" strokeLinecap="round" />
              <ellipse cx="-11" cy="-127" rx="4" ry="4.5" fill="url(#animeEyeGrad)" />
              <circle cx="-11" cy="-127" r="2.2" fill="#020617" />
              {/* Eye Catchlights (Ghibli wonder twinkle) */}
              <circle cx="-12.5" cy="-128.5" r="1.3" fill="#ffffff" />
              <circle cx="-9.5" cy="-125.5" r="0.7" fill="#ffffff" />
            </g>

            {/* Right Eye */}
            <g id="right-eye">
              <path d="M 5,-131 Q 11,-136 17,-130" fill="none" stroke="#0f172a" strokeWidth="2.4" strokeLinecap="round" />
              <ellipse cx="11" cy="-127" rx="4" ry="4.5" fill="url(#animeEyeGrad)" />
              <circle cx="11" cy="-127" r="2.2" fill="#020617" />
              {/* Eye Catchlights */}
              <circle cx="9.5" cy="-128.5" r="1.3" fill="#ffffff" />
              <circle cx="12.5" cy="-125.5" r="0.7" fill="#ffffff" />
            </g>

            {/* Fine Anime Eyebrows */}
            <path d="M -16,-136 Q -11,-139 -6,-135" fill="none" stroke="#1e2238" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M 6,-135 Q 11,-139 16,-136" fill="none" stroke="#1e2238" strokeWidth="1.6" strokeLinecap="round" />

            {/* Cute Anime Nose */}
            <path d="M -0.5,-122 L 0.5,-120" fill="none" stroke="#f43f5e" strokeWidth="1.4" strokeLinecap="round" />

            {/* Confident Proud Anime Smile */}
            <path
              d={
                pose === 'throw_cap' || pose === 'follow_through'
                  ? 'M -7,-112 Q 0,-104 7,-112 Q 0,-108 -7,-112 Z' // open radiant laugh/smile
                  : 'M -6,-113 Q 0,-108 6,-113' // gentle confident smile
              }
              fill={pose === 'throw_cap' || pose === 'follow_through' ? '#be123c' : 'none'}
              stroke="#881337"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Anime Hair (Layered with Studio Ghibli styled strands) */}
            <g id="anime-hair">
              {/* Back Hair Strands */}
              <path d="M -24,-148 Q -28,-130 -21,-118 L -18,-130 Z" fill="url(#animeHairGrad)" />
              <path d="M 24,-148 Q 28,-130 21,-118 L 18,-130 Z" fill="url(#animeHairGrad)" />

              {/* Front Styled Bangs */}
              <path
                d="M -22,-148 Q -16,-135 -14,-130 Q -10,-140 -5,-128 Q 0,-144 4,-127 Q 9,-138 15,-129 Q 19,-140 22,-148 Q 15,-162 0,-162 Q -15,-162 -22,-148 Z"
                fill="url(#animeHairGrad)"
              />
              {/* Electric Blue Hair Specular Highlights */}
              <path
                d="M -14,-152 Q 0,-157 14,-152"
                fill="none"
                stroke="rgba(6, 182, 212, 0.75)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M -10,-150 Q 0,-154 10,-150"
                fill="none"
                stroke="rgba(255, 255, 255, 0.55)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </g>

            {/* Graduation Cap ON HEAD (Rendered when showCapOnHead === true) */}
            {showCapOnHead && (
              <g id="cap-on-head" transform="translate(0, -156)">
                {/* Mortarboard Diamond sitting on head */}
                <polygon
                  points="0,-18 55,0 0,18 -55,0"
                  fill="#0b0f19"
                  stroke="#06b6d4"
                  strokeWidth="1.8"
                />
                {/* Cap base band fitting forehead */}
                <path
                  d="M -22,0 Q 0,9 22,0 L 20,8 Q 0,16 -20,8 Z"
                  fill="#030712"
                  stroke="#38bdf8"
                  strokeWidth="0.8"
                />
                {/* Gold Button */}
                <circle cx="0" cy="0" r="3" fill="#fde047" stroke="#78350f" strokeWidth="0.5" />
                {/* Flowing Tassel on head */}
                <path
                  d="M 0,0 Q 22,4 32,15 L 34,30"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <circle cx="34" cy="30" r="2.2" fill="#fde047" />
                <path d="M 33,31 L 33,40 M 35,31 L 35,40" stroke="#06b6d4" strokeWidth="1.2" />
              </g>
            )}
          </g>
        </g>

        {/* 6. Right (Front) Action Arm */}
        <g
          id="right-arm"
          style={{
            transformOrigin: '24px -100px',
            transform: `rotate(${rightArmAngle}deg)`,
            transition: 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {/* Upper Arm with Gown Robe Shoulder */}
          <path
            d="M 20,-105 Q 36,-65 28,-35 L 14,-35 Q 22,-65 14,-105 Z"
            fill="url(#gownFabric)"
            stroke="rgba(6, 182, 212, 0.35)"
            strokeWidth="1.2"
          />

          {/* Forearm & Hand */}
          <g
            style={{
              transformOrigin: '22px -35px',
              transform: `rotate(${rightForearmAngle}deg)`,
            }}
          >
            {/* Forearm Sleeve */}
            <path
              d="M 14,-35 L 28,-35 L 26,-8 L 12,-8 Z"
              fill="#0f172a"
              stroke="#1e293b"
              strokeWidth="1"
            />
            {/* White Shirt Cuff */}
            <rect x="12" y="-8" width="14" height="4" rx="1.5" fill="#f1f5f9" />

            {/* Hand (Normal fist during walk, grasping at reach, or wide open throwing fingers!) */}
            {rightHandThrow ? (
              /* Open Hand Reaching up in celebration / throwing */
              <g id="hand-throwing" transform="translate(18, -2)">
                <circle cx="0" cy="0" r="5" fill="#fecdd3" />
                {/* Extended fingers */}
                <line x1="-3" y1="-1" x2="-6" y2="10" stroke="#fecdd3" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="-1" y1="0" x2="-2" y2="12" stroke="#fecdd3" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="2" y1="0" x2="2" y2="12" stroke="#fecdd3" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="4" y1="-1" x2="6" y2="10" stroke="#fecdd3" strokeWidth="2" strokeLinecap="round" />
                {/* Thumb */}
                <line x1="-4" y1="-2" x2="-8" y2="3" stroke="#fecdd3" strokeWidth="2.2" strokeLinecap="round" />
              </g>
            ) : (
              /* Relaxed / Grasping Hand */
              <g id="hand-relaxed" transform="translate(18, -2)">
                <circle cx="0" cy="0" r="5.5" fill="#fecdd3" />
                <ellipse cx="-2" cy="1" rx="2.5" ry="3.5" fill="#fda4af" />
              </g>
            )}
          </g>
        </g>
      </svg>
    </div>
  );
};
