"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BlogPost } from "@/data/posts";
import { Magnetic } from "@/components/MagneticButton";

interface BlogPostClientProps {
  post: BlogPost;
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  const { scrollYProgress } = useScroll();
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden pb-24">
      {/* ─── Reading Progress Bar ───────────────────────────────── */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-[#FF5A1F] origin-left z-50 shadow-[0_0_12px_rgba(255,90,31,0.8)]"
        aria-hidden="true"
      />

      {/* Ambient background glow */}
      <div
        className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#FF5A1F]/10 blur-[150px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 relative z-10">
        {/* ─── Back Button ────────────────────────────────────────── */}
        <div className="mb-8">
          <Magnetic strength={0.3}>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/25 text-xs font-mono text-zinc-300 hover:text-white transition-all group shadow-sm"
            >
              {/* ChevronLeft Icon */}
              <svg
                className="w-4 h-4 text-zinc-400 group-hover:text-[#FF5A1F] group-hover:-translate-x-1 transition-all"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Back to Blogs</span>
            </Link>
          </Magnetic>
        </div>

        {/* ─── Article Header ─────────────────────────────────────── */}
        <header className="mb-10 sm:mb-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-mono font-medium text-[#FF5A1F] bg-[#FF5A1F]/10 border border-[#FF5A1F]/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-6">
            {post.title}
          </h1>

          {/* Metadata banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-5 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FF5A1F]/20 border border-[#FF5A1F]/30 flex items-center justify-center text-white font-bold text-xs">
                KB
              </div>
              <div>
                <p className="text-white font-sans font-medium text-sm leading-tight">
                  Krishank D Boswan
                </p>
                <p className="text-zinc-500 text-xs">GenAI Intern & Researcher</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* ─── Markdown Content ───────────────────────────────────── */}
        <article className="backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl">
          <div className="prose prose-invert prose-zinc max-w-none prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#FF5A1F] prose-a:no-underline hover:prose-a:underline prose-code:text-[#FF5A1F] prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-white/10 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-zinc-950/80 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-blockquote:border-l-4 prose-blockquote:border-[#FF5A1F] prose-blockquote:bg-white/[0.02] prose-blockquote:rounded-r-xl prose-blockquote:text-zinc-300 prose-blockquote:not-italic prose-li:text-zinc-300 prose-p:text-zinc-300 prose-p:leading-relaxed text-base">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* ─── Article Footer ─────────────────────────────────────── */}
        <footer className="mt-12 space-y-8">
          {/* Action bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
            <div>
              <h4 className="text-white font-semibold text-sm">
                Enjoyed this deep dive?
              </h4>
              <p className="text-zinc-400 text-xs mt-0.5">
                Share this article or reach out to discuss the implementation.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Magnetic strength={0.25}>
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <svg
                        className="w-3.5 h-3.5 text-[#FF5A1F]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-[#FF5A1F]">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                      <span>Share Article</span>
                    </>
                  )}
                </button>
              </Magnetic>

              <Magnetic strength={0.25}>
                <Link
                  href="/connect"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF5A1F] text-white text-xs font-mono font-medium hover:bg-[#ff7038] transition-all"
                >
                  <span>Connect</span>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* Bottom Back Button */}
          <div className="text-center pt-4">
            <Magnetic strength={0.3}>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group"
              >
                <svg
                  className="w-4 h-4 text-zinc-500 group-hover:text-[#FF5A1F] group-hover:-translate-x-1 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>Return to all articles</span>
              </Link>
            </Magnetic>
          </div>
        </footer>
      </div>
    </div>
  );
}
