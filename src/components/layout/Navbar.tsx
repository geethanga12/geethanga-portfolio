import { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa';
import { NAV_LINKS } from '../../data/navigation';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // ── Scroll detection ──────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // set initial state
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Close menu on route change ────────────────────────────
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

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
          Fixed header — full-width strip with side breathing room
      ═══════════════════════════════════════════════════════ */}
      <header
        className={[
          'fixed top-0 inset-x-0 z-50 h-[4.5rem]',
          'flex items-center px-5 sm:px-8 lg:px-14',
          'transition-[background-color,border-color,box-shadow] duration-300 ease-out',
          scrolled
            ? 'bg-[var(--bg)]/92 backdrop-blur-xl border-b border-[var(--border)] shadow-sm'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
        role="banner"
      >
        {/* ── Logo ───────────────────────────────────────────── */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 focus-ring rounded-lg py-1 flex-shrink-0"
          aria-label="Geethanga Dissanayake — Home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent-subtle)] flex-shrink-0">
            <span className="text-[17px] font-extrabold tracking-tight leading-none text-gradient select-none">GD</span>
          </span>
          <span
            className="hidden sm:block text-[14px] font-semibold leading-none
                       text-[var(--text)] group-hover:text-[var(--accent)] transition-colors"
          >
            Geethanga
          </span>
        </Link>

        {/* ── Center nav pill — desktop only ─────────────────── */}
        <nav
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5
                     px-2 py-1.5 rounded-full border border-[var(--border)]
                     bg-[var(--surface)]/90 backdrop-blur-sm"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                [
                  'px-4 py-[7px] rounded-full text-[14px] font-medium leading-none',
                  'transition-all duration-150 focus-ring',
                  isActive
                    ? 'text-[var(--accent)] bg-[var(--accent-subtle)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-raised)]',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* ── Right: Controls ────────────────────────────────── */}
        <div className="ml-auto flex items-center gap-2">

          {/* Desktop controls */}
          <div className="hidden lg:flex items-center gap-1.5">
            <a
              href="https://github.com/geethanga12"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="w-9 h-9 flex items-center justify-center rounded-lg
                         text-[var(--text-muted)] hover:text-[var(--text)]
                         hover:bg-[var(--surface)] transition-all focus-ring"
            >
              <FaGithub size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/geethanga-dissanayake/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="w-9 h-9 flex items-center justify-center rounded-lg
                         text-[var(--text-muted)] hover:text-[var(--text)]
                         hover:bg-[var(--surface)] transition-all focus-ring"
            >
              <FaLinkedin size={16} />
            </a>

            <div className="w-px h-4 bg-[var(--border)] mx-1" aria-hidden="true" />

            <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-9 h-9 flex items-center justify-center rounded-lg overflow-hidden
                         text-[var(--text-muted)] hover:text-[var(--text)]
                         hover:bg-[var(--surface)] transition-all focus-ring"
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

            <div className="w-px h-4 bg-[var(--border)] mx-1" aria-hidden="true" />

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-[9px] text-[14px] font-semibold leading-none rounded-full
                         bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]
                         transition-colors focus-ring
                         shadow-[0_2px_8px_rgba(99,102,241,0.45)]"
            >
              Get in touch
              <span aria-hidden="true" className="text-[15px]">→</span>
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-9 h-9 flex items-center justify-center rounded-lg overflow-hidden
                         text-[var(--text-muted)] hover:bg-[var(--surface)] transition-all focus-ring"
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
              className="w-9 h-9 flex items-center justify-center rounded-lg overflow-hidden
                         text-[var(--text-secondary)] hover:bg-[var(--surface)] transition-all focus-ring"
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
      </header>

      {/* ═══════════════════════════════════════════════════════
          Mobile menu — dropdown panel just below header
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
              className="fixed top-[4.5rem] left-3 right-3 z-50 lg:hidden
                         rounded-2xl border border-[var(--border)]
                         bg-[var(--bg)] shadow-[var(--shadow-xl)] overflow-hidden"
            >
              {/* Nav links */}
              <nav className="p-2 flex flex-col gap-0.5" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      [
                        'flex items-center px-4 py-3 rounded-xl text-[15px] font-medium',
                        'transition-all duration-150 focus-ring',
                        isActive
                          ? 'text-[var(--accent)] bg-[var(--accent-subtle)]'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface)]',
                      ].join(' ')
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              {/* Footer row */}
              <div
                className="flex items-center justify-between gap-3 px-4 py-3
                           border-t border-[var(--border)] bg-[var(--menu-footer-bg)]"
              >
                {/* Social icons */}
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/geethanga12"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="w-9 h-9 flex items-center justify-center rounded-lg
                               border border-[var(--border)] bg-[var(--surface)]
                               text-[var(--text-secondary)] hover:text-[var(--text)]
                               hover:bg-[var(--surface-raised)] transition-all focus-ring"
                  >
                    <FaGithub size={15} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/geethanga-dissanayake/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="w-9 h-9 flex items-center justify-center rounded-lg
                               border border-[var(--border)] bg-[var(--surface)]
                               text-[var(--text-secondary)] hover:text-[var(--text)]
                               hover:bg-[var(--surface-raised)] transition-all focus-ring"
                  >
                    <FaLinkedin size={15} />
                  </a>
                </div>

                {/* CTA */}
                <Link
                  to="/contact"
                  className="flex-1 flex items-center justify-center max-w-[160px]
                             px-4 py-2.5 text-sm font-semibold rounded-xl
                             bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]
                             transition-colors focus-ring shadow-[0_1px_4px_rgba(99,102,241,0.4)]"
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

