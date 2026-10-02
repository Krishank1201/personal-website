"use client";

import Image from "next/image";
import Link from "next/link";
import { Magnetic } from "@/components/MagneticButton";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";

// Subtle icon components for buttons
function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function ArrowRightUpIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

export function Hero() {
  // Interactive 3D tilt tracking for editorial hero card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 250,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative min-h-[calc(100vh-var(--nav-height))] flex items-center justify-center overflow-hidden px-5 sm:px-8 lg:px-12 py-12 lg:py-16">
      {/* Background ambient lighting effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -left-32 w-[520px] h-[520px] rounded-full blur-[140px] opacity-25"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-1/4 w-[480px] h-[480px] rounded-full blur-[160px] opacity-15"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />

      {/* Grid structure overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ════════════════ LEFT COLUMN: Editorial Typography & CTAs ════════════════ */}
          <div className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1">
            {/* Orange Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border mb-8 group"
              style={{
                background: "rgba(255, 90, 31, 0.08)",
                borderColor: "rgba(255, 90, 31, 0.3)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: "var(--accent)" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{ backgroundColor: "var(--accent)" }}
                />
              </span>
              <span
                className="text-xs sm:text-sm font-semibold tracking-wide uppercase"
                style={{ color: "var(--accent)" }}
              >
                GenAI Intern @ Persistent Systems
              </span>
            </motion.div>

            {/* Massive Bold Typography */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full mb-6"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-[5.25rem] font-black tracking-tight leading-[0.92] text-white select-none">
                <span className="block font-sans uppercase">KRISHANK D</span>
                <span className="block font-sans uppercase text-white/90">
                  BOSWAN
                  <span
                    className="inline-block ml-1"
                    style={{ color: "var(--accent)" }}
                  >
                    .
                  </span>
                </span>
              </h1>
            </motion.div>

            {/* 2-Sentence Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg md:text-xl text-neutral-300/85 leading-relaxed max-w-2xl mb-10 font-normal"
            >
              Engineering next-generation generative AI interfaces and resilient full-stack systems at the intersection of intelligence and design. Focused on translating complex multimodal models into intuitive, blisteringly fast digital experiences.
            </motion.p>

            {/* Glassmorphic CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto"
            >
              {/* Primary Glassmorphic CTA: Explore Resume */}
              <Magnetic strength={0.3}>
                <Link
                  href="/resume"
                  id="hero-explore-resume-btn"
                  className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white overflow-hidden transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 90, 31, 0.85) 0%, rgba(255, 60, 0, 0.95) 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    boxShadow:
                      "0 8px 30px rgba(255, 90, 31, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.35)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                    }}
                  />
                  <DocumentIcon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Explore Resume</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </Magnetic>

              {/* Secondary Glassmorphic CTA: Read Journey */}
              <Magnetic strength={0.3}>
                <Link
                  href="/blogs"
                  id="hero-read-journey-btn"
                  className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white/90 overflow-hidden transition-all duration-300"
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    boxShadow:
                      "0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <span className="transition-colors duration-300 group-hover:text-white">
                    Read Journey
                  </span>
                  <ArrowRightUpIcon className="w-4 h-4 text-white/60 transition-all duration-300 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Magnetic>
            </motion.div>

            {/* Editorial Metadata Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 pt-6 border-t border-white/10 w-full flex flex-wrap items-center gap-6 text-xs text-neutral-400 uppercase tracking-widest font-mono"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                <span>Specialization: Large Language Models</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                <span>Focus: AI Systems & Design</span>
              </div>
            </motion.div>
          </div>

          {/* ════════════════ RIGHT COLUMN: Floating Portrait ════════════════ */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                perspective: 1000,
              }}
            >
              {/* Backside subtle ambient orange glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-2 sm:-inset-4 rounded-[2.5rem] opacity-40 blur-2xl transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(255, 90, 31, 0.45) 0%, rgba(255, 90, 31, 0.1) 60%, transparent 80%)",
                }}
              />

              {/* Framer Motion Slow Floating Oscillation Container */}
              <motion.div
                animate={{
                  y: [-9, 9, -9],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative"
              >
                {/* Glassmorphic Framing Card */}
                <div
                  className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 overflow-hidden transition-all duration-500 shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.14)",
                    backdropFilter: "blur(24px)",
                    boxShadow:
                      "0 24px 60px -12px rgba(0, 0, 0, 0.8), 0 0 40px -10px rgba(255, 90, 31, 0.25)",
                  }}
                >
                  {/* Aspect Ratio Container for Image */}
                  <div className="relative aspect-[4/5] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 group">
                    <Image
                      src="/images/hero-image.webp"
                      alt="Krishank D Boswan"
                      width={835}
                      height={1024}
                      priority
                      className="w-full h-full object-cover object-center filter grayscale contrast-110 brightness-95 group-hover:scale-105 group-hover:contrast-120 transition-all duration-700 ease-out"
                    />

                    {/* Gradient overlays for cinematic depth and integration with dark mode */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(10, 10, 10, 0.0) 45%, rgba(10, 10, 10, 0.7) 85%, rgba(10, 10, 10, 0.95) 100%)",
                      }}
                    />

                    {/* Subtle warm orange lighting tint on bottom-right */}
                    <div
                      aria-hidden="true"
                      className="absolute bottom-0 right-0 w-2/3 h-1/2 pointer-events-none opacity-40 mix-blend-screen"
                      style={{
                        background:
                          "radial-gradient(circle at bottom right, rgba(255, 90, 31, 0.6) 0%, transparent 70%)",
                      }}
                    />

                    {/* Editorial Floating Tag inside the image frame */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <div
                        className="px-3 py-1.5 rounded-lg border flex items-center gap-1.5"
                        style={{
                          background: "rgba(10, 10, 10, 0.75)",
                          borderColor: "rgba(255, 255, 255, 0.12)",
                          backdropFilter: "blur(12px)",
                        }}
                      >
                        <SparklesIcon className="w-3.5 h-3.5 text-orange-400" />
                        <span className="text-[11px] font-mono tracking-wider text-neutral-200 uppercase">
                          AI Systems // 2026
                        </span>
                      </div>

                      <div
                        className="px-2.5 py-1.5 rounded-lg border text-[11px] font-mono text-neutral-400"
                        style={{
                          background: "rgba(10, 10, 10, 0.75)",
                          borderColor: "rgba(255, 255, 255, 0.12)",
                          backdropFilter: "blur(12px)",
                        }}
                      >
                        BLR, IN
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative floating glass accent tag on top-left of image */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="hidden sm:flex absolute -top-4 -left-4 items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-mono text-white/90 shadow-xl"
                  style={{
                    background: "rgba(15, 15, 15, 0.8)",
                    borderColor: "rgba(255, 90, 31, 0.35)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                  <span>PORTFOLIO EDITORIAL</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
