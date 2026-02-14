import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaReact,
  FaJsSquare,
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaJava,
  FaPhp,
  FaDatabase,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaFigma,
} from 'react-icons/fa';
import { SiTailwindcss, SiSpringboot, SiMysql } from 'react-icons/si';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const skillCategories = [
    {
      title: 'Frontend',
      icon: '💻',
      color: 'text-indigo-600',
      skills: [
        { name: 'React', icon: FaReact, color: 'text-blue-500' },
        { name: 'JavaScript', icon: FaJsSquare, color: 'text-yellow-500' },
        { name: 'HTML5', icon: FaHtml5, color: 'text-orange-500' },
        { name: 'CSS3', icon: FaCss3Alt, color: 'text-blue-500' },
        { name: 'Tailwind', icon: SiTailwindcss, color: 'text-cyan-500' },
        { name: 'Bootstrap', icon: FaBootstrap, color: 'text-purple-500' },
      ],
    },
    {
      title: 'Backend',
      icon: '⚙️',
      color: 'text-green-600',
      skills: [
        { name: 'Java', icon: FaJava, color: 'text-red-500' },
        { name: 'Spring Boot', icon: SiSpringboot, color: 'text-green-500' },
        { name: 'PHP', icon: FaPhp, color: 'text-purple-500' },
        { name: 'MySQL', icon: SiMysql, color: 'text-blue-500' },
        { name: 'REST API', icon: FaDatabase, color: 'text-gray-600' },
        { name: 'Node.js', icon: FaNodeJs, color: 'text-green-500' },
      ],
    },
    {
      title: 'Tools & Others',
      icon: '🛠️',
      color: 'text-purple-600',
      skills: [
        { name: 'Git', icon: FaGitAlt, color: 'text-orange-500' },
        { name: 'GitHub', icon: FaGithub, color: 'text-gray-600' },
        { name: 'VS Code', icon: FaDatabase, color: 'text-blue-500' },
        { name: 'Figma', icon: FaFigma, color: 'text-purple-500' },
        { name: 'Responsive', icon: FaReact, color: 'text-green-500' },
        { name: 'Testing', icon: FaDatabase, color: 'text-red-500' },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className={`text-2xl font-semibold ${category.color}`}>{category.title}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    whileHover={{ scale: 1.1, x: 5 }}
                    className="flex items-center space-x-2"
                  >
                    <skill.icon className={skill.color} />
                    <span className="text-sm">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
