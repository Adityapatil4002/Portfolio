"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ==========================================
// INLINE ICONS
// ==========================================
const Icons = {
  Briefcase: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 7h-4V5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zM10 5h4v2h-4V5zM4 9h16v10H4V9z" />
      <path d="M12 14c1.103 0 2-.897 2-2H10c0 1.103.897 2 2 2z" />
    </svg>
  ),
  Calendar: (
    <svg
      className="w-4 h-4 text-slate-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  ),
  TriangleArrow: (
    <svg
      className="w-3 h-3 text-slate-400 mt-1.5 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M9 5l7 7-7 7V5z" />
    </svg>
  ),
  // Tech Stack Icons
  React: (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
    >
      <ellipse
        cx="12"
        cy="12"
        rx="4"
        ry="10"
        transform="rotate(45 12 12)"
      ></ellipse>
      <ellipse
        cx="12"
        cy="12"
        rx="4"
        ry="10"
        transform="rotate(-45 12 12)"
      ></ellipse>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>
  ),
  Node: (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  Express: <span className="font-bold text-[11px] tracking-tighter">ex</span>,
  MongoDB: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8 2 8 8 8 12c0 4 4 10 4 10s4-6 4-10c0-4 0-10-4-10z" />
    </svg>
  ),
  MySQL: (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
    >
      <path d="M4 8c0-2.2 3.6-4 8-4s8 1.8 8 4-3.6 4-8 4-8-1.8-8-4z" />
      <path d="M4 8v8c0 2.2 3.6 4 8 4s8-1.8 8-4V8" />
      <path d="M4 12c0 2.2 3.6 4 8 4s8-1.8 8-4" />
    </svg>
  ),
  PostgreSQL: (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
    >
      <path d="M12 4c-4.4 0-8 1.8-8 4v8c0 2.2 3.6 4 8 4s8-1.8 8-4V8c0-2.2-3.6-4-8-4z" />
      <path d="M4 12c0 2.2 3.6 4 8 4s8-1.8 8-4" />
      <path d="M12 12v8" />
    </svg>
  ),
  Tailwind: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
  ),
  JavaScript: (
    <span className="font-bold text-[10px] border border-current rounded-[2px] px-[2px] pb-[1px] leading-none">
      JS
    </span>
  ),
};

// ==========================================
// EXPERIENCE DATA
// ==========================================
const experienceData = [
  {
    id: 1,
    role: "Full Stack Developer Intern",
    company: "MyJob Grow",
    type: "Internship",
    date: "Feb 2024 – Apr 2024",
    duration: "3 Months",
    bullets: [
      "Collaborated with a cross-functional development team to design and develop production-grade websites for business clients, contributing to both frontend and backend components.",
      "Built responsive, pixel-perfect user interfaces using HTML, CSS, JavaScript, React, and Tailwind CSS — ensuring modern UI design and smooth UX across all devices.",
      "Developed robust backend services using Node.js and Express.js — implementing RESTful APIs, server-side logic, authentication flows, and application workflows.",
      "Managed and integrated databases including MongoDB, MySQL, and PostgreSQL for efficient data storage, retrieval, and application state management.",
      "Gained end-to-end exposure to the full-stack development lifecycle — from frontend implementation and backend architecture to database integration and deployment.",
    ],
    techStack: [
      { name: "React", icon: Icons.React },
      { name: "Node.js", icon: Icons.Node },
      { name: "Express.js", icon: Icons.Express },
      { name: "MongoDB", icon: Icons.MongoDB },
      { name: "MySQL", icon: Icons.MySQL },
      { name: "PostgreSQL", icon: Icons.PostgreSQL },
      { name: "Tailwind CSS", icon: Icons.Tailwind },
      { name: "JavaScript", icon: Icons.JavaScript },
    ],
  },
];

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const bulletVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function Experience() {
  const sectionRef = useRef(null);

  // Scroll Progress for the Timeline
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Calculate timeline height based on scroll
  const scaleY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Transform dot color when scroll reaches it (Slate-200 to Slate-800)
  const dotColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    ["#e2e8f0", "#1e293b", "#1e293b"],
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      // Solid background color ensures no bleed-through from global backgrounds
      className="relative py-32 bg-[#fafafa] selection:bg-slate-900 selection:text-white overflow-hidden"
    >
      {/* Subtle Dot Pattern Background (Consistent with Skills section) */}
      <motion.div
        className="absolute inset-0 z-0 opacity-[0.5] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1.5px, transparent 1.5px)",
          backgroundSize: "40px 40px",
          y: useTransform(scrollYProgress, [0, 1], ["0%", "10%"]),
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mb-20 text-center md:text-left"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#333d4e] mb-4 inline-block relative">
            Where I&apos;ve Worked
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
              className="absolute -bottom-2 left-0 w-24 h-[4px] bg-slate-800 rounded-full origin-left"
            />
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mt-4">
            Professional journey shaping digital products and scalable
            architectures.
          </p>
        </motion.div>

        {/* Experience List */}
        <div className="flex flex-col gap-16 relative">
          {experienceData.map((job) => (
            <div
              key={job.id}
              className="relative flex flex-col md:flex-row gap-8 lg:gap-12 w-full group"
            >
              {/* TIMELINE (Left Column) */}
              <div className="hidden md:flex flex-col items-center w-16 shrink-0 pt-2 relative">
                {/* Floating Briefcase Icon Box */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-center shadow-sm z-20 text-slate-700 cursor-pointer"
                >
                  {Icons.Briefcase}
                </motion.div>

                {/* Timeline Background Track */}
                <div className="w-[2px] bg-slate-200 absolute top-20 bottom-[-4rem] z-0" />

                {/* Animated Scroll Fill Line */}
                <motion.div
                  style={{ height: scaleY }}
                  className="w-[2px] bg-slate-800 absolute top-20 bottom-[-4rem] z-10 origin-top"
                />

                {/* Timeline Interactive Dot */}
                <motion.div
                  style={{ backgroundColor: dotColor, borderColor: "white" }}
                  className="w-4 h-4 rounded-full border-[3px] absolute top-32 z-20 shadow-sm transition-colors duration-300"
                />
              </div>

              {/* CONTENT CARD (Right Column) */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="flex-1 w-full relative"
              >
                {/* Subtle Ambient Glow behind Card on Hover */}
                <div className="absolute inset-0 bg-slate-200/40 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -m-2" />

                <div className="relative bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full pointer-events-none" />

                  {/* Mobile Icon Box */}
                  <div className="md:hidden w-14 h-14 bg-white border border-slate-200 rounded-xl flex items-center justify-center mb-6 shadow-sm text-slate-700">
                    {Icons.Briefcase}
                  </div>

                  {/* Job Header Info */}
                  <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-8 relative z-10">
                    <div>
                      <h3 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight group-hover:text-slate-700 transition-colors duration-300">
                        {job.role}
                      </h3>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-xl font-bold text-slate-600">
                          {job.company}
                        </span>
                        <span className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mx-2"></span>
                        </span>
                        <span className="px-3.5 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold tracking-widest rounded-full border border-slate-200/60 uppercase">
                          {job.type}
                        </span>
                      </div>
                    </div>

                    {/* Date & Duration */}
                    <div className="flex flex-col xl:items-end text-slate-500 text-sm font-semibold mt-2 xl:mt-1 bg-[#fafafa] px-4 py-2 rounded-xl border border-slate-200/80 w-max">
                      <div className="flex items-center gap-2 mb-1">
                        {Icons.Calendar}
                        <span>{job.date}</span>
                      </div>
                      <span className="text-slate-400">({job.duration})</span>
                    </div>
                  </div>

                  {/* Animated Bullets List */}
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col gap-5 mb-10 relative z-10"
                  >
                    {job.bullets.map((bullet, idx) => (
                      <motion.div
                        key={idx}
                        variants={bulletVariant}
                        className="flex items-start gap-4"
                      >
                        <motion.div
                          whileHover={{ x: 3, color: "#0f172a" }}
                          className="pt-1.5 transition-transform text-slate-400"
                        >
                          {Icons.TriangleArrow}
                        </motion.div>
                        <p className="text-slate-600 leading-relaxed text-[15px] font-medium">
                          {bullet}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>

                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-8" />

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-3 mt-auto relative z-10">
                    {job.techStack.map((tech, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.5 + idx * 0.05 }}
                        whileHover={{
                          y: -3,
                          scale: 1.05,
                          backgroundColor: "#f8fafc",
                          borderColor: "#cbd5e1",
                          boxShadow: "0px 10px 20px -5px rgba(0, 0, 0, 0.05)",
                        }}
                        className="group/pill flex items-center gap-2.5 px-4 py-2 rounded-xl border border-slate-200 bg-white text-[13px] font-bold text-slate-600 cursor-default transition-all duration-300 shadow-sm"
                      >
                        <div className="flex items-center justify-center text-slate-400 group-hover/pill:text-slate-800 transition-colors">
                          {tech.icon}
                        </div>
                        {tech.name}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
