import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaCode,
  FaCoffee,
  FaDownload,
  FaEye,
  FaLaptopCode,
} from 'react-icons/fa';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-6">Professional Journey</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              I&apos;m a dedicated Software Developer currently pursuing my BSc (Hons) in Computer
              Science at the University of Wolverhampton. With a strong foundation in both
              frontend and backend technologies, I specialize in creating scalable web applications
              that solve real-world problems.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              My journey in software development began with a passion for technology and
              problem-solving. I&apos;ve completed comprehensive training in full-stack development and
              have hands-on experience building various web applications, from simple utilities to
              complex systems.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              I&apos;m passionate about staying up-to-date with the latest technologies and best
              practices in software development, always eager to learn and implement new solutions
              that can make a positive impact.
            </p>

            <div className="flex space-x-4">
              {[
                {
                  icon: FaGithub,
                  href: 'https://github.com/geethanga12',
                  color: 'hover:bg-indigo-200 dark:hover:bg-indigo-800',
                  label: 'GitHub',
                },
                {
                  icon: FaLinkedin,
                  href: 'https://www.linkedin.com/in/geethanga-dissanayake/',
                  color: 'hover:bg-indigo-200 dark:hover:bg-indigo-800',
                  label: 'LinkedIn',
                },
                {
                  icon: FaWhatsapp,
                  href: 'https://wa.me/94779907343',
                  color: 'hover:bg-indigo-200 dark:hover:bg-indigo-800',
                  label: 'WhatsApp',
                },
                {
                  icon: FaEnvelope,
                  href: 'mailto:dissanayakegeethanga@gmail.com',
                  color: 'hover:bg-indigo-200 dark:hover:bg-indigo-800',
                  label: 'Email',
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center ${social.color} transition-all text-xl text-indigo-600 dark:text-indigo-400`}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-6">Quick Facts</h3>
            <div className="space-y-4">
              {[
                { icon: FaMapMarkerAlt, text: 'Sri Lanka' },
                { icon: FaGraduationCap, text: 'BSc Computer Science Student' },
                { icon: FaCode, text: 'Full-Stack Developer' },
                { icon: FaCoffee, text: 'Coffee Enthusiast' },
              ].map((fact, index) => (
                <motion.div key={index} whileHover={{ x: 5 }} className="flex items-center">
                  <fact.icon className="text-indigo-600 dark:text-indigo-400 w-6 mr-3" />
                  <span>{fact.text}</span>
                </motion.div>
              ))}

              <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <motion.a
                  href="/assets/Geethanga_Dissanayake_CV.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
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
                  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  <FaEye />
                  View CV
                </motion.a>
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  <FaLaptopCode />
                  Show Projects
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
