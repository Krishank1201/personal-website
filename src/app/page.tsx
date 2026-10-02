"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function HomePage() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100dvh-var(--nav-height))] px-5 text-center overflow-hidden">
      {/* Radial glow accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,90,31,0.12) 0%, transparent 70%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-3xl mx-auto"
      >
        {/* Eyebrow tag */}
        <motion.div variants={item} className="inline-flex items-center gap-2 mb-6">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border"
            style={{
              background: "rgba(255,90,31,0.10)",
              borderColor: "rgba(255,90,31,0.30)",
              color: "var(--accent)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-5"
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text">Krish</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={item}
          className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto leading-relaxed mb-10"
        >
          A full-stack developer crafting{" "}
          <span className="text-white/90 font-medium">fast, beautiful</span>{" "}
          digital experiences — from pixel-perfect UIs to scalable back-ends.
        </motion.p>

        {/* CTA row */}
        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="/connect"
            id="hero-connect-btn"
            className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.03] active:scale-[0.97]"
            style={{ background: "var(--accent)", color: "#fff", boxShadow: "0 4px 20px rgba(255,90,31,0.35)" }}
          >
            Get in Touch
          </a>
          <a
            href="/blogs"
            id="hero-blogs-btn"
            className="px-6 py-3 rounded-xl text-sm font-semibold transition-all border hover:bg-white/5 active:scale-[0.97]"
            style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)" }}
          >
            Read Blogs →
          </a>
        </motion.div>
      </motion.div>

      {/* Floating scroll indicator */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/30 text-xs"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          aria-hidden="true"
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-white/40"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <span>scroll</span>
      </motion.div>
    </section>
  );
}
