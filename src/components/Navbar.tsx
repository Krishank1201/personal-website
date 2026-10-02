"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ─── Types ──────────────────────────────────────────────────── */
interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Resume",  href: "/resume"  },
  { label: "Connect", href: "/connect" },
  { label: "Blogs",   href: "/blogs"   },
];

/* ─── Download Icon ──────────────────────────────────────────── */
function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
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

/* ─── Hamburger Icon ─────────────────────────────────────────── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <motion.line
        x1="3" y1="6"  x2="19" y2="6"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
        animate={open ? { x1: 3, y1: 3, x2: 19, y2: 19 } : { x1: 3, y1: 6, x2: 19, y2: 6 }}
        transition={{ duration: 0.25 }}
      />
      <motion.line
        x1="3" y1="11" x2="19" y2="11"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.line
        x1="3" y1="16" x2="19" y2="16"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
        animate={open ? { x1: 3, y1: 19, x2: 19, y2: 3 } : { x1: 3, y1: 16, x2: 19, y2: 16 }}
        transition={{ duration: 0.25 }}
      />
    </svg>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────── */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  /* Blur/opacity transitions based on scroll */
  const bgOpacity = useTransform(scrollY, [0, 60], [0, 1]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => {
      setIsScrolled(v > 10);
    });
    return unsubscribe;
  }, [scrollY]);

  /* Close mobile menu on resize */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* ── Sticky Nav Bar ── */}
      <motion.header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50"
        style={{ height: "var(--nav-height)" }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Glass background layer — fades in on scroll */}
        <motion.div
          className="absolute inset-0 glass"
          style={{ opacity: bgOpacity }}
          aria-hidden="true"
        />

        {/* Always-visible subtle bottom line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "var(--glass-border)" }}
          aria-hidden="true"
        />

        {/* Content */}
        <nav
          className="relative h-full max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between"
          aria-label="Primary navigation"
        >
          {/* ── Logo / Brand ── */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus-visible:outline-none"
            aria-label="Home"
          >
            <motion.div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--accent)" }}
              whileHover={{ scale: 1.08, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              K
            </motion.div>
            <span className="font-semibold text-sm tracking-tight hidden sm:block text-white/90 group-hover:text-white transition-colors">
              krish<span className="gradient-text">.dev</span>
            </span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <ul
            className="hidden md:flex items-center gap-1"
            role="list"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  className="nav-link px-3 py-1.5 text-sm font-medium rounded-md hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-3">
            {/* Download Resume CTA */}
            <motion.a
              href="/resume.pdf"
              download="Krish_Resume.pdf"
              id="download-resume-btn"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/70"
              style={{
                background: "var(--accent)",
                color: "#fff",
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 22px rgba(255,90,31,0.5)",
              }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Download Resume PDF"
            >
              <DownloadIcon className="w-4 h-4 shrink-0" />
              <span>Download Resume</span>
            </motion.a>

            {/* Mobile Hamburger */}
            <motion.button
              id="mobile-menu-toggle"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/80 hover:text-white hover:bg-white/8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              whileTap={{ scale: 0.93 }}
            >
              <HamburgerIcon open={mobileOpen} />
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Dropdown Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="fixed top-[var(--nav-height)] left-0 right-0 z-40 glass border-t-0 md:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <nav className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/6 rounded-lg transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Download button */}
              <div className="pt-2 mt-1 border-t border-white/8">
                <a
                  href="/resume.pdf"
                  download="Krish_Resume.pdf"
                  id="mobile-download-resume-btn"
                  className="flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg transition-colors"
                  style={{ background: "var(--accent)", color: "#fff" }}
                  onClick={() => setMobileOpen(false)}
                  aria-label="Download Resume PDF"
                >
                  <DownloadIcon className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-30 md:hidden"
            style={{ background: "rgba(0,0,0,0.4)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Top spacer so content sits below the fixed navbar */}
      <div style={{ height: "var(--nav-height)" }} aria-hidden="true" />
    </>
  );
}
