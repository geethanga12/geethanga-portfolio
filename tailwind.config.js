/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // ─── Font families ───────────────────────────────────
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },

      // ─── Design token colors (mapped to CSS vars) ────────
      colors: {
        bg: 'var(--bg)',
        'bg-subtle': 'var(--bg-subtle)',
        surface: 'var(--surface)',
        'surface-raised': 'var(--surface-raised)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        foreground: 'var(--text)',
        'foreground-secondary': 'var(--text-secondary)',
        'foreground-muted': 'var(--text-muted)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-subtle': 'var(--accent-subtle)',
        'accent-foreground': 'var(--accent-text)',
        // Legacy palette kept for backward compat
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },

      // ─── Fluid typography ────────────────────────────────
      fontSize: {
        'display': ['clamp(1.625rem, 6.5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '800' }],
        'heading': ['clamp(1.75rem, 3.5vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.025em', fontWeight: '700' }],
        'subheading': ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: '600' }],
        'body-lg': ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.65' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.6' }],
        'caption': ['0.8125rem', { lineHeight: '1.5' }],
        'label': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '600' }],
      },

      // ─── Layout ──────────────────────────────────────────
      maxWidth: {
        'content': '68rem',    // 1088px – general sections
        'prose':   '68ch',     // readable text blocks
        '5xl': '64rem',
        '6xl': '72rem',
      },

      // ─── Spacing ─────────────────────────────────────────
      spacing: {
        'section': 'clamp(4rem, 8vw, 6.5rem)',
        'nav': 'var(--nav-height)',
      },

      // ─── Border radius ───────────────────────────────────
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },

      // ─── Box shadows ─────────────────────────────────────
      boxShadow: {
        'sm':  'var(--shadow-sm)',
        'md':  'var(--shadow-md)',
        'lg':  'var(--shadow-lg)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.25)',
        'glow-sm': '0 0 10px rgba(99, 102, 241, 0.18)',
      },

      // ─── Animations ──────────────────────────────────────
      animation: {
        'fade-in':    'fadeIn 0.45s ease-out both',
        'slide-up':   'slideUp 0.45s ease-out both',
        'fade-up':    'fadeUp 0.5s ease-out both',
        'scale-in':   'scaleIn 0.3s ease-out both',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'scroll-x':   'scrollX 28s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scrollX: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },

      // ─── Transitions ─────────────────────────────────────
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
}

