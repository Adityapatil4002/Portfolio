"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ==========================================
// INLINE ICONS (Strictly No Blue)
// ==========================================
const Icons = {
  Mail: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
  ),
  LinkedIn: (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  GitHub: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"
      />
    </svg>
  ),
  Briefcase: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 7h-4V5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zM10 5h4v2h-4V5zM4 9h16v10H4V9z" />
      <path d="M12 14c1.103 0 2-.897 2-2H10c0 1.103.897 2 2 2z" />
    </svg>
  ),
  ArrowUpRight: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  ),
  Check: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
};

// ==========================================
// ANIMATED BACKGROUND GRAPHIC
// ==========================================
const DynamicBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#fafafa]">
    {/* Drifting Ambient Orbs */}
    <motion.div
      animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-slate-200/50 rounded-full blur-[120px]"
    />
    <motion.div
      animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2,
      }}
      className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]"
    />

    {/* Complex Rotating Blueprint Rings */}
    <motion.svg
      animate={{ rotate: 360 }}
      transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-[0.03]"
      viewBox="0 0 1200 1200"
      fill="none"
    >
      <circle
        cx="600"
        cy="600"
        r="580"
        stroke="#0f172a"
        strokeWidth="1"
        strokeDasharray="4 12"
      />
      <circle
        cx="600"
        cy="600"
        r="480"
        stroke="#0f172a"
        strokeWidth="2"
        strokeDasharray="12 12"
      />
      <circle cx="600" cy="600" r="380" stroke="#0f172a" strokeWidth="1" />
      <circle
        cx="600"
        cy="600"
        r="280"
        stroke="#0f172a"
        strokeWidth="1.5"
        strokeDasharray="20 10 5 10"
      />
      <circle
        cx="600"
        cy="600"
        r="180"
        stroke="#0f172a"
        strokeWidth="1"
        strokeDasharray="2 4"
      />
    </motion.svg>
  </div>
);

// ==========================================
// MAGNETIC CARD COMPONENT
// ==========================================
function MagneticCard({ children, className, href, onClick, target, rel }) {
  const ref = useRef(null);

  // Motion values for tracking cursor position relative to the card center
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for a natural, elastic pull
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // The multiplier controls the strength of the magnetic pull
    x.set(middleX * 0.15);
    y.set(middleY * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("adityapatil6604@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative py-32 selection:bg-slate-900 selection:text-white flex justify-center z-10 overflow-hidden"
    >
      <DynamicBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl w-full px-6 flex flex-col items-center text-center relative z-10"
      >
        {/* Availability Badge */}
        <motion.div variants={fadeUp} className="mb-10">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase mt-[1px]">
              Available for new opportunities
            </span>
          </div>
        </motion.div>

        {/* Headings */}
        <motion.h2
          variants={fadeUp}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight mb-8 leading-none text-slate-950"
        >
          Let&apos;s Build <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-800 to-slate-400">
            Something Great
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="max-w-2xl text-lg md:text-xl text-slate-500 font-medium leading-relaxed mb-20"
        >
          I&apos;m currently open to new opportunities in Software Development
          and AI/ML roles. Whether you have a project idea, a job opportunity,
          or just want to say hi — my inbox is always open.
        </motion.p>

        {/* Contact Cards Grid (Magnetic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-24 relative">
          {/* EMAIL CARD */}
          <motion.div variants={fadeUp}>
            <MagneticCard
              href="mailto:adityapatil6604@gmail.com"
              onClick={handleCopyEmail}
              className="relative flex flex-col items-center justify-center p-12 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-slate-300 transition-colors duration-300 group cursor-pointer overflow-hidden min-h-[300px]"
            >
              {/* Animated Background Blob on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Top Right Arrow/Check Indicator */}
              <div className="absolute top-8 right-8 text-slate-300 group-hover:text-slate-900 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300">
                {copied ? (
                  <span className="text-emerald-500">{Icons.Check}</span>
                ) : (
                  Icons.ArrowUpRight
                )}
              </div>

              {/* Icon Container */}
              <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:bg-slate-900 group-hover:text-white group-hover:shadow-xl text-slate-700 transition-all duration-500 z-10">
                {Icons.Mail}
              </div>

              {/* Text */}
              <span className="text-xs font-extrabold tracking-[0.2em] text-slate-400 uppercase mb-4 z-10">
                {copied ? (
                  <span className="text-emerald-500">Email Copied!</span>
                ) : (
                  "Drop an Email"
                )}
              </span>
              <span className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors z-10">
                adityapatil6604@gmail.com
              </span>
            </MagneticCard>
          </motion.div>

          {/* LINKEDIN CARD */}
          <motion.div variants={fadeUp}>
            <MagneticCard
              href="https://linkedin.com/in/adityapatil0604"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex flex-col items-center justify-center p-12 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-slate-300 transition-colors duration-300 group cursor-pointer overflow-hidden min-h-[300px]"
            >
              {/* Animated Background Blob on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Top Right Arrow Indicator */}
              <div className="absolute top-8 right-8 text-slate-300 group-hover:text-slate-900 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300">
                {Icons.ArrowUpRight}
              </div>

              {/* Icon Container */}
              <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:bg-slate-900 group-hover:text-white group-hover:shadow-xl text-slate-700 transition-all duration-500 z-10">
                {Icons.LinkedIn}
              </div>

              {/* Text */}
              <span className="text-xs font-extrabold tracking-[0.2em] text-slate-400 uppercase mb-4 z-10">
                Let's Connect
              </span>
              <span className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors z-10">
                adityapatil0604
              </span>
            </MagneticCard>
          </motion.div>
        </div>

        {/* Divider Section */}
        <motion.div
          variants={fadeUp}
          className="w-full flex items-center justify-center gap-6 mb-12 opacity-80"
        >
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent to-slate-300"></div>
          <span className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">
            On The Web
          </span>
          <div className="w-32 h-[1px] bg-gradient-to-l from-transparent to-slate-300"></div>
        </motion.div>

        {/* Bottom Social Icons (Magnetic) */}
        <motion.div variants={fadeUp} className="flex items-center gap-6">
          {[
            { icon: Icons.GitHub, link: "https://github.com/Adityapatil4002" },
            { icon: Icons.Briefcase, link: "#projects" },
            { icon: Icons.Mail, link: "mailto:adityapatil6604@gmail.com" },
          ].map((item, idx) => (
            <MagneticCard
              key={idx}
              href={item.link}
              target={item.link.startsWith("http") ? "_blank" : "_self"}
              rel={item.link.startsWith("http") ? "noopener noreferrer" : ""}
              className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors duration-300 text-slate-600"
            >
              {item.icon}
            </MagneticCard>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
