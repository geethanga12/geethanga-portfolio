# Next.js Portfolio - Complete Code Examples

## 📋 Table of Contents
1. [Complete Component Examples](#complete-component-examples)
2. [3D Animation Examples](#3d-animation-examples)
3. [Page Examples](#page-examples)
4. [API Routes Examples](#api-routes-examples)
5. [Utility Functions](#utility-functions)
6. [Migration Checklist](#migration-checklist)

---

## 🎨 Complete Component Examples

### Hero Section with 3D Background

```typescript
// src/components/sections/HeroSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { FaGithub, FaLinkedin, FaDownload, FaEnvelope } from 'react-icons/fa';

// Lazy load 3D component
const ParticleField = dynamic(() => import('@/components/3d/ParticleField'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black" />,
});

export default function HeroSection() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  const titles = ['Full-Stack Developer', 'Software Engineer', 'Problem Solver'];

  // Typing effect
  useEffect(() => {
    const handleType = () => {
      const i = loopNum % titles.length;
      const fullText = titles[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, titles]);

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
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="text-indigo-400 text-lg font-medium">
              Hi, my name is
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            <span className="gradient-text">Geethanga Dissanayake</span>
          </motion.h1>

          {/* Typing Animation */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold text-gray-300 mb-8 h-16"
          >
            I'm a{' '}
            <span className="text-indigo-400 border-r-2 border-indigo-400 pr-1">
              {text}
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            I create exceptional digital experiences that combine cutting-edge technology
            with intuitive design. Specialized in building scalable web applications
            with modern frameworks.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-indigo-500/50"
            >
              View My Work
            </motion.a>
            <motion.a
              href="/assets/Geethanga_Dissanayake_CV.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-indigo-600 text-indigo-400 hover:bg-indigo-600 hover:text-white font-semibold rounded-lg transition-all"
            >
              <FaDownload className="inline mr-2" />
              Download CV
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-6"
          >
            {[
              { icon: FaGithub, href: 'https://github.com/geethanga12', label: 'GitHub' },
              { icon: FaLinkedin, href: 'https://linkedin.com/in/geethanga-dissanayake', label: 'LinkedIn' },
              { icon: FaEnvelope, href: 'mailto:dissanayakegeethanga@gmail.com', label: 'Email' },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center text-2xl text-gray-300 hover:text-white transition-all"
                aria-label={social.label}
              >
                <social.icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-indigo-400 rounded-full flex justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-indigo-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
```

---

### Skills Section with 3D Visualization

```typescript
// src/components/sections/SkillsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import { skills } from '@/data/skills';

const SkillOrbs3D = dynamic(() => import('@/components/3d/SkillOrbs3D'), {
  ssr: false,
});

export default function SkillsSection() {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const categories = {
    frontend: skills.filter(s => s.category === 'frontend'),
    backend: skills.filter(s => s.category === 'backend'),
    tools: skills.filter(s => s.category === 'tools'),
  };

  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Skills & Technologies</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Here are the technologies I work with to bring ideas to life
            </p>
          </motion.div>

          {/* 3D Visualization */}
          <motion.div
            variants={itemVariants}
            className="h-96 mb-16 rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-black"
          >
            <SkillOrbs3D skills={skills} />
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(categories).map(([category, categorySkills]) => (
              <motion.div
                key={category}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-6 capitalize gradient-text">
                  {category}
                </h3>
                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: skill.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### Projects Section with 3D Cards

```typescript
// src/components/sections/ProjectsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '@/data/projects';

export default function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const featuredProjects = projects.filter(p => p.featured);

  return (
    <section id="projects" className="py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Featured Projects</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Some of my recent work that showcases my skills and expertise
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-80" />
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-indigo-600/20 text-indigo-400 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <FaGithub /> Code
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors"
                      >
                        <FaExternalLinkAlt /> Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Projects */}
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-indigo-500/50"
            >
              View All Projects
              <FaExternalLinkAlt />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### Contact Section with Form

```typescript
// src/components/sections/ContactSection.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaPaperPlane } from 'react-icons/fa';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Get In Touch</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Have a project in mind? Let's work together to create something amazing!
            </p>
          </div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <input
                {...register('subject', { required: 'Subject is required' })}
                type="text"
                id="subject"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="What's this about?"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                {...register('message', {
                  required: 'Message is required',
                  minLength: {
                    value: 10,
                    message: 'Message must be at least 10 characters',
                  },
                })}
                id="message"
                rows={6}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                placeholder="Your message..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-indigo-500/50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 🎮 3D Animation Examples

### Particle Field

```typescript
// src/components/3d/ParticleField.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random';
import * as THREE from 'three';
import Scene from './Scene';

function Particles() {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = random.inSphere(new Float32Array(5000 * 3), { radius: 10 });
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

export default function ParticleField() {
  return (
    <div className="w-full h-full">
      <Scene cameraPosition={[0, 0, 5]}>
        <Particles />
      </Scene>
    </div>
  );
}
```

---

### 3D Skill Orbs

```typescript
// src/components/3d/SkillOrbs3D.tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import Scene from './Scene';
import { Skill } from '@/data/skills';

interface SkillOrbProps {
  skill: Skill;
  position: [number, number, number];
  index: number;
}

function SkillOrb({ skill, position, index }: SkillOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <Sphere
          ref={meshRef}
          args={[0.5, 32, 32]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.2 : 1}
        >
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={hovered ? 0.8 : 0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {skill.name}
        </Text>
      </group>
    </Float>
  );
}

interface SkillOrbs3DProps {
  skills: Skill[];
}

export default function SkillOrbs3D({ skills }: SkillOrbs3DProps) {
  // Arrange skills in a circle
  const positions: [number, number, number][] = skills.map((_, index) => {
    const angle = (index / skills.length) * Math.PI * 2;
    const radius = 3;
    return [
      Math.cos(angle) * radius,
      Math.sin(angle) * radius * 0.5,
      Math.sin(angle) * radius,
    ];
  });

  return (
    <div className="w-full h-full">
      <Scene cameraPosition={[0, 0, 8]} controls>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

        {skills.map((skill, index) => (
          <SkillOrb
            key={skill.name}
            skill={skill}
            position={positions[index]}
            index={index}
          />
        ))}
      </Scene>
    </div>
  );
}
```

---

### Animated 3D Model Loader

```typescript
// src/components/3d/Model3D.tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, PresentationControls, Stage } from '@react-three/drei';
import * as THREE from 'three';

interface Model3DProps {
  modelPath: string;
  scale?: number;
  rotation?: [number, number, number];
}

function Model({ modelPath, scale = 1, rotation = [0, 0, 0] }: Model3DProps) {
  const { scene } = useGLTF(modelPath);
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime / 2) * 0.5;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={scale}
      rotation={rotation}
    />
  );
}

export default function Model3D({ modelPath, scale, rotation }: Model3DProps) {
  return (
    <PresentationControls
      global
      config={{ mass: 2, tension: 500 }}
      snap={{ mass: 4, tension: 1500 }}
      rotation={[0, 0, 0]}
      polar={[-Math.PI / 3, Math.PI / 3]}
      azimuth={[-Math.PI / 1.4, Math.PI / 2]}
    >
      <Stage environment="city" intensity={0.6} castShadow={false}>
        <Model modelPath={modelPath} scale={scale} rotation={rotation} />
      </Stage>
    </PresentationControls>
  );
}

// Preload models
useGLTF.preload('/models/laptop.glb');
```

---

## 📄 Page Examples

### Projects Page with Dynamic Routes

```typescript
// src/app/projects/page.tsx
import { Metadata } from 'next';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my portfolio of web development projects',
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">My Projects</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of projects showcasing my skills in web development
          </p>
        </div>

        <ProjectsGrid projects={projects} />
      </div>
    </main>
  );
}
```

---

### Individual Project Page

```typescript
// src/app/projects/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { projects } from '@/data/projects';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      images: [project.image],
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.id === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8"
        >
          <FaArrowLeft /> Back to Projects
        </Link>

        {/* Project Header */}
        <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          {project.description}
        </p>

        {/* Links */}
        <div className="flex gap-4 mb-12">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              <FaGithub /> View Code
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <FaExternalLinkAlt /> Live Demo
            </a>
          )}
        </div>

        {/* Project Image */}
        <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Technologies */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="prose dark:prose-invert max-w-none">
          <h2>About This Project</h2>
          <p>{project.longDescription}</p>
        </div>
      </div>
    </main>
  );
}
```

---

## 🔌 API Routes Examples

### Contact Form API

```typescript
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Send email using a service like Resend, SendGrid, or NodeMailer
    // 2. Store in database
    // 3. Send to Slack/Discord webhook

    // Example with Resend (you'd need to install and configure it)
    // const { data, error } = await resend.emails.send({
    //   from: 'Portfolio <noreply@yourdomain.com>',
    //   to: 'your@email.com',
    //   subject: `Portfolio Contact: ${body.subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${body.name}</p>
    //     <p><strong>Email:</strong> ${body.email}</p>
    //     <p><strong>Subject:</strong> ${body.subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${body.message}</p>
    //   `,
    // });

    // For now, just log it
    console.log('Contact form submission:', body);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 🛠️ Utility Functions

### Custom Hooks

```typescript
// src/hooks/useScrollProgress.ts
import { useState, useEffect } from 'react';

export default function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}
```

```typescript
// src/hooks/useMousePosition.ts
import { useState, useEffect } from 'react';

export default function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}
```

```typescript
// src/hooks/useMediaQuery.ts
import { useState, useEffect } from 'react';

export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

// Usage:
// const isMobile = useMediaQuery('(max-width: 768px)');
```

---

### Animation Helpers

```typescript
// src/lib/animations.ts
import { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};
```

---

### Utility Functions

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

---

## ✅ Migration Checklist

### Phase 1: Setup ✓
- [ ] Install Node.js (v18+)
- [ ] Create Next.js project
- [ ] Setup Git repository
- [ ] Configure TypeScript
- [ ] Setup Tailwind CSS
- [ ] Install all dependencies
- [ ] Configure ESLint
- [ ] Setup VS Code settings

### Phase 2: File Structure ✓
- [ ] Create folder structure
- [ ] Setup path aliases in tsconfig
- [ ] Create site configuration
- [ ] Setup environment variables
- [ ] Create data files (projects, skills, etc.)
- [ ] Setup public assets folder

### Phase 3: Basic Components ✓
- [ ] Create root layout
- [ ] Create global styles
- [ ] Build Navbar component
- [ ] Build Footer component
- [ ] Create loading components
- [ ] Create error boundaries

### Phase 4: Migrate Content ✓
- [ ] Migrate Hero section
- [ ] Migrate About section
- [ ] Migrate Skills section
- [ ] Migrate Projects section
- [ ] Migrate Experience section
- [ ] Migrate Education section
- [ ] Migrate Contact section

### Phase 5: Add 3D Features ✓
- [ ] Setup React Three Fiber
- [ ] Create 3D Scene component
- [ ] Implement particle background
- [ ] Create 3D skill orbs
- [ ] Add 3D project cards
- [ ] Implement scroll animations
- [ ] Add mouse interactions

### Phase 6: Animations ✓
- [ ] Install Framer Motion
- [ ] Add page transitions
- [ ] Create scroll reveal animations
- [ ] Implement hover effects
- [ ] Add loading animations
- [ ] Create custom cursor (optional)

### Phase 7: Forms & APIs ✓
- [ ] Setup React Hook Form
- [ ] Create contact form
- [ ] Build API route for contact
- [ ] Setup email service (Resend/SendGrid)
- [ ] Add form validation
- [ ] Add toast notifications

### Phase 8: SEO ✓
- [ ] Add metadata to all pages
- [ ] Create structured data component
- [ ] Generate sitemap
- [ ] Create robots.txt
- [ ] Add Open Graph images
- [ ] Setup Twitter cards
- [ ] Test social media previews

### Phase 9: Performance ✓
- [ ] Optimize images with next/image
- [ ] Implement lazy loading
- [ ] Add Suspense boundaries
- [ ] Optimize 3D scenes
- [ ] Bundle size analysis
- [ ] Lighthouse audit
- [ ] Fix performance issues

### Phase 10: Testing & Deploy ✓
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on mobile devices
- [ ] Fix responsive issues
- [ ] Deploy to Vercel
- [ ] Setup custom domain
- [ ] Final testing on production

---

## 🚀 Deployment Guide

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy on Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Connect GitHub and select your repository
- Click "Deploy"

3. **Environment Variables**
Add these in Vercel dashboard:
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
RESEND_API_KEY=your_resend_key
```

4. **Custom Domain**
- In Vercel dashboard, go to Settings > Domains
- Add your custom domain
- Follow DNS configuration instructions

---

## 🎯 Performance Optimization Checklist

- [ ] Use next/image for all images
- [ ] Lazy load 3D components
- [ ] Implement code splitting
- [ ] Minimize bundle size
- [ ] Use font optimization
- [ ] Enable compression
- [ ] Optimize 3D models (low poly)
- [ ] Use LOD for 3D objects
- [ ] Implement virtual scrolling (if needed)
- [ ] Reduce JavaScript execution time
- [ ] Minimize layout shifts
- [ ] Optimize CSS delivery
- [ ] Use CDN for assets

---

## 📚 Additional Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Tutorials
- [Next.js Learn](https://nextjs.org/learn)
- [Three.js Journey](https://threejs-journey.com/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Sketchfab](https://sketchfab.com/) - Free 3D models

---

Good luck with your amazing Next.js portfolio! 🎉
