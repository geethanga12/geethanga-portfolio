'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa';
import { NAV_LINKS } from '../../data/navigation';
import { useTheme } from '../ThemeProvider';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname() || '/';
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // ── Scroll detection ──────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Close menu on route change ────────────────────────────
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // ── Body scroll lock ──────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // ── Auto-focus first menu item when opened ────────────────
  useEffect(() => {
    if (menuOpen && menuRef.current) {
      const first = menuRef.current.querySelector<HTMLElement>('a[href], button');
      first?.focus();
    }
  }, [menuOpen]);

  // ── Close and return focus to trigger ────────────────────
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setTimeout(() => menuButtonRef.current?.focus(), 100);
  }, []);

  // ── Focus trap + Escape key inside mobile menu ────────────
  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') { closeMenu(); return; }
      if (e.key !== 'Tab' || !menuRef.current) return;

      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href]:not([disabled]), button:not([disabled])',
        ),
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [closeMenu],
  );

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          Fixed header — floating contained card
      ═══════════════════════════════════════════════════════ */}
      <header
        className="fixed inset-x-0 top-0 z-50 px-[clamp(1.25rem,4vw,2rem)] pt-3 sm:pt-4"
        role="banner"
      >
        <div className="nav-frame">
          <div
            className={[
              'relative flex h-16 items-center gap-3 rounded-2xl px-3 sm:px-4 lg:px-5',
              'border border-[var(--nav-border)] bg-[var(--nav-pill-bg)] backdrop-blur-xl',
              'transition-[box-shadow] duration-300 ease-out',
              scrolled ? 'shadow-lg' : 'shadow-md',
            ].join(' ')}
          >
            {/* ── Logo ───────────────────────────────────────────── */}
            <Link
              href="/"
              className="group flex flex-shrink-0 items-center gap-2.5 rounded-lg py-1 focus-ring"
              aria-label="Geethanga Dissanayake — Home"
            >
              <span className="accent-bar flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl shadow-[0_2px_8px_rgba(99,102,241,0.45)]">
                <span className="select-none text-[15px] font-extrabold leading-none tracking-tight text-white">
                  GD
                </span>
              </span>
              <span className="hidden flex-col leading-none sm:flex">
                <span className="text-[14px] font-bold text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
                  Geethanga
                </span>
                <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  Full Stack Dev
                </span>
              </span>
            </Link>

            {/* ── Center nav pill — desktop only ─────────────────── */}
            <nav
              className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full
                         border border-[var(--border)] bg-[var(--surface)]/80 px-2 py-1.5 backdrop-blur-sm lg:flex"
              aria-label="Primary navigation"
            >
              {NAV_LINKS.map((link) => {
                const isActive = link.path === '/' ? pathname === '/' : pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={[
                      'rounded-full px-4 py-[7px] text-[14px] font-medium leading-none',
                      'transition-all duration-150 focus-ring',
                      isActive
                        ? 'bg-[var(--accent-subtle)] text-[var(--accent)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--surface-raised)] hover:text-[var(--text)]',
                    ].join(' ')}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right: Controls ────────────────────────────────── */}
            <div className="ml-auto flex items-center gap-2">
              {/* Desktop controls */}
              <div className="hidden items-center gap-1.5 lg:flex">
                <a
                  href="https://github.com/geethanga12"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)]
                             transition-all hover:bg-[var(--surface)] hover:text-[var(--text)] focus-ring"
                >
                  <FaGithub size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/geethanga-dissanayake/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)]
                             transition-all hover:bg-[var(--surface)] hover:text-[var(--text)] focus-ring"
                >
                  <FaLinkedin size={16} />
                </a>

                {/* Theme toggle — boxed to match reference */}
                <button
                  onClick={toggleDarkMode}
                  aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                  className="ml-1 flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg
                             border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)]
                             transition-all hover:border-[var(--border-strong)] hover:text-[var(--text)] focus-ring"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={darkMode ? 'sun' : 'moon'}
                      initial={{ y: 6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -6, opacity: 0 }}
                      transition={{ duration: 0.14, ease: 'easeInOut' }}
                      className="flex items-center justify-center"
                    >
                      {darkMode
                        ? <FaSun size={14} className="text-amber-400" />
                        : <FaMoon size={14} className="text-indigo-400" />}
                    </motion.span>
                  </AnimatePresence>
                </button>

                <Link
                  href="/contact"
                  className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-5 py-[9px]
                             text-[14px] font-semibold leading-none text-white shadow-[0_2px_8px_rgba(99,102,241,0.45)]
                             transition-colors hover:bg-[var(--accent-hover)] focus-ring"
                >
                  Get in touch
                  <span aria-hidden="true" className="text-[15px]">→</span>
                </Link>
              </div>

              {/* Mobile controls */}
              <div className="flex items-center gap-1.5 lg:hidden">
                <button
                  onClick={toggleDarkMode}
                  aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                  className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg
                             border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)]
                             transition-all hover:text-[var(--text)] focus-ring"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={darkMode ? 'sun-m' : 'moon-m'}
                      initial={{ y: 6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -6, opacity: 0 }}
                      transition={{ duration: 0.14 }}
                      className="flex items-center justify-center"
                    >
                      {darkMode
                        ? <FaSun size={14} className="text-amber-400" />
                        : <FaMoon size={14} className="text-indigo-400" />}
                    </motion.span>
                  </AnimatePresence>
                </button>

                <button
                  ref={menuButtonRef}
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                  className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg
                             border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]
                             transition-all hover:text-[var(--text)] focus-ring"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={menuOpen ? 'close' : 'open'}
                      initial={{ rotate: 45, opacity: 0, scale: 0.7 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -45, opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.14 }}
                      className="flex items-center justify-center"
                    >
                      {menuOpen ? <FaTimes size={15} /> : <FaBars size={15} />}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════
          Mobile menu — dropdown panel just below floating header
      ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Scrim */}
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
              aria-hidden="true"
              onClick={closeMenu}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              ref={menuRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              onKeyDown={handleMenuKeyDown}
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 420, damping: 34, mass: 0.75 }}
              style={{ transformOrigin: 'top center' }}
              className="fixed left-4 right-4 top-[5.25rem] z-50 overflow-hidden rounded-2xl
                         border border-[var(--border)] bg-[var(--bg)] shadow-[var(--shadow-xl)] lg:hidden"
            >
              {/* Nav links */}
              <nav className="flex flex-col gap-0.5 p-2" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => {
                  const isActive = link.path === '/' ? pathname === '/' : pathname.startsWith(link.path);
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={[
                        'flex items-center rounded-xl px-4 py-3 text-[15px] font-medium',
                        'transition-all duration-150 focus-ring',
                        isActive
                          ? 'bg-[var(--accent-subtle)] text-[var(--accent)]'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text)]',
                      ].join(' ')}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Footer row */}
              <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] bg-[var(--menu-footer-bg)] px-4 py-3">
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/geethanga12"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)]
                               bg-[var(--surface)] text-[var(--text-secondary)] transition-all
                               hover:bg-[var(--surface-raised)] hover:text-[var(--text)] focus-ring"
                  >
                    <FaGithub size={15} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/geethanga-dissanayake/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)]
                               bg-[var(--surface)] text-[var(--text-secondary)] transition-all
                               hover:bg-[var(--surface-raised)] hover:text-[var(--text)] focus-ring"
                  >
                    <FaLinkedin size={15} />
                  </a>
                </div>

                <Link
                  href="/contact"
                  className="flex max-w-[160px] flex-1 items-center justify-center rounded-xl bg-[var(--accent)]
                             px-4 py-2.5 text-sm font-semibold text-white shadow-[0_1px_4px_rgba(99,102,241,0.4)]
                             transition-colors hover:bg-[var(--accent-hover)] focus-ring"
                >
                  Get in touch
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
