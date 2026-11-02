import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  enableGlare?: boolean;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  maxTilt = 12,
  enableGlare = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates normalized from -1 to 1
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Glare position percentage (0% to 100%)
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  // Smooth springs for rotational physics
  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-1, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-maxTilt, maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Convert to -1 to 1 range
    const normX = (clientX / rect.width) * 2 - 1;
    const normY = (clientY / rect.height) * 2 - 1;

    mouseX.set(normX);
    mouseY.set(normY);

    if (enableGlare) {
      glareX.set((clientX / rect.width) * 100);
      glareY.set((clientY / rect.height) * 100);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      style={{ perspective: 1100 }}
      className="w-full h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ scale: { duration: 0.25 } }}
        className={`relative transition-shadow duration-300 ${className}`}
      >
        {children}

        {/* Dynamic 3D Specular Glare Reflection */}
        {enableGlare && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
            }}
          >
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{
                background: useTransform(
                  [glareX, glareY],
                  ([x, y]) =>
                    `radial-gradient(circle 280px at ${x}% ${y}%, rgba(255, 255, 255, 0.16) 0%, rgba(139, 92, 246, 0.08) 35%, transparent 70%)`
                ),
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
