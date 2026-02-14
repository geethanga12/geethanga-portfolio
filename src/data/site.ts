import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { SocialLink } from '../types/social';

export const SITE_URL = 'https://geethanga.me';
export const SITE_NAME = 'Geethanga Dissanayake';
export const SITE_TITLE = 'Geethanga Dissanayake - Software Engineer';
export const SITE_DESCRIPTION =
  'Portfolio of Geethanga Dissanayake, Software Engineer focused on scalable full-stack products and premium user experiences.';
export const OG_IMAGE = `${SITE_URL}/assets/letter-g.png`;

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/geethanga12',
    icon: FaGithub,
    hoverClass: 'hover:bg-gray-700',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/geethanga-dissanayake/',
    icon: FaLinkedin,
    hoverClass: 'hover:bg-blue-700',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/94779907343',
    icon: FaWhatsapp,
    hoverClass: 'hover:bg-green-600',
  },
  {
    label: 'Email',
    href: 'mailto:dissanayakegeethanga@gmail.com',
    icon: FaEnvelope,
    hoverClass: 'hover:bg-red-600',
  },
];
