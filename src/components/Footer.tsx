import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/geethanga12', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/geethanga-dissanayake/', label: 'LinkedIn' },
    { icon: FaWhatsapp, href: 'https://wa.me/94779907343', label: 'WhatsApp' },
    { icon: FaEnvelope, href: 'mailto:dissanayakegeethanga@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg font-semibold mb-2"
          >
            Geethanga Dissanayake
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 mb-4"
          >
            Software Developer
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center space-x-6 mb-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={social.label}
              >
                <social.icon className="text-xl" />
              </motion.a>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-sm sm:text-base flex items-center justify-center gap-2"
          >
            &copy; {currentYear} Geethanga Dissanayake. Made with{' '}
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <FaHeart className="text-red-500" />
            </motion.span>{' '}
            All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
