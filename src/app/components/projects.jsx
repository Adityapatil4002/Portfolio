"use client";

import React from "react";
import { motion } from "framer-motion";

// ==========================================
// INLINE ICONS
// ==========================================
const Icons = {
  GitHub: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"
      />
    </svg>
  ),
  Globe: (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  ),
  Lightning: (
    <svg
      className="w-4 h-4 mt-0.5 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  Cloud: (
    <svg
      className="w-4 h-4 text-slate-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
    </svg>
  ),
  Mic: (
    <svg
      className="w-4 h-4 text-slate-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="22"></line>
    </svg>
  ),
  Chart: (
    <svg
      className="w-4 h-4 text-blue-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  ),
};

// ==========================================
// DATA
// ==========================================
const projectsData = [
  {
    id: 1, // DevDialogue
    title: "DevDialogue",
    emoji: "🚀",
    theme: "dark",
    category: "Cloud IDE • AI Agent • Real-time Collab",
    categoryIcon: Icons.Cloud,
    links: {
      github: "https://github.com/Adityapatil4002/DevDialogue",
      live: "https://dev-dialogue.vercel.app/",
    },
    description:
      "A full-stack Cloud Development Environment combining real-time collaboration with AI-native execution — enabling users to run Node.js and TypeScript code directly in the browser.",
    bullets: [
      "Integrated WebContainers API for in-browser runtime with live execution and dynamic npm installations.",
      "Architected a context-aware AI agent using Google Gemini for bug fixes, folder scaffolding, and streamed responses.",
      "Built real-time collaboration with Socket.io — instant messaging, typing indicators, and synchronized state.",
    ],
    techStack: [
      "React.js",
      "Node.js",
      "Socket.io",
      "WebContainers",
      "Gemini AI",
      "Tailwind CSS",
    ],
  },
  {
    id: 2, // Veritas AI
    title: "Veritas AI",
    emoji: "🎙️",
    theme: "light",
    category: "Oral Exam Simulator • AI Strategy Engine",
    categoryIcon: Icons.Mic,
    links: {
      github: "https://github.com/Adityapatil4002/Veritas",
      live: "https://veritas-seven-indol.vercel.app/",
    },
    description:
      "A full-stack AI-driven platform that simulates real-time oral exams and technical interviews — analyzing candidate profiles to generate targeted preparation strategies.",
    bullets: [
      "Integrated Google GenAI with strict Zod schema validation to dynamically parse ATS resumes.",
      "Architected an interactive oral exam interface utilizing Speech-to-Text and NLP pipelines.",
      "Engineered a secure Node.js API leveraging MongoDB Atlas and Clerk for JWT authentication.",
    ],
    techStack: [
      "React.js",
      "Express.js",
      "MongoDB Atlas",
      "Google GenAI",
      "Clerk Auth",
      "Speech-to-Text",
    ],
  },
  {
    id: 3, // Vehicle Price Regression
    title: "Vehicle Price Regression",
    emoji: "📊",
    theme: "dark",
    category: "Machine Learning • Kaggle • Time-Series",
    categoryIcon: Icons.Chart,
    links: {
      github: "https://github.com/Adityapatil4002/Vehicle-Price-Regression",
      live: null,
    },
    description:
      "A machine learning regression model to predict bulldozer sale prices using historical auction data — built for the Kaggle Bluebook for Bulldozers competition.",
    bullets: [
      "Built a time-series regression model using 400,000+ historical auction records.",
      "Performed comprehensive data preprocessing, feature engineering, and EDA.",
      "Evaluated performance using RMSLE metric as defined in the Kaggle benchmark.",
    ],
    techStack: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Jupyter",
    ],
  },
];

// ==========================================
// ANIMATED LAPTOP UI COMPONENTS
// ==========================================

const DevDialogueUI = () => (
  <div className="w-full h-full bg-[#1e1e1e] flex font-mono text-[6px] overflow-hidden rounded-sm relative">
    {/* IDE Left Panel */}
    <div className="w-1/2 h-full border-r border-[#333] p-2 flex flex-col gap-1.5 bg-[#141414]">
      <div className="text-slate-400 mb-1">server.ts</div>
      <motion.div
        animate={{ width: ["0%", "80%", "80%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="h-1 bg-blue-400/80 rounded-full"
      />
      <motion.div
        animate={{ width: ["0%", "50%", "50%", "0%"] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 0.2,
          ease: "easeInOut",
        }}
        className="h-1 bg-purple-400/80 rounded-full"
      />
      <motion.div
        animate={{ width: ["0%", "90%", "90%", "0%"] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 0.4,
          ease: "easeInOut",
        }}
        className="h-1 bg-emerald-400/80 rounded-full"
      />
      <div className="h-1 w-0" />
      <motion.div
        animate={{ width: ["0%", "70%", "70%", "0%"] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 0.8,
          ease: "easeInOut",
        }}
        className="h-1 bg-yellow-400/80 rounded-full"
      />
    </div>

    {/* Chat/Agent Right Panel */}
    <div className="w-1/2 h-full bg-[#1e1e1e] p-2 flex flex-col justify-end gap-2 relative">
      <div className="absolute top-2 left-2 text-slate-500 font-sans">
        AI Agent Chat
      </div>

      {/* Animated Chat Bubbles */}
      <motion.div
        animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="self-end bg-blue-600 rounded-l-md rounded-tr-md p-1 w-3/4 flex flex-col gap-0.5"
      >
        <div className="w-full h-0.5 bg-white/50 rounded-full" />
        <div className="w-2/3 h-0.5 bg-white/50 rounded-full" />
      </motion.div>

      <motion.div
        animate={{ opacity: [0, 0, 1, 0], y: [10, 10, 0, -10] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="self-start bg-[#333] rounded-r-md rounded-tl-md p-1 w-5/6 flex flex-col gap-0.5"
      >
        <div className="w-full h-0.5 bg-green-400/50 rounded-full" />
        <div className="w-4/5 h-0.5 bg-slate-300/50 rounded-full" />
        <div className="w-1/2 h-0.5 bg-slate-300/50 rounded-full" />
      </motion.div>

      {/* Input box */}
      <div className="w-full h-3 bg-[#2a2a2a] rounded-sm mt-1 border border-[#444]" />
    </div>
  </div>
);

const VeritasUI = () => (
  <div className="w-full h-full bg-slate-100 flex items-center justify-center p-2 relative overflow-hidden">
    {/* Simulated PDF / Resume Document */}
    <div className="w-3/4 h-[120%] bg-white shadow-sm border border-slate-200 p-2 flex flex-col gap-2 relative rounded-sm">
      <div className="w-1/2 h-2 bg-slate-800 rounded-sm mx-auto mb-1" />

      <div className="w-full h-1.5 bg-slate-300 rounded-sm" />
      <div className="w-5/6 h-1.5 bg-slate-300 rounded-sm" />

      {/* Pulsing Highlight Box (AI finding skills) */}
      <motion.div
        animate={{ opacity: [0, 1, 0.5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        className="absolute top-10 left-1.5 w-[90%] h-5 border border-blue-400 bg-blue-400/10 rounded-sm"
      />

      <div className="w-full h-1.5 bg-slate-300 rounded-sm mt-2" />
      <div className="w-full h-1.5 bg-slate-300 rounded-sm" />
      <div className="w-2/3 h-1.5 bg-slate-300 rounded-sm" />

      {/* Pulsing Highlight Box */}
      <motion.div
        animate={{ opacity: [0, 0, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
        className="absolute top-20 left-1.5 w-[70%] h-6 border border-emerald-400 bg-emerald-400/10 rounded-sm"
      />
    </div>

    {/* Continuous Scanning Laser */}
    <motion.div
      animate={{ top: ["-10%", "110%", "-10%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="absolute left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_12px_4px_rgba(59,130,246,0.5)] z-10"
    />
  </div>
);

const VehicleRegressionUI = () => (
  <div className="w-full h-full bg-[#0a0a0a] p-2 flex flex-col gap-2 rounded-sm relative overflow-hidden">
    {/* Grid Background */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:10px_10px]" />

    {/* Top: Animated Bar Chart */}
    <div className="w-full h-1/2 flex items-end gap-1.5 border-b border-l border-slate-700 pb-0.5 pl-1 z-10 relative">
      {[40, 75, 45, 90, 60, 85, 55, 100].map((height, i) => (
        <motion.div
          key={i}
          animate={{
            height: [
              `${height * 0.4}%`,
              `${height}%`,
              `${height * 0.6}%`,
              `${height * 0.4}%`,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
          className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-sm shadow-[0_0_5px_rgba(34,211,238,0.3)]"
        />
      ))}
    </div>

    {/* Bottom: Scatter / Analysis Nodes */}
    <div className="w-full flex-1 border border-slate-800 rounded-sm bg-slate-900/50 relative overflow-hidden z-10">
      <div className="absolute inset-0 flex items-center justify-around px-2">
        <motion.div
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.4, 1, 0.4],
            y: [0, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1.5 h-1.5 bg-pink-500 rounded-full shadow-[0_0_8px_#ec4899]"
        />
        <motion.div
          animate={{ scale: [1, 1.8, 1], opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 1, 0.4],
            y: [0, -8, 0],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
          className="w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b]"
        />
        <motion.div
          animate={{ scale: [1, 1.7, 1], opacity: [0.4, 1, 0.4], y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.8 }}
          className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_8px_#06b6d4]"
        />
      </div>
      {/* Animated Scanning Line in Bottom Box */}
      <motion.div
        animate={{ left: ["-10%", "110%", "-10%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 w-[2px] h-full bg-white/20 shadow-[0_0_10px_2px_rgba(255,255,255,0.2)]"
      />
    </div>
  </div>
);

// ==========================================
// PURE CSS LAPTOP MOCKUP COMPONENT
// ==========================================
function PureCSSLaptop({ project }) {
  const isDark = project.theme === "dark";

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full max-w-lg mx-auto flex flex-col items-center justify-center mt-4 cursor-pointer drop-shadow-2xl"
    >
      {/* Laptop Lid (Screen) */}
      <div className="w-full aspect-[16/10] bg-[#1a1a1a] rounded-t-3xl border-[6px] border-[#2a2a2a] relative overflow-hidden flex flex-col ring-1 ring-black/50">
        {/* Webcam */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black rounded-full border border-gray-700/50 flex items-center justify-center">
          <div className="w-0.5 h-0.5 bg-blue-900/50 rounded-full" />
        </div>

        {/* Screen Content Wrapper */}
        <div
          className={`mt-4 mx-1.5 mb-1.5 flex-1 rounded-[4px] overflow-hidden flex flex-col border border-black/40 shadow-inner ${isDark ? "bg-[#09090b]" : "bg-[#f4f4f5]"}`}
        >
          {/* Fake Browser Header */}
          <div
            className={`h-4 w-full flex items-center px-2 gap-1.5 border-b ${isDark ? "bg-[#18181b] border-white/10" : "bg-white border-slate-200"}`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#27c93f]"></div>
            <div
              className={`ml-2 text-[7px] font-semibold tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}
            >
              {project.title.toUpperCase()}
            </div>
          </div>

          {/* FAKE UI based on Project ID */}
          <div className="flex-1 w-full h-full relative">
            {project.id === 1 && <DevDialogueUI />}
            {project.id === 2 && <VeritasUI />}
            {project.id === 3 && <VehicleRegressionUI />}
          </div>
        </div>
      </div>

      {/* Laptop Base */}
      <div className="w-[112%] h-4 bg-[#8b919e] rounded-b-2xl relative shadow-2xl border-t border-[#6b7280] flex justify-center">
        {/* Notch */}
        <div className="absolute top-0 w-1/5 h-1 bg-[#5b616e] rounded-b-md"></div>
        {/* Base bottom lip */}
        <div className="absolute bottom-0 w-full h-1 bg-[#6b7280] rounded-b-2xl opacity-50"></div>
      </div>
    </motion.div>
  );
}

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const fadeSlideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const fadeSlideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.15 },
  },
};
const popVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
};

// ==========================================
// MAIN PROJECTS COMPONENT
// ==========================================
export default function Projects() {
  return (
    <div
      id="projects"
      className="w-full flex flex-col font-sans selection:bg-slate-900 selection:text-white"
    >
      {/* Title Header */}
      <div className="bg-[#050505] pt-24 pb-12 w-full text-center md:text-left px-6 md:px-12 relative overflow-hidden">
        {/* Animated Background Particles for header */}
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 font-medium max-w-2xl"
          >
            Real-world applications built with modern technologies, showcasing
            full-stack expertise and AI integration.
          </motion.p>
        </div>
      </div>

      {/* Map through Projects */}
      {projectsData.map((project, index) => {
        const isDark = project.theme === "dark";

        // Theme Colors
        const sectionBg = isDark ? "bg-[#050505]" : "bg-[#fafafa]";
        const cardBg = isDark ? "bg-[#0f0f11]" : "bg-white";
        const border = isDark ? "border-white/10" : "border-slate-200/80";
        const textMain = isDark ? "text-white" : "text-slate-900";
        const textMuted = isDark ? "text-slate-400" : "text-slate-500";
        const divider = isDark ? "divide-white/10" : "divide-slate-100";
        const btnGitBg = isDark
          ? "bg-transparent border border-white/20 hover:bg-white/10 text-white"
          : "bg-slate-900 border border-slate-900 hover:bg-slate-800 text-white";
        const btnLiveBg = isDark
          ? "bg-white text-slate-900 hover:bg-slate-200"
          : "bg-transparent border border-slate-200 text-slate-900 hover:bg-slate-50";

        return (
          <section
            key={project.id}
            className={`w-full py-20 lg:py-28 ${sectionBg} border-t ${border} relative overflow-hidden`}
          >
            {/* Ambient Background Glow for Dark Sections */}
            {isDark && (
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none z-0"
              />
            )}

            <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
              >
                {/* LAPTOP MOCKUP PANEL */}
                <motion.div
                  variants={fadeSlideLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className={`w-full relative min-h-[350px] lg:min-h-[450px] rounded-[2.5rem] border ${border} ${cardBg} p-6 md:p-10 flex flex-col justify-center shadow-xl overflow-hidden group`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${isDark ? "from-white/5 to-transparent" : "from-slate-100/50 to-transparent"} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative z-10 w-full">
                    <PureCSSLaptop project={project} />
                  </div>
                </motion.div>

                {/* CONTENT PANEL */}
                <motion.div
                  variants={fadeSlideRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="w-full flex flex-col"
                >
                  {/* Category Pill */}
                  <motion.div
                    variants={popVariant}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${border} w-max mb-6 shadow-sm ${isDark ? "bg-white/5" : "bg-white"}`}
                  >
                    {project.categoryIcon}
                    <span
                      className={`text-xs font-bold tracking-wide uppercase ${textMuted}`}
                    >
                      {project.category}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    variants={popVariant}
                    className={`text-4xl lg:text-5xl font-extrabold tracking-tight ${textMain} flex items-center gap-3 mb-6`}
                  >
                    {project.title}
                    <motion.span
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="text-3xl cursor-default"
                    >
                      {project.emoji}
                    </motion.span>
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    variants={popVariant}
                    className={`text-base lg:text-lg leading-relaxed ${textMuted} mb-8 font-medium`}
                  >
                    {project.description}
                  </motion.p>

                  {/* Bullets */}
                  <div className={`flex flex-col mb-10 ${divider} divide-y`}>
                    {project.bullets.map((bullet, idx) => (
                      <motion.div
                        key={idx}
                        variants={popVariant}
                        className="flex gap-4 py-4 first:pt-0"
                      >
                        <span
                          className={`mt-0.5 ${isDark ? "text-yellow-500" : "text-blue-500"}`}
                        >
                          {Icons.Lightning}
                        </span>
                        <p
                          className={`text-sm lg:text-base leading-relaxed ${textMuted}`}
                        >
                          {bullet}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Buttons & Tech Stack Row */}
                  <motion.div
                    variants={popVariant}
                    className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between mt-auto"
                  >
                    {/* Buttons */}
                    <div className="flex flex-wrap gap-3">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-md ${btnGitBg}`}
                        >
                          {Icons.GitHub} Code
                        </a>
                      )}
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-md ${btnLiveBg}`}
                        >
                          {Icons.Globe} Live Demo
                        </a>
                      )}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 justify-start sm:justify-end max-w-xs">
                      {project.techStack.map((tech, idx) => (
                        <div
                          key={idx}
                          className={`px-2.5 py-1 rounded-md border text-[11px] font-bold tracking-wide uppercase cursor-default transition-colors ${border} ${textMuted} ${isDark ? "hover:bg-white/10 hover:text-white" : "hover:bg-slate-100 hover:text-slate-900"}`}
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
