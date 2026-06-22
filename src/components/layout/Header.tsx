"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { cn, smoothScrollTo } from "@/lib/utils";

type NavLink = { label: string; href: string; route?: boolean };

const navLinks: NavLink[] = [
  { label: "How I Work", href: "#how-i-work" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Résumé", href: "/resume", route: true },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Lazy-init from DOM so the server-rendered markup and the first client
  // render agree (the inline script in layout.tsx sets .dark pre-paint).
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDark = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  }, []);

  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false);
    smoothScrollTo(href);
  }, []);

  // At the top the header is transparent over the always-dark hero, so its text
  // must be light regardless of theme. Once scrolled, the header gets a surface
  // background and reverts to the theme's text colors.
  const overHero = !scrolled;
  const navLinkClass = cn(
    "px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer hover:text-[var(--accent)]",
    overHero
      ? "text-[rgba(250,247,242,0.85)] hover:bg-white/10"
      : "text-[var(--text-secondary)] hover:bg-[var(--bg-alt)]"
  );
  const iconBtnClass = cn(
    "w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:text-[var(--accent)]",
    overHero
      ? "text-[rgba(250,247,242,0.85)] hover:bg-white/10"
      : "text-[var(--text-secondary)] hover:bg-[var(--bg-alt)]"
  );

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          width: progressWidth,
          background: "linear-gradient(90deg, var(--accent), var(--gold))",
        }}
      />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)] shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container-wide flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
              if (lenis) lenis.scrollTo(0);
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white font-bold text-sm font-display transition-transform group-hover:scale-110">
              BD
            </div>
            <span className={cn("font-display font-semibold hidden sm:block transition-colors", overHero ? "text-[#FAF7F2]" : "text-[var(--text-primary)]")}>
              Bret DuBois
            </span>
          </motion.a>

          {/* Desktop nav */}
          <motion.nav
            className="hidden md:flex items-center gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {navLinks.map((link) =>
              link.route ? (
                <a
                  key={link.href}
                  href={link.href}
                  className={navLinkClass}
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={navLinkClass}
                >
                  {link.label}
                </button>
              )
            )}
          </motion.nav>

          {/* Right: dark mode + contact CTA + mobile menu */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <button
              onClick={toggleDark}
              className={iconBtnClass}
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={() => scrollTo("#contact")}
              className="btn-primary hidden md:inline-flex text-sm py-2 px-4"
            >
              Get in Touch
            </button>

            <button
              className={cn("md:hidden", iconBtnClass)}
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--border)]"
            >
              <div className="container-wide py-4 flex flex-col gap-1">
                {navLinks.map((link, i) =>
                  link.route ? (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-left px-4 py-3 text-[var(--text-primary)] font-medium rounded-lg hover:bg-[var(--bg-alt)] hover:text-[var(--accent)] transition-all cursor-pointer"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {link.label}
                    </motion.a>
                  ) : (
                    <motion.button
                      key={link.href}
                      onClick={() => scrollTo(link.href)}
                      className="text-left px-4 py-3 text-[var(--text-primary)] font-medium rounded-lg hover:bg-[var(--bg-alt)] hover:text-[var(--accent)] transition-all cursor-pointer"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {link.label}
                    </motion.button>
                  )
                )}
                <button
                  onClick={() => scrollTo("#contact")}
                  className="btn-primary mt-2 justify-center text-sm"
                >
                  Get in Touch
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
