import { useState, useRef, useId } from 'react';
import { SITE_URL } from '../data/site';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  FaEnvelope,
  FaWhatsapp,
  FaLinkedin,
  FaGithub,
} from 'react-icons/fa';
import {
  FiSend,
  FiExternalLink,
  FiAlertCircle,
} from 'react-icons/fi';
import SEO from '../components/SEO';

/* ─── Constants ─────────────────────────────────────────────────────────── */

const RECIPIENT_EMAIL = 'dissanayakegeethanga@gmail.com';

/* ─── Contact method cards ──────────────────────────────────────────────── */

interface ContactMethod {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
  iconClass: string;
  iconBg: string;
}

const METHODS: ContactMethod[] = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'dissanayakegeethanga@gmail.com',
    href: `mailto:${RECIPIENT_EMAIL}`,
    iconClass: 'text-[#ea4335]',
    iconBg: 'bg-[#ea4335]/10',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: '+94 77 990 7343',
    href: 'https://wa.me/94779907343',
    iconClass: 'text-[#25d366]',
    iconBg: 'bg-[#25d366]/10',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'geethanga-dissanayake',
    href: 'https://www.linkedin.com/in/geethanga-dissanayake/',
    iconClass: 'text-[#0a66c2]',
    iconBg: 'bg-[#0a66c2]/10',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'geethanga12',
    href: 'https://github.com/geethanga12',
    iconClass: 'text-[var(--text)]',
    iconBg: 'bg-[var(--surface)]',
  },
];

/* ─── Form ──────────────────────────────────────────────────────────────── */

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY: FormValues = { name: '', email: '', subject: '', message: '' };

function validate(v: FormValues): Partial<Record<keyof FormValues, string>> {
  const e: Partial<Record<keyof FormValues, string>> = {};
  if (!v.name.trim())    e.name    = 'Name is required.';
  if (!v.email.trim())   e.email   = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
                         e.email   = 'Enter a valid email address.';
  if (!v.subject.trim()) e.subject = 'Subject is required.';
  if (!v.message.trim()) e.message = 'Message is required.';
  else if (v.message.trim().length < 10)
                         e.message = 'Message must be at least 10 characters.';
  return e;
}

/* ─── Field component ───────────────────────────────────────────────────── */

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ id, label, error, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold text-[var(--text)] flex items-center gap-1"
      >
        {label}
        {required && (
          <span className="text-[var(--accent)] text-[10px]" aria-hidden>*</span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1 text-xs text-[#ef4444] font-medium"
        >
          <FiAlertCircle size={11} aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

const INPUT_BASE =
  'w-full rounded-lg border bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--text)] ' +
  'placeholder:text-[var(--text-secondary)]/50 ' +
  'transition-colors duration-150 outline-none ' +
  'focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

const INPUT_NORMAL = `${INPUT_BASE} border-[var(--border)]`;
const INPUT_ERROR  = `${INPUT_BASE} border-[#ef4444] focus:border-[#ef4444] focus:ring-[#ef4444]/20`;

/* ─── Page ──────────────────────────────────────────────────────────────── */

const ContactPage = () => {
  const uid = useId();
  const [values,  setValues]  = useState<FormValues>(EMPTY);
  const [errors,  setErrors]  = useState<Partial<Record<keyof FormValues, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});

  const headerRef = useRef<HTMLElement>(null);
  const formRef   = useRef<HTMLElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const formInView   = useInView(formRef,   { once: true, margin: '-6%' });
  const shouldReduce = useReducedMotion();

  const fadeUp = (inView: boolean, delay: number) => ({
    initial: { opacity: 0, y: shouldReduce ? 0 : 16 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name as keyof FormValues]) {
      setErrors(validate(next));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as keyof FormValues;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all as touched and re-validate
    setTouched({ name: true, email: true, subject: true, message: true });
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Build mailto URL and open in user's email client
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      '',
      values.message,
    ].join('\n');

    const mailto =
      `mailto:${RECIPIENT_EMAIL}` +
      `?subject=${encodeURIComponent(values.subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  };

  const fieldCls = (key: keyof FormValues) =>
    touched[key] && errors[key] ? INPUT_ERROR : INPUT_NORMAL;

  const ariaDesc = (key: keyof FormValues) =>
    touched[key] && errors[key] ? `${uid}-${key}-error` : undefined;

  return (
    <>
      <SEO
        title="Contact — Geethanga Dissanayake"
        description="Get in touch with Geethanga Dissanayake for freelance projects, collaborations, or job opportunities. Available via email, WhatsApp, and LinkedIn."
        canonical={`${SITE_URL}/contact`}
      />

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <section
        ref={headerRef}
        className="section-spacing-sm"
        aria-labelledby="contact-heading"
      >
        <div className="container-page">
          <motion.div {...fadeUp(headerInView, 0)}>
            <p className="section-eyebrow mb-2">Get In Touch</p>
            <h1 id="contact-heading" className="section-title">
              Contact
            </h1>
            <p className="section-desc mt-3 max-w-lg">
              Let's build something useful. Whether it's a project idea,
              a freelance enquiry, or just saying hello — I'm happy to hear from you.
            </p>
          </motion.div>

          {/* Quick CTA buttons */}
          <motion.div
            {...fadeUp(headerInView, 0.15)}
            className="mt-6 flex flex-wrap gap-3"
          >
            <a
              href="https://wa.me/94779907343"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm border-[#25d366]/40 text-[#25d366]
                         bg-[#25d366]/10 hover:bg-[#25d366]/20
                         border rounded-full font-semibold
                         inline-flex items-center gap-2 px-4 py-2 text-xs
                         transition-colors duration-150"
            >
              <FaWhatsapp size={14} aria-hidden />
              WhatsApp me
            </a>
            <a
              href={`mailto:${RECIPIENT_EMAIL}`}
              className="btn btn-sm border-[var(--border)] text-[var(--text-secondary)]
                         bg-[var(--surface)] hover:border-[var(--border-strong)]
                         hover:text-[var(--text)]
                         border rounded-full font-semibold
                         inline-flex items-center gap-2 px-4 py-2 text-xs
                         transition-colors duration-150"
            >
              <FaEnvelope size={13} aria-hidden />
              Email me
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Cards + Form ────────────────────────────────────────────────── */}
      <section
        ref={formRef}
        className="section-spacing-sm pb-20"
        aria-label="Contact methods and form"
      >
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 items-start">

            {/* ── Left: contact method cards ────────────────────────── */}
            <motion.div {...fadeUp(formInView, 0)} className="flex flex-col gap-3">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-1">
                Reach Me On
              </h2>

              {METHODS.map((m, i) => {
                const Icon = m.icon;
                return (
                  <motion.a
                    key={m.label}
                    href={m.href}
                    target={m.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={m.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    {...fadeUp(formInView, 0.06 + i * 0.07)}
                    className="group flex items-center gap-4 rounded-xl border border-[var(--border)]
                               bg-[var(--surface)] px-5 py-4
                               hover:border-[var(--border-strong)] hover:bg-[var(--surface-raised)]
                               transition-colors duration-150"
                    aria-label={`${m.label}: ${m.value}`}
                  >
                    {/* Icon badge */}
                    <span
                      className={`shrink-0 inline-flex items-center justify-center
                                  w-10 h-10 rounded-lg ${m.iconBg} ${m.iconClass}
                                  transition-transform duration-150 group-hover:scale-105`}
                      aria-hidden
                    >
                      <Icon size={18} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-0.5">
                        {m.label}
                      </p>
                      <p className="text-sm font-medium text-[var(--text)] truncate">
                        {m.value}
                      </p>
                    </div>

                    <FiExternalLink
                      size={13}
                      className="shrink-0 text-[var(--text-secondary)] opacity-0 group-hover:opacity-60 transition-opacity duration-150"
                      aria-hidden
                    />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* ── Right: form ───────────────────────────────────────── */}
            <motion.div {...fadeUp(formInView, 0.1)}>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[var(--text)] mb-1">
                  Send a message
                </h2>
                {/* Honest disclosure */}
                <p className="text-xs text-[var(--text-secondary)] mb-6 leading-relaxed">
                  Filling this form will open your default email app with the
                  details pre-filled. No data is sent directly to a server.
                </p>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Contact form"
                  className="flex flex-col gap-5"
                >
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field
                      id={`${uid}-name`}
                      label="Name"
                      error={touched.name ? errors.name : undefined}
                      required
                    >
                      <input
                        id={`${uid}-name`}
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-required="true"
                        aria-describedby={ariaDesc('name')}
                        aria-invalid={!!(touched.name && errors.name)}
                        className={fieldCls('name')}
                      />
                    </Field>

                    <Field
                      id={`${uid}-email`}
                      label="Email"
                      error={touched.email ? errors.email : undefined}
                      required
                    >
                      <input
                        id={`${uid}-email`}
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-required="true"
                        aria-describedby={ariaDesc('email')}
                        aria-invalid={!!(touched.email && errors.email)}
                        className={fieldCls('email')}
                      />
                    </Field>
                  </div>

                  {/* Subject */}
                  <Field
                    id={`${uid}-subject`}
                    label="Subject"
                    error={touched.subject ? errors.subject : undefined}
                    required
                  >
                    <input
                      id={`${uid}-subject`}
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={values.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-describedby={ariaDesc('subject')}
                      aria-invalid={!!(touched.subject && errors.subject)}
                      className={fieldCls('subject')}
                    />
                  </Field>

                  {/* Message */}
                  <Field
                    id={`${uid}-message`}
                    label="Message"
                    error={touched.message ? errors.message : undefined}
                    required
                  >
                    <textarea
                      id={`${uid}-message`}
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project or what you have in mind…"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-describedby={ariaDesc('message')}
                      aria-invalid={!!(touched.message && errors.message)}
                      className={`${fieldCls('message')} resize-y min-h-[120px]`}
                    />
                  </Field>

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-1">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm inline-flex items-center gap-2"
                    >
                      <FiSend size={14} aria-hidden />
                      Open in Email App
                    </button>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Opens your default email client with fields pre-filled.
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
