import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode } from 'react-icons/fa';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Experience</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
          >
            <div className="flex items-start space-x-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <FaCode className="text-indigo-600 dark:text-indigo-400" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Software Engineer Intern</h3>
                <p className="text-indigo-600 dark:text-indigo-400 mb-2">
                  Ultimate Digital Solutions (Pvt) Ltd
                </p>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  September 2025 - March 2026
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Contributed to production-grade web applications including iClazz,
                  RoyalWeddings.lk, and Pathwise. Worked on frontend implementation, backend
                  integrations, role-based dashboard experiences, and deployment-ready features.
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
                  <li>Implemented real-world modules for education and service platforms used by live users.</li>
                  <li>Delivered features across both React/Next.js frontends and Spring Boot backend APIs.</li>
                  <li>Improved UI quality, form workflows, and production-readiness under internship timelines.</li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['React', 'Spring Boot', 'Next.js', 'MySQL', 'AWS'].map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
