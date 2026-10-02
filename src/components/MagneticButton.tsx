"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 0 to 1, default ~0.3
  maxDistance?: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  as?: "div" | "span";
}

export function Magnetic({
  children,
  className = "",
  strength = 0.3,
  maxDistance = 15,
  onClick,
  as = "div",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    // Clamp to max distance
    const clampedX = Math.max(-maxDistance, Math.min(maxDistance, deltaX));
    const clampedY = Math.max(-maxDistance, Math.min(maxDistance, deltaY));

    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = as === "span" ? motion.span : motion.div;

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 18,
        mass: 0.2,
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </Component>
  );
}

export default Magnetic;
