"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  createContext,
  useContext,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

/* ════════════════════════════════════════════
   THEME CONTEXT
   ════════════════════════════════════════════ */

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

const useTheme = () => useContext(ThemeContext);

/* ════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════ */

const info = {
  name: "Aditya Patil",
  email: "adityapatil6604@gmail.com",
  linkedin: "https://www.linkedin.com/in/adityapatil0604",
  github: "https://github.com/Adityapatil4002",
  resumeUrl: "/resume.pdf",
};

const marqueeItems = [
  "⚛️ React",
  "🟢 Node.js",
  "🐍 Python",
  "🧠 TensorFlow",
  "🔥 PyTorch",
  "🗄️ MongoDB",
  "🐘 PostgreSQL",
  "☁️ AWS",
  "🎨 Tailwind CSS",
  "⬡ Next.js",
  "📊 Scikit-learn",
  "🔷 TypeScript",
  "⚡ FastAPI",
  "🚀 Express.js",
  "🔑 JWT",
  "🖼️ Figma",
];

const skillCategories = [
  {
    icon: "💻",
    title: "Languages",
    tags: ["Python", "JavaScript", "C++", "TypeScript"],
  },
  {
    icon: "🧩",
    title: "Frameworks & Libraries",
    tags: [
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
  },
  {
    icon: "🤖",
    title: "AI / ML",
    tags: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy"],
  },
  {
    icon: "🛠️",
    title: "Tools & Databases",
    tags: [
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
  },
];

const experienceData = {
  role: "Full Stack Developer Intern",
  company: "MyJob Grow",
  points: [
    "Collaborated with a cross-functional development team to design and develop production-grade websites for business clients, contributing to both frontend and backend components.",
    "Built responsive, pixel-perfect user interfaces using HTML, CSS, JavaScript, React, and Tailwind CSS — ensuring modern UI design and smooth UX across all devices.",
    "Developed robust backend services using Node.js and Express.js — implementing RESTful APIs, server-side logic, authentication flows, and application workflows.",
    "Managed and integrated databases including MongoDB, MySQL, and PostgreSQL for efficient data storage, retrieval, and application state management.",
    "Gained end-to-end exposure to the full-stack development lifecycle — from frontend implementation and backend architecture to database integration and deployment.",
  ],
  tech: [
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Tailwind CSS",
    "JavaScript",
  ],
};

const projectsData = [
  {
    icon: "🚀",
    title: "DevDialogue",
    tagline: "Cloud IDE • AI Agent • Real-time Collab",
    description:
      "A full-stack Cloud Development Environment combining real-time collaboration with AI-native execution — enabling users to run Node.js and TypeScript code directly in the browser.",
    features: [
      "Integrated WebContainers API for in-browser runtime with live execution and dynamic npm installations.",
      "Architected a context-aware AI agent using Google Gemini for bug fixes, folder scaffolding, and streamed responses.",
      "Built real-time collaboration with Socket.io — instant messaging, typing indicators, and synchronized state.",
      "Designed a high-performance UI with React.js, Tailwind CSS, and Framer Motion.",
    ],
    tech: [
      "React.js",
      "Node.js",
      "Socket.io",
      "WebContainers",
      "Gemini AI",
      "Framer Motion",
      "Tailwind CSS",
    ],
    github: "https://github.com/Adityapatil4002/DevDialogue",
    live: "https://dev-dialogue.vercel.app/",
    gradient: "from-cyan-600/20 via-teal-600/10 to-blue-600/20",
    accent: "#06B6D4",
  },
  {
    icon: "📊",
    title: "Vehicle Price Regression",
    tagline: "Machine Learning • Kaggle • Time-Series",
    description:
      "A machine learning regression model to predict bulldozer sale prices using historical auction data — built for the Kaggle Bluebook for Bulldozers competition.",
    features: [
      "Built a time-series regression model using 400,000+ historical auction records with 50+ attributes.",
      "Performed comprehensive data preprocessing, feature engineering, and exploratory data analysis.",
      "Evaluated performance using RMSLE metric as defined in the Kaggle competition benchmark.",
      "Implemented a structured ML pipeline — problem definition, dataset preparation, model training, and evaluation.",
    ],
    tech: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Jupyter",
    ],
    github: "https://github.com/Adityapatil4002/Vehicle-Price-Regression",
    gradient: "from-emerald-600/20 via-teal-600/10 to-cyan-600/20",
    accent: "#10B981",
  },
];

const certificationsData = [
  {
    icon: "🟢",
    title: "Nvidia Deep Learning",
    issuer: "NVIDIA",
    desc: "Practical skills in building, training, and optimizing deep neural networks for computer vision and data analysis.",
  },
  {
    icon: "🔵",
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    desc: "Proficiency in developing responsive websites providing optimal viewing experience across all devices.",
  },
  {
    icon: "🤖",
    title: "Complete A.I. & ML, Data Science",
    issuer: "Udemy / ZTM",
    desc: "Mastered ML workflow — from data visualization with Pandas to deep neural networks with Scikit-Learn and TensorFlow.",
  },
  {
    icon: "🌐",
    title: "Complete Web Development",
    issuer: "Udemy",
    desc: "Full-stack expertise covering React & Tailwind frontend, Node.js backend, MongoDB & Prisma, and deployment.",
  },
];

const navItems = [
  "Home",
  "Skills",
  "Experience",
  "Projects",
  "Certifications",
  "Contact",
];

/* ════════════════════════════════════════════
   THEME COLORS
   ════════════════════════════════════════════ */

const themes = {
  dark: {
    bg: "#000000",
    bgSecondary: "#0A0A0A",
    bgTertiary: "#111111",
    text: "#ffffff",
    textSecondary: "#9CA3AF",
    textTertiary: "#6B7280",
    border: "rgba(255,255,255,0.06)",
    borderHover: "rgba(6,182,212,0.3)",
    accent: "#06B6D4",
    accentRgb: "6,182,212",
    cardBg: "#111111",
    cardBgHover: "rgba(6,182,212,0.08)",
  },
  light: {
    bg: "#ffffff",
    bgSecondary: "#F9FAFB",
    bgTertiary: "#F3F4F6",
    text: "#111827",
    textSecondary: "#4B5563",
    textTertiary: "#6B7280",
    border: "rgba(0,0,0,0.1)",
    borderHover: "rgba(6,182,212,0.4)",
    accent: "#0891B2",
    accentRgb: "8,145,178",
    cardBg: "#ffffff",
    cardBgHover: "rgba(8,145,178,0.05)",
  },
};

/* ════════════════════════════════════════════
   HOOKS
   ════════════════════════════════════════════ */

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" },
    );
    obs.observe(el);
    return () => {
      if (el) obs.unobserve(el);
    };
  }, [threshold]);

  return { ref, visible };
}

/* ════════════════════════════════════════════
   THEME TOGGLE BUTTON
   ════════════════════════════════════════════ */

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const colors = themes[theme];

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 z-[1000] w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all duration-300"
      style={{
        background: colors.cardBg,
        border: `2px solid ${colors.border}`,
        color: colors.text,
        boxShadow: `0 8px 32px rgba(${colors.accentRgb}, 0.15)`,
      }}
      aria-label="Toggle theme"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </motion.span>
    </motion.button>
  );
}

/* ════════════════════════════════════════════
   NEURAL NETWORK CANVAS
   ════════════════════════════════════════════ */

function NeuralNetworkBg() {
  const { theme } = useTheme();
  const colors = themes[theme];
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const nodeCount = Math.min(Math.floor((width * height) / 18000), 80);
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 1.5 + Math.random() * 2,
        baseRadius: 1.5 + Math.random() * 2,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
    nodesRef.current = nodes;

    const connDist = 180;
    let time = 0;
    const accentRgb = colors.accentRgb;
    const isDark = theme === "dark";

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("resize", handleResize);

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      for (const node of nodesRef.current) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
        node.radius =
          node.baseRadius + Math.sin(time * 2 + node.pulseOffset) * 0.5;

        const dx = node.x - mouseRef.current.x;
        const dy = node.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200;
          node.vx += (dx / dist) * force * 0.08;
          node.vy += (dy / dist) * force * 0.08;
        }
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > 1) {
          node.vx = (node.vx / speed) * 1;
          node.vy = (node.vy / speed) * 1;
        }
        node.vx *= 0.999;
        node.vy *= 0.999;
      }

      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const dx = nodesRef.current[i].x - nodesRef.current[j].x;
          const dy = nodesRef.current[i].y - nodesRef.current[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connDist) {
            const opacity = (1 - dist / connDist) * (isDark ? 0.15 : 0.08);
            const midX = (nodesRef.current[i].x + nodesRef.current[j].x) / 2;
            const midY = (nodesRef.current[i].y + nodesRef.current[j].y) / 2;
            const mDx = midX - mouseRef.current.x;
            const mDy = midY - mouseRef.current.y;
            const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
            const mInf = mDist < 200 ? 1.5 : 1;
            ctx.beginPath();
            ctx.moveTo(nodesRef.current[i].x, nodesRef.current[i].y);
            ctx.lineTo(nodesRef.current[j].x, nodesRef.current[j].y);
            ctx.strokeStyle = `rgba(${accentRgb}, ${opacity * mInf})`;
            ctx.lineWidth = 0.5 + (1 - dist / connDist) * 0.5;
            ctx.stroke();
          }
        }
      }

      for (const node of nodesRef.current) {
        const dx = node.x - mouseRef.current.x;
        const dy = node.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const near = dist < 200;

        if (near) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
          const glow = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            node.radius * 4,
          );
          glow.addColorStop(0, `rgba(${accentRgb}, ${isDark ? 0.15 : 0.1})`);
          glow.addColorStop(1, `rgba(${accentRgb}, 0)`);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(
          node.x,
          node.y,
          near ? node.radius * 1.5 : node.radius,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = near
          ? `rgba(${accentRgb}, ${isDark ? 0.8 : 0.6})`
          : `rgba(${accentRgb}, ${isDark ? 0.4 : 0.3})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme, colors.accentRgb]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[0]"
    />
  );
}

/* ════════════════════════════════════════════
   DEVDIALOGUE LIVE ANIMATION
   ════════════════════════════════════════════ */

function DevDialogueAnimation() {
  const { theme } = useTheme();
  const colors = themes[theme];
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => {
        if (p >= 7) {
          setCycle((c) => c + 1);
          return 0;
        }
        return p + 1;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const chatMessages = [
    {
      user: "Aditya",
      text: "Let's build the auth module 🔥",
      side: "right",
      showAt: 0,
    },
    {
      user: "Sarah",
      text: "On it! Setting up React components",
      side: "left",
      showAt: 1,
    },
    {
      user: "Aditya",
      text: "@AI fix the login bug in auth.js",
      side: "right",
      showAt: 2,
    },
  ];

  return (
    <div className="h-full flex flex-col p-3 lg:p-4 overflow-hidden">
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-sm border mb-3 shrink-0"
        style={{
          background:
            theme === "dark" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)",
          borderColor: colors.border,
        }}
      >
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: colors.accent }}
        />
        <span
          className="text-[0.65rem] font-mono font-medium"
          style={{ color: colors.textSecondary }}
        >
          DevDialogue
        </span>
        <div className="ml-auto flex -space-x-1.5">
          {["A", "S", "R"].map((letter) => (
            <div
              key={letter}
              className="w-4 h-4 rounded-full border text-[0.35rem] flex items-center justify-center font-bold"
              style={{
                background: `${colors.accent}40`,
                borderColor: colors.bg,
                color: colors.text,
              }}
            >
              {letter}
            </div>
          ))}
        </div>
        <span className="text-[0.5rem]" style={{ color: `${colors.accent}99` }}>
          3 online
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={cycle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 flex flex-col gap-2 overflow-hidden"
        >
          {chatMessages.map(
            (msg, i) =>
              phase >= msg.showAt && (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`flex ${msg.side === "right" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 text-[0.6rem] lg:text-[0.65rem] leading-relaxed border ${
                      msg.side === "right"
                        ? "rounded-2xl rounded-br-md"
                        : "rounded-2xl rounded-bl-md"
                    }`}
                    style={{
                      background:
                        msg.side === "right"
                          ? `rgba(${colors.accentRgb},0.15)`
                          : theme === "dark"
                            ? "rgba(255,255,255,0.04)"
                            : "rgba(0,0,0,0.04)",
                      borderColor:
                        msg.side === "right"
                          ? `rgba(${colors.accentRgb},0.2)`
                          : colors.border,
                      color: colors.textSecondary,
                    }}
                  >
                    <span
                      className="text-[0.5rem] font-semibold block mb-0.5"
                      style={{ color: colors.accent }}
                    >
                      {msg.user}
                    </span>
                    {msg.text}
                  </div>
                </motion.div>
              ),
          )}

          {phase === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div
                className="border rounded-2xl rounded-bl-md px-3 py-2.5 max-w-[80%]"
                style={{
                  background: `rgba(${colors.accentRgb},0.1)`,
                  borderColor: `rgba(${colors.accentRgb},0.25)`,
                }}
              >
                <span
                  className="text-[0.5rem] font-semibold block mb-1"
                  style={{ color: colors.accent }}
                >
                  🤖 DevAI
                </span>
                <div className="flex gap-1.5 items-center h-3">
                  {[0, 1, 2].map((d) => (
                    <motion.div
                      key={d}
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: d * 0.15,
                      }}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: colors.accent }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {phase >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-start"
            >
              <div
                className="border rounded-2xl rounded-bl-md px-3 py-2 max-w-[90%]"
                style={{
                  background: `rgba(${colors.accentRgb},0.1)`,
                  borderColor: `rgba(${colors.accentRgb},0.25)`,
                }}
              >
                <span
                  className="text-[0.5rem] font-semibold block mb-1"
                  style={{ color: colors.accent }}
                >
                  🤖 DevAI
                </span>
                <span
                  className="text-[0.6rem] lg:text-[0.65rem] leading-relaxed"
                  style={{ color: colors.textSecondary }}
                >
                  Found <span className="text-red-400">null check error</span>{" "}
                  on line 42. Patching now...{" "}
                  <span className="text-green-400">✅</span>
                </span>
              </div>
            </motion.div>
          )}

          {phase >= 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="border rounded-xl px-3 py-2.5"
                style={{
                  background:
                    theme === "dark"
                      ? "rgba(0,0,0,0.6)"
                      : "rgba(255,255,255,0.9)",
                  borderColor: colors.border,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#28CA41]" />
                  </div>
                  <span
                    className="text-[0.5rem] font-mono"
                    style={{ color: colors.accent }}
                  >
                    📄 auth.js
                  </span>
                  <span
                    className="text-[0.45rem] ml-auto"
                    style={{ color: colors.textTertiary }}
                  >
                    AI generated
                  </span>
                </div>
                <div className="font-mono text-[0.5rem] lg:text-[0.55rem] space-y-0.5">
                  <div>
                    <span className="text-gray-500">1 </span>
                    <span style={{ color: colors.accent }}>const</span>{" "}
                    <span className="text-blue-400">auth</span>{" "}
                    <span style={{ color: colors.textSecondary }}>=</span>{" "}
                    <span className="text-green-400">require</span>
                    <span style={{ color: colors.textSecondary }}>(</span>
                    <span className="text-orange-300">
                      &apos;./config&apos;
                    </span>
                    <span style={{ color: colors.textSecondary }}>);</span>
                  </div>
                  <div>
                    <span className="text-gray-500">2 </span>
                    <span style={{ color: colors.accent }}>if</span>{" "}
                    <span style={{ color: colors.textSecondary }}>(</span>
                    <span className="text-blue-400">user</span>{" "}
                    <span className="text-orange-300">!==</span>{" "}
                    <span style={{ color: colors.accent }}>null</span>
                    <span style={{ color: colors.textSecondary }}>
                      {")"} {"{"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">3 </span>
                    {"  "}
                    <span className="text-blue-400">validateToken</span>
                    <span style={{ color: colors.textSecondary }}>(</span>
                    <span className="text-blue-400">user</span>
                    <span style={{ color: colors.textSecondary }}>);</span>
                  </div>
                  <div>
                    <span className="text-gray-500">4 </span>
                    <span style={{ color: colors.textSecondary }}>{"}"}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {phase >= 6 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="border rounded-xl px-3 py-2"
                style={{
                  background:
                    theme === "dark"
                      ? "rgba(0,0,0,0.7)"
                      : "rgba(255,255,255,0.95)",
                  borderColor: colors.border,
                }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span
                    className="text-[0.5rem]"
                    style={{ color: colors.textTertiary }}
                  >
                    ⬤
                  </span>
                  <span
                    className="text-[0.5rem] font-mono"
                    style={{ color: colors.textSecondary }}
                  >
                    Terminal
                  </span>
                </div>
                <div className="font-mono text-[0.5rem] lg:text-[0.55rem] space-y-0.5">
                  <div className="text-gray-400">$ npm run dev</div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{ color: colors.accent }}
                  >
                    ✓ Compiled successfully
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    style={{ color: colors.accent }}
                  >
                    ✓ Server running on localhost:3000
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════
   ML PIPELINE ANIMATION
   ════════════════════════════════════════════ */

function MLPipelineAnimation() {
  const { theme } = useTheme();
  const colors = themes[theme];
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => {
        if (p >= 5) {
          setCycle((c) => c + 1);
          return 0;
        }
        return p + 1;
      });
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const dataRows = [
    { id: "001", year: "2012", price: "$42,500", hrs: "3,200" },
    { id: "002", year: "2015", price: "$38,900", hrs: "1,800" },
    { id: "003", year: "2018", price: "$55,200", hrs: "950" },
    { id: "004", year: "2020", price: "$61,000", hrs: "420" },
  ];

  const chartBars = [35, 58, 42, 75, 52, 68, 85, 45, 72, 90];

  return (
    <div className="h-full flex flex-col p-3 lg:p-4 overflow-hidden">
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-sm border mb-3 shrink-0"
        style={{
          background:
            theme === "dark" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)",
          borderColor: colors.border,
        }}
      >
        <span
          className="text-[0.65rem] font-mono font-medium"
          style={{ color: colors.textSecondary }}
        >
          📊 ML Pipeline
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: colors.accent }}
          />
          <span
            className="text-[0.5rem]"
            style={{ color: `${colors.accent}99` }}
          >
            Running
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={cycle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 flex flex-col gap-2.5 overflow-hidden"
        >
          {phase >= 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="rounded-xl px-3 py-2.5 border"
                style={{
                  background:
                    theme === "dark"
                      ? "rgba(0,0,0,0.5)"
                      : "rgba(255,255,255,0.8)",
                  borderColor: colors.border,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[0.5rem] font-mono"
                    style={{ color: colors.textSecondary }}
                  >
                    Dataset Preview
                  </span>
                  <span
                    className="text-[0.45rem]"
                    style={{ color: `${colors.accent}99` }}
                  >
                    412,698 records
                  </span>
                </div>
                <div
                  className="flex justify-between text-[0.45rem] font-mono border-b pb-1 mb-1"
                  style={{
                    color: colors.textTertiary,
                    borderColor: colors.border,
                  }}
                >
                  <span className="w-8">ID</span>
                  <span className="w-10">Year</span>
                  <span className="w-14 text-right">Price</span>
                  <span className="w-12 text-right">Hours</span>
                </div>
                {dataRows.map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2, duration: 0.3 }}
                    className="flex justify-between text-[0.5rem] font-mono py-0.5 border-b last:border-b-0"
                    style={{
                      color: colors.textSecondary,
                      borderColor: colors.border,
                    }}
                  >
                    <span
                      className="w-8"
                      style={{ color: colors.textTertiary }}
                    >
                      {row.id}
                    </span>
                    <span className="w-10">{row.year}</span>
                    <span
                      className="w-14 text-right"
                      style={{ color: colors.accent }}
                    >
                      {row.price}
                    </span>
                    <span
                      className="w-12 text-right"
                      style={{ color: colors.textTertiary }}
                    >
                      {row.hrs}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="rounded-xl px-3 py-2.5 border"
                style={{
                  background:
                    theme === "dark"
                      ? "rgba(0,0,0,0.5)"
                      : "rgba(255,255,255,0.8)",
                  borderColor: colors.border,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[0.5rem] font-mono"
                    style={{ color: colors.textSecondary }}
                  >
                    Training RandomForest...
                  </span>
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-[0.45rem] text-yellow-400"
                  >
                    ● Processing
                  </motion.span>
                </div>
                <div
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{
                    background:
                      theme === "dark"
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(0,0,0,0.08)",
                  }}
                >
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${colors.accent}, ${colors.accent}99)`,
                      boxShadow: `0 0 10px rgba(${colors.accentRgb}, 0.3)`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span
                    className="text-[0.4rem] font-mono"
                    style={{ color: colors.textTertiary }}
                  >
                    Epoch 1/100
                  </span>
                  <span
                    className="text-[0.4rem] font-mono"
                    style={{ color: colors.textTertiary }}
                  >
                    n_estimators=100
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="rounded-xl px-3 py-2.5 border"
                style={{
                  background:
                    theme === "dark"
                      ? "rgba(0,0,0,0.5)"
                      : "rgba(255,255,255,0.8)",
                  borderColor: colors.border,
                }}
              >
                <span
                  className="text-[0.5rem] font-mono mb-2 block"
                  style={{ color: colors.textSecondary }}
                >
                  Price Prediction Distribution
                </span>
                <div className="flex items-end gap-[3px] h-[50px] lg:h-[60px]">
                  {chartBars.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.08,
                        ease: "easeOut",
                      }}
                      className="flex-1 rounded-t-sm"
                      style={{
                        background: `linear-gradient(to top, ${colors.accent}cc, ${colors.accent}66)`,
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1">
                  <span
                    className="text-[0.4rem] font-mono"
                    style={{ color: colors.textTertiary }}
                  >
                    $10K
                  </span>
                  <span
                    className="text-[0.4rem] font-mono"
                    style={{ color: colors.textTertiary }}
                  >
                    $90K
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {phase >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="border rounded-xl px-3 py-2.5"
                style={{
                  background: `rgba(${colors.accentRgb}, ${theme === "dark" ? 0.08 : 0.05})`,
                  borderColor: `rgba(${colors.accentRgb}, 0.2)`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[0.6rem]"
                    style={{ color: colors.accent }}
                  >
                    ✓
                  </span>
                  <span
                    className="text-[0.55rem] font-semibold"
                    style={{ color: colors.accent }}
                  >
                    Model Trained Successfully
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "RMSLE", value: "0.2456" },
                    { label: "R² Score", value: "0.891" },
                    { label: "MAE", value: "$4,230" },
                  ].map((metric, i) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="text-center"
                    >
                      <span
                        className="text-[0.4rem] block"
                        style={{ color: colors.textTertiary }}
                      >
                        {metric.label}
                      </span>
                      <span
                        className="text-[0.65rem] font-mono font-semibold"
                        style={{ color: colors.textSecondary }}
                      >
                        {metric.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════
   MAGNETIC BUTTON
   ════════════════════════════════════════════ */

function MagneticButton({ children, onClick, className, style, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.3);
      y.set((e.clientY - centerY) * 0.3);
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, ...style }}
      onClick={onClick}
      className={className}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

/* ════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════ */

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCode, setShowCode] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);
  const [isTouch, setIsTouch] = useState(false);

  const heroRef = useRef(null);
  const colors = themes[theme];

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        dur: `${6 + Math.random() * 10}s`,
        delay: `${Math.random() * 10}s`,
        size: `${2 + Math.random() * 3}px`,
      })),
    [],
  );

  useEffect(() => {
    setMounted(true);
    setIsTouch("ontouchstart" in window);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setIntroVisible(false);
      document.body.style.overflow = "";
    }, 2600);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowCode(true), 3500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const fn = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, [isTouch]);

  // ── Counter animation: starts after intro finishes ──
  useEffect(() => {
    if (!mounted) return;
    const targets = [10, 20, 7]; // Projects, Technologies, Certifications
    const dur = 2000;
    const start = Date.now();
    let frameId;

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4); // ease-out quart
      setCounts(targets.map((t) => Math.floor(eased * t)));
      if (p < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setCounts(targets); // guarantee exact final values
      }
    };

    // Delay until after intro (2600ms) + small buffer
    const timeout = setTimeout(() => {
      frameId = requestAnimationFrame(tick);
    }, 3000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameId);
    };
  }, [mounted]);

  const scrollTo = useCallback((id) => {
    setMobileNav(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleResumeDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = info.resumeUrl;
    link.download = "Aditya_Patil_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const codeLines = useMemo(
    () => [
      {
        c: (
          <>
            <span style={{ color: colors.accent }}>const</span>{" "}
            <span className="text-blue-400">developer</span>{" "}
            <span className="text-gray-500">= {"{"}</span>
          </>
        ),
        d: 0.1,
      },
      {
        c: (
          <>
            &nbsp;&nbsp;<span className="text-blue-400">name</span>:{" "}
            <span className="text-green-400">&quot;Aditya Patil&quot;</span>,
          </>
        ),
        d: 0.3,
      },
      {
        c: (
          <>
            &nbsp;&nbsp;<span className="text-blue-400">role</span>:{" "}
            <span className="text-green-400">
              &quot;SDE & AI Engineer&quot;
            </span>
            ,
          </>
        ),
        d: 0.5,
      },
      {
        c: (
          <>
            &nbsp;&nbsp;<span className="text-blue-400">branch</span>:{" "}
            <span className="text-green-400">
              &quot;AI & Data Science&quot;
            </span>
            ,
          </>
        ),
        d: 0.7,
      },
      {
        c: (
          <>
            &nbsp;&nbsp;<span className="text-blue-400">skills</span>:{" "}
            <span className="text-gray-500">[</span>
          </>
        ),
        d: 0.9,
      },
      {
        c: (
          <>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-green-400">&quot;Full Stack&quot;</span>,{" "}
            <span className="text-green-400">&quot;DSA&quot;</span>,
          </>
        ),
        d: 1.0,
      },
      {
        c: (
          <>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-green-400">&quot;React&quot;</span>,{" "}
            <span className="text-green-400">&quot;Node.js&quot;</span>,
          </>
        ),
        d: 1.1,
      },
      {
        c: (
          <>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-green-400">&quot;Python&quot;</span>,{" "}
            <span className="text-green-400">&quot;ML&quot;</span>
          </>
        ),
        d: 1.2,
      },
      {
        c: (
          <>
            &nbsp;&nbsp;<span className="text-gray-500">],</span>
          </>
        ),
        d: 1.3,
      },
      {
        c: (
          <>
            &nbsp;&nbsp;<span className="text-blue-400">status</span>:{" "}
            <span className="text-green-400">
              &quot;Building the future&quot;
            </span>
          </>
        ),
        d: 1.5,
      },
      {
        c: <span className="text-gray-500">{"}"}</span>,
        d: 1.7,
      },
    ],
    [colors.accent],
  );

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        style={{
          background: colors.bg,
          color: colors.text,
          minHeight: "100vh",
        }}
      >
        {/* Noise overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-[9998]"
          style={{
            opacity: theme === "dark" ? 0.015 : 0.025,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Cursor glow */}
        {!isTouch && (
          <motion.div
            className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-[9999]"
            style={{
              background: `radial-gradient(circle, rgba(${colors.accentRgb},${
                theme === "dark" ? 0.06 : 0.04
              }) 0%, transparent 70%)`,
            }}
            animate={{ x: mousePos.x - 250, y: mousePos.y - 250 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
          />
        )}

        <ThemeToggle />

        {/* ══════ INTRO ══════ */}
        <AnimatePresence>
          {introVisible && (
            <motion.div
              exit={{ opacity: 0, filter: "blur(20px)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed inset-0 z-[10000] flex items-center justify-center"
              style={{ background: colors.bg }}
            >
              <div
                className="absolute w-[500px] h-[500px] rounded-full blur-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  background: colors.accent,
                  opacity: theme === "dark" ? 0.08 : 0.06,
                  animation: "pulseGlow 4s ease-in-out infinite",
                }}
              />
              <motion.h1
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif italic text-[clamp(5rem,16vw,14rem)] font-bold bg-gradient-to-r bg-clip-text text-transparent select-none relative z-10"
                style={{
                  letterSpacing: "-0.02em",
                  backgroundImage: `linear-gradient(to right, ${colors.text}, ${colors.accent})`,
                }}
              >
                Hello.
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════ MAIN CONTENT ══════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={!introVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* ══════ NAV ══════ */}
          <motion.nav
            initial={{ y: -100 }}
            animate={!introVisible ? { y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`fixed top-0 left-0 w-full z-[999] px-6 md:px-10 flex justify-between items-center transition-all duration-300 ${
              scrolled ? "py-4" : "py-5"
            }`}
            style={{
              background: scrolled
                ? theme === "dark"
                  ? "rgba(0,0,0,0.85)"
                  : "rgba(255,255,255,0.85)"
                : "transparent",
              backdropFilter: scrolled ? "blur(20px)" : "none",
              WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
              borderBottom: scrolled ? `1px solid ${colors.border}` : "none",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("home")}
              className="font-bold text-2xl bg-transparent border-none cursor-pointer tracking-tight"
              style={{ color: colors.text }}
            >
              A<span style={{ color: colors.accent }}>.</span>P
            </motion.button>

            <ul className="hidden md:flex gap-8 list-none m-0 p-0">
              {navItems.map((item, idx) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={!introVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.05 }}
                >
                  <button
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="relative text-[0.85rem] font-medium tracking-wider uppercase bg-transparent border-none cursor-pointer group"
                    style={{ color: colors.textSecondary }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = colors.text)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = colors.textSecondary)
                    }
                  >
                    {item}
                    <span
                      className="absolute bottom-[-5px] left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full rounded-full"
                      style={{ background: colors.accent }}
                    />
                  </button>
                </motion.li>
              ))}
            </ul>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer z-[1001] p-1"
              onClick={() => setMobileNav(!mobileNav)}
              aria-label="Toggle mobile navigation"
            >
              <motion.span
                animate={mobileNav ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-[25px] h-[2px] block rounded-full"
                style={{ background: colors.text }}
              />
              <motion.span
                animate={{
                  opacity: mobileNav ? 0 : 1,
                  scaleX: mobileNav ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="w-[25px] h-[2px] block rounded-full"
                style={{ background: colors.text }}
              />
              <motion.span
                animate={
                  mobileNav ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.2 }}
                className="w-[25px] h-[2px] block rounded-full"
                style={{ background: colors.text }}
              />
            </button>

            {/* Mobile Nav Drawer */}
            <AnimatePresence>
              {mobileNav && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[999]"
                    style={{ background: "rgba(0,0,0,0.4)" }}
                    onClick={() => setMobileNav(false)}
                  />
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{
                      type: "spring",
                      damping: 25,
                      stiffness: 200,
                    }}
                    className="fixed top-0 right-0 w-[280px] h-screen backdrop-blur-xl border-l flex flex-col pt-[100px] px-10 gap-8 z-[1000]"
                    style={{
                      background:
                        theme === "dark"
                          ? "rgba(10,10,10,0.98)"
                          : "rgba(249,250,251,0.98)",
                      borderColor: colors.border,
                    }}
                  >
                    {navItems.map((item, i) => (
                      <motion.button
                        key={item}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 + 0.1 }}
                        onClick={() => scrollTo(item.toLowerCase())}
                        className="text-[0.85rem] font-medium tracking-wider uppercase text-left bg-transparent border-none cursor-pointer transition-colors"
                        style={{ color: colors.textSecondary }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = colors.text)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = colors.textSecondary)
                        }
                      >
                        {item}
                      </motion.button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.nav>

          {/* ══════ HERO ══════ */}
          <section
            id="home"
            ref={heroRef}
            className="min-h-screen flex items-center relative overflow-hidden pt-[120px] pb-20 px-6 md:px-10"
          >
            <NeuralNetworkBg />

            <div
              className="absolute w-[600px] h-[600px] rounded-full blur-[150px] -top-[200px] -right-[100px] pointer-events-none"
              style={{
                background: colors.accent,
                opacity: theme === "dark" ? 0.08 : 0.05,
                animation: "orbFloat 18s ease-in-out infinite",
              }}
            />
            <div
              className="absolute w-[400px] h-[400px] rounded-full blur-[150px] -bottom-[100px] -left-[100px] pointer-events-none"
              style={{
                background: colors.accent,
                opacity: theme === "dark" ? 0.06 : 0.04,
                animation: "orbFloat 18s ease-in-out infinite 6s",
              }}
            />

            {/* Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {particles.map((p) => (
                <div
                  key={p.id}
                  className="absolute rounded-full opacity-0"
                  style={{
                    left: p.left,
                    width: p.size,
                    height: p.size,
                    background: colors.accent,
                    animation: `floatUp ${p.dur} linear ${p.delay} infinite`,
                  }}
                />
              ))}
            </div>

            <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-[2]">
              {/* LEFT */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={!introVisible ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={!introVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-[18px] py-2 border rounded-full mb-7"
                  style={{
                    background: `rgba(${colors.accentRgb}, ${
                      theme === "dark" ? 0.08 : 0.05
                    })`,
                    borderColor: `rgba(${colors.accentRgb}, 0.3)`,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: colors.accent }}
                  />
                  <span
                    className="text-[0.8rem] font-medium tracking-wider"
                    style={{ color: colors.accent }}
                  >
                    Open to Opportunities
                  </span>
                </motion.div>

                <h1 className="font-bold text-[clamp(2.8rem,5.5vw,5rem)] leading-[1.05] mb-3 tracking-tight">
                  Hi, I&apos;m
                  <br />
                  <span
                    className="bg-gradient-to-r bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${colors.accent}, ${
                        theme === "dark" ? "#818CF8" : "#6366F1"
                      })`,
                    }}
                  >
                    {info.name}
                  </span>
                </h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={!introVisible ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}
                  className="font-mono text-[clamp(0.85rem,1.4vw,1.15rem)] mb-7 flex items-center gap-2.5 flex-wrap"
                  style={{ color: colors.textSecondary }}
                >
                  <span
                    style={{ color: colors.text }}
                    className="font-semibold"
                  >
                    SDE
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: colors.accent }}
                  />
                  <span
                    style={{ color: colors.text }}
                    className="font-semibold"
                  >
                    Full Stack Developer
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: colors.accent }}
                  />
                  <span
                    style={{ color: colors.text }}
                    className="font-semibold"
                  >
                    AI / ML Engineer
                  </span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={!introVisible ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7 }}
                  className="text-[1.05rem] leading-[1.85] mb-10 max-w-[540px]"
                  style={{ color: colors.textSecondary }}
                >
                  Passionate{" "}
                  <strong style={{ color: colors.text }}>
                    AI & Data Science
                  </strong>{" "}
                  engineer with hands-on expertise in full-stack development and
                  machine learning. I build intelligent, scalable web
                  applications and AI-powered solutions — actively seeking{" "}
                  <strong style={{ color: colors.text }}>SDE</strong>,{" "}
                  <strong style={{ color: colors.text }}>Full Stack</strong>,
                  and <strong style={{ color: colors.text }}>AI/ML</strong>{" "}
                  roles where I can engineer products that make a real-world
                  impact.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={!introVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                  className="flex gap-4 flex-wrap"
                >
                  <MagneticButton
                    onClick={() => scrollTo("contact")}
                    className="group relative overflow-hidden inline-flex items-center gap-2.5 px-9 py-4 rounded-xl text-[0.95rem] font-semibold transition-all duration-300 border-none cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${colors.accent}, ${
                        theme === "dark" ? "#818CF8" : "#6366F1"
                      })`,
                      color: "#ffffff",
                      boxShadow: `0 15px 50px rgba(${colors.accentRgb}, 0.4)`,
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    💬 Get in Touch
                  </MagneticButton>

                  <MagneticButton
                    onClick={() => scrollTo("projects")}
                    className="inline-flex items-center gap-2.5 px-9 py-4 bg-transparent border rounded-xl text-[0.95rem] font-semibold transition-all duration-300 cursor-pointer"
                    style={{
                      color: colors.text,
                      borderColor: colors.border,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.accent;
                      e.currentTarget.style.background = `rgba(${colors.accentRgb}, 0.05)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.border;
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    📂 View Projects
                  </MagneticButton>

                  <MagneticButton
                    onClick={handleResumeDownload}
                    className="inline-flex items-center gap-2.5 px-9 py-4 border rounded-xl text-[0.95rem] font-semibold transition-all duration-300 cursor-pointer"
                    style={{
                      color: colors.text,
                      background:
                        theme === "dark"
                          ? "rgba(128,128,128,0.12)"
                          : "rgba(128,128,128,0.08)",
                      borderColor: colors.border,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.border;
                    }}
                  >
                    📄 Resume
                  </MagneticButton>
                </motion.div>

                {/* ── STATS COUNTERS ── */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={!introVisible ? { opacity: 1 } : {}}
                  transition={{ delay: 1 }}
                  className="flex gap-10 mt-12 pt-8 border-t"
                  style={{ borderColor: colors.border }}
                >
                  {[
                    { label: "Projects Built", count: counts[0] },
                    { label: "Technologies", count: counts[1] },
                    { label: "Certifications", count: counts[2] },
                  ].map(({ label, count }) => (
                    <div key={label}>
                      <div className="font-bold text-3xl md:text-4xl tabular-nums">
                        {count}
                        <span style={{ color: colors.accent }}>+</span>
                      </div>
                      <div
                        className="text-xs mt-1 uppercase tracking-wider"
                        style={{ color: colors.textTertiary }}
                      >
                        {label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* RIGHT — Code Block */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={!introVisible ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="hidden lg:flex justify-center items-center"
              >
                <div className="relative w-[430px] h-[430px]">
                  {[300, 370, 460].map((s, i) => (
                    <div
                      key={s}
                      className="absolute border rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        width: s,
                        height: s,
                        borderColor: `rgba(${colors.accentRgb}, ${
                          theme === "dark" ? 0.08 : 0.06
                        })`,
                        animation: `ringPulse 4s ease-in-out infinite ${i}s`,
                      }}
                    />
                  ))}

                  <div
                    className="absolute w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ animation: "rotateOrbit 12s linear infinite" }}
                  >
                    <div
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                      style={{
                        background: colors.accent,
                        boxShadow: `0 0 10px rgba(${colors.accentRgb}, 0.5)`,
                      }}
                    />
                  </div>

                  <div
                    className="absolute w-[370px] h-[370px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      animation: "rotateOrbit 18s linear infinite reverse",
                    }}
                  >
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -left-1 w-1.5 h-1.5 rounded-full"
                      style={{
                        background: colors.accent,
                        boxShadow: `0 0 8px rgba(${colors.accentRgb}, 0.4)`,
                      }}
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute top-1/2 left-1/2 w-[360px] border rounded-2xl p-7 backdrop-blur-xl font-mono text-[0.78rem]"
                    style={{
                      background:
                        theme === "dark"
                          ? "rgba(13,13,13,0.95)"
                          : "rgba(255,255,255,0.95)",
                      borderColor: colors.border,
                      boxShadow:
                        theme === "dark"
                          ? `0 0 40px rgba(${colors.accentRgb}, 0.1), 0 20px 60px rgba(0,0,0,0.5)`
                          : `0 0 40px rgba(${colors.accentRgb}, 0.08), 0 20px 60px rgba(0,0,0,0.1)`,
                      animation: "codeFloat 6s ease-in-out infinite",
                    }}
                  >
                    <div className="flex gap-2 mb-4 items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
                      <span
                        className="ml-auto text-[0.6rem] font-mono"
                        style={{ color: colors.textTertiary }}
                      >
                        developer.js
                      </span>
                    </div>
                    {codeLines.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={showCode ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: line.d }}
                        className="my-1 leading-relaxed"
                      >
                        <span
                          className="mr-3 text-[0.65rem] select-none"
                          style={{ color: colors.textTertiary }}
                        >
                          {i + 1}
                        </span>
                        {line.c}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          <Divider colors={colors} theme={theme} />

          {/* ══════ SKILLS ══════ */}
          <section
            id="skills"
            className="py-[100px] px-6 md:px-10"
            style={{ background: colors.bgSecondary }}
          >
            <div className="max-w-[1200px] mx-auto">
              <SectionHead
                tag="Skills"
                title="My "
                hl="Tech Stack"
                sub="Technologies and tools I use to bring ideas to life."
                colors={colors}
              />
              <div className="overflow-hidden mb-10 py-5 relative">
                <div
                  className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
                  style={{
                    background: `linear-gradient(to right, ${colors.bgSecondary}, transparent)`,
                  }}
                />
                <div
                  className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
                  style={{
                    background: `linear-gradient(to left, ${colors.bgSecondary}, transparent)`,
                  }}
                />
                <div
                  className="flex gap-5 w-max"
                  style={{ animation: "marquee 30s linear infinite" }}
                >
                  {[...marqueeItems, ...marqueeItems].map((s, i) => (
                    <span
                      key={i}
                      className="px-6 py-2.5 border rounded-full font-mono text-[0.8rem] whitespace-nowrap shrink-0 select-none"
                      style={{
                        background: colors.bgTertiary,
                        borderColor: colors.border,
                        color: colors.textSecondary,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {skillCategories.map((cat, idx) => (
                  <SkillCard
                    key={cat.title}
                    cat={cat}
                    idx={idx}
                    colors={colors}
                    theme={theme}
                  />
                ))}
              </div>
            </div>
          </section>

          <Divider colors={colors} theme={theme} />

          {/* ══════ EXPERIENCE ══════ */}
          <section id="experience" className="py-[100px] px-6 md:px-10">
            <div className="max-w-[1200px] mx-auto">
              <SectionHead
                tag="Experience"
                title="Where I've "
                hl="Worked"
                sub="Professional experience building real-world applications."
                colors={colors}
              />
              <div className="relative pl-10">
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
                  style={{
                    background: `linear-gradient(to bottom, ${colors.accent}, transparent)`,
                  }}
                />
                <ExpCard colors={colors} theme={theme} />
              </div>
            </div>
          </section>

          <Divider colors={colors} theme={theme} />

          {/* ══════ PROJECTS ══════ */}
          <section
            id="projects"
            className="py-[100px] px-6 md:px-10 relative overflow-hidden"
            style={{ background: colors.bgSecondary }}
          >
            <div
              className="absolute w-[400px] h-[400px] rounded-full blur-[200px] top-[20%] -left-[100px] pointer-events-none"
              style={{
                background: colors.accent,
                opacity: theme === "dark" ? 0.04 : 0.03,
              }}
            />
            <div
              className="absolute w-[300px] h-[300px] rounded-full blur-[200px] bottom-[20%] -right-[100px] pointer-events-none"
              style={{
                background: colors.accent,
                opacity: theme === "dark" ? 0.03 : 0.02,
              }}
            />
            <div className="max-w-[1200px] mx-auto relative z-[2]">
              <SectionHead
                tag="Projects"
                title="Featured "
                hl="Work"
                sub="Some of the projects I've built from the ground up."
                colors={colors}
              />
              <div className="space-y-10">
                {projectsData.map((p, i) => (
                  <ProjectCard
                    key={p.title}
                    project={p}
                    idx={i}
                    colors={colors}
                    theme={theme}
                  />
                ))}
              </div>
              <CtaButton colors={colors} />
            </div>
          </section>

          <Divider colors={colors} theme={theme} />

          {/* ══════ CERTIFICATIONS ══════ */}
          <section id="certifications" className="py-[100px] px-6 md:px-10">
            <div className="max-w-[1200px] mx-auto">
              <SectionHead
                tag="Certifications"
                title="Continuous "
                hl="Learning"
                sub="Credentials that validate my commitment to growth."
                colors={colors}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificationsData.map((c, i) => (
                  <CertCard
                    key={c.title}
                    cert={c}
                    idx={i}
                    colors={colors}
                    theme={theme}
                  />
                ))}
              </div>
            </div>
          </section>

          <Divider colors={colors} theme={theme} />

          {/* ══════ CONTACT ══════ */}
          <section
            id="contact"
            className="py-[100px] px-6 md:px-10 relative overflow-hidden"
            style={{ background: colors.bgSecondary }}
          >
            <div
              className="absolute w-[500px] h-[500px] rounded-full blur-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                background: colors.accent,
                opacity: theme === "dark" ? 0.05 : 0.03,
              }}
            />
            <div className="max-w-[700px] mx-auto text-center relative z-[2]">
              <SectionHead
                tag="Contact"
                title="Let's Build "
                hl="Something Great"
                sub="I'm currently open to new opportunities in Software Development and AI/ML roles. Whether you have a project idea, a job opportunity, or just want to say hi — my inbox is always open."
                center
                colors={colors}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-[50px]">
                {[
                  {
                    icon: "📧",
                    label: "Email",
                    value: info.email,
                    href: `mailto:${info.email}`,
                  },
                  {
                    icon: "💼",
                    label: "LinkedIn",
                    value: "adityapatil0604",
                    href: info.linkedin,
                  },
                ].map((c, i) => (
                  <ContactCardEl
                    key={c.label}
                    card={c}
                    idx={i}
                    colors={colors}
                    theme={theme}
                  />
                ))}
              </div>
              <div className="flex justify-center gap-4">
                {[
                  { href: info.github, emoji: "🐙", label: "GitHub" },
                  { href: info.linkedin, emoji: "💼", label: "LinkedIn" },
                  {
                    href: `mailto:${info.email}`,
                    emoji: "✉️",
                    label: "Email",
                  },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      s.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={s.label}
                    className="w-[52px] h-[52px] border rounded-[14px] flex items-center justify-center text-lg transition-all duration-300"
                    style={{
                      background: colors.bgTertiary,
                      borderColor: colors.border,
                      color: colors.textSecondary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.accent;
                      e.currentTarget.style.background = `rgba(${colors.accentRgb}, 0.08)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.border;
                      e.currentTarget.style.background = colors.bgTertiary;
                    }}
                  >
                    {s.emoji}
                  </motion.a>
                ))}
              </div>
            </div>
          </section>

          {/* ══════ FOOTER ══════ */}
          <footer
            className="text-center py-10 border-t"
            style={{ borderColor: colors.border }}
          >
            <p
              className="font-mono text-[0.8rem]"
              style={{ color: colors.textTertiary }}
            >
              Designed & Built with ❤️ by{" "}
              <span style={{ color: colors.accent }}>Aditya Patil</span>
              &nbsp;|&nbsp;© {new Date().getFullYear()}
            </p>
          </footer>
        </motion.div>

        {/* ══════ GLOBAL STYLES ══════ */}
        <style jsx global>{`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
          html {
            scroll-behavior: smooth;
          }
          body {
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          @keyframes floatUp {
            0% {
              transform: translateY(100vh);
              opacity: 0;
            }
            10% {
              opacity: 0.3;
            }
            90% {
              opacity: 0.3;
            }
            100% {
              transform: translateY(-10vh);
              opacity: 0;
            }
          }
          @keyframes orbFloat {
            0%,
            100% {
              transform: translate(0, 0);
            }
            33% {
              transform: translate(30px, -30px);
            }
            66% {
              transform: translate(-20px, 20px);
            }
          }
          @keyframes ringPulse {
            0%,
            100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.3;
            }
            50% {
              transform: translate(-50%, -50%) scale(1.05);
              opacity: 0.5;
            }
          }
          @keyframes rotateOrbit {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
          @keyframes codeFloat {
            0%,
            100% {
              transform: translate(-50%, -50%) translateY(0px);
            }
            50% {
              transform: translate(-50%, -50%) translateY(-10px);
            }
          }
          @keyframes marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
          @keyframes pulseGlow {
            0%,
            100% {
              opacity: 0.08;
              transform: translate(-50%, -50%) scale(1);
            }
            50% {
              opacity: 0.14;
              transform: translate(-50%, -50%) scale(1.05);
            }
          }
          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(6, 182, 212, 0.3);
            border-radius: 3px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(6, 182, 212, 0.5);
          }
          ::selection {
            background: rgba(6, 182, 212, 0.25);
            color: inherit;
          }
        `}</style>
      </div>
    </ThemeContext.Provider>
  );
}

/* ════════════════════════════════════════════
   SUB COMPONENTS
   ════════════════════════════════════════════ */

function Divider({ colors, theme }) {
  return (
    <div
      className="w-full h-[1px]"
      style={{
        background:
          theme === "dark"
            ? `linear-gradient(90deg, transparent, rgba(255,255,255,0.06), rgba(${colors.accentRgb},0.1), rgba(255,255,255,0.06), transparent)`
            : `linear-gradient(90deg, transparent, rgba(0,0,0,0.06), rgba(${colors.accentRgb},0.12), rgba(0,0,0,0.06), transparent)`,
      }}
    />
  );
}

function SectionHead({ tag, title, hl, sub, center, colors }) {
  const { ref, visible } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      className={`mb-[60px] ${center ? "text-center" : ""}`}
    >
      <p
        className={`font-mono text-[0.8rem] mb-3 tracking-[2px] uppercase flex items-center gap-2 ${
          center ? "justify-center" : ""
        }`}
        style={{ color: colors.accent }}
      >
        <span style={{ color: colors.textTertiary }}>{"//"}</span>
        {tag}
      </p>
      <h2 className="font-bold text-[clamp(2rem,4vw,3rem)] mb-4 tracking-tight">
        {title}
        <span
          className="bg-gradient-to-r bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, ${colors.accent}, ${colors.accent}bb)`,
          }}
        >
          {hl}
        </span>
      </h2>
      <p
        className={`text-base leading-relaxed ${
          center ? "max-w-[600px] mx-auto" : "max-w-[600px]"
        }`}
        style={{ color: colors.textSecondary }}
      >
        {sub}
      </p>
    </motion.div>
  );
}

function SkillCard({ cat, idx, colors, theme }) {
  const { ref, visible } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: idx * 0.1,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="relative border rounded-[20px] p-8 group overflow-hidden cursor-default"
      style={{
        background: colors.cardBg,
        borderColor: colors.border,
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `rgba(${colors.accentRgb}, 0.3)`;
        e.currentTarget.style.boxShadow = `0 20px 60px rgba(${colors.accentRgb}, 0.08)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-[20px]"
        style={{
          background: `linear-gradient(to right, ${colors.accent}, ${colors.accent}66)`,
        }}
      />
      <motion.div
        whileHover={{ scale: 1.1, rotate: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-12 h-12 border rounded-[14px] flex items-center justify-center mb-5 text-xl"
        style={{
          background: `rgba(${colors.accentRgb}, ${theme === "dark" ? 0.08 : 0.05})`,
          borderColor: `rgba(${colors.accentRgb}, 0.15)`,
        }}
      >
        {cat.icon}
      </motion.div>
      <h3 className="font-bold text-[1.1rem] mb-4">{cat.title}</h3>
      <div className="flex flex-wrap gap-2">
        {cat.tags.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: idx * 0.1 + i * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="px-3.5 py-1.5 border rounded-lg text-[0.75rem] cursor-default"
            style={{
              background:
                theme === "dark"
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(0,0,0,0.04)",
              borderColor: colors.border,
              color: colors.textSecondary,
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `rgba(${colors.accentRgb}, 0.3)`;
              e.currentTarget.style.color = colors.text;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = colors.border;
              e.currentTarget.style.color = colors.textSecondary;
            }}
          >
            {t}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

function ExpCard({ colors, theme }) {
  const { ref, visible } = useInView();
  const e = experienceData;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      className="relative mb-10"
    >
      <motion.div
        whileHover={{ scale: 1.3 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="absolute -left-[47px] top-8 w-4 h-4 border-[3px] rounded-full z-[2]"
        style={{
          background: colors.bg,
          borderColor: colors.accent,
          boxShadow: `0 0 12px rgba(${colors.accentRgb}, 0.4)`,
        }}
      />
      <div
        className="border rounded-[20px] p-9 transition-all duration-300"
        style={{
          background: colors.cardBg,
          borderColor: colors.border,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `rgba(${colors.accentRgb}, 0.2)`;
          e.currentTarget.style.boxShadow = `0 20px 60px rgba(${colors.accentRgb}, 0.06)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = colors.border;
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="font-bold text-[1.4rem] mb-1">{e.role}</h3>
            <p
              className="text-base font-semibold"
              style={{ color: colors.accent }}
            >
              {e.company}
            </p>
          </div>
          <span
            className="font-mono text-[0.75rem] px-3 py-1 rounded-full border mt-1"
            style={{
              color: colors.accent,
              borderColor: `rgba(${colors.accentRgb}, 0.2)`,
              background: `rgba(${colors.accentRgb}, 0.08)`,
            }}
          >
            Internship
          </span>
        </div>
        <ul className="list-none space-y-3 mb-6">
          {e.points.map((p, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="relative pl-[22px] text-[0.9rem] leading-[1.7]"
              style={{ color: colors.textSecondary }}
            >
              <span
                className="absolute left-0 top-0"
                style={{ color: colors.accent }}
              >
                ▹
              </span>
              {p}
            </motion.li>
          ))}
        </ul>
        <div
          className="flex flex-wrap gap-2 pt-5 border-t"
          style={{ borderColor: colors.border }}
        >
          {e.tech.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 border rounded-md font-mono text-[0.7rem] cursor-default"
              style={{
                background: `rgba(${colors.accentRgb}, ${
                  theme === "dark" ? 0.08 : 0.05
                })`,
                borderColor: `rgba(${colors.accentRgb}, 0.15)`,
                color: colors.accent,
              }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project: p, idx, colors, theme }) {
  const { ref, visible } = useInView();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: idx * 0.15,
        ease: [0.34, 1.56, 0.64, 1],
      }}
    >
      <motion.div
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative rounded-[24px] p-[1px] transition-all duration-500"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${p.accent}88, ${p.accent}22, ${p.accent}66)`
            : `rgba(${colors.accentRgb}, 0.08)`,
          boxShadow: isHovered
            ? `0 30px 80px ${p.accent}20, 0 0 0 1px ${p.accent}20`
            : "none",
        }}
      >
        <div
          className="relative rounded-[23px] overflow-hidden"
          style={{ background: colors.bg }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr]">
            {/* Animation Panel */}
            <div className="relative h-[320px] lg:h-auto lg:min-h-[440px] overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: theme === "dark" ? "#060610" : "#F0F4F8",
                }}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-50`}
              />
              <div
                className="absolute inset-0"
                style={{
                  opacity: theme === "dark" ? 0.03 : 0.06,
                  backgroundImage:
                    "linear-gradient(rgba(128,128,128,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.5) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="relative z-10 h-full">
                {idx === 0 ? <DevDialogueAnimation /> : <MLPipelineAnimation />}
              </div>
            </div>

            {/* Content Panel */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <p
                className="font-mono text-[0.7rem] tracking-[3px] uppercase mb-3"
                style={{ color: p.accent }}
              >
                {p.tagline}
              </p>

              <h3 className="font-bold text-[1.8rem] lg:text-[2rem] mb-3 flex items-center gap-3 tracking-tight">
                {p.title}
                <motion.span
                  animate={
                    isHovered
                      ? { rotate: [0, -10, 10, 0], scale: [1, 1.3, 1] }
                      : { rotate: 0, scale: 1 }
                  }
                  transition={{ duration: 0.5 }}
                  className="text-2xl"
                >
                  {p.icon}
                </motion.span>
              </h3>

              <div className="flex gap-3 mb-5 flex-wrap">
                {p.github && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-[0.72rem] font-medium transition-all duration-300"
                    style={{
                      background:
                        theme === "dark"
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(0,0,0,0.04)",
                      borderColor: colors.border,
                      color: colors.textSecondary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = p.accent;
                      e.currentTarget.style.color = p.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.border;
                      e.currentTarget.style.color = colors.textSecondary;
                    }}
                  >
                    🔗 GitHub
                  </motion.a>
                )}
                {p.live && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-[0.72rem] font-medium transition-all duration-300"
                    style={{
                      background: `${p.accent}12`,
                      borderColor: p.accent,
                      color: p.accent,
                    }}
                  >
                    🌐 Live Demo
                  </motion.a>
                )}
              </div>

              <p
                className="text-[0.95rem] leading-[1.8] mb-6"
                style={{ color: colors.textSecondary }}
              >
                {p.description}
              </p>

              <div className="space-y-3 mb-7">
                {p.features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={visible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: idx * 0.1 + i * 0.08 + 0.2 }}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center text-[0.6rem] mt-0.5 shrink-0"
                      style={{
                        background: `${p.accent}15`,
                        border: `1px solid ${p.accent}30`,
                        color: p.accent,
                      }}
                    >
                      ⚡
                    </div>
                    <span
                      className="text-[0.85rem] leading-[1.6]"
                      style={{ color: colors.textSecondary }}
                    >
                      {f}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div
                className="flex flex-wrap gap-2 pt-6 border-t"
                style={{ borderColor: colors.border }}
              >
                {p.tech.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={visible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: idx * 0.1 + i * 0.05 + 0.4 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3.5 py-1.5 border rounded-lg font-mono text-[0.72rem] cursor-default transition-all duration-200"
                    style={{
                      background:
                        theme === "dark"
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(0,0,0,0.03)",
                      borderColor: colors.border,
                      color: colors.textTertiary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${p.accent}44`;
                      e.currentTarget.style.color = p.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.border;
                      e.currentTarget.style.color = colors.textTertiary;
                    }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CtaButton({ colors }) {
  const { ref, visible } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="text-center mt-[60px]"
    >
      <MagneticButton
        onClick={() => window.open(info.github, "_blank")}
        className="group relative overflow-hidden inline-flex items-center gap-3 px-10 py-4 rounded-xl text-[0.95rem] font-semibold transition-all duration-300 border-none cursor-pointer"
        style={{
          background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}cc)`,
          color: "#ffffff",
          boxShadow: `0 15px 50px rgba(${colors.accentRgb}, 0.35)`,
        }}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        🐙 See More Projects on GitHub
      </MagneticButton>
    </motion.div>
  );
}

function CertCard({ cert: c, idx, colors, theme }) {
  const { ref, visible } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: idx * 0.1,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="border rounded-2xl p-7 flex gap-5 items-start transition-all duration-300 cursor-default"
      style={{
        background: colors.cardBg,
        borderColor: colors.border,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `rgba(${colors.accentRgb}, 0.25)`;
        e.currentTarget.style.boxShadow = `0 15px 40px rgba(${colors.accentRgb}, 0.08)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-11 h-11 min-w-[44px] border rounded-xl flex items-center justify-center text-xl"
        style={{
          background: `rgba(${colors.accentRgb}, ${theme === "dark" ? 0.08 : 0.05})`,
          borderColor: `rgba(${colors.accentRgb}, 0.15)`,
        }}
      >
        {c.icon}
      </motion.div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-base mb-1">{c.title}</h4>
        <p
          className="text-[0.8rem] font-medium mb-2.5"
          style={{ color: colors.accent }}
        >
          {c.issuer}
        </p>
        <p
          className="text-[0.8rem] leading-[1.65]"
          style={{ color: colors.textTertiary }}
        >
          {c.desc}
        </p>
      </div>
    </motion.div>
  );
}

function ContactCardEl({ card: c, idx, colors, theme }) {
  const { ref, visible } = useInView();
  return (
    <motion.a
      ref={ref}
      href={c.href}
      target={c.label !== "Email" ? "_blank" : undefined}
      rel={c.label !== "Email" ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: idx * 0.1,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="border rounded-2xl px-5 py-7 block no-underline text-center transition-all duration-300"
      style={{
        background: colors.cardBg,
        borderColor: colors.border,
        color: colors.text,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `rgba(${colors.accentRgb}, 0.3)`;
        e.currentTarget.style.boxShadow = `0 20px 50px rgba(${colors.accentRgb}, 0.1)`;
        e.currentTarget.style.background =
          theme === "dark"
            ? `rgba(${colors.accentRgb}, 0.05)`
            : `rgba(${colors.accentRgb}, 0.03)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.background = colors.cardBg;
      }}
    >
      <motion.div
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-3xl mb-3.5"
      >
        {c.icon}
      </motion.div>
      <div
        className="text-[0.72rem] uppercase tracking-[2px] mb-1.5 font-medium"
        style={{ color: colors.textTertiary }}
      >
        {c.label}
      </div>
      <div
        className="font-mono text-[0.88rem] font-medium break-all"
        style={{ color: colors.textSecondary }}
      >
        {c.value}
      </div>
    </motion.a>
  );
}
