import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaArrowRight,
  FaDownload,
  FaJava,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaAws,
} from 'react-icons/fa';
import {
  SiSpring,
  SiTypescript,
  SiTailwindcss,
  SiMysql,
  SiPostgresql,
} from 'react-icons/si';
import { MdVerified } from 'react-icons/md';

/* ─── Data ──────────────────────────────────────────────────────── */

const ROLES = [
  'Full Stack Developer',
  'Software Engineer',
  'Aspiring AI Engineer',
] as const;

const SOCIAL = [
  { label: 'GitHub',    href: 'https://github.com/geethanga12',                     icon: FaGithub   },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/geethanga-dissanayake/', icon: FaLinkedin },
  { label: 'Email',     href: 'mailto:dissanayakegeethanga@gmail.com',              icon: FaEnvelope },
  { label: 'WhatsApp',  href: 'https://wa.me/94779907343',                          icon: FaWhatsapp },
] as const;

const TECH_STACK = [
  { label: 'Java',         icon: FaJava,        color: '#f89820' },
  { label: 'Spring Boot',  icon: SiSpring,      color: '#6db33f' },
  { label: 'React',        icon: FaReact,       color: '#61dafb' },
  { label: 'TypeScript',   icon: SiTypescript,  color: '#3178c6' },
  { label: 'Node.js',      icon: FaNodeJs,      color: '#68a063' },
  { label: 'Tailwind CSS', icon: SiTailwindcss, color: '#38bdf8' },
  { label: 'MySQL',        icon: SiMysql,       color: '#4479a1' },
  { label: 'PostgreSQL',   icon: SiPostgresql,  color: '#336791' },
  { label: 'Docker',       icon: FaDocker,      color: '#2496ed' },
  { label: 'AWS',          icon: FaAws,         color: '#ff9900' },
] as const;

/* ─── Component ──────────────────────────────────────────────────── */

const Hero = () => {
  const shouldReduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: shouldReduce ? 0 : 0.09 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="pt-[clamp(3.5rem,6vw,5rem)] pb-8"
    >
      <div className="container-page">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex w-full flex-col items-center gap-5 text-center sm:gap-6"
        >
          {/* ── Avatar with gradient ring ──────────────────────── */}
          <motion.div variants={item} className="relative">
            {/* Soft accent glow behind avatar */}
            <div
              className="pointer-events-none absolute rounded-full"
              style={{
                inset: '-26px',
                background:
                  'radial-gradient(circle at center, color-mix(in srgb, var(--accent) 20%, transparent) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />
            {/* Gradient ring → inner bg gap → photo */}
            <div className="accent-bar relative rounded-full p-[3px] shadow-[0_12px_40px_-10px_rgba(99,102,241,0.45)]">
              <div className="rounded-full bg-[var(--bg)] p-[3px]">
                <img
                  src="/assets/Geeth_img.JPG"
                  alt="Geethanga Dissanayake"
                  width={150}
                  height={150}
                  fetchPriority="high"
                  decoding="async"
                  className="block h-[132px] w-[132px] rounded-full object-cover object-top sm:h-[148px] sm:w-[148px] xl:h-[160px] xl:w-[160px]"
                />
              </div>
            </div>
          </motion.div>

          {/* ── Name + Roles ────────────────────────────────────── */}
          <motion.div variants={item} className="space-y-3">
            <h1 className="text-display font-extrabold text-[var(--text)] inline-flex items-center justify-center flex-wrap gap-x-2 gap-y-0 leading-tight">
              <span>Geethanga Dissanayake</span>
              <MdVerified
                size={24}
                className="text-[var(--accent)] opacity-90 flex-shrink-0"
                aria-hidden="true"
              />
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-sm font-medium text-[var(--text-secondary)] sm:text-base">
              {ROLES.map((role, i) => (
                <Fragment key={role}>
                  {i > 0 && (
                    <span className="select-none text-[var(--text-muted)] opacity-40" aria-hidden="true">|</span>
                  )}
                  <span className="whitespace-nowrap">{role}</span>
                </Fragment>
              ))}
            </div>
          </motion.div>

          {/* ── Social icons — plain glyphs ────────────────────── */}
          <motion.div variants={item} className="flex items-center gap-1">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-lg
                           text-[var(--text-muted)] transition-all duration-200
                           hover:-translate-y-0.5 hover:text-[var(--accent)] focus-ring"
              >
                <s.icon size={19} />
              </a>
            ))}
          </motion.div>

          {/* ── CTA buttons ────────────────────────────────────── */}
          <motion.div variants={item} className="flex flex-wrap justify-center gap-2.5">
            <Link
              to="/projects"
              className="btn btn-primary btn-sm focus-ring"
            >
              View Projects
              <FaArrowRight size={11} aria-hidden="true" />
            </Link>

            <Link
              to="/contact"
              className="btn btn-secondary btn-sm focus-ring"
            >
              Contact Me
            </Link>

            <a
              href="/assets/Geethanga_Dissanayake_CV.pdf"
              download
              className="btn btn-ghost btn-sm border border-[var(--border)] focus-ring"
            >
              <FaDownload size={10} aria-hidden="true" />
              Download CV
            </a>
          </motion.div>

          {/* ── Tech stack grid ─────────────────────────────── */}
          <motion.div
            variants={item}
            className="grid w-full grid-cols-2 gap-2.5 pt-1 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5"
            aria-label="Technologies I work with"
          >
            {TECH_STACK.map((tech) => (
              <div
                key={tech.label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl
                           bg-[var(--surface)] border border-[var(--border)]
                           hover:border-[var(--border-strong)] hover:bg-[var(--surface-raised)]
                           transition-all duration-200 cursor-default"
              >
                <tech.icon
                  size={17}
                  style={{ color: tech.color }}
                  aria-hidden="true"
                  className="flex-shrink-0"
                />
                <span className="text-sm font-semibold text-[var(--text)] whitespace-nowrap leading-none">
                  {tech.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
