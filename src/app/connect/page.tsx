"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "@/components/MagneticButton";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ConnectPage() {
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Mock network submission with 1s delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Contact form submission:", data);
    setIsSubmitted(true);
    reset();
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("krshankdboswan@gmail.com");
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <div className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden flex flex-col justify-center">
      {/* Background ambient light */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF5A1F]/10 blur-[140px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-2xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md bg-white/5 border border-white/10 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">
              Get In Touch
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight"
          >
            Let&apos;s build{" "}
            <span className="gradient-text">something together.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-zinc-400 text-base sm:text-lg mt-4 max-w-lg mx-auto leading-relaxed"
          >
            Open to research collaborations, internships, and interesting problems.
          </motion.p>
        </div>

        {/* Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                noValidate
              >
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                  >
                    Name <span className="text-[#FF5A1F]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Ada Lovelace"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    className={`w-full backdrop-blur-md bg-white/5 border ${
                      errors.name ? "border-red-500/80" : "border-white/10"
                    } rounded-xl px-4 py-3.5 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FF5A1F] focus:ring-1 focus:ring-[#FF5A1F] transition-all`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-400 font-mono">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                  >
                    Email <span className="text-[#FF5A1F]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="ada@computing.org"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className={`w-full backdrop-blur-md bg-white/5 border ${
                      errors.email ? "border-red-500/80" : "border-white/10"
                    } rounded-xl px-4 py-3.5 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FF5A1F] focus:ring-1 focus:ring-[#FF5A1F] transition-all`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400 font-mono">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                  >
                    Message <span className="text-[#FF5A1F]">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell me about your project, idea, or challenge..."
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                    })}
                    className={`w-full backdrop-blur-md bg-white/5 border ${
                      errors.message ? "border-red-500/80" : "border-white/10"
                    } rounded-xl px-4 py-3.5 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FF5A1F] focus:ring-1 focus:ring-[#FF5A1F] transition-all resize-y min-h-[110px]`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-400 font-mono">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Magnetic strength={0.25} className="w-full">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#FF5A1F] text-white font-semibold text-sm tracking-wide shadow-lg shadow-[#FF5A1F]/20 hover:bg-[#ff7038] hover:shadow-[#FF5A1F]/40 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <svg
                            className="w-4 h-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </Magnetic>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="py-10 text-center flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 flex items-center justify-center text-[#FF5A1F] shadow-[0_0_25px_rgba(255,90,31,0.35)]">
                  <svg
                    className="w-8 h-8"
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
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Message sent successfully!
                </h3>
                <p className="text-zinc-400 text-sm max-w-sm">
                  I will get back to you soon. Looking forward to connecting!
                </p>

                <div className="pt-4">
                  <Magnetic strength={0.25}>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-5 py-2.5 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer"
                    >
                      ← Send Another Message
                    </button>
                  </Magnetic>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Email Interaction Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
              Direct Inquiries
            </span>
            <a
              href="mailto:krshankdboswan@gmail.com"
              className="text-base sm:text-lg font-mono font-semibold text-white hover:text-[#FF5A1F] transition-colors break-all"
            >
              krshankdboswan@gmail.com
            </a>
          </div>

          <Magnetic strength={0.3}>
            <button
              onClick={handleCopyEmail}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                isCopied
                  ? "bg-[#FF5A1F]/15 border-[#FF5A1F] text-[#FF5A1F] shadow-[0_0_15px_rgba(255,90,31,0.25)]"
                  : "backdrop-blur-md bg-white/5 border-white/10 text-zinc-300 hover:border-white/25 hover:text-white"
              }`}
              aria-label="Copy email address to clipboard"
            >
              {isCopied ? (
                <>
                  <svg
                    className="w-4 h-4 text-[#FF5A1F]"
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
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                    />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </Magnetic>
        </motion.div>

        {/* Social Icons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-12 text-center"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-5">
            Connect Across Platforms
          </span>

          <div className="flex items-center justify-center gap-4 sm:gap-6">
            {/* LinkedIn */}
            <Magnetic strength={0.35}>
              <a
                href="https://www.linkedin.com/in/krishankdboswan/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all duration-300 hover:scale-110 hover:border-[#FF5A1F]/50 hover:shadow-[0_0_24px_rgba(255,90,31,0.35)]"
              >
                <svg
                  className="w-6 h-6 transition-colors group-hover:text-[#FF5A1F]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </Magnetic>

            {/* GitHub */}
            <Magnetic strength={0.35}>
              <a
                href="https://github.com/Krishank1201"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all duration-300 hover:scale-110 hover:border-[#FF5A1F]/50 hover:shadow-[0_0_24px_rgba(255,90,31,0.35)]"
              >
                <svg
                  className="w-6 h-6 transition-colors group-hover:text-[#FF5A1F]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>
            </Magnetic>

            {/* X (Twitter) */}
            <Magnetic strength={0.35}>
              <a
                href="https://x.com/krishankdboswan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter) Profile"
                className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all duration-300 hover:scale-110 hover:border-[#FF5A1F]/50 hover:shadow-[0_0_24px_rgba(255,90,31,0.35)]"
              >
                <svg
                  className="w-5 h-5 transition-colors group-hover:text-[#FF5A1F]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
