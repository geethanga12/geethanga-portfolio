import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaEnvelope, FaWhatsapp, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { API_BASE_URL, TURNSTILE_SITE_KEY } from '../config/env';
import TurnstileWidget from './TurnstileWidget';
import { ContactRequest, ContactResponse } from '../types/contact';

const initialState: ContactRequest = {
  name: '',
  email: '',
  subject: '',
  message: '',
  turnstileToken: '',
  website: '',
};

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState<ContactRequest>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTokenChange = useCallback((token: string) => {
    setFormData((prev) => ({ ...prev, turnstileToken: token }));
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    toast.error('Security token expired. Please complete it again.');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (TURNSTILE_SITE_KEY && !formData.turnstileToken) {
      toast.error('Please complete the security check.');
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);

    try {
      setIsSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify(formData),
      });

      const payload = (await response.json()) as ContactResponse;
      if (!response.ok || !payload.ok) {
        toast.error(payload.message || 'Unable to send message right now.');
        return;
      }

      toast.success(payload.message);
      setFormData(initialState);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        toast.error('Request timed out. Please try again.');
      } else {
        toast.error('Network error. Please try again.');
      }
    } finally {
      window.clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email',
      value: 'dissanayakegeethanga@gmail.com',
      link: 'mailto:dissanayakegeethanga@gmail.com',
      color: 'text-red-600 dark:text-red-400',
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      value: '+94 77 990 7343',
      link: 'https://wa.me/94779907343',
      color: 'text-green-600 dark:text-green-400',
    },
    {
      icon: FaLinkedin,
      title: 'LinkedIn',
      value: 'Geethanga Dissanayake',
      link: 'https://www.linkedin.com/in/geethanga-dissanayake/',
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: FaGithub,
      title: 'GitHub',
      value: 'geethanga12',
      link: 'https://github.com/geethanga12',
      color: 'text-gray-600 dark:text-gray-400',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I&apos;m always open to discussing new opportunities, interesting projects, or just
            having a chat about technology. Feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-12"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-8">Let&apos;s Connect</h3>
            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <motion.div key={index} whileHover={{ x: 5 }} className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center ${contact.color}`}
                  >
                    <contact.icon />
                  </div>
                  <div>
                    <p className="font-semibold">{contact.title}</p>
                    <a
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {contact.value}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="hidden">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white outline-none transition-all resize-none"
                ></textarea>
              </div>

              <TurnstileWidget
                siteKey={TURNSTILE_SITE_KEY}
                onTokenChange={handleTokenChange}
                onExpire={handleTurnstileExpire}
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <FaPaperPlane />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
