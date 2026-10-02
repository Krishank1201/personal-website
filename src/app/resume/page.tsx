import Link from "next/link";

export default function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-16 sm:py-24">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF5A1F]">Curriculum Vitae</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-2">Resume & Experience</h1>
        </div>
        <a
          href="/resume.pdf"
          download="Krishank_Resume.pdf"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white"
          style={{ background: "var(--accent)" }}
        >
          Download PDF
        </a>
      </div>

      <div className="space-y-8">
        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-bold text-white">GenAI Intern</h2>
            <span className="text-xs font-mono text-[#FF5A1F] px-2.5 py-1 rounded-full border border-orange-500/30 bg-orange-500/10">
              Current
            </span>
          </div>
          <p className="text-sm text-neutral-400 mt-1 font-mono">Persistent Systems</p>
          <p className="text-neutral-300 mt-4 leading-relaxed text-sm">
            Researching and deploying high-performance generative AI pipelines, LLM agent orchestrations, and interactive interfaces.
          </p>
        </div>
      </div>
    </div>
  );
}
