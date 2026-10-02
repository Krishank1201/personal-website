export default function BlogsPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-16 sm:py-24">
      <span className="text-xs font-mono uppercase tracking-widest text-[#FF5A1F]">Articles & Thinking</span>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-2 mb-10">Read Journey</h1>
      <div className="grid gap-6">
        <article className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-orange-500/40 transition-colors">
          <time className="text-xs font-mono text-neutral-400">October 2026</time>
          <h2 className="text-2xl font-bold text-white mt-2">Scaling Generative AI Interfaces: Speed, State, and Latency</h2>
          <p className="text-neutral-300 mt-3 text-sm leading-relaxed">
            Exploring architectural patterns for streaming LLM responses, optimizing client-side token rendering, and building resilient user experiences.
          </p>
        </article>
      </div>
    </div>
  );
}
