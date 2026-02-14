import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: 'iClazz: Modern Education Management Platform',
      description:
        'Internship project: built role-based student, tutor, and coordinator workflows with class assignment, attendance, and scheduling features for real operations.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop',
      tags: ['Internship', 'Spring Boot', 'React', 'Tailwind CSS', 'MySQL', 'JWT'],
      isInternship: true,
      links: [{ name: 'Live Site', url: 'https://iclazzeducation.com/' }],
    },
    {
      title: 'RoyalWeddings.lk',
      description:
        'Internship project: delivered frontend/backend features and production-grade UX improvements for a live wedding services platform.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=600&fit=crop',
      tags: ['Internship', 'Next.js', 'Prisma', 'Tailwind CSS'],
      isInternship: true,
      links: [{ name: 'Live Site', url: 'https://royalweddings.lk/' }],
    },
    {
      title: 'Pathwise: AI Career Guidance Platform',
      description:
        'Internship project: contributed to student and employer workflow features for AI-assisted career pathways and matching.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop',
      tags: ['Internship', 'React', 'Spring Boot', 'AI', 'MySQL'],
      isInternship: true,
      links: [],
    },
    {
      title: 'SmartBiz: AI-Powered Business Management Suite for SMEs',
      description:
        'Built a full-stack ERP-lite system using Spring Boot, React, and React Native for managing sales, inventory, customers, suppliers, and expenses. Most core features are implemented, with AI-driven insights planned.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop',
      tags: ['Spring Boot', 'React', 'React Native'],
      isInternship: false,
      links: [
        { name: 'Backend', url: 'https://github.com/geethanga12/SmartBiz-backend' },
        { name: 'Web Frontend', url: 'https://github.com/geethanga12/SmartBiz-frontend-web' },
        { name: 'Mobile App', url: 'https://github.com/geethanga12/SmartBiz-frontend-mobile' },
      ],
    },
    {
      title: 'Free Dictionary Web App',
      description:
        'Created a responsive dictionary application that integrates with the Free Dictionary API to provide real-time word definitions, audio pronunciation, and usage examples.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop',
      tags: ['React', 'Material UI', 'Axios'],
      isInternship: false,
      links: [{ name: 'View Project', url: 'https://github.com/geethanga12/dictionary-webapp.git' }],
    },
    {
      title: 'NIC Detail Application',
      description:
        'Created a React-based application to extract and display personal details from Sri Lankan National Identity Card (NIC) numbers using the lanka-nic library.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop',
      tags: ['React', 'Tailwind', 'React Router'],
      isInternship: false,
      links: [{ name: 'View Project', url: 'https://github.com/geethanga12/Sri-Lankan-NIC-Checker.git' }],
    },
    {
      title: 'Cafeteria Automation System',
      description:
        'Developed a full-stack cafeteria management platform for Cinec Campus with dedicated user and admin panels, secure login/registration, and real-time order/menu tracking.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=200&fit=crop',
      tags: ['PHP', 'MySQL', 'Bootstrap'],
      isInternship: false,
      links: [{ name: 'View Project', url: 'https://github.com/geethanga12/cas-cinec.git' }],
    },
    {
      title: 'Online Quiz Application',
      description:
        'Developed a responsive web-based quiz platform featuring a 20-second timer per question, real-time scoring, and user validation.',
      image: 'https://cdn.aarp.net/content/dam/aarp/money/scams_fraud/2023/02/1140-online-quiz-taker.jpg',
      tags: ['HTML5', 'JavaScript ES6+', 'Tailwind CSS'],
      isInternship: false,
      links: [{ name: 'View Project', url: 'https://github.com/geethanga12/quiz-webapp' }],
    },
  ];
  const internshipProjects = projects.filter((project) => project.isInternship);
  const personalProjects = projects.filter((project) => !project.isInternship);

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
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          <div>
            <h3 className="text-2xl font-semibold mb-6">Internship Highlights</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {internshipProjects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl ring-2 ring-indigo-200/80 dark:ring-indigo-500/40"
                >
                  <div className="relative overflow-hidden h-48">
                    <span className="absolute top-3 left-3 z-10 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      Internship Project
                    </span>
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-3 line-clamp-2">{project.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.links.length > 0 && (
                      <div className="flex flex-wrap gap-4">
                        {project.links.map((link, linkIndex) => (
                          <motion.a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 5 }}
                            className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                          >
                            {link.name} <FaExternalLinkAlt className="text-xs" />
                          </motion.a>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Personal Projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {personalProjects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="relative overflow-hidden h-48">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-3 line-clamp-2">{project.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.links.length > 0 && (
                      <div className="flex flex-wrap gap-4">
                        {project.links.map((link, linkIndex) => (
                          <motion.a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 5 }}
                            className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                          >
                            {link.name} <FaExternalLinkAlt className="text-xs" />
                          </motion.a>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
