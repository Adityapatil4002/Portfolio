"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// --- ICONS ---
const ArrowRightIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);

const DocumentIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const SparkleIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// --- INTERACTIVE PARTICLE CANVAS (NO HYDRATION ERRORS) ---
const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Setup canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles (safe - runs only on client)
    const particleCount = Math.min(
      80,
      Math.floor((canvas.width * canvas.height) / 15000),
    );
    particlesRef.current = Array.from({ length: particleCount }, () => {
      // Give them a continuous base velocity
      const vx = (Math.random() - 0.5) * 1.5;
      const vy = (Math.random() - 0.5) * 1.5;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: vx,
        vy: vy,
        baseVx: vx, // Store original velocity to return to
        baseVy: vy,
        radius: Math.random() * 2 + 1,
      };
    });

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update & draw particles
      particles.forEach((p) => {
        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.5;
          p.vy += (dy / dist) * force * 0.5;
        }

        // Return to base velocity over time (continuous movement)
        p.vx += (p.baseVx - p.vx) * 0.05;
        p.vy += (p.baseVy - p.vy) * 0.05;

        // Apply velocity
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) {
          p.vx *= -1;
          p.baseVx *= -1;
        }
        if (p.y < 0 || p.y > canvas.height) {
          p.vy *= -1;
          p.baseVy *= -1;
        }

        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(30, 41, 59, 0.6)";
        ctx.fill();
      });

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(30, 41, 59, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw lines from mouse to nearby particles
      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const opacity = (1 - dist / 180) * 0.5;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10"
    />
  );
};

// --- STATIC BACKGROUND LAYER (safe, no random) ---
const BackgroundLayer = ({ mouseX, mouseY }) => {
  const bgX1 = useTransform(mouseX, [0, 1], [-30, 30]);
  const bgY1 = useTransform(mouseY, [0, 1], [-30, 30]);
  const bgX2 = useTransform(mouseX, [0, 1], [20, -20]);
  const bgY2 = useTransform(mouseY, [0, 1], [20, -20]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20 bg-white">
      {/* Grid */}
      <motion.div
        animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #94a3b8 1px, transparent 1px),
            linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />

      {/* Gradient orbs */}
      <motion.div
        style={{ x: bgX1, y: bgY1 }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px]"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full rounded-full bg-gradient-to-br from-blue-200 via-purple-100 to-transparent blur-3xl"
        />
      </motion.div>

      <motion.div
        style={{ x: bgX2, y: bgY2 }}
        className="absolute -bottom-40 -right-40 w-[700px] h-[700px]"
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="w-full h-full rounded-full bg-gradient-to-tl from-pink-200 via-orange-100 to-transparent blur-3xl"
        />
      </motion.div>

      <motion.div
        animate={{
          x: [0, 100, -60, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px]"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-violet-200 via-sky-200 to-cyan-100 blur-3xl opacity-30" />
      </motion.div>

      {/* Rotating rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-slate-300/40 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-slate-200/30 rounded-full border-dashed"
      />
    </div>
  );
};

// --- CURSOR SPOTLIGHT ---
const CursorSpotlight = ({ mouseX, mouseY }) => {
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed w-8 h-8 rounded-full border border-slate-900/30 z-50 hidden md:block"
        style={{
          left: useTransform(smoothX, (v) => `${v * 100}%`),
          top: useTransform(smoothY, (v) => `${v * 100}%`),
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="pointer-events-none fixed w-2 h-2 rounded-full bg-slate-900 z-50 hidden md:block"
        style={{
          left: useTransform(mouseX, (v) => `${v * 100}%`),
          top: useTransform(mouseY, (v) => `${v * 100}%`),
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
};

export default function HeroSection() {
  const nameArray = "Aditya Patil".split("");
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const contentX = useTransform(mouseX, [0, 1], [5, -5]);
  const contentY = useTransform(mouseY, [0, 1], [5, -5]);

  return (
    <div className="relative min-h-screen flex flex-col font-sans text-slate-900 selection:bg-slate-900 selection:text-white overflow-hidden">
      <BackgroundLayer mouseX={mouseX} mouseY={mouseY} />
      <ParticleCanvas />
      <CursorSpotlight mouseX={mouseX} mouseY={mouseY} />

      {/* NAVBAR */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-6 z-20"
      >
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-9 h-9 rounded-full border-2 border-slate-900 flex items-center justify-center group-hover:bg-slate-900 transition-all duration-300 group-hover:rotate-[360deg]">
            <span className="font-bold text-sm group-hover:text-white transition-colors duration-300">
              D
            </span>
          </div>
          <span className="font-bold text-sm md:text-base tracking-tight">
            Open to Opportunities
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          {[
            "Home",
            "Skills",
            "Experience",
            "Projects",
            "Certifications",
            "Contact",
          ].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative group py-1 hover:text-slate-900 transition-colors"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-slate-900 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Let's Connect Button now properly linking to LinkedIn in a new tab */}
        <motion.a
          href="https://www.linkedin.com/in/adityapatil0604"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full border border-slate-800 text-slate-900 text-sm font-semibold hover:bg-slate-900 hover:text-white transition-all duration-300 group cursor-pointer"
        >
          <span>Let&apos;s Connect</span>
          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </motion.header>

      {/* HERO */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 z-10 my-auto py-12">
        <motion.div
          style={{ x: contentX, y: contentY }}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-slate-300/80 bg-white/60 backdrop-blur-xl text-xs font-bold tracking-[0.15em] text-slate-800 uppercase shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <SparkleIcon className="w-3 h-3 text-slate-700" />
              AI & Data Science Engineer
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-2"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-slate-950">
              Hello,
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-500">
              My Name is
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6 relative">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-extrabold tracking-tight text-[#333d4e] leading-none">
              {nameArray.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    scale: 1.08,
                    color: "#0f172a",
                    transition: { duration: 0.15 },
                  }}
                  className="inline-block cursor-default hover:text-slate-950 transition-colors duration-200"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 h-[3px] bg-gradient-to-r from-transparent via-slate-800 to-transparent origin-center"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="max-w-xl text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed mb-10 font-normal"
          >
            <p>
              AI & Data Science Engineer passionate about problem-solving, with
              hands-on expertise in full-stack development. I build intelligent,
              scalable web applications and AI-powered solutions, seeking SDE &
              Full Stack roles to create real-world impact.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-slate-900 text-slate-900 font-semibold text-sm hover:bg-slate-50 transition-all group shadow-sm hover:shadow-md"
            >
              <span>View Projects</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            {/* Resume button updated to trigger the PDF download */}
            <motion.a
              href="/Aditya_Patil.pdf"
              download="Aditya_Patil.pdf"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="relative w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#1e2330] text-white font-semibold text-sm shadow-md hover:bg-slate-900 hover:shadow-xl transition-all group overflow-hidden cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut",
                }}
              />
              <span className="relative z-10">Resume</span>
              <DocumentIcon className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform relative z-10" />
            </motion.a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-14 flex items-center gap-4 sm:gap-6 text-[11px] text-slate-400 font-medium tracking-widest uppercase"
          >
            {/* <span className="hidden sm:inline text-slate-500">Built with</span>
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
              {["Python", "React", "Next.js", "TensorFlow", "Node.js"].map(
                (tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 + i * 0.1 }}
                    className="hover:text-slate-900 transition-colors cursor-default"
                  >
                    {tech}
                  </motion.span>
                ),
              )}
            </div> */}
          </motion.div>
        </motion.div>
      </main>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="pb-6 flex flex-col justify-center items-center gap-2 z-10"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase">
          Scroll
        </span>
        <div className="w-6 h-10 border-2 border-slate-800 rounded-full p-1 flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-slate-800 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
