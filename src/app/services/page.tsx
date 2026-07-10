'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  FiCode,
  FiServer,
  FiLayout,
  FiShoppingCart,
  FiCloud,
  FiZap,
  FiArrowRight,
  FiMessageCircle,
  FiSearch,
  FiClipboard,
  FiPenTool,
  FiCheckCircle,
  FiSend,
  FiMonitor,
  FiBook,
} from 'react-icons/fi';

/* ─── Data ──────────────────────────────────────────────────────────────── */

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  tags: string[];
}

const SERVICES: Service[] = [
  {
    icon: FiCode,
    title: 'Custom Web App Development',
    description:
      'End-to-end full-stack applications tailored to your business logic — from architecture to production deployment.',
    tags: ['React', 'Spring Boot', 'Next.js', 'TypeScript'],
  },
  {
    icon: FiBook,
    title: 'LMS & Course Platform Development',
    description:
      'Role-based learning management systems with class scheduling, attendance, progress tracking, and student-tutor workflows.',
    tags: ['React', 'Spring Boot', 'MySQL', 'FullCalendar'],
  },
  {
    icon: FiShoppingCart,
    title: 'E-commerce, POS & Inventory Systems',
    description:
      'Scalable commerce platforms with sales flows, inventory management, supplier modules, and real-time reporting.',
    tags: ['React', 'Spring Boot', 'MySQL', 'REST API'],
  },
  {
    icon: FiLayout,
    title: 'Admin Dashboard Development',
    description:
      'Data-rich internal dashboards with analytics, role-based access control, and clean operational UX.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Charts'],
  },
  {
    icon: FiServer,
    title: 'API & Backend Development',
    description:
      'RESTful API-first backends with secure auth, clean service layers, and database-optimised query design.',
    tags: ['Spring Boot', 'Node.js', 'JWT', 'PostgreSQL', 'MySQL'],
  },
  {
    icon: FiMonitor,
    title: 'UI/UX Frontend Implementation',
    description:
      'Pixel-precise, accessible, and responsive frontend builds from Figma or design references — fast and maintainable.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    icon: FiCloud,
    title: 'Deployment & Cloud Setup',
    description:
      'Production-ready CI/CD pipelines, Docker containerisation, and cloud hosting on AWS or Cloudflare infrastructure.',
    tags: ['AWS', 'Docker', 'Cloudflare', 'Nginx'],
  },
  {
    icon: FiZap,
    title: 'Performance & Responsive Fixes',
    description:
      'Audit and resolve bottlenecks in existing sites — Core Web Vitals, mobile responsiveness, and bundle optimisation.',
    tags: ['Vite', 'Lighthouse', 'CSS', 'Web Performance'],
  },
];

interface ProcessStep {
  icon: React.ElementType;
  step: string;
  title: string;
  description: string;
}

const PROCESS: ProcessStep[] = [
  {
    icon: FiSearch,
    step: '01',
    title: 'Discover',
    description: 'Understand your goals, users, and technical constraints before writing a line of code.',
  },
  {
    icon: FiClipboard,
    step: '02',
    title: 'Plan',
    description: 'Scope the features, pick the right stack, and agree on milestones up front.',
  },
  {
    icon: FiPenTool,
    step: '03',
    title: 'Design',
    description: 'Wire up the UX flow and component structure so development stays fast and on-spec.',
  },
  {
    icon: FiCode,
    step: '04',
    title: 'Develop',
    description: 'Build incrementally with clean, typed, reviewable code — backend and frontend in sync.',
  },
  {
    icon: FiCheckCircle,
    step: '05',
    title: 'Test',
    description: 'Cross-device QA, edge-case validation, and security checks before anything goes live.',
  },
  {
    icon: FiSend,
    step: '06',
    title: 'Deploy',
    description: 'Ship to production with proper CI/CD, monitoring, and a handoff you can actually maintain.',
  },
];

/* ─── Sub-components ────────────────────────────────────────────────────── */

const TILE_TINTS = [
  'bg-[var(--accent-subtle)] text-[var(--accent)]',
  'bg-[var(--blue-subtle)] text-[var(--blue-text)]',
  'bg-[var(--green-subtle)] text-[var(--green-text)]',
  'bg-[var(--amber-subtle)] text-[var(--amber-text)]',
];

function ServiceCard({
  service,
  delay,
  inView,
  tint,
}: {
  service: Service;
  delay: number;
  inView: boolean;
  tint: string;
}) {
  const shouldReduce = useReducedMotion();
  const { icon: Icon } = service;

  return (
    <motion.article
      initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="card-premium group flex h-full flex-col gap-4 p-6"
    >
      <span
        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl
                   transition-transform duration-300 group-hover:scale-110 ${tint}`}
        aria-hidden
      >
        <Icon size={22} />
      </span>

      <div className="flex-1">
        <h3 className="mb-1.5 text-base font-bold leading-snug text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          {service.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5" role="list" aria-label="Technologies">
        {service.tags.map((tag) => (
          <span
            key={tag}
            role="listitem"
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-secondary)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

function useSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  return { ref, inView };
}

export default function ServicesPage() {
  const servicesSection = useSection();
  const processSection = useSection();
  const ctaSection = useSection();
  const shouldReduce = useReducedMotion();

  const fadeUp = (inView: boolean, delay: number) => ({
    initial: { opacity: 0, y: shouldReduce ? 0 : 16 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  });

  return (
    <>
      <section className="section-spacing-sm" aria-labelledby="services-page-heading">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="section-eyebrow mb-2">What I Build</p>
            <h1
              id="services-page-heading"
              className="text-display font-extrabold text-[var(--text)]"
            >
              Services
            </h1>
            <p className="section-desc mt-3 max-w-2xl">
              Full-stack web development services for modern businesses — from greenfield
              product builds to targeted engineering fixes.
            </p>
          </motion.div>
        </div>
      </section>

      <section
        ref={servicesSection.ref}
        className="section-spacing-sm"
        aria-labelledby="services-grid-heading"
      >
        <div className="container-page">
          <h2 id="services-grid-heading" className="sr-only">Service offerings</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <ServiceCard
                key={service.title}
                service={service}
                delay={0.05 + i * 0.06}
                inView={servicesSection.inView}
                tint={TILE_TINTS[i % TILE_TINTS.length]}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        ref={processSection.ref}
        className="section-spacing"
        aria-labelledby="process-heading"
      >
        <div className="container-page">
          <motion.div {...fadeUp(processSection.inView, 0)} className="mb-10">
            <p className="section-eyebrow mb-2">How I Work</p>
            <h2 id="process-heading" className="section-title">
              My Process
            </h2>
            <p className="section-desc mt-2 max-w-lg">
              A structured six-step approach that keeps scope tight and delivery predictable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {PROCESS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  {...fadeUp(processSection.inView, 0.1 + i * 0.07)}
                  className="relative flex gap-4 rounded-xl border border-[var(--border)]
                             bg-[var(--surface)] px-5 py-5 transition-all duration-200
                             hover:-translate-y-1 hover:border-[var(--border-strong)] hover:bg-[var(--surface-raised)] hover:shadow-md"
                >
                  <span
                    className="shrink-0 font-mono text-xs font-bold tabular-nums
                               text-[var(--accent)] opacity-50 select-none mt-0.5 w-6"
                    aria-label={`Step ${step.step}`}
                  >
                    {step.step}
                  </span>

                  <div>
                    <span
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg
                                 bg-[var(--accent-subtle)] text-[var(--accent)] mb-3"
                      aria-hidden
                    >
                      <Icon size={16} />
                    </span>
                    <h3 className="text-sm font-semibold text-[var(--text)] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        ref={ctaSection.ref}
        className="section-spacing"
        aria-labelledby="cta-heading"
      >
        <div className="container-page">
          <motion.div
            {...fadeUp(ctaSection.inView, 0)}
            className="relative flex flex-col items-center gap-6 overflow-hidden rounded-2xl
                       border border-[var(--border)] bg-[var(--surface-raised)]
                       px-6 py-14 text-center sm:px-8"
          >
            <div
              className="pointer-events-none absolute inset-0 -z-10 opacity-70"
              style={{
                background:
                  'radial-gradient(ellipse 60% 60% at 50% 0%, color-mix(in srgb, var(--accent) 12%, transparent) 0%, transparent 70%)',
              }}
              aria-hidden
            />
            <p className="section-eyebrow">Let&apos;s Build Together</p>

            <h2
              id="cta-heading"
              className="section-title max-w-md"
            >
              Have a project idea?
            </h2>

            <p className="section-desc max-w-sm">
              I&apos;m open to freelance projects and new opportunities. Reach out and
              let&apos;s talk about what you need.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="btn btn-primary btn-sm"
              >
                Contact Me
                <FiArrowRight size={14} aria-hidden />
              </Link>

              <a
                href="https://wa.me/94779907343"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="btn btn-secondary btn-sm text-[var(--green-text)]
                           border-[var(--green-text)]/30 bg-[var(--green-subtle)]
                           hover:bg-[var(--green-text)]/15"
              >
                <FiMessageCircle size={14} aria-hidden />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
