"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */
export interface DeepDiveData {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  techStack: string[];
  links?: { label: string; href: string; icon: "github" | "demo" | "paper" }[];
  problem: string;
  architecture: string;
  results: string;
}

/* ═══════════════════════════════════════════════════════════════
   DEEP DIVE CONTENT DATABASE
   ═══════════════════════════════════════════════════════════════ */
export const DEEP_DIVES: Record<string, DeepDiveData> = {
  "ai-graveyard": {
    id: "ai-graveyard",
    title: "The AI Graveyard",
    subtitle: "Startup Idea Evaluator",
    date: "July 2026",
    techStack: ["LangChain", "LangGraph", "Python"],
    links: [{ label: "GitHub", href: "#", icon: "github" }],
    problem:
      "Evaluating startup viability is subjective and prone to human bias. Founders often rely on gut instinct, anecdotal evidence, and confirmation bias when assessing whether an idea is worth pursuing — leading to preventable failures and wasted capital.",
    architecture:
      "A multi-agent collaboration system where a boardroom of 8 autonomous agents debate, challenge assumptions, and conduct quantitative viability assessments. Architected a cyclic DAG execution framework with dynamic agent selection and shared state evidence to prevent persona redundancy and hallucinations. Implemented Kahn's algorithm for deterministic agent conflict resolution alongside a weighted confidence scoring model.",
    results:
      "Engineered a hybrid LLM-routing engine for adaptive reasoning depth and automated fallbacks across rate-limited endpoints. The system produces structured, quantitative viability reports that eliminate subjective bias from the evaluation process.",
  },
  "curious-fox": {
    id: "curious-fox",
    title: "The Curious Fox",
    subtitle: "Adaptive AI Learning Ecosystem",
    date: "Jan 2026 — Present",
    techStack: ["FastAPI", "Cohere", "Qdrant", "React"],
    links: [
      { label: "GitHub", href: "#", icon: "github" },
      { label: "Live Demo", href: "#", icon: "demo" },
    ],
    problem:
      "Standardized education fails to account for different student cognitive archetypes. Every learner processes information differently, yet traditional platforms deliver one-size-fits-all content — resulting in disengagement, surface-level understanding, and poor knowledge retention.",
    architecture:
      "Built an adaptive learning platform categorizing student cognitive archetypes using the Felder-Silverman model and Bloom's Taxonomy for personalized path generation. Architected a dual-agent ecosystem: 'Dr. Fox' (RAG-based tutor for source-cited Q&A) and 'Baby Fox' (inverted-role agent prompting users to teach via the Feynman Technique).",
    results:
      "Deployed a high-performance RAG pipeline on FastAPI, Cohere, and Qdrant, reaching 100% context precision, 95% faithfulness, and a P95 latency of 1.58s. The platform dynamically adapts content depth and modality based on real-time learner performance signals.",
  },
  "grant-winner": {
    id: "grant-winner",
    title: "₹125,000 Grant Winner",
    subtitle: "Research & Hackathon Excellence",
    date: "2025 — 2026",
    techStack: ["Reinforcement Learning", "Network Optimization", "Python"],
    links: [{ label: "Mi-IRICT Paper", href: "#", icon: "paper" }],
    problem:
      "Optimizing network packet fragmentation in dynamic, adversarial environments where traditional heuristic approaches fail to adapt to rapidly changing network conditions, variable MTU constraints, and real-time congestion patterns.",
    architecture:
      "Presented RL-based Network Packet Fragmentation and Optimization at Mi-IRICT, MAHSA University, Malaysia (Nov 2025). The system uses a reinforcement learning agent trained on simulated network topologies to learn optimal fragmentation strategies that minimize retransmission overhead while maximizing throughput under varying conditions.",
    results:
      "Secured ₹125,000 in total grants across multiple competitions. 5× National Hackathon Finalist with consistent top placements including Runner-Up at EduAIThon 2026 (Top 6 of 277 teams) and Top 2 of 25 Teams at SuprMentr × NASSCOM.",
  },
};

/* ═══════════════════════════════════════════════════════════════
   ICON COMPONENTS
   ═══════════════════════════════════════════════════════════════ */
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function GithubSmallIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function LinkIconForType({ type }: { type: "github" | "demo" | "paper" }) {
  switch (type) {
    case "github": return <GithubSmallIcon className="w-4 h-4" />;
    case "demo":   return <ExternalIcon className="w-4 h-4" />;
    case "paper":  return <DocumentIcon className="w-4 h-4" />;
  }
}

/* ═══════════════════════════════════════════════════════════════
   SECTION LABEL
   ═══════════════════════════════════════════════════════════════ */
function SectionLabel({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xs" aria-hidden="true">{icon}</span>
      <span
        className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold"
        style={{ color: "#FF5A1F" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DEEP DIVE MODAL COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export function DeepDiveModal({
  data,
  onClose,
}: {
  data: DeepDiveData | null;
  onClose: () => void;
}) {
  /* ─── ESC key handler ── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  /* ─── Body scroll lock + ESC listener ── */
  useEffect(() => {
    if (data) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [data, handleKeyDown]);

  return (
    <AnimatePresence>
      {data && (
        <>
          {/* ── BACKDROP ── */}
          <motion.div
            key="deep-dive-backdrop"
            className="fixed inset-0 z-[60]"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* ── MODAL PANEL ── */}
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 lg:p-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="deep-dive-title"
          >
            <motion.div
              layoutId={`deep-dive-card-${data.id}`}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl"
              style={{
                background: "#0A0A0A",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow:
                  "0 40px 100px -20px rgba(0, 0, 0, 0.8), 0 0 80px -20px rgba(255, 90, 31, 0.15)",
              }}
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* ─── Top ambient glow ─── */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full opacity-30 blur-[120px]"
                style={{ background: "radial-gradient(circle, rgba(255, 90, 31, 0.5), transparent 70%)" }}
              />

              {/* ─── Close Button ─── */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 z-10 flex items-center justify-center w-10 h-10 rounded-xl text-zinc-400 hover:text-white transition-all duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60"
                aria-label="Close deep dive"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <CloseIcon className="w-5 h-5" />
              </button>

              {/* ─── HEADER ─── */}
              <div className="relative px-7 sm:px-10 pt-8 sm:pt-10 pb-6">
                {/* Date badge */}
                {data.date && (
                  <motion.span
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono mb-4"
                    style={{
                      color: "#FF5A1F",
                      background: "rgba(255, 90, 31, 0.08)",
                      border: "1px solid rgba(255, 90, 31, 0.25)",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {data.date}
                  </motion.span>
                )}

                {/* Title */}
                <motion.h2
                  id="deep-dive-title"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight pr-12"
                >
                  {data.title}
                  {data.subtitle && (
                    <span className="block text-lg sm:text-xl font-semibold text-zinc-400 mt-1">
                      {data.subtitle}
                    </span>
                  )}
                </motion.h2>

                {/* Tech Stack Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-2 mt-5"
                >
                  {data.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-200 transition-colors hover:text-white hover:border-orange-500/40"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>

                {/* Action Links */}
                {data.links && data.links.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex flex-wrap gap-3 mt-5"
                  >
                    {data.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                        style={{
                          background:
                            link.icon === "github"
                              ? "rgba(255, 255, 255, 0.08)"
                              : "linear-gradient(135deg, rgba(255, 90, 31, 0.85), rgba(255, 60, 0, 0.95))",
                          border: `1px solid ${
                            link.icon === "github" ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.2)"
                          }`,
                          backdropFilter: "blur(8px)",
                          boxShadow:
                            link.icon !== "github"
                              ? "0 4px 16px rgba(255, 90, 31, 0.3)"
                              : "none",
                        }}
                      >
                        <LinkIconForType type={link.icon} />
                        {link.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* ─── DIVIDER ─── */}
              <div
                className="mx-7 sm:mx-10 h-px"
                style={{ background: "rgba(255, 255, 255, 0.06)" }}
                aria-hidden="true"
              />

              {/* ─── BODY CONTENT ─── */}
              <div className="px-7 sm:px-10 py-8 space-y-8">
                {/* THE PROBLEM */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <SectionLabel icon="🎯" label="The Problem" />
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {data.problem}
                  </p>
                </motion.div>

                {/* THE ARCHITECTURE */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <SectionLabel icon="🏗️" label="The Architecture" />
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-5">
                    {data.architecture}
                  </p>

                  {/* Architecture Diagram Placeholder */}
                  <div
                    className="relative rounded-2xl p-8 sm:p-10 flex flex-col items-center justify-center gap-3 min-h-[200px] group transition-colors duration-300 hover:border-orange-500/25"
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "2px dashed rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {/* Subtle grid pattern inside placeholder */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-30"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
                        backgroundSize: "16px 16px",
                      }}
                    />

                    <div className="relative flex flex-col items-center gap-2">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: "rgba(255, 90, 31, 0.1)",
                          border: "1px solid rgba(255, 90, 31, 0.2)",
                        }}
                      >
                        <svg
                          className="w-6 h-6 text-[#FF5A1F] opacity-70"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <path d="M3 9h18" />
                          <path d="M9 21V9" />
                        </svg>
                      </div>
                      <span className="text-sm font-semibold text-zinc-400 group-hover:text-zinc-300 transition-colors">
                        Architecture Diagram
                      </span>
                      <span className="text-[11px] font-mono text-zinc-600">
                        Flowchart will be added here
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* THE RESULTS */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <SectionLabel icon="📊" label="The Results" />
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {data.results}
                  </p>
                </motion.div>
              </div>

              {/* ─── BOTTOM CLOSE BAR ─── */}
              <div className="px-7 sm:px-10 pb-7 pt-2">
                <div
                  className="h-px w-full mb-5"
                  style={{ background: "rgba(255, 255, 255, 0.06)" }}
                  aria-hidden="true"
                />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider">
                    Deep Dive — {data.title}
                  </span>
                  <button
                    onClick={onClose}
                    className="text-xs font-mono text-zinc-500 hover:text-[#FF5A1F] transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60"
                    aria-label="Close deep dive modal"
                  >
                    Close · ESC
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
