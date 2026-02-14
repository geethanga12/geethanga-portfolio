import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaDownload, FaEye, FaLaptopCode } from 'react-icons/fa';

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const titles = useMemo(() => ['Software Developer', 'Full-Stack Developer', 'Software Engineer'], []);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % titles.length;
      const fullText = titles[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, titles]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants}>
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Hi, I&apos;m <span className="gradient-text">Geethanga</span>
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6 h-12"
              variants={itemVariants}
            >
              <span className="border-r-2 border-indigo-600 pr-1">{text}</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              Passionate full-stack developer with expertise in modern web technologies. I create
              innovative solutions that bridge the gap between design and functionality, delivering
              exceptional user experiences.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
              <motion.a
                href="/assets/Geethanga_Dissanayake_CV.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                <FaDownload />
                Download CV
              </motion.a>
              <motion.a
                href="https://cv.geethanga.me/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                <FaEye />
                View CV
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                <FaLaptopCode />
                Show Projects
              </motion.a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex space-x-4">
              {[
                { icon: FaGithub, href: 'https://github.com/geethanga12', color: 'hover:bg-gray-600', label: 'GitHub' },
                {
                  icon: FaLinkedin,
                  href: 'https://www.linkedin.com/in/geethanga-dissanayake/',
                  color: 'hover:bg-blue-600',
                  label: 'LinkedIn',
                },
                { icon: FaWhatsapp, href: 'https://wa.me/94779907343', color: 'hover:bg-green-600', label: 'WhatsApp' },
                { icon: FaEnvelope, href: 'mailto:dissanayakegeethanga@gmail.com', color: 'hover:bg-red-600', label: 'Email' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center ${social.color} dark:hover:bg-indigo-900 transition-all text-xl`}
                >
                  <social.icon />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-full">
                <img
                  src="/assets/Geeth_img.JPG"
                  alt="Geethanga Dissanayake"
                  className="w-80 h-80 rounded-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
