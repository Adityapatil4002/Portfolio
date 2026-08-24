"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ==========================================
// INLINE ICONS
// ==========================================
const icons = {
  CodeBig: (
    <svg
      className="w-8 h-8 text-slate-800"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
      <line x1="14" y1="4" x2="10" y2="20"></line>
    </svg>
  ),
  Database: (
    <svg
      className="w-8 h-8 text-slate-800"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
  ),
  CodeSmall: (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  ),
  Box: (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  ),
  Network: (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="16" y="16" width="6" height="6" rx="1"></rect>
      <rect x="2" y="16" width="6" height="6" rx="1"></rect>
      <rect x="9" y="2" width="6" height="6" rx="1"></rect>
      <path d="M5 16v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"></path>
      <path d="M12 8v4"></path>
    </svg>
  ),
  Toolbox: (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  ),
};

// ==========================================
// DATA STRUCTURES
// ==========================================
const topTechRow = [
  {
    name: "Tailwind CSS",
    icon: (
      <span className="text-cyan-500 font-bold text-lg leading-none">≈</span>
    ),
  },
  {
    name: "Next.js",
    icon: (
      <span className="border border-slate-400 rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold bg-white text-black">
        N
      </span>
    ),
  },
  {
    name: "Scikit-learn",
    icon: (
      <span className="w-4 h-4 bg-orange-500 rounded-full opacity-80 flex items-center justify-center text-white text-[8px] font-bold shadow-sm">
        sl
      </span>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <span className="bg-[#3178C6] text-white text-[10px] font-bold px-0.5 rounded-sm">
        TS
      </span>
    ),
  },
  {
    name: "FastAPI",
    icon: (
      <span className="bg-[#05998B] rounded-full w-4 h-4 flex items-center justify-center text-white text-[10px]">
        ⚡
      </span>
    ),
  },
  {
    name: "Express.js",
    icon: <span className="font-bold text-slate-800 text-xs">ex</span>,
  },
  {
    name: "JWT",
    icon: (
      <span className="text-pink-600 font-bold text-lg leading-none">✻</span>
    ),
  },
  {
    name: "Figma",
    icon: (
      <span className="flex flex-col gap-[1px] w-3">
        <span className="w-full h-1.5 bg-[#f24e1e] rounded-full"></span>
        <span className="w-full h-1.5 bg-[#a259ff] rounded-full"></span>
      </span>
    ),
  },
];

const developmentSkills = {
  languages: ["Python", "JavaScript", "C++", "TypeScript"],
  frameworks: [
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "FastAPI",
    "Tailwind CSS",
    "shadcn/ui",
    "Streamlit",
    "JWT",
  ],
};

const dataAndToolsSkills = {
  ai: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy"],
  tools: [
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Supabase",
    "AWS",
    "Git & GitHub",
    "Vercel",
    "Postman",
    "Figma",
    "Cloudinary",
  ],
};

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const cardsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.8 },
  },
};

const pillContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.3 },
  },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 250, damping: 15 },
  },
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function Skills() {
  const containerRef = useRef(null);

  // Parallax scroll effect for the background elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const ringY = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);
  const patternY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-32 bg-slate-50 overflow-hidden text-slate-900 z-10 selection:bg-slate-900 selection:text-white"
    >
      {/* Subtle Dot Pattern Background */}
      <motion.div
        className="absolute inset-0 z-0 opacity-[0.5] pointer-events-none"
        style={{
          y: patternY,
          backgroundImage: "radial-gradient(#cbd5e1 1.5px, transparent 1.5px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Background Parallax Rings */}
      <motion.div
        style={{ y: ringY }}
        className="absolute top-0 right-0 pointer-events-none opacity-[0.05] translate-x-1/3"
      >
        <svg
          width="600"
          height="600"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="300" cy="300" r="299" stroke="black" strokeWidth="2" />
          <circle cx="300" cy="300" r="230" stroke="black" strokeWidth="2" />
          <circle cx="300" cy="300" r="160" stroke="black" strokeWidth="2" />
        </svg>
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto px-6 md:px-12 relative z-10"
      >
        {/* Header */}
        <div className="mb-14 text-center md:text-left flex flex-col gap-4">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#1e293b]"
          >
            My Tech Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-lg text-slate-500 font-medium max-w-xl"
          >
            Technologies, frameworks, and tools I use to build robust and
            scalable applications.
          </motion.p>
        </div>

        {/* INFINITE SCROLLING MARQUEE ROW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20 relative flex overflow-hidden w-full group py-4"
        >
          {/* Fading Gradients for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-5 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            {/* Duplicated array to create the infinite loop effect */}
            {[...topTechRow, ...topTechRow].map((tech, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -4, borderColor: "#cbd5e1" }}
                className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-slate-200/80 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] cursor-default transition-colors backdrop-blur-sm"
              >
                <div className="w-5 flex justify-center items-center">
                  {tech.icon}
                </div>
                <span className="text-sm font-bold text-slate-700 whitespace-nowrap tracking-wide">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Cards Grid Container */}
        <motion.div
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* CARD 1: Development */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col border border-slate-200/60 rounded-[2.5rem] p-8 md:p-10 bg-white/70 backdrop-blur-xl transition-all duration-500 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]"
          >
            {/* Dynamic Background Glow on Hover */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-100/50 via-indigo-50/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none -translate-y-1/2 translate-x-1/3 group-hover:translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-emerald-50/40 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none translate-y-1/3 -translate-x-1/4" />

            {/* Card Icon */}
            <motion.div
              whileHover={{ rotate: 10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-16 h-16 rounded-2xl border border-slate-200 flex items-center justify-center mb-8 shadow-sm bg-white relative z-10 group-hover:border-slate-300 transition-colors"
            >
              {icons.CodeBig}
            </motion.div>

            {/* Card Title */}
            <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4 relative z-10">
              Development
            </h3>
            <div className="w-10 h-[4px] bg-slate-800 rounded-full mb-8 relative z-10"></div>

            <motion.div
              variants={pillContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative z-10 flex flex-col h-full"
            >
              {/* Languages Sub-section */}
              <div className="mb-8">
                <div className="flex items-center gap-2.5 mb-5 opacity-90">
                  <span className="text-slate-600 bg-slate-100 p-1.5 rounded-md">
                    {icons.CodeSmall}
                  </span>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500">
                    Languages
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {developmentSkills.languages.map((skill, idx) => (
                    <SkillPill key={`lang-${idx}`} skill={skill} />
                  ))}
                </div>
              </div>

              <hr className="border-slate-200/60 mb-8" />

              {/* Frameworks Sub-section */}
              <div>
                <div className="flex items-center gap-2.5 mb-5 opacity-90">
                  <span className="text-slate-600 bg-slate-100 p-1.5 rounded-md">
                    {icons.Box}
                  </span>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500">
                    Frameworks & Libraries
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {developmentSkills.frameworks.map((skill, idx) => (
                    <SkillPill key={`frame-${idx}`} skill={skill} />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* CARD 2: Data & Tools */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col border border-slate-200/60 rounded-[2.5rem] p-8 md:p-10 bg-white/70 backdrop-blur-xl transition-all duration-500 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]"
          >
            {/* Dynamic Background Glow on Hover */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-orange-100/40 via-rose-50/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none -translate-y-1/2 translate-x-1/3 group-hover:translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-purple-100/40 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none translate-y-1/3 -translate-x-1/4" />

            {/* Card Icon */}
            <motion.div
              whileHover={{ rotate: -10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-16 h-16 rounded-2xl border border-slate-200 flex items-center justify-center mb-8 shadow-sm bg-white relative z-10 group-hover:border-slate-300 transition-colors"
            >
              {icons.Database}
            </motion.div>

            {/* Card Title */}
            <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4 relative z-10">
              Data & Tools
            </h3>
            <div className="w-10 h-[4px] bg-slate-800 rounded-full mb-8 relative z-10"></div>

            <motion.div
              variants={pillContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative z-10 flex flex-col h-full"
            >
              {/* AI/ML Sub-section */}
              <div className="mb-8">
                <div className="flex items-center gap-2.5 mb-5 opacity-90">
                  <span className="text-slate-600 bg-slate-100 p-1.5 rounded-md">
                    {icons.Network}
                  </span>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500">
                    AI & Machine Learning
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {dataAndToolsSkills.ai.map((skill, idx) => (
                    <SkillPill key={`ai-${idx}`} skill={skill} />
                  ))}
                </div>
              </div>

              <hr className="border-slate-200/60 mb-8" />

              {/* Tools & DBs Sub-section */}
              <div>
                <div className="flex items-center gap-2.5 mb-5 opacity-90">
                  <span className="text-slate-600 bg-slate-100 p-1.5 rounded-md">
                    {icons.Toolbox}
                  </span>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500">
                    Tools & Databases
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {dataAndToolsSkills.tools.map((skill, idx) => (
                    <SkillPill key={`tool-${idx}`} skill={skill} />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ==========================================
// REUSABLE PILL COMPONENT WITH SPRING ANIMATION
// ==========================================
function SkillPill({ skill }) {
  return (
    <motion.div
      variants={pillVariants}
      whileHover={{
        scale: 1.05,
        backgroundColor: "#f1f5f9",
        borderColor: "#cbd5e1",
      }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 border border-slate-200/80 rounded-xl text-sm font-semibold text-slate-600 bg-white/80 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.02)] cursor-default transition-colors duration-200 flex items-center justify-center"
    >
      {skill}
    </motion.div>
  );
}
