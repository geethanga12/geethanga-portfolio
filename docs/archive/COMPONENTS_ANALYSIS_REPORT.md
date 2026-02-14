# Components Analysis Report

This report documents every detail found in the main front-end components: `About`, `Contact`, `Education`, `Experience`, `Projects`, and `Skills`.


- Purpose: "About Me" section showing professional summary, quick facts, social links, and action buttons (download/view CV and jump to projects).
- Structure:
  - Section wrapper: `<section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">`.
  - Title block: heading `About Me` with underline bar (width `w-20 h-1 bg-indigo-600`).
  - Two-column grid (`md:grid-cols-2`) with: Professional Journey (text + social links) and Quick Facts (card with facts + action buttons).
- Animations & libs:
  - Uses `framer-motion` for entry and hover animations.
  - Uses `react-intersection-observer` (`useInView`) with `triggerOnce: true` and `threshold: 0.1` to animate when in viewport.
  - Container and item variants defined (`containerVariants`, `itemVariants`) with stagger and duration settings.
- Content (text):
  - Professional Journey: three paragraphs describing being a Software Developer, BSc (Hons) in Computer Science at University of Wolverhampton, full-stack experience, training, passion to learn and implement modern solutions.
- Social Links: rendered from an array mapping to icons and hrefs:
  - `FaGithub` → `https://github.com/geethanga12`
  - `FaLinkedin` → `https://www.linkedin.com/in/geethanga-dissanayake/`
  - `FaWhatsapp` → `https://wa.me/+94779907343`
  - `FaEnvelope` → `mailto:dissanayakegeethanga@gmail.com`
  - Each icon uses classes: `w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full ... text-xl text-indigo-600 dark:text-indigo-400` and hover/tap animations.
- Quick Facts card:
  - Facts array items with icons and texts:
    - `FaMapMarkerAlt` — "Sri Lanka"
    - `FaGraduationCap` — "BSc Computer Science Student"
    - `FaCode` — "Full-Stack Developer"
    - `FaCoffee` — "Coffee Enthusiast"
  - Action buttons (three):
    - Download CV: `<a href="/assets/Geethanga_Dissanayake_CV.pdf" download>` with `FaDownload` icon.
    - View CV: `https://cv.geethanga.me/` (opens new tab) with `FaEye` icon.
    - Show Projects: anchor to `#projects` with `FaLaptopCode` icon.
  - Card styling: `bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg` and buttons use indigo/gray styles and framer-motion hover/tap effects.
- Notable CSS/Tailwind usage:
  - Light/dark theme classes throughout: `bg-gray-50 dark:bg-gray-800`, `text-gray-600 dark:text-gray-300`, `dark:bg-indigo-900`, etc.
- Export: default export of functional component.

---



- Purpose: Contact information and a contact form for visitors to send messages.
- Structure:
  - Section wrapper: `<section id="contact" className="py-20">`.
  - Heading: `Get In Touch` with subtitle text encouraging contact.
  - Two-column grid: left column shows contact info cards, right column holds the contact form.
- Animations & libs:
  - `framer-motion` and `react-intersection-observer` used similarly to other components.
  - `react-hot-toast` (`toast`) used to show success/error messages on submit.
- Contact data (`contactInfo` array):
  - Email: `dissanayakegeethanga@gmail.com` — `mailto:` link — color `text-red-600 dark:text-red-400` — icon `FaEnvelope`.
  - WhatsApp: `+94 77 990 7343` — `https://wa.me/+94779907343` — `FaWhatsapp`.
  - LinkedIn: `Geethanga Dissanayake` — `https://www.linkedin.com/in/geethanga-dissanayake/` — `FaLinkedin`.
  - GitHub: `geethanga12` — `https://github.com/geethanga12` — `FaGithub`.
  - Each item is displayed with a circular icon background `w-12 h-12 bg-indigo-100 dark:bg-indigo-900`.
- Contact Form:
  - React `useState` manages `formData` with fields: `name`, `email`, `subject`, `message`.
  - `handleChange` updates state from inputs (`onChange` handler for inputs/textarea).
  - `handleSubmit` prevents default, validates all fields not empty; on validation failure shows `toast.error('Please fill in all fields.')`; on success shows `toast.success("Thank you for your message! I'll get back to you soon.")` and resets the form.
  - Inputs include `required` attribute and Tailwind styling for focus and dark mode support.
  - Submit button uses `FaPaperPlane` and framer-motion hover/tap animations.
- Notes:
  - There is no network call; the form uses client-side toast and resets state only (no backend integration present in this component).

---


- Purpose: Lists formal education entries with descriptions and icons.
- Data: `education` array with two entries:
  1. Degree: `BSc (Hons) Computer Science (Software Engineering)`
     - Institution: `University of Wolverhampton`
     - Period: `2024 - 2025`
     - Description: Advanced studies in software engineering, algorithms, data structures, scalable apps, software architecture.
     - Icon: `FaGraduationCap`
     - Color classes: `bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400`
  2. Degree: `Pearson BTEC HND in Computing (Software Engineering)`
     - Institution: `CINEC Campus`
     - Period: `2022 - 2024`
     - Description: Computing fundamentals, programming, DB systems, software lifecycle, problem-solving.
     - Icon: `FaCertificate`
     - Color classes: `bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400`
- Presentation:
  - Each education item is rendered as a card: `bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg`.
  - Icon is inside a `w-12 h-12` rounded circle with a rotate-on-hover framer-motion effect (`whileHover={{ rotate: 360 }}`).
  - Institution line uses a computed class `edu.color.split(' ')[2] + ' mb-2'` to apply `text-*` color class extracted from the `color` string.
- Animations: container/item variants with stagger, `whileHover` scaling and x-offset.

---

Experience:

Sep 2025 - Present - Software Engineer Intern (Ultimate Digital Solutions (Pvt) Ltd):
projects - iclazz(ICLazz Education – Website Structure & User Panels
Before Registration (Visible to All Visitors)
•	Homepage
1.	Greeting message with Register Now or Login button.
2.	Introduction videos section.
3.	Feedbacks/testimonials section.
•	About Us – Standard organizational details.
•	Events – Upcoming and live events organized by the platform.
•	Contact Details – General contact information.
After Registration (Role-Based Access)
Student Panel
•	The Student Register process is the same as for a normal user, like Email, Name, and Password (AuthRegisterRequest.java)  
•	HomePage (after login) 
1.	Greeting message with Find Classes button (instead of Register/Login).
2.	Introduction videos and feedback remain unchanged.

Then, in the Header, there is a Dashboard link after the Tutor login

Student Dashboard:
•	Student Dashboard needs to have a sidebar like a real-world web, but with more advanced features, like a sidebar not scroll with the page. side bar needs to have a hide option (need to be smooth), but in hide mode, the tab icons need to be visible, like features. 

•	Find Classes Tab/Page  
This page must be loaded with the most unique and attractive animation that matches the platform for 5s – 10s. Find something cool animation, you can use any site like ThreeJS, but the web app needs to load smoothly. Also, the Find Classes page must be more visually attractive, but match the platform  
		Filters include:
1.	Syllabus: Local, Edexcel, Cambridge
2.	Level: 6-9, O/L or A/L
3.	Subject
4.	Grade: 6–13
5.	Medium: Sinhala, English, Tamil
6.	Platform: Online or Physical

o	After submission:
	Confirmation message: “Our class coordinator will contact you within 24 hours.”
	Option to Find Another Class.

•	New subject boxes appear for each request.
•	Each box shows status: Pending until tutor assignment.
•	Once assigned:
•	Tutor details visible.
•	Schedule displayed in calendar (editable only by tutor).
•	Class fee and online link (Zoom/Google Meet) for online sessions.
•	Attendance button for student use.
•	Multiple classes → multiple subject boxes.
•	About Us, Events, and Contact Details remain unchanged.

Note: Wherever users (students) make a payment, both online and bank methods should be available.
Tutor Panel
•	Homepage (after login)
1.	Greeting message (no Register/Login).
2.	Introduction videos and feedback remain unchanged.

•	Dashboard This also needs to have a sidebar like Student Dashboard 
•	Initially: “You don’t have any classes yet.”
•	After assignment:
•	Student details and subject.
•	Commission amounts payable each month.
•	Commission confirmation button.
•	Timetable to schedule regular sessions.
•	Ability to:
•	Reschedule/cancel individual classes.
•	Manually assign replacement days.
•	Mark attendance for each class.
•	About Us, Events, and Contact Details remain unchanged.

Class Coordinator (CC) Panel
•	Class List View (per month)
•	Maximum of 100 rows (100 classes) per coordinator each month.
•	Each row represents one class.
Columns include:
1.	Class Name
2.	Tutor Name
3.	Student Name
4.	Month Name
5.	Attendance (per scheduled date)
6.	Commission Payment
•	Attendance Tracking
•	Example: September classes scheduled every Thursday → 4th, 11th, 18th, 25th.
•	For each scheduled date:
•	Both tutor and student must confirm attendance.
•	If both confirm → Green (✔) status (no errors).
•	If either fails → Red dot (⚠) appears for that date.
•	Attendance columns expand per date within the month.
•	Commission Payment
•	After the tutor submits and confirms the commission → status changes to Paid in the commission column.
•	Monthly Navigation
•	Data stored month by month (e.g., September set, October set, etc.).
•	Coordinators can flip left/right to view past or upcoming months.
•	Each month contains its own set of up to 100 classes.
•	Request Handling
•	Student class requests appear in a shared request pool.
•	Any CC can claim a request (removed from the pool once taken).
•	After contacting a tutor, CC enters tutor ID and assigns class.
•	Updates reflect automatically in student and tutor dashboards.
Director Panel
•	Overall Platform Overview
•	Can view:
•	Total running classes.
•	Finished classes.
•	Pending classes.
•	Submitted class requests.
•	Reports
•	Monthly attendance reports submitted by CCs.
•	Payment collection details submitted by CCs.
•	Coordinator Performance
•	Tracks how many class requests each coordinator has picked and managed.


Development/Implementation Notes:
-	Wherever user make a payment, both online and bank methods should be available.
-	The all Student, Tutor, Class Coordinator, Director Dashboard need to have side bar
)

- Purpose: Show a single experience/training entry describing advanced full-stack training.
- Content:
  - Title: `Advanced Full Stack Development Training`
  - Organization: `ACPT – Academy of Computer Programming and Training`
  - Period: `2025 Feb - 2025 August`
  - Description: Training covering React, Node.js, DB management, deployment strategies; hands-on full-stack projects and industry best practices.
  - Tags displayed: `Full-Stack Development`, `React`, `Node.js`, `Database Design` (rendered as indigo pill badges).
- Presentation:
  - Single card layout with `FaCode` inside `w-12 h-12 bg-indigo-100 dark:bg-indigo-900` and `whileHover` rotation.
  - Card uses `bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg`.
- Animations: framer-motion entry and hover effects similar to other components.

---

## Projects (`src/components/Projects.tsx`)




- Purpose: Featured projects grid (6 project objects in `projects` array).
- Shared implementation details:
  - Uses `framer-motion` and `react-intersection-observer` to animate cards into view.
  - Grid responsive: `md:grid-cols-2 lg:grid-cols-3`.
  - Each project card includes an image (remote URL), title, description, tech tags, and optional links.
  - Images use `loading="lazy"` and framer-motion hover scale.
- Projects list (full details captured):
  1. SmartBiz: AI-Powered Business Management Suite for SMEs
     - Description: Full-stack ERP-lite built with Spring Boot, React 19, React Native. AI-driven insights planned (OpenAI API). Deployed on AWS EC2 and Cloudflare.
     - Image: Unsplash URL (large)
     - Tags: `Spring Boot`, `React 19`, `React Native`
     - Links:
       - Backend: `https://github.com/geethanga12/SmartBiz-backend`
       - Web Frontend: `https://github.com/geethanga12/SmartBiz-frontend-web`
       - Mobile App: `https://github.com/geethanga12/SmartBiz-frontend-mobile`
  2. Pathwise(Pathwise is an AI-powered career guidance platform that bridges the gap between students seeking careerdirection and employers seeking qualified talent. Unlike conventional career platforms such as LinkedIn orgeneric career assessment tools, Pathwise provides dynamic, personalized career pathways that account forsocioeconomic constraints, real-time labor market data, and individual learning capacities.
The platform operates through two interconnected modules: a student-facing system that generates personalizedcareer trajectories and skill development plans, and an employer-facing system that matches job postings withcandidates whose career aspirations align with company growth trajectories. Through bidirectional AI matching,both students and employers benefit from higher-quality connections that consider long-term compatibilityrather than just surface-level skill matching.)
  3. Free Dictionary Web App
     - Description: Integrates Free Dictionary API for definitions, audio pronunciation, usage examples. Material-UI used.
     - Image: Unsplash URL (smaller)
     - Tags: `React`, `Material UI`, `Axios`
     - Links:
       - `https://github.com/geethanga12/dictionary-webapp.git`
  4. NIC Detail Application
     - Description: Extracts details from Sri Lankan NIC numbers using `lanka-nic` library; responsive UI and real-time parsing.
     - Tags: `React`, `Tailwind`, `React Router`
     - Link: `https://github.com/geethanga12/Sri-Lankan-NIC-Checker.git`
  5. Cafeteria Automation System
     - Description: Full-stack cafeteria management platform for Cinec Campus; user/admin panels, secure auth, real-time order/menu tracking, optimized MySQL queries.
     - Tags: `PHP`, `MySQL`, `Bootstrap`
     - Link: `https://github.com/geethanga12/cas-cinec.git`
  6. Online Quiz Application
     - Description: Web quiz with 20-second timer per question, real-time scoring, built with modular ES6 JS.
     - Tags: `HTML5`, `JavaScript ES6+`, `Tailwind CSS`
     - Link: `https://github.com/geethanga12/quiz-webapp`
- UI/UX details:
  - Project description text uses `line-clamp` classes (`line-clamp-2/3`) to limit length visually.
  - Tech badges styled as small rounded `span` elements with `bg-indigo-100 dark:bg-indigo-900`.
  - Link anchors use `FaExternalLinkAlt` icon and open in new tab.
- Notable assets and external dependencies:
  - Several images use Unsplash CDN URLs; some projects reference GitHub repositories.

---

## Skills 

- Purpose: Categorized skills presentation (three categories).
- Structure:
  - Section wrapper: `<section id="skills" className="py-20">`.
  - Title: `Skills & Technologies`.
  - Grid with three columns mapping `skillCategories`.
- Data structure: `skillCategories` array with three category objects:
  1. Frontend
     - Icon emoji: `💻`
     - Color class: `text-indigo-600`
     - Skills (name, icon component, color class):
       - React — `FaReact` — `text-blue-500`
       - JavaScript — `FaJsSquare` — `text-yellow-500`
       - HTML5 — `FaHtml5` — `text-orange-500`
       - CSS3 — `FaCss3Alt` — `text-blue-500`
       - Tailwind — `SiTailwindcss` — `text-cyan-500`
       - Bootstrap — `FaBootstrap` — `text-purple-500`
  2. Backend
     - Icon emoji: `⚙️`
     - Color class: `text-green-600`
     - Skills:
       - Java — `FaJava` — `text-red-500`
       - Spring Boot — `SiSpringboot` — `text-green-500`
       - PHP — `FaPhp` — `text-purple-500`
       - MySQL — `SiMysql` — `text-blue-500`
       - REST API — `FaDatabase` — `text-gray-600`
       - Node.js — `FaNodeJs` — `text-green-500`
  3. Tools & Others
     - Icon emoji: `🛠️`
     - Color class: `text-purple-600`
     - Skills:
       - Git — `FaGitAlt` — `text-orange-500`
       - GitHub — `FaGithub` — `text-gray-600`
       - VS Code — `FaDatabase` (note: reused icon) — `text-blue-500`
       - Figma — `FaFigma` — `text-purple-500`
       - Responsive — `FaReact` (note: reused icon) — `text-green-500`
       - Testing — `FaDatabase` (note: reused icon) — `text-red-500`
- Presentation & behavior:
  - Each category card uses `bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg`.
  - Skills are displayed in a 2-column grid; each skill shows its icon component and a `text-sm` label.
  - Framer-motion `whileHover` effects on skill cards.
- Notes: Some icons are reused for semantics that differ (e.g., `FaDatabase` used for `VS Code` and `Testing`) — this may be intentional or a placeholder.

---

## Cross-cutting implementation details

- Common libraries used across components:
  - `framer-motion` for animations
  - `react-intersection-observer` (`useInView`) for viewport-triggered animations
  - `react-icons` (various `Fa*` and `Si*` icons)
  - `react-hot-toast` used only in `Contact` for form feedback
- Styling:
  - Tailwind CSS utility classes used consistently; dark mode variants (`dark:`) are present across components.
  - Responsive grid layouts (`md:grid-cols-2`, `lg:grid-cols-3`) used for layout.
- Behavior notes:
  - No network submission of contact form (only toast feedback and state reset).
  - CV download button references `/assets/Geethanga_Dissanayake_CV.pdf` relative to root `public` or `assets` folder — ensure file exists at that path for the download to work.
  - Several project entries include external GitHub links — they open in new tabs via `target="_blank" rel="noopener noreferrer"`.
  - Images are remote URLs (Unsplash or CDN). Consider hosting locally or verifying CORS, availability, and licensing if needed.
- Accessibility observations:
  - `aria-*` attributes are not present; labels are associated with inputs in the contact form via `htmlFor` which is good.
  - Color contrast looks managed through Tailwind themes, but explicit checks may be needed.
- Minor code observations:
  - `Education`: uses `edu.color.split(' ')[2]` to extract a color class; this is a fragile approach if `color` changes structure.
  - `Skills`: some icons reused (e.g., `FaDatabase` for `VS Code` and `Testing`), probably placeholders.
  - `Projects`: one project (`iClazz`) has an empty `links` array — consider adding links or removing the links container conditionally (already conditional in code).

---

## Recommendations & Actionable Fixes (optional)

- Contact form: integrate a backend endpoint or a third-party service (e.g., Formspree, Netlify Forms, or a small API) to actually deliver messages.
- CV asset: confirm `assets/Geethanga_Dissanayake_CV.pdf` exists in the `public` or `assets` folder; path currently expects `/assets/...` at site root.
- Education color class extraction: replace fragile `edu.color.split(' ')[2]` with explicit `textClass` property in each education object.
- Skills icons: update mismatched icons (e.g., `VS Code` should use a VS Code icon or file icon instead of `FaDatabase`) for clarity.
- Image hosting: consider hosting project images locally in `public/assets` for reliability.
- Accessibility: add `aria-label` to social links and verify contrast ratios.

---

## File references



---

Generated on: 2026-01-05

