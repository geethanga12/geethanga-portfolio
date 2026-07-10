'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { SiTypescript } from 'react-icons/si';
import {
  FaRocket,
  FaLayerGroup,
  FaCode,
  FaPlug,
  FaCloud,
  FaBriefcase,
} from 'react-icons/fa';

/* ─── Types ──────────────────────────────────────────────────────── */

type TokenType = 'keyword' | 'var' | 'property' | 'string' | 'punct' | 'plain' | 'comment';
interface Token { text: string; type: TokenType }

/* ─── Syntax token data ──────────────────────────────────────────── */

const TOKEN_CLASS: Record<TokenType, string> = {
  keyword:  'text-[var(--token-keyword)] font-semibold',
  var:      'text-[var(--token-var)]',
  property: 'text-[var(--token-property)]',
  string:   'text-[var(--token-string)]',
  punct:    'text-[var(--token-punct)]',
  plain:    'text-[var(--text-secondary)]',
  comment:  'text-[var(--text-muted)] italic',
};

type Line = Token[];

const CODE_LINES: Line[] = [
  [
    { text: 'const ',      type: 'keyword' },
    { text: 'developer',   type: 'var'     },
    { text: ' = {',        type: 'plain'   },
  ],
  [
    { text: '  name',                   type: 'property' },
    { text: ': ',                       type: 'punct'    },
    { text: '"Geethanga Dissanayake"',  type: 'string'   },
    { text: ',',                        type: 'punct'    },
  ],
  [
    { text: '  role',                             type: 'property' },
    { text: ': ',                                 type: 'punct'    },
    { text: '"Associate Full Stack Developer"',   type: 'string'   },
    { text: ',',                                  type: 'punct'    },
  ],
  [
    { text: '  location', type: 'property' },
    { text: ': ',         type: 'punct'    },
    { text: '"Sri Lanka"',type: 'string'   },
    { text: ',',          type: 'punct'    },
  ],
  [
    { text: '  focus',       type: 'property' },
    { text: ': [',           type: 'punct'    },
    { text: '"React"',       type: 'string'   },
    { text: ', ',            type: 'punct'    },
    { text: '"Spring Boot"', type: 'string'   },
    { text: ', ',            type: 'punct'    },
    { text: '"Next.js"',     type: 'string'   },
    { text: ', ',            type: 'punct'    },
    { text: '"AWS"',         type: 'string'   },
    { text: '],',            type: 'punct'    },
  ],
  [
    { text: '  stack', type: 'property' },
    { text: ': {',     type: 'punct'    },
  ],
  [
    { text: '    frontend',    type: 'property' },
    { text: ': [',             type: 'punct'    },
    { text: '"React"',         type: 'string'   },
    { text: ', ',              type: 'punct'    },
    { text: '"Next.js"',       type: 'string'   },
    { text: ', ',              type: 'punct'    },
    { text: '"TypeScript"',    type: 'string'   },
    { text: ', ',              type: 'punct'    },
    { text: '"Tailwind CSS"',  type: 'string'   },
    { text: '],',              type: 'punct'    },
  ],
  [
    { text: '    backend',     type: 'property' },
    { text: ': [',             type: 'punct'    },
    { text: '"Spring Boot"',   type: 'string'   },
    { text: ', ',              type: 'punct'    },
    { text: '"Node.js"',       type: 'string'   },
    { text: ', ',              type: 'punct'    },
    { text: '"REST APIs"',     type: 'string'   },
    { text: '],',              type: 'punct'    },
  ],
  [
    { text: '    database',    type: 'property' },
    { text: ': [',             type: 'punct'    },
    { text: '"MySQL"',         type: 'string'   },
    { text: ', ',              type: 'punct'    },
    { text: '"PostgreSQL"',    type: 'string'   },
    { text: '],',              type: 'punct'    },
  ],
  [
    { text: '    cloud',       type: 'property' },
    { text: ': [',             type: 'punct'    },
    { text: '"AWS"',           type: 'string'   },
    { text: ', ',              type: 'punct'    },
    { text: '"Docker"',        type: 'string'   },
    { text: ', ',              type: 'punct'    },
    { text: '"Cloudflare"',    type: 'string'   },
    { text: '],',              type: 'punct'    },
  ],
  [
    { text: '  },', type: 'punct' },
  ],
  [
    { text: '  builds',         type: 'property' },
    { text: ': [',              type: 'punct'    },
    { text: '"Web Apps"',       type: 'string'   },
    { text: ', ',               type: 'punct'    },
    { text: '"LMS Platforms"',  type: 'string'   },
    { text: ', ',               type: 'punct'    },
    { text: '"E-Commerce"',     type: 'string'   },
    { text: '],',               type: 'punct'    },
  ],
  [
    { text: '  availableFor',              type: 'property' },
    { text: ': ',                          type: 'punct'    },
    { text: '"Freelance & Full-Time"',     type: 'string'   },
    { text: ',',                           type: 'punct'    },
  ],
  [
    { text: '};', type: 'plain' },
  ],
  [],
  [
    { text: '// Building things that matter 🚀', type: 'comment' },
  ],
  [
    { text: 'export default ', type: 'keyword' },
    { text: 'developer',       type: 'var'     },
    { text: ';',               type: 'punct'   },
  ],
];

/* ─── Stat cards ────────────────────────────────────────────────── */

const STAT_CARDS = [
  { icon: FaRocket,     value: '6+',          label: 'Projects Shipped'   },
  { icon: FaLayerGroup, value: 'Full‑Stack',   label: 'End-to-End Dev'    },
  { icon: FaCode,       value: 'TypeScript',   label: 'Type-Safe Code'    },
  { icon: FaPlug,       value: 'API‑First',    label: 'REST Integration'  },
  { icon: FaCloud,      value: 'AWS · Docker', label: 'Cloud Deployment'  },
  { icon: FaBriefcase,  value: 'Open To',      label: 'New Opportunities' },
] as const;

/* ─── Component ─────────────────────────────────────────────────── */

const DeveloperConsole = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const shouldReduce = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduce ? 0 : 16 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  });

  return (
    <section
      aria-label="Developer profile"
      className="pt-6 pb-[clamp(2.5rem,5vw,4rem)]"
    >
      <div ref={ref} className="container-page space-y-5">

        {/* ── Full-width code editor ──────────────────────────── */}
        <motion.div
          {...fadeUp(0)}
          className="rounded-xl overflow-hidden border border-[var(--border)] shadow-[var(--shadow-lg)]"
        >
          {/* Window chrome */}
          <div
            className="flex items-center gap-3 px-4 py-2.5 border-b border-[var(--border)]"
            style={{ backgroundColor: 'var(--editor-chrome)' }}
          >
            {/* Traffic-light dots */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] opacity-80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] opacity-80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] opacity-80" />
            </div>

            {/* Active file tab */}
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium border border-[var(--border)]"
              style={{ backgroundColor: 'var(--editor-bg)', color: 'var(--text-secondary)' }}
            >
              <SiTypescript size={11} className="text-[#3178c6]" aria-hidden="true" />
              geethanga.ts
            </div>

            {/* Inactive tab */}
            {/* <div
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium opacity-35 cursor-default select-none"
              style={{ color: 'var(--text-muted)' }}
              aria-hidden="true"
            >
              Developer.java
            </div> */}
          </div>

          {/* Code body */}
          <div
            className="overflow-x-auto"
            style={{ backgroundColor: 'var(--editor-bg)' }}
          >
            <pre
              className="py-5 text-xs leading-6 font-mono select-text"
              aria-label="Developer profile as TypeScript object"
            >
              <code>
                <table className="border-collapse w-full min-w-max">
                  <tbody>
                    {CODE_LINES.map((line, i) => (
                      <tr key={i} className="hover:bg-[var(--accent-subtle)] transition-colors duration-100">
                        {/* Line number */}
                        <td
                          className="text-right pr-4 pl-4 select-none w-10 text-[var(--editor-line-num)] text-[11px]"
                          aria-hidden="true"
                        >
                          {i + 1}
                        </td>
                        {/* Code */}
                        <td className="pr-6 whitespace-pre">
                          {line.map((token, j) => (
                            <span key={j} className={TOKEN_CLASS[token.type]}>
                              {token.text}
                            </span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </code>
            </pre>
          </div>
        </motion.div>

        {/* ── Stats strip ───────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {STAT_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              {...fadeUp(0.06 + i * 0.05)}
              className="card-surface p-4 flex flex-col gap-2.5"
            >
              <div className="w-7 h-7 rounded-lg bg-[var(--accent-subtle)] flex items-center justify-center flex-shrink-0">
                <card.icon size={13} className="text-[var(--accent)]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--text)] leading-tight">
                  {card.value}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-snug">
                  {card.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeveloperConsole;
