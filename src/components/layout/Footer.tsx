import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { NAV_LINKS } from '../../data/navigation';
import { SITE_NAME } from '../../data/site';

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/geethanga12',
    icon: FaGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/geethanga-dissanayake/',
    icon: FaLinkedin,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/94779907343',
    icon: FaWhatsapp,
  },
  {
    label: 'Email',
    href: 'mailto:dissanayakegeethanga@gmail.com',
    icon: FaEnvelope,
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-subtle)]">
      <div className="container-page py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <Link
              href="/"
              className="text-xl font-bold text-gradient focus-ring rounded"
              aria-label="Home"
            >
              GD
            </Link>
            <p className="text-xs text-[var(--text-muted)]">{SITE_NAME}</p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation" className="flex items-center gap-1 flex-wrap justify-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] rounded-lg transition-all focus-ring"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-1">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                aria-label={s.label}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-all focus-ring"
              >
                <s.icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {year} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
