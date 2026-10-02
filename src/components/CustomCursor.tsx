"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for fluid tracking
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Trailing glow spring (slightly looser for a sleek trailing atmosphere)
  const auraX = useSpring(mouseX, { damping: 20, stiffness: 200, mass: 0.8 });
  const auraY = useSpring(mouseY, { damping: 20, stiffness: 200, mass: 0.8 });

  useEffect(() => {
    // Only enable custom cursor on devices that support hover (fine pointer)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Event delegation to detect hover on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactiveEl = target.closest("a, button, input, textarea, [role='button'], .interactive-hover");
      if (interactiveEl) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Ambient glowing outer aura that expands on hover */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: auraX,
          y: auraY,
          translateX: "-50%",
          translateY: "-50%",
          background: isHovered
            ? "radial-gradient(circle, rgba(255, 90, 31, 0.35) 0%, rgba(255, 90, 31, 0.08) 60%, transparent 80%)"
            : "radial-gradient(circle, rgba(255, 90, 31, 0.18) 0%, rgba(255, 90, 31, 0.03) 50%, transparent 75%)",
          filter: "blur(4px)",
        }}
        animate={{
          width: isHovered ? 72 : isClicked ? 36 : 48,
          height: isHovered ? 72 : isClicked ? 36 : 48,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />

      {/* Outer focus ring when hovering */}
      <motion.div
        className="absolute rounded-full border border-orange-500/50"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 52 : 28,
          height: isHovered ? 52 : 28,
          borderColor: isHovered ? "rgba(255, 90, 31, 0.75)" : "rgba(255, 255, 255, 0.25)",
          scale: isClicked ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
      />

      {/* Sharp central core dot */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "var(--accent)",
          boxShadow: "0 0 10px rgba(255, 90, 31, 0.9), 0 0 20px rgba(255, 90, 31, 0.5)",
        }}
        animate={{
          width: isHovered ? 10 : isClicked ? 4 : 6,
          height: isHovered ? 10 : isClicked ? 4 : 6,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );
}
