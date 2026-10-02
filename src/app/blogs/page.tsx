"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "@/data/posts";

export default function BlogsPage() {
  return (
    <div className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle ambient light */}
      <div
        className="absolute top-20 right-1/4 w-96 h-96 bg-[#FF5A1F]/10 blur-[130px] pointer-events-none rounded-full"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 left-1/4 w-96 h-96 bg-[#FF5A1F]/5 blur-[150px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md bg-white/5 border border-white/10 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">
              Articles & Perspectives
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight"
          >
            Engineered Thoughts &{" "}
            <span className="gradient-text">Deep Dives.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-zinc-400 text-base sm:text-lg mt-4 leading-relaxed"
          >
            Technical post-mortems, real-time GenAI ergonomics, and statistical modeling
            insights straight from the workbench.
          </motion.p>
        </div>

        {/* Editorial Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.1 * index,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              className="h-full"
            >
              <Link
                href={`/blogs/${post.slug}`}
                className="group relative flex flex-col justify-between h-full backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/30 rounded-2xl p-6 sm:p-7 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#FF5A1F]/10 block"
              >
                {/* Subtle corner glow on hover */}
                <div
                  className="absolute -bottom-12 -right-12 w-36 h-36 bg-[#FF5A1F]/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  aria-hidden="true"
                />

                <div>
                  {/* Category and Read Time */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-medium text-[#FF5A1F] bg-[#FF5A1F]/10 border border-[#FF5A1F]/20">
                      {post.tags[0]}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#FF5A1F] transition-colors duration-200 tracking-tight leading-snug">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-zinc-400 text-sm leading-relaxed mt-3.5 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer Metadata & CTA */}
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <time className="text-xs font-mono text-zinc-400">
                    {post.date}
                  </time>

                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#FF5A1F] group-hover:translate-x-1 transition-transform duration-200">
                    <span>Read Article</span>
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
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
