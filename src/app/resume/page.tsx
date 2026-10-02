"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DeepDiveModal, DEEP_DIVES, type DeepDiveData } from "@/components/DeepDiveModal";
import { Magnetic } from "@/components/MagneticButton";

/* ═══════════════════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════════════════ */
function ChevronIcon({ open, className }: { open: boolean; className?: string }) {
  return (
    <motion.svg
      className={className ?? "w-5 h-5"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function AwardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}


/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */
interface BentoStat {
  value: string;
  label: string;
  detail: string;
  icon: React.FC<{ className?: string }>;
  accentGlow?: boolean;
  deepDiveId?: string;
}

const BENTO_STATS: BentoStat[] = [
  {
    value: "₹125,000",
    label: "Total Grant Winner",
    detail: "2026",
    icon: TrophyIcon,
    accentGlow: true,
    deepDiveId: "grant-winner",
  },
  {
    value: "Top 8%",
    label: "WorldQuant Quant Challenge",
    detail: "70,000+ Competitors",
    icon: TargetIcon,
  },
  {
    value: "1.58s",
    label: "P95 Latency",
    detail: "The Curious Fox",
    icon: ZapIcon,
    deepDiveId: "curious-fox",
  },
  {
    value: "5×",
    label: "National Hackathon Finalist",
    detail: "Consistent Excellence",
    icon: AwardIcon,
    deepDiveId: "grant-winner",
  },
];

interface SkillCategory {
  category: string;
  skills: string[];
}

const TECH_SKILLS: SkillCategory[] = [
  { category: "Languages",             skills: ["Python", "Java", "C"] },
  { category: "RAG Strategy & Eval",   skills: ["Parent-Child RAG", "Graph RAG", "Hybrid RAG + BM25", "RAGAS"] },
  { category: "LLMs & Embeddings",     skills: ["Gemini", "Groq", "Cohere", "Local Deployments (Gemma, Llama, Hugging Face)"] },
  { category: "Databases & Vectors",   skills: ["Supabase", "Qdrant", "DynamoDB"] },
  { category: "Agent Frameworks",      skills: ["LangChain", "LangGraph"] },
  { category: "Deployment & Cloud",    skills: ["Docker", "Git/GitHub", "Vercel", "Render", "AWS API Gateway", "Lambda", "Amplify"] },
];

interface AccordionSection {
  id: string;
  title: string;
  icon: string;
  content: React.ReactNode;
}


/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

/* ─── Glassmorphic Bento Card ─────────────────────────────────── */
function BentoCard({
  stat,
  index,
  onDeepDive,
}: {
  stat: BentoStat;
  index: number;
  onDeepDive?: (id: string) => void;
}) {
  const Icon = stat.icon;
  const isClickable = !!stat.deepDiveId;
  const Tag = isClickable ? "button" as const : "div" as const;

  return (
    <motion.div
      layoutId={stat.deepDiveId ? `deep-dive-card-${stat.deepDiveId}` : undefined}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Tag
        className={`group relative w-full text-left rounded-2xl p-6 sm:p-7 overflow-hidden transition-all duration-300 hover:border-orange-500/30 ${
          isClickable ? "cursor-pointer" : ""
        }`}
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
        {...(isClickable && {
          onClick: () => onDeepDive?.(stat.deepDiveId!),
          "aria-label": `Deep dive into ${stat.label}`,
        })}
      >
        {/* Subtle corner glow on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500"
          style={{ background: "radial-gradient(circle, rgba(255, 90, 31, 0.25), transparent 70%)" }}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <Icon className="w-5 h-5 text-[#FF5A1F] opacity-80" />
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{stat.detail}</span>
              {isClickable && (
                <span className="text-[9px] font-mono text-[#FF5A1F] opacity-0 group-hover:opacity-100 transition-opacity duration-200">DEEP DIVE →</span>
              )}
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-1 tabular-nums">
            {stat.value}
          </p>
          <p className="text-sm text-zinc-400 font-medium">{stat.label}</p>
        </div>
      </Tag>
    </motion.div>
  );
}

/* ─── Accordion Item ──────────────────────────────────────────── */
function AccordionItem({
  section,
  isOpen,
  onToggle,
  index,
}: {
  section: AccordionSection;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl overflow-hidden transition-colors duration-300"
      style={{
        background: isOpen ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.02)",
        border: `1px solid ${isOpen ? "rgba(255, 90, 31, 0.2)" : "rgba(255, 255, 255, 0.07)"}`,
        backdropFilter: "blur(12px)",
      }}
    >
      <button
        id={`accordion-${section.id}`}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${section.id}`}
        className="w-full flex items-center justify-between gap-4 px-6 sm:px-7 py-5 text-left transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 focus-visible:ring-inset rounded-2xl"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-lg shrink-0" aria-hidden="true">{section.icon}</span>
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-100 transition-colors truncate">
            {section.title}
          </h3>
        </div>
        <ChevronIcon open={isOpen} className="w-5 h-5 text-zinc-400 group-hover:text-[#FF5A1F] transition-colors shrink-0" />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-panel-${section.id}`}
            role="region"
            aria-labelledby={`accordion-${section.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-7 pb-6 pt-0">
              <div className="border-t border-white/5 pt-5">
                {section.content}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Tech Badge ──────────────────────────────────────────────── */
function Badge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-zinc-200 transition-all duration-200 hover:border-orange-500/40 hover:text-white hover:bg-white/8"
      style={{
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(8px)",
      }}
    >
      {label}
    </span>
  );
}

/* ─── Bullet Point ────────────────────────────────────────────── */
function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#FF5A1F] shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}


/* ─── GitHub Contribution Graph Mockup ────────────────────────── */
function GitHubContributionGraph() {
  // Generate a realistic contribution heatmap pattern
  const weeks = 52;
  const days = 7;
  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

  // Seeded pseudo-random for deterministic render
  const seed = (n: number) => {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  };

  const getIntensity = (week: number, day: number): number => {
    const val = seed(week * 7 + day + 42);
    if (val < 0.3) return 0;
    if (val < 0.55) return 1;
    if (val < 0.75) return 2;
    if (val < 0.9) return 3;
    return 4;
  };

  const intensityColors = [
    "rgba(255, 255, 255, 0.04)",
    "rgba(255, 90, 31, 0.2)",
    "rgba(255, 90, 31, 0.4)",
    "rgba(255, 90, 31, 0.65)",
    "rgba(255, 90, 31, 0.9)",
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[700px]">
        {/* Month labels */}
        <div className="flex mb-1.5 pl-8">
          {monthLabels.map((month, i) => (
            <span
              key={month}
              className="text-[10px] font-mono text-zinc-500"
              style={{ width: `${100 / monthLabels.length}%` }}
            >
              {month}
            </span>
          ))}
        </div>

        <div className="flex gap-0">
          {/* Day labels */}
          <div className="flex flex-col gap-[3px] mr-2 shrink-0">
            {dayLabels.map((label, i) => (
              <span key={i} className="text-[10px] font-mono text-zinc-500 h-[13px] leading-[13px]">
                {label}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-[3px] flex-1">
            {Array.from({ length: weeks }).map((_, week) => (
              <div key={week} className="flex flex-col gap-[3px]">
                {Array.from({ length: days }).map((_, day) => {
                  const intensity = getIntensity(week, day);
                  return (
                    <div
                      key={day}
                      className="w-[13px] h-[13px] rounded-[2px] transition-colors duration-150"
                      style={{ background: intensityColors[intensity] }}
                      title={`${intensity} contributions`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-3 justify-end">
          <span className="text-[10px] font-mono text-zinc-500">Less</span>
          {intensityColors.map((color, i) => (
            <div
              key={i}
              className="w-[13px] h-[13px] rounded-[2px]"
              style={{ background: color }}
            />
          ))}
          <span className="text-[10px] font-mono text-zinc-500">More</span>
        </div>
      </div>
    </div>
  );
}

/* ─── LeetCode Stats Mockup ────────────────────────────────────── */
function LeetCodeStats() {
  const stats = [
    { label: "Easy", solved: 87, total: 830, color: "#22c55e" },
    { label: "Medium", solved: 54, total: 1740, color: "#f59e0b" },
    { label: "Hard", solved: 12, total: 760, color: "#ef4444" },
  ];
  const totalSolved = stats.reduce((a, s) => a + s.solved, 0);
  const totalProblems = stats.reduce((a, s) => a + s.total, 0);

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
      {/* Circular progress */}
      <div className="relative w-28 h-28 shrink-0">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
          <circle
            cx="60" cy="60" r="50" fill="none" stroke="#FF5A1F" strokeWidth="10"
            strokeDasharray={`${(totalSolved / totalProblems) * 314} 314`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-white">{totalSolved}</span>
          <span className="text-[10px] font-mono text-zinc-500 uppercase">Solved</span>
        </div>
      </div>

      {/* Breakdowns */}
      <div className="flex-1 space-y-4 w-full">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-zinc-300">{s.label}</span>
              <span className="text-xs font-mono text-zinc-500">
                {s.solved} / {s.total}
              </span>
            </div>
            <div className="h-2 w-full rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(s.solved / s.total) * 100}%`,
                  background: s.color,
                  boxShadow: `0 0 10px ${s.color}50`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   ACCORDION SECTION DATA
   ═══════════════════════════════════════════════════════════════ */
function buildAccordionSections(onOpenDeepDive: (id: string) => void): AccordionSection[] {
  return [
    {
      id: "professional-summary",
      title: "Professional Summary",
      icon: "📋",
      content: (
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
          Focused on engineering <strong className="text-white font-semibold">efficient AI systems</strong>, optimizing{" "}
          <strong className="text-white font-semibold">latency</strong>,{" "}
          <strong className="text-white font-semibold">token budgets</strong>,{" "}
          <strong className="text-white font-semibold">model-routing architectures</strong>, and{" "}
          <strong className="text-white font-semibold">scalable inference infrastructure</strong>.
        </p>
      ),
    },
    {
      id: "education",
      title: "Education",
      icon: "🎓",
      content: (
        <div>
          <h4 className="text-base sm:text-lg font-bold text-white mb-1">RV University</h4>
          <p className="text-sm sm:text-base text-zinc-300 mb-3">
            <strong className="text-white font-semibold">B.Tech (Hons.)</strong> in Computer Science and Engineering
          </p>
          <ul className="space-y-2">
            <Bullet>
              Specialization in <strong className="text-white font-semibold">Artificial Intelligence and Machine Learning</strong>
            </Bullet>
            <Bullet>
              Minor in <strong className="text-white font-semibold">Financial Economics</strong>
            </Bullet>
          </ul>
        </div>
      ),
    },
    {
      id: "experience",
      title: "Experience",
      icon: "💼",
      content: (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">GenAI Academic Intern</h4>
              <p className="text-sm text-zinc-400 font-mono mt-0.5">Persistent Systems</p>
            </div>
            <span
              className="text-xs font-mono px-2.5 py-1 rounded-full border"
              style={{
                color: "#FF5A1F",
                background: "rgba(255, 90, 31, 0.08)",
                borderColor: "rgba(255, 90, 31, 0.3)",
              }}
            >
              Aug 2026 — Present
            </span>
          </div>
          <ul className="space-y-3">
            <Bullet>
              Engineered <strong className="text-white font-semibold">automated LLM benchmarking and evaluation pipelines</strong> to optimize response latency and token consumption across enterprise use cases.
            </Bullet>
            <Bullet>
              Implemented <strong className="text-white font-semibold">multi-agent reasoning prototypes</strong> with fallback mechanisms to maintain <strong className="text-white font-semibold">99.5% system availability</strong> across strict API rate limits.
            </Bullet>
          </ul>
        </div>
      ),
    },
    {
      id: "technical-capabilities",
      title: "Technical Capabilities",
      icon: "⚙️",
      content: (
        <div className="space-y-5">
          {TECH_SKILLS.map((group) => (
            <div key={group.category}>
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2.5">{group.category}</p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge key={skill} label={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "projects",
      title: "Projects",
      icon: "🚀",
      content: (
        <ProjectsAccordionContent onDeepDive={onOpenDeepDive} />
      ),
    },
    {
      id: "awards",
      title: "Awards & Achievements",
      icon: "🏆",
      content: (
        <AwardsAccordionContent onDeepDive={onOpenDeepDive} />
      ),
    },
    {
      id: "live-coding",
      title: "Live Coding Activity",
      icon: "📊",
      content: (
        <div className="space-y-8">
          {/* GitHub Contributions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GithubIcon className="w-4 h-4 text-zinc-400" />
                <h4 className="text-sm font-bold text-white">GitHub Contributions</h4>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                <span>384 contributions in 2026</span>
              </div>
            </div>
            <div
              className="rounded-xl p-4 sm:p-5"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <GitHubContributionGraph />
            </div>
          </div>

          {/* LeetCode Stats */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-base" aria-hidden="true">⚡</span>
              <h4 className="text-sm font-bold text-white">LeetCode Stats</h4>
            </div>
            <div
              className="rounded-xl p-5 sm:p-6"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <LeetCodeStats />
            </div>
          </div>
        </div>
      ),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   CLICKABLE PROJECT CARDS (inside accordion)
   ═══════════════════════════════════════════════════════════════ */
function ProjectCard({
  id,
  title,
  date,
  links,
  bullets,
  onDeepDive,
}: {
  id: string;
  title: string;
  date: string;
  links: { label: string; href: string; icon: React.FC<{ className?: string }> }[];
  bullets: React.ReactNode[];
  onDeepDive: (id: string) => void;
}) {
  return (
    <motion.div
      layoutId={`deep-dive-card-${id}`}
      className="group rounded-xl p-5 sm:p-6 cursor-pointer transition-all duration-300 hover:border-orange-500/25"
      style={{
        background: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
      }}
      onClick={() => onDeepDive(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onDeepDive(id); } }}
      aria-label={`Deep dive into ${title}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-100 transition-colors">{title}</h4>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">{date}</p>
        </div>
        <div className="flex items-center gap-3">
          {links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <span
                key={link.label}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FF5A1F]"
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </span>
            );
          })}
          <span className="text-[10px] font-mono text-zinc-600 group-hover:text-[#FF5A1F] transition-colors uppercase">
            Deep Dive →
          </span>
        </div>
      </div>
      <ul className="space-y-3">
        {bullets.map((bullet, i) => (
          <Bullet key={i}>{bullet}</Bullet>
        ))}
      </ul>
    </motion.div>
  );
}

function ProjectsAccordionContent({ onDeepDive }: { onDeepDive: (id: string) => void }) {
  return (
    <div className="space-y-4">
      <ProjectCard
        id="ai-graveyard"
        title="The AI Graveyard — Startup Idea Evaluator"
        date="July 2026"
        links={[{ label: "GitHub", href: "#", icon: GithubIcon }]}
        onDeepDive={onDeepDive}
        bullets={[
          <>
            Designed a <strong className="text-white font-semibold">multi-agent collaboration system</strong> where a boardroom of <strong className="text-white font-semibold">8 autonomous agents</strong> debate, challenge assumptions, and conduct quantitative viability assessments.
          </>,
          <>
            Architected a <strong className="text-white font-semibold">cyclic DAG execution framework</strong> with dynamic agent selection and shared state evidence to prevent persona redundancy and hallucinations.
          </>,
          <>
            Implemented <strong className="text-white font-semibold">Kahn&apos;s algorithm</strong> for deterministic agent conflict resolution alongside a weighted confidence scoring model.
          </>,
          <>
            Engineered a <strong className="text-white font-semibold">hybrid LLM-routing engine</strong> for adaptive reasoning depth and automated fallbacks across rate-limited endpoints.
          </>,
        ]}
      />

      <ProjectCard
        id="curious-fox"
        title="The Curious Fox — Adaptive AI Learning Ecosystem"
        date="Jan 2026 — Present"
        links={[
          { label: "GitHub", href: "#", icon: GithubIcon },
          { label: "Live Demo", href: "#", icon: ExternalLinkIcon },
        ]}
        onDeepDive={onDeepDive}
        bullets={[
          <>
            Built an <strong className="text-white font-semibold">adaptive learning platform</strong> categorizing student cognitive archetypes using the <strong className="text-white font-semibold">Felder-Silverman model</strong> and <strong className="text-white font-semibold">Bloom&apos;s Taxonomy</strong> for personalized path generation.
          </>,
          <>
            Architected a <strong className="text-white font-semibold">dual-agent ecosystem</strong>: &ldquo;Dr. Fox&rdquo; (RAG-based tutor for source-cited Q&amp;A) and &ldquo;Baby Fox&rdquo; (inverted-role agent prompting users to teach via the <strong className="text-white font-semibold">Feynman Technique</strong>).
          </>,
          <>
            Deployed a <strong className="text-white font-semibold">high-performance RAG pipeline</strong> on FastAPI, Cohere, and Qdrant, reaching <strong className="text-white font-semibold">100% context precision</strong>, <strong className="text-white font-semibold">95% faithfulness</strong>, and a <strong className="text-white font-semibold">P95 latency of 1.58s</strong>.
          </>,
        ]}
      />
    </div>
  );
}

function AwardsAccordionContent({ onDeepDive }: { onDeepDive: (id: string) => void }) {
  return (
    <ul className="space-y-3">
      <Bullet>
        <button
          onClick={() => onDeepDive("grant-winner")}
          className="text-left hover:text-[#FF5A1F] transition-colors group/award inline"
          aria-label="Deep dive into Grant Winner"
        >
          <strong className="text-white font-semibold group-hover/award:text-[#FF5A1F] transition-colors">5× National Hackathon Finalist</strong> &amp; <strong className="text-white font-semibold group-hover/award:text-[#FF5A1F] transition-colors">₹125,000 Total Grant Winner 2026</strong>
          <span className="text-[10px] font-mono text-zinc-600 group-hover/award:text-[#FF5A1F] ml-2 transition-colors">DEEP DIVE →</span>
        </button>
      </Bullet>
      <Bullet>
        Presented <strong className="text-white font-semibold">RL based Network Packet Fragmentation and Optimization</strong> | Mi-IRICT, MAHSA University, Malaysia (Nov 2025)
      </Bullet>
      <Bullet>
        Ranked <strong className="text-white font-semibold">Top 8% Worldwide</strong> (70,000+ Competitors) | International Quant Challenge, WorldQuant (May 2025)
      </Bullet>
      <Bullet>
        <strong className="text-white font-semibold">Top 15 of 1,253 Teams</strong>, Special Mention | WitchHunt Hackathon 2026, Hopeworks Foundation (June 2026)
      </Bullet>
      <Bullet>
        <strong className="text-white font-semibold">Runner-Up (Top 6 of 277 Teams)</strong> | EduAIThon 2026, GITAM University (Jan 2026)
      </Bullet>
      <Bullet>
        <strong className="text-white font-semibold">Top 2 of 25 Teams</strong>, Outstanding Project | SuprMentr × NASSCOM Experiential Internship (Oct 2025)
      </Bullet>
      <Bullet>
        Nominated as <strong className="text-white font-semibold">Top Teams by RV University</strong> for Smart India Hackathon × 2 years | RVU SIH Internal Hackathon 2025, 2026
      </Bullet>
    </ul>
  );
}


/* ═══════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function ResumePage() {
  const [activeDeepDive, setActiveDeepDive] = useState<DeepDiveData | null>(null);

  const onOpenDeepDive = (id: string) => {
    const data = DEEP_DIVES[id];
    if (data) setActiveDeepDive(data);
  };

  const sections = buildAccordionSections(onOpenDeepDive);
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(["professional-summary"])
  );

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const allOpen = openSections.size === sections.length;
  const toggleAll = () => {
    if (allOpen) {
      setOpenSections(new Set());
    } else {
      setOpenSections(new Set(sections.map((s) => s.id)));
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Ambient page glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-20 blur-[200px]"
        style={{ background: "radial-gradient(ellipse, rgba(255, 90, 31, 0.3), transparent 70%)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-16 lg:py-20">
        {/* ═══ Page Header ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF5A1F] mb-3 block">
                Curriculum Vitae
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05]">
                Resume <span className="text-zinc-500">&</span> Experience
              </h1>
            </div>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            A systems-first engineer building intelligent interfaces — from multi-agent pipelines to sub-second RAG deployments.
          </p>
        </motion.div>


        {/* ═══ Bento Grid Stats ═══ */}
        <section aria-label="Key metrics" className="mb-14 sm:mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENTO_STATS.map((stat, i) => (
              <BentoCard key={stat.label} stat={stat} index={i} onDeepDive={onOpenDeepDive} />
            ))}
          </div>
        </section>


        {/* ═══ Accordion Resume ═══ */}
        <section aria-label="Resume details">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-white">Details</h2>
            <Magnetic strength={0.25}>
              <button
                onClick={toggleAll}
                className="text-xs font-mono text-zinc-500 hover:text-[#FF5A1F] transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 cursor-pointer"
                aria-label={allOpen ? "Collapse all sections" : "Expand all sections"}
              >
                {allOpen ? "Collapse All" : "Expand All"}
              </button>
            </Magnetic>
          </div>

          <div className="space-y-3">
            {sections.map((section, i) => (
              <AccordionItem
                key={section.id}
                section={section}
                isOpen={openSections.has(section.id)}
                onToggle={() => toggleSection(section.id)}
                index={i}
              />
            ))}
          </div>
        </section>


        {/* ═══ Bottom Download CTA ═══ */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          aria-label="Download resume"
          className="mt-16 sm:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Magnetic strength={0.3}>
            <a
              href="/resume.pdf"
              download="Krishank_D_Boswan_Resume.pdf"
              id="download-resume-bottom"
              className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-base text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, rgba(255, 90, 31, 0.9) 0%, rgba(255, 60, 0, 1) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 32px rgba(255, 90, 31, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)",
                backdropFilter: "blur(12px)",
              }}
              aria-label="Download resume as PDF"
            >
              <DownloadIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" />
              <span>Download Resume</span>
            </a>
          </Magnetic>

          <span className="text-xs font-mono text-zinc-600 uppercase tracking-wider">PDF • Updated Oct 2026</span>
        </motion.section>

        {/* Bottom spacer */}
        <div className="h-12" aria-hidden="true" />
      </div>

      {/* ═══ Deep Dive Modal ═══ */}
      <DeepDiveModal
        data={activeDeepDive}
        onClose={() => setActiveDeepDive(null)}
      />
    </div>
  );
}
