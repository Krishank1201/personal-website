export default function ConnectPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-16 sm:py-24">
      <span className="text-xs font-mono uppercase tracking-widest text-[#FF5A1F]">Get in Touch</span>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-2 mb-6">Let&apos;s Connect</h1>
      <p className="text-neutral-300 text-lg max-w-xl mb-10">
        Open for collaborations, GenAI research discussions, and engineering challenges.
      </p>
      <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md max-w-md">
        <p className="text-sm text-neutral-400 font-mono mb-2">Direct Inquiries</p>
        <a
          href="mailto:contact@krishank.dev"
          className="text-xl font-semibold text-white hover:text-[#FF5A1F] transition-colors"
        >
          contact@krishank.dev
        </a>
      </div>
    </div>
  );
}
