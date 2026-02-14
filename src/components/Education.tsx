import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaCertificate } from 'react-icons/fa';

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const education = [
    {
      degree: 'BSc (Hons) Computer Science (Software Engineering)',
      institution: 'University of Wolverhampton',
      period: '2024 - 2025',
      description:
        'Advanced studies in software engineering principles, algorithms, data structures, and modern software development methodologies. Focus on building scalable applications and understanding software architecture patterns.',
      icon: FaGraduationCap,
      color: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400',
      institutionColorClass: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      degree: 'Pearson BTEC HND in Computing (Software Engineering)',
      institution: 'CINEC Campus',
      period: '2022 - 2024',
      description:
        'Comprehensive foundation in computing principles, programming fundamentals, database systems, and software development lifecycle. Developed strong problem-solving skills and practical experience in various programming languages.',
      icon: FaCertificate,
      color: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
      institutionColorClass: 'text-green-600 dark:text-green-400',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Education</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto space-y-8"
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 10 }}
              className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg"
            >
              <div className="flex items-start space-x-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-12 h-12 ${edu.color} rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <edu.icon />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
                  <p className={`${edu.institutionColorClass} mb-2`}>{edu.institution}</p>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">{edu.period}</p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{edu.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
