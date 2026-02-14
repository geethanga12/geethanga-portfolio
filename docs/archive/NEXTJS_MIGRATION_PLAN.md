# Next.js Portfolio Migration & Enhancement Plan

## 📋 Table of Contents
1. [Overview](#overview)
2. [Why Next.js?](#why-nextjs)
3. [Project Goals](#project-goals)
4. [Tech Stack](#tech-stack)
5. [File Structure](#file-structure)
6. [Implementation Phases](#implementation-phases)
7. [Beginner's Guide](#beginners-guide)
8. [Performance Optimization Strategy](#performance-optimization-strategy)
9. [3D Animation Features](#3d-animation-features)
10. [SEO Strategy](#seo-strategy)
11. [Step-by-Step Implementation](#step-by-step-implementation)

---

## 🎯 Overview

This document outlines the complete migration plan to transform your React + Vite portfolio into a stunning Next.js 14+ portfolio with:
- ✨ **Breathtaking 3D animations** using Three.js, WebGL, and React Three Fiber
- 🚀 **Lightning-fast performance** with optimal loading speeds
- 🎨 **Modern, unique UI/UX** that stands out from typical portfolios
- 📱 **Perfect SEO** for maximum visibility
- 🌊 **Smooth interactions** and animations throughout
- 💯 **Professional quality** that impresses recruiters and clients

---

## 🤔 Why Next.js?

### Current Setup (React + Vite)
- ❌ Client-side only rendering (poor SEO)
- ❌ Slower initial page load
- ❌ No automatic code splitting by route
- ❌ Limited image optimization
- ❌ Manual meta tag management

### Next.js Benefits
- ✅ **Server-Side Rendering (SSR)** - Perfect SEO, faster initial load
- ✅ **Static Site Generation (SSG)** - Pre-rendered pages load instantly
- ✅ **Automatic Code Splitting** - Only load what's needed
- ✅ **Image Optimization** - Automatic image compression and lazy loading
- ✅ **API Routes** - Built-in backend for contact forms
- ✅ **File-based Routing** - Intuitive page organization
- ✅ **Better Performance** - Optimized by default

---

## 🎯 Project Goals

1. **Unique Visual Identity**
   - Interactive 3D hero section with particle systems
   - Floating 3D models showcasing your work
   - Custom WebGL shaders for unique effects
   - Smooth scroll-based animations
   - Parallax effects and depth

2. **Maximum Performance**
   - First Contentful Paint (FCP) < 1.5s
   - Time to Interactive (TTI) < 3.5s
   - Lighthouse score 95+
   - Smooth 60fps animations

3. **Professional SEO**
   - Dynamic meta tags per section
   - Open Graph for social sharing
   - Structured data (JSON-LD)
   - Sitemap and robots.txt

4. **Impressive Features**
   - 3D project showcases
   - Interactive skill visualizations
   - Smooth page transitions
   - Custom cursor effects
   - Sound effects (optional)

---

## 🛠️ Tech Stack

### Core Framework
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **React 18** - Latest React features

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Advanced animations
- **CSS Modules** - Component-scoped styles (when needed)

### 3D Graphics
- **Three.js** - 3D library for WebGL
- **React Three Fiber (R3F)** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **@react-three/postprocessing** - Post-processing effects
- **GSAP** - Professional-grade animation library

### Performance
- **Next.js Image** - Automatic image optimization
- **Dynamic Imports** - Code splitting
- **React Suspense** - Progressive loading
- **Web Workers** - Offload heavy computations

### SEO & Analytics
- **next-seo** - SEO component library
- **next-sitemap** - Automatic sitemap generation
- **Google Analytics 4** - Track visitors (optional)

### Forms & Notifications
- **React Hook Form** - Form validation
- **React Hot Toast** - Beautiful notifications
- **EmailJS or Resend** - Contact form emails

---

## 📁 File Structure

Here's the complete Next.js project structure with explanations:

```
portfolio-nextjs/
│
├── 📁 public/                          # Static files (images, fonts, etc.)
│   ├── assets/
│   │   ├── images/                     # Your photos and images
│   │   ├── models/                     # 3D model files (.gltf, .glb)
│   │   ├── resume/                     # Your CV/Resume PDFs
│   │   └── icons/                      # Favicon and app icons
│   ├── favicon.ico                     # Website icon
│   └── robots.txt                      # Search engine instructions
│
├── 📁 src/
│   │
│   ├── 📁 app/                         # Next.js App Router (main folder)
│   │   ├── layout.tsx                  # Root layout (wraps all pages)
│   │   ├── page.tsx                    # Home page (/)
│   │   ├── globals.css                 # Global styles
│   │   ├── not-found.tsx               # 404 page
│   │   │
│   │   ├── 📁 about/                   # About page route
│   │   │   └── page.tsx                # About page component
│   │   │
│   │   ├── 📁 projects/                # Projects section
│   │   │   ├── page.tsx                # Projects list page
│   │   │   └── [slug]/                 # Dynamic project pages
│   │   │       └── page.tsx            # Individual project detail
│   │   │
│   │   └── 📁 api/                     # API routes (backend)
│   │       └── contact/                # Contact form endpoint
│   │           └── route.ts            # Handle form submissions
│   │
│   ├── 📁 components/                  # Reusable components
│   │   │
│   │   ├── 📁 layout/                  # Layout components
│   │   │   ├── Navbar.tsx              # Navigation bar
│   │   │   ├── Footer.tsx              # Footer
│   │   │   └── PageWrapper.tsx         # Page transition wrapper
│   │   │
│   │   ├── 📁 sections/                # Main page sections
│   │   │   ├── HeroSection.tsx         # Hero with 3D background
│   │   │   ├── AboutSection.tsx        # About me
│   │   │   ├── SkillsSection.tsx       # Skills showcase
│   │   │   ├── ProjectsSection.tsx     # Featured projects
│   │   │   ├── ExperienceSection.tsx   # Work experience
│   │   │   ├── EducationSection.tsx    # Education
│   │   │   └── ContactSection.tsx      # Contact form
│   │   │
│   │   ├── 📁 3d/                      # 3D components
│   │   │   ├── Scene.tsx               # Main 3D scene setup
│   │   │   ├── ParticleField.tsx       # Animated particles
│   │   │   ├── FloatingIsland.tsx      # 3D floating island
│   │   │   ├── AnimatedSphere.tsx      # Interactive sphere
│   │   │   ├── ProjectCard3D.tsx       # 3D project cards
│   │   │   └── SkillOrbs.tsx           # 3D skill visualization
│   │   │
│   │   ├── 📁 ui/                      # UI components
│   │   │   ├── Button.tsx              # Custom button
│   │   │   ├── Card.tsx                # Card component
│   │   │   ├── Input.tsx               # Form input
│   │   │   ├── Modal.tsx               # Modal dialog
│   │   │   ├── LoadingSpinner.tsx      # Loading indicator
│   │   │   └── ScrollProgress.tsx      # Scroll progress bar
│   │   │
│   │   ├── 📁 animations/              # Animation components
│   │   │   ├── PageTransition.tsx      # Page transition effects
│   │   │   ├── ScrollReveal.tsx        # Scroll-triggered animations
│   │   │   ├── TextReveal.tsx          # Text animation effects
│   │   │   └── CustomCursor.tsx        # Custom cursor follower
│   │   │
│   │   └── 📁 seo/                     # SEO components
│   │       ├── SEOHead.tsx             # Dynamic meta tags
│   │       └── StructuredData.tsx      # JSON-LD schema markup
│   │
│   ├── 📁 lib/                         # Utility functions
│   │   ├── utils.ts                    # General utilities
│   │   ├── animations.ts               # Animation configs
│   │   ├── three-helpers.ts            # Three.js utilities
│   │   └── constants.ts                # App constants
│   │
│   ├── 📁 data/                        # Static data
│   │   ├── projects.ts                 # Project information
│   │   ├── skills.ts                   # Skills data
│   │   ├── experience.ts               # Work experience
│   │   └── education.ts                # Education info
│   │
│   ├── 📁 hooks/                       # Custom React hooks
│   │   ├── useScrollProgress.ts        # Track scroll position
│   │   ├── useMousePosition.ts         # Track mouse position
│   │   ├── useMediaQuery.ts            # Responsive breakpoints
│   │   └── useInView.ts                # Element visibility
│   │
│   ├── 📁 styles/                      # Additional styles
│   │   └── animations.css              # Keyframe animations
│   │
│   └── 📁 types/                       # TypeScript types
│       ├── index.ts                    # Main type definitions
│       └── three.d.ts                  # Three.js type extensions
│
├── 📁 config/                          # Configuration files
│   └── site.config.ts                  # Site metadata
│
├── .env.local                          # Environment variables
├── .gitignore                          # Git ignore file
├── next.config.js                      # Next.js configuration
├── tailwind.config.ts                  # Tailwind configuration
├── tsconfig.json                       # TypeScript configuration
├── package.json                        # Dependencies
└── README.md                           # Project documentation
```

### 📝 File Structure Explanation

#### `/public` Folder
- **Purpose**: Static files that don't change
- **Files here**: Are served directly at the root URL
- **Example**: `/public/logo.png` → accessible at `yoursite.com/logo.png`

#### `/src/app` Folder (App Router)
- **Purpose**: The heart of your Next.js app
- **How it works**: Each folder becomes a route
  - `app/page.tsx` → Home page (`/`)
  - `app/about/page.tsx` → About page (`/about`)
  - `app/projects/[slug]/page.tsx` → Dynamic project pages (`/projects/my-project`)
- **layout.tsx**: Wraps pages with common elements (navbar, footer)
- **API routes**: Backend endpoints in `app/api/`

#### `/src/components` Folder
- **Purpose**: Reusable UI pieces
- **Organization**:
  - `layout/` - Page structure components
  - `sections/` - Main content sections
  - `3d/` - Three.js 3D components
  - `ui/` - Basic UI elements (buttons, cards)
  - `animations/` - Animation wrappers

#### `/src/lib` Folder
- **Purpose**: Helper functions and utilities
- **Why separate**: Keeps components clean and focused
- **Example**: Animation configurations, data formatting

#### `/src/data` Folder
- **Purpose**: Your content (projects, skills, etc.)
- **Format**: TypeScript arrays/objects
- **Benefit**: Easy to update without touching components

#### `/src/hooks` Folder
- **Purpose**: Custom React hooks for reusable logic
- **Example**: `useScrollProgress()` to track scroll position
- **Benefit**: Share logic between components

---

## 📚 Implementation Phases

### Phase 1: Setup & Migration (Week 1)
**Goal**: Get Next.js running with basic pages

**Tasks**:
1. Create new Next.js project
2. Setup TypeScript and Tailwind
3. Migrate existing components
4. Setup file structure
5. Basic routing

**Deliverable**: Working Next.js site with existing features

---

### Phase 2: 3D Foundation (Week 2)
**Goal**: Implement basic 3D scenes

**Tasks**:
1. Setup React Three Fiber
2. Create particle background
3. Add 3D hero section
4. Implement basic 3D models
5. Optimize 3D performance

**Deliverable**: Impressive 3D landing section

---

### Phase 3: Advanced 3D & Interactions (Week 3)
**Goal**: Add stunning 3D features

**Tasks**:
1. Interactive 3D project cards
2. 3D skill visualization
3. Scroll-based 3D animations
4. Custom shaders
5. Mouse-interactive elements

**Deliverable**: Unique 3D experiences throughout

---

### Phase 4: Animations & Polish (Week 4)
**Goal**: Make everything smooth and beautiful

**Tasks**:
1. Page transitions
2. Scroll animations
3. Custom cursor
4. Micro-interactions
5. Loading states

**Deliverable**: Buttery smooth animations

---

### Phase 5: Performance Optimization (Week 5)
**Goal**: Make it blazing fast

**Tasks**:
1. Image optimization
2. Code splitting
3. Lazy loading
4. Bundle analysis
5. Lighthouse optimization

**Deliverable**: 95+ Lighthouse score

---

### Phase 6: SEO & Final Touches (Week 6)
**Goal**: Perfect SEO and launch

**Tasks**:
1. Meta tags optimization
2. Structured data
3. Sitemap generation
4. Social media previews
5. Final testing

**Deliverable**: Production-ready portfolio

---

## 📖 Beginner's Guide

### What is Next.js?

**Simple Explanation**:
Next.js is like React, but with superpowers. It makes your website faster and better for Google search.

**Key Concepts**:

#### 1. **Server-Side Rendering (SSR)**
```
Traditional React:
Browser → Downloads empty HTML → Downloads JavaScript → Renders page
(User sees nothing for 2-3 seconds)

Next.js:
Server → Sends pre-rendered HTML → Browser shows immediately → JavaScript loads
(User sees content in 0.5 seconds)
```

#### 2. **File-Based Routing**
```
React Router (old way):
- Create <Route> components
- Configure routes manually
- Easy to mess up

Next.js (new way):
- Create file: app/about/page.tsx
- Automatically becomes /about route
- No configuration needed!
```

#### 3. **Automatic Code Splitting**
```
React:
- Downloads ALL JavaScript at once (slow)

Next.js:
- Downloads only JavaScript for current page (fast)
- Other pages load when needed
```

---

### What is TypeScript?

**Simple Explanation**:
TypeScript is JavaScript with a safety net. It catches errors before you run the code.

**Example**:

JavaScript (can cause bugs):
```javascript
function greet(name) {
  return "Hello " + name.toUpperCase();
}

greet(123); // Error! Numbers don't have toUpperCase()
// You only discover this error when code runs
```

TypeScript (catches errors early):
```typescript
function greet(name: string) {
  return "Hello " + name.toUpperCase();
}

greet(123); // IDE shows error immediately!
// TypeScript: "Argument of type 'number' is not assignable to parameter of type 'string'"
```

**Benefits**:
- 🔍 Catches bugs before running code
- 💡 Better autocomplete in VS Code
- 📚 Self-documenting code
- 🛡️ Prevents common mistakes

---

### Understanding the App Router

**How Next.js Routing Works**:

```
File System:                    URL:
app/
  page.tsx                  →   /
  about/
    page.tsx                →   /about
  projects/
    page.tsx                →   /projects
    [slug]/
      page.tsx              →   /projects/any-project-name
```

**Special Files**:
- `page.tsx` - The actual page content
- `layout.tsx` - Wraps pages (navbar, footer)
- `loading.tsx` - Shown while page loads
- `error.tsx` - Shown if something breaks
- `not-found.tsx` - Custom 404 page

---

### Understanding Components

**What is a Component?**
A reusable piece of UI. Like LEGO blocks you can combine.

**Example**:

```typescript
// Button.tsx - A reusable button component
interface ButtonProps {
  text: string;        // The button label
  onClick: () => void; // Function to call when clicked
  variant?: 'primary' | 'secondary'; // Optional style variant
}

export default function Button({ text, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={variant === 'primary' ? 'bg-blue-600' : 'bg-gray-600'}
    >
      {text}
    </button>
  );
}

// Usage in another component:
<Button text="Click Me" onClick={() => alert('Clicked!')} />
<Button text="Submit" onClick={handleSubmit} variant="secondary" />
```

---

### Understanding Hooks

**What are Hooks?**
Special functions that let you use React features. Always start with `use`.

**Common Hooks**:

#### `useState` - Remember values
```typescript
const [count, setCount] = useState(0);
// count = current value
// setCount = function to update it

<button onClick={() => setCount(count + 1)}>
  Clicked {count} times
</button>
```

#### `useEffect` - Run code when something changes
```typescript
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]); // Run when count changes
```

#### `useRef` - Reference DOM elements
```typescript
const inputRef = useRef(null);

<input ref={inputRef} />
<button onClick={() => inputRef.current.focus()}>
  Focus Input
</button>
```

---

### Understanding Three.js Basics

**What is Three.js?**
A library for creating 3D graphics in the browser using WebGL.

**Key Concepts**:

#### 1. **Scene**
The 3D world container. Everything lives in the scene.

#### 2. **Camera**
Your viewpoint into the 3D world.

#### 3. **Renderer**
Draws the 3D scene onto the screen.

#### 4. **Mesh**
A 3D object (geometry + material).

**Simple Example**:
```typescript
// Traditional Three.js (complex)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// React Three Fiber (easy!)
<Canvas>
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshBasicMaterial color="green" />
  </mesh>
</Canvas>
```

---

## ⚡ Performance Optimization Strategy

### 1. **Image Optimization**

#### Current Problem:
- Images load at full size
- No lazy loading
- Slows down page load

#### Next.js Solution:
```typescript
// Old way
<img src="/photo.jpg" alt="Me" />

// Next.js way (automatic optimization!)
import Image from 'next/image';

<Image
  src="/photo.jpg"
  alt="Me"
  width={800}
  height={600}
  placeholder="blur" // Shows blur while loading
  priority // Load immediately (for hero images)
/>
```

**Benefits**:
- ✅ Automatic compression
- ✅ Modern formats (WebP, AVIF)
- ✅ Responsive images
- ✅ Lazy loading by default

---

### 2. **Code Splitting**

#### Strategy:
Load components only when needed.

```typescript
// Instead of:
import HeavyComponent from './HeavyComponent';

// Use:
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false // Don't render on server (for 3D components)
});
```

**When to use**:
- ✅ 3D components (Three.js is heavy)
- ✅ Large libraries
- ✅ Below-the-fold content
- ✅ Modals and popups

---

### 3. **3D Performance Optimization**

#### Techniques:

**a) Lower polygon counts**
```typescript
// High poly (slow)
<sphereGeometry args={[1, 64, 64]} />

// Low poly (fast, looks good from distance)
<sphereGeometry args={[1, 16, 16]} />
```

**b) Use LOD (Level of Detail)**
```typescript
// Show detailed model when close, simple when far
<Lod>
  <mesh geometry={highPolyModel} material={material} />
  <mesh geometry={mediumPolyModel} material={material} />
  <mesh geometry={lowPolyModel} material={material} />
</Lod>
```

**c) Frustum culling**
```typescript
// Don't render what's not visible
<mesh frustumCulled>
```

**d) Instance rendering**
```typescript
// Render many objects efficiently
<Instances limit={1000}>
  <sphereGeometry />
  <meshBasicMaterial />
</Instances>
```

**e) Use `useFrame` wisely**
```typescript
// BAD (runs every frame)
useFrame(() => {
  mesh.rotation.x += 0.01;
  // Heavy calculations
});

// GOOD (throttle updates)
useFrame((state, delta) => {
  mesh.rotation.x += delta; // Use delta time
  if (state.clock.elapsedTime % 0.1 < delta) {
    // Only update every 0.1 seconds
  }
});
```

---

### 4. **Font Optimization**

```typescript
// app/layout.tsx
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevent invisible text while loading
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

**Benefits**:
- ✅ Automatic self-hosting
- ✅ No external requests
- ✅ Optimized loading

---

### 5. **Lazy Loading Strategy**

```typescript
// Hero section - Load immediately
<HeroSection />

// Below fold - Lazy load
<Suspense fallback={<Loading />}>
  <AboutSection />
  <SkillsSection />
</Suspense>

// 3D Heavy - Load with delay
useEffect(() => {
  const timer = setTimeout(() => {
    setLoad3D(true);
  }, 1000); // Load after 1 second
}, []);
```

---

### 6. **Bundle Size Analysis**

```bash
# Install bundle analyzer
npm install @next/bundle-analyzer

# Analyze bundle
ANALYZE=true npm run build
```

**What to look for**:
- 🔍 Large dependencies
- 🔍 Duplicate code
- 🔍 Unused imports

---

## 🎨 3D Animation Features

### Feature 1: Animated Particle Hero Background

**What it does**:
Thousands of particles floating in 3D space, responding to mouse movement.

**Code Example**:
```typescript
// components/3d/ParticleField.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random';

export default function ParticleField() {
  const ref = useRef();
  const particles = random.inSphere(new Float32Array(5000), { radius: 10 });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <Points ref={ref} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}
```

**Performance**: ✅ Very efficient, uses GPU

---

### Feature 2: Interactive 3D Project Cards

**What it does**:
Project cards that rotate in 3D when you hover, creating depth.

**Code Example**:
```typescript
// components/3d/ProjectCard3D.tsx
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';

export default function ProjectCard3D({ title, position }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    meshRef.current.rotation.y += hovered ? 0.02 : 0.001;
  });

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={[3, 4, 0.2]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? '#667eea' : '#4c51bf'}
          metalness={0.8}
          roughness={0.2}
        />
      </RoundedBox>
      <Text position={[0, 0, 0.15]} fontSize={0.3}>
        {title}
      </Text>
    </group>
  );
}
```

---

### Feature 3: Floating 3D Skill Orbs

**What it does**:
Your skills displayed as floating glowing orbs that bounce and react to scroll.

**Code Example**:
```typescript
// components/3d/SkillOrbs.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text } from '@react-three/drei';

export default function SkillOrb({ skill, position, color }) {
  const ref = useRef();

  useFrame((state) => {
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.5;
  });

  return (
    <group ref={ref} position={position}>
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>
      <Text position={[0, -0.8, 0]} fontSize={0.2}>
        {skill}
      </Text>
    </group>
  );
}
```

---

### Feature 4: Custom Shader Effects

**What it does**:
Unique visual effects that no other portfolio has.

**Example - Holographic Effect**:
```typescript
// lib/shaders/holographic.ts
export const holographicVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const holographicFragmentShader = `
  uniform float time;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vec3 color = vec3(0.5 + 0.5 * sin(vPosition.y * 10.0 + time));
    gl_FragColor = vec4(color, 0.8);
  }
`;

// Usage
<mesh>
  <sphereGeometry />
  <shaderMaterial
    vertexShader={holographicVertexShader}
    fragmentShader={holographicFragmentShader}
    uniforms={{ time: { value: 0 } }}
    transparent
  />
</mesh>
```

---

### Feature 5: Scroll-Based 3D Animations

**What it does**:
3D elements animate as you scroll down the page.

**Code Example**:
```typescript
// components/animations/ScrollReveal3D.tsx
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function ScrollReveal3D({ children }) {
  const scroll = useScroll();
  const groupRef = useRef();

  useFrame(() => {
    groupRef.current.position.y = -scroll.offset * 5;
    groupRef.current.rotation.x = scroll.offset * Math.PI;
  });

  return <group ref={groupRef}>{children}</group>;
}
```

---

### Feature 6: Mouse-Interactive Background

**What it does**:
3D elements follow your mouse, creating an immersive experience.

**Code Example**:
```typescript
// hooks/useMousePosition.ts
import { useEffect, useState } from 'react';

export default function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
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

// Usage in 3D component
const mouse = useMousePosition();

useFrame(() => {
  camera.position.x = mouse.x * 2;
  camera.position.y = mouse.y * 2;
});
```

---

## 🔍 SEO Strategy

### 1. **Dynamic Meta Tags**

```typescript
// components/seo/SEOHead.tsx
import { Metadata } from 'next';

export function generateMetadata({ title, description, image }): Metadata {
  return {
    title: `${title} | Geethanga Dissanayake`,
    description,
    openGraph: {
      title,
      description,
      images: [image],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

// Usage in page
export const metadata = generateMetadata({
  title: 'Full-Stack Developer Portfolio',
  description: 'Geethanga Dissanayake - Passionate full-stack developer...',
  image: '/og-image.jpg',
});
```

---

### 2. **Structured Data (JSON-LD)**

```typescript
// components/seo/StructuredData.tsx
export default function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Geethanga Dissanayake',
    jobTitle: 'Full-Stack Developer',
    url: 'https://yourportfolio.com',
    sameAs: [
      'https://github.com/geethanga12',
      'https://linkedin.com/in/geethanga-dissanayake',
    ],
    knowsAbout: ['React', 'Next.js', 'TypeScript', 'Node.js'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

### 3. **Sitemap Generation**

```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://yourportfolio.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
};
```

---

### 4. **Performance SEO**

Google ranks faster sites higher. Target metrics:
- ✅ First Contentful Paint: < 1.5s
- ✅ Largest Contentful Paint: < 2.5s
- ✅ Cumulative Layout Shift: < 0.1
- ✅ First Input Delay: < 100ms

---

## 🚀 Step-by-Step Implementation

### Step 1: Create Next.js Project

```bash
# Create new Next.js app with TypeScript and Tailwind
npx create-next-app@latest portfolio-nextjs --typescript --tailwind --app --eslint

# Navigate to project
cd portfolio-nextjs

# Install dependencies
npm install framer-motion react-hot-toast
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install @types/three
npm install react-hook-form
npm install next-seo next-sitemap
npm install maath
```

---

### Step 2: Configure TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/data/*": ["./src/data/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

### Step 3: Setup Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0ff',
          200: '#d6e0ff',
          300: '#b3c7ff',
          400: '#8aa3ff',
          500: '#667eea',
          600: '#5a67d8',
          700: '#4c51bf',
          800: '#434190',
          900: '#3c366b',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(102, 126, 234, 0.8)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

### Step 4: Create Site Configuration

```typescript
// config/site.config.ts
export const siteConfig = {
  name: 'Geethanga Dissanayake',
  title: 'Full-Stack Developer | Software Engineer',
  description: 'Passionate full-stack developer with expertise in modern web technologies. Creating innovative solutions with React, Next.js, TypeScript, and Node.js.',
  url: 'https://geethanga.me',
  ogImage: '/og-image.jpg',
  links: {
    github: 'https://github.com/geethanga12',
    linkedin: 'https://www.linkedin.com/in/geethanga-dissanayake/',
    email: 'mailto:dissanayakegeethanga@gmail.com',
    whatsapp: 'https://wa.me/+94779907343',
  },
  keywords: [
    'Full-Stack Developer',
    'Software Engineer',
    'React Developer',
    'Next.js Developer',
    'TypeScript',
    'Web Development',
    'Portfolio',
  ],
};

export type SiteConfig = typeof siteConfig;
```

---

### Step 5: Create Data Files

```typescript
// src/data/projects.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration',
    longDescription: 'A comprehensive e-commerce platform built with Next.js...',
    image: '/projects/ecommerce.jpg',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    demoUrl: 'https://demo.com',
    githubUrl: 'https://github.com/yourusername/project',
    featured: true,
  },
  // Add your projects here
];
```

```typescript
// src/data/skills.ts
export interface Skill {
  name: string;
  level: number; // 1-100
  category: 'frontend' | 'backend' | 'tools' | 'other';
  color: string;
}

export const skills: Skill[] = [
  { name: 'React', level: 90, category: 'frontend', color: '#61DAFB' },
  { name: 'Next.js', level: 85, category: 'frontend', color: '#000000' },
  { name: 'TypeScript', level: 85, category: 'frontend', color: '#3178C6' },
  { name: 'Node.js', level: 80, category: 'backend', color: '#339933' },
  // Add your skills here
];
```

---

### Step 6: Create Root Layout

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { siteConfig } from '@/config/site.config';
import StructuredData from '@/components/seo/StructuredData';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="font-inter antialiased">
        <Toaster position="bottom-right" />
        {children}
      </body>
    </html>
  );
}
```

---

### Step 7: Create Global Styles

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-white dark:bg-gray-900 text-gray-900 dark:text-white;
  }
}

@layer components {
  .gradient-text {
    @apply bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent;
  }

  .glass {
    @apply bg-white/10 backdrop-blur-lg border border-white/20;
  }

  .card-hover {
    @apply transition-all duration-300 hover:scale-105 hover:shadow-2xl;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-indigo-500 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-indigo-600;
}
```

---

### Step 8: Create Basic Components

```typescript
// src/components/layout/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold gradient-text">
            GD
          </Link>

          <div className="hidden md:flex space-x-8">
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-indigo-600 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
```

---

### Step 9: Create 3D Components

```typescript
// src/components/3d/Scene.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

interface SceneProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  controls?: boolean;
}

export default function Scene({
  children,
  cameraPosition = [0, 0, 5],
  controls = false,
}: SceneProps) {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={cameraPosition} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={null}>
        {children}
      </Suspense>
      {controls && <OrbitControls />}
    </Canvas>
  );
}
```

---

### Step 10: Create Main Page

```typescript
// src/app/page.tsx
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';

// Lazy load heavy components
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'));
const SkillsSection = dynamic(() => import('@/components/sections/SkillsSection'));
const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection'));
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'));

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
```

---

## 📊 Expected Results

### Performance Metrics
- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 300KB (gzipped)

### SEO Improvements
- **Google Search Ranking**: Top results for your name
- **Social Media Previews**: Beautiful cards on LinkedIn, Twitter
- **Structured Data**: Rich snippets in search results

### User Experience
- **Smooth animations**: 60fps throughout
- **Unique design**: Stands out from 95% of portfolios
- **Mobile responsive**: Perfect on all devices
- **Fast loading**: Visitors see content immediately

---

## 🎓 Learning Resources

### Next.js
- [Next.js Official Docs](https://nextjs.org/docs)
- [Next.js Learn Course](https://nextjs.org/learn) (Highly recommended!)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript for React Developers](https://www.totaltypescript.com/)

### Three.js & React Three Fiber
- [Three.js Journey](https://threejs-journey.com/) (Best course!)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Examples](https://threejs.org/examples/)

### Animations
- [Framer Motion Docs](https://www.framer.com/motion/)
- [GSAP Learn](https://greensock.com/learning/)

---

## 🚦 Getting Started

### Quick Start Commands

```bash
# 1. Create project
npx create-next-app@latest portfolio-nextjs --typescript --tailwind --app

# 2. Install dependencies
cd portfolio-nextjs
npm install framer-motion react-hot-toast three @react-three/fiber @react-three/drei

# 3. Run development server
npm run dev

# 4. Open browser
# Visit http://localhost:3000
```

### Development Workflow

1. **Start dev server**: `npm run dev`
2. **Make changes**: Edit files in `src/`
3. **See updates**: Browser auto-refreshes
4. **Build for production**: `npm run build`
5. **Test production**: `npm run start`

---

## 📝 Next Steps

1. **Read this document thoroughly**
2. **Watch Next.js Learn course** (4-5 hours)
3. **Setup project** following Step 1-10
4. **Migrate components** one by one
5. **Add 3D features** incrementally
6. **Optimize performance** using Lighthouse
7. **Deploy** to Vercel (free!)

---

## 🎯 Success Checklist

- [ ] Next.js project created
- [ ] TypeScript configured
- [ ] Tailwind setup
- [ ] Basic routing working
- [ ] All sections migrated
- [ ] 3D particle background
- [ ] 3D project cards
- [ ] Smooth animations
- [ ] Contact form working
- [ ] SEO meta tags
- [ ] Lighthouse score 95+
- [ ] Mobile responsive
- [ ] Deployed online

---

## 💡 Pro Tips

1. **Start simple**: Get basic Next.js working before adding 3D
2. **Test on mobile**: Performance matters most on phones
3. **Use Lighthouse**: Run it after every major change
4. **Profile performance**: Use Chrome DevTools Performance tab
5. **Learn TypeScript**: Will save you hours of debugging
6. **Read error messages**: They usually tell you exactly what's wrong
7. **Use AI assistants**: Claude, ChatGPT for quick questions
8. **Join communities**: Next.js Discord, React Discord

---

## 🆘 Common Issues & Solutions

### Issue: "Module not found"
**Solution**: Install the package
```bash
npm install <package-name>
```

### Issue: "Type error in TypeScript"
**Solution**: Add type annotation
```typescript
const myVar: string = 'hello';
```

### Issue: "3D scene is black"
**Solution**: Add lights
```typescript
<ambientLight intensity={0.5} />
<pointLight position={[10, 10, 10]} />
```

### Issue: "Slow performance"
**Solution**: Use dynamic imports
```typescript
const Heavy = dynamic(() => import('./Heavy'), { ssr: false });
```

---

## 🎉 Conclusion

This portfolio will:
- ✅ **Impress everyone** who sees it
- ✅ **Rank high** on Google
- ✅ **Load incredibly fast**
- ✅ **Work perfectly** on all devices
- ✅ **Stand out** from other developers
- ✅ **Show your skills** in the best way

Take your time, follow the steps, and don't hesitate to ask questions. You're building something amazing! 🚀

---

**Good luck with your stunning Next.js portfolio!** 💪

---

## 📞 Questions?

If anything is unclear, feel free to ask! Remember:
- No question is stupid
- Learning takes time
- Start with basics, add complexity later
- Have fun building! 🎨
