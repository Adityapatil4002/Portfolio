"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════ */

const info = {
  name: "Aditya Patil",
  email: "adityapatil6604@gmail.com",
  phone: "+91-8767-01-3312",
  linkedin: "https://www.linkedin.com/in/adityapatil0604",
  github: "https://github.com/Adityapatil4002",
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
    gradient: "from-violet-600/20 via-purple-600/10 to-indigo-600/20",
    accent: "#8B5CF6",
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
   HOOKS
   ════════════════════════════════════════════ */

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" },
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [threshold]);
  return { ref, visible };
}

/* ════════════════════════════════════════════
   NEURAL NETWORK CANVAS
   ════════════════════════════════════════════ */

function NeuralNetworkBg() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

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

    const connDist = 180;
    let time = 0;

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

      for (const node of nodes) {
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

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connDist) {
            const opacity = (1 - dist / connDist) * 0.15;
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2;
            const mDx = midX - mouseRef.current.x;
            const mDy = midY - mouseRef.current.y;
            const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
            const mInf = mDist < 200 ? 1.5 : 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * mInf})`;
            ctx.lineWidth = 0.5 + (1 - dist / connDist) * 0.5;
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
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
          glow.addColorStop(0, "rgba(139, 92, 246, 0.15)");
          glow.addColorStop(1, "rgba(139, 92, 246, 0)");
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
          ? "rgba(167, 139, 250, 0.8)"
          : "rgba(139, 92, 246, 0.4)";
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
  }, []);

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
      avatar: "AP",
      text: "Let's build the auth module 🔥",
      side: "right",
      showAt: 0,
    },
    {
      user: "Sarah",
      avatar: "SK",
      text: "On it! Setting up React components",
      side: "left",
      showAt: 1,
    },
    {
      user: "Aditya",
      avatar: "AP",
      text: "@AI fix the login bug in auth.js",
      side: "right",
      showAt: 2,
    },
  ];

  return (
    <div className="h-full flex flex-col p-3 lg:p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-black/50 rounded-lg backdrop-blur-sm border border-white/5 mb-3 shrink-0">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[0.65rem] text-white/60 font-mono font-medium">
          DevDialogue
        </span>
        <div className="ml-auto flex -space-x-1.5">
          <div className="w-4 h-4 rounded-full bg-violet/40 border border-black text-[0.35rem] flex items-center justify-center text-white/80">
            A
          </div>
          <div className="w-4 h-4 rounded-full bg-blue-500/40 border border-black text-[0.35rem] flex items-center justify-center text-white/80">
            S
          </div>
          <div className="w-4 h-4 rounded-full bg-emerald-500/40 border border-black text-[0.35rem] flex items-center justify-center text-white/80">
            R
          </div>
        </div>
        <span className="text-[0.5rem] text-green-400/60">3 online</span>
      </div>

      {/* Chat messages */}
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
                    className={`max-w-[85%] px-3 py-2 text-[0.6rem] lg:text-[0.65rem] leading-relaxed ${
                      msg.side === "right"
                        ? "bg-violet/15 border border-violet/20 text-white/80 rounded-2xl rounded-br-md"
                        : "bg-white/[0.04] border border-white/[0.06] text-white/70 rounded-2xl rounded-bl-md"
                    }`}
                  >
                    <span
                      className={`text-[0.5rem] font-semibold block mb-0.5 ${msg.side === "right" ? "text-violet-light/70" : "text-blue-400/70"}`}
                    >
                      {msg.user}
                    </span>
                    {msg.text}
                  </div>
                </motion.div>
              ),
          )}

          {/* AI typing indicator */}
          {phase === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-violet/10 border border-violet/25 rounded-2xl rounded-bl-md px-3 py-2.5 max-w-[80%]">
                <span className="text-[0.5rem] text-violet font-semibold block mb-1">
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
                      className="w-1.5 h-1.5 bg-violet rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* AI response */}
          {phase >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-start"
            >
              <div className="bg-violet/10 border border-violet/25 rounded-2xl rounded-bl-md px-3 py-2 max-w-[90%]">
                <span className="text-[0.5rem] text-violet font-semibold block mb-1">
                  🤖 DevAI
                </span>
                <span className="text-[0.6rem] lg:text-[0.65rem] text-white/80 leading-relaxed">
                  Found <span className="text-red-400">null check error</span>{" "}
                  on line 42. Patching now...{" "}
                  <span className="text-green-400">✅</span>
                </span>
              </div>
            </motion.div>
          )}

          {/* File created */}
          {phase >= 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-black/60 border border-white/[0.08] rounded-xl px-3 py-2.5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#28CA41]" />
                  </div>
                  <span className="text-[0.5rem] text-green-400 font-mono">
                    📄 auth.js
                  </span>
                  <span className="text-[0.45rem] text-white/25 ml-auto">
                    created
                  </span>
                </div>
                <div className="font-mono text-[0.5rem] lg:text-[0.55rem] space-y-0.5">
                  <div>
                    <span className="text-gray-500">1 </span>
                    <span className="text-violet-light">const</span>{" "}
                    <span className="text-blue-400">auth</span>{" "}
                    <span className="text-white/50">=</span>{" "}
                    <span className="text-green-400">require</span>
                    <span className="text-white/30">(</span>
                    <span className="text-orange-300">
                      &apos;./config&apos;
                    </span>
                    <span className="text-white/30">);</span>
                  </div>
                  <div>
                    <span className="text-gray-500">2 </span>
                    <span className="text-violet-light">if</span>{" "}
                    <span className="text-white/30">(</span>
                    <span className="text-blue-400">user</span>{" "}
                    <span className="text-orange-300">!==</span>{" "}
                    <span className="text-violet-light">null</span>
                    <span className="text-white/30">) {"{"}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">3 </span>
                    {"  "}
                    <span className="text-blue-400">validateToken</span>
                    <span className="text-white/30">(</span>
                    <span className="text-blue-400">user</span>
                    <span className="text-white/30">);</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Terminal */}
          {phase >= 6 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-black/70 border border-white/[0.08] rounded-xl px-3 py-2">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-[0.5rem] text-white/30">⬤</span>
                  <span className="text-[0.5rem] text-white/40 font-mono">
                    Terminal
                  </span>
                </div>
                <div className="font-mono text-[0.5rem] lg:text-[0.55rem] space-y-0.5">
                  <div className="text-gray-400">$ npm run dev</div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-green-400"
                  >
                    ✓ Compiled successfully
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-green-400"
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
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-black/50 rounded-lg backdrop-blur-sm border border-white/5 mb-3 shrink-0">
        <span className="text-[0.65rem] text-white/60 font-mono font-medium">
          📊 ML Pipeline
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[0.5rem] text-emerald-400/70">Running</span>
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
          {/* Data loading */}
          {phase >= 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-black/50 rounded-xl px-3 py-2.5 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.5rem] text-white/40 font-mono">
                    Dataset Preview
                  </span>
                  <span className="text-[0.45rem] text-emerald-400/60">
                    412,698 records
                  </span>
                </div>

                {/* Table header */}
                <div className="flex justify-between text-[0.45rem] text-white/25 font-mono border-b border-white/5 pb-1 mb-1">
                  <span className="w-8">ID</span>
                  <span className="w-10">Year</span>
                  <span className="w-14 text-right">Price</span>
                  <span className="w-12 text-right">Hours</span>
                </div>

                {/* Data rows */}
                {dataRows.map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2, duration: 0.3 }}
                    className="flex justify-between text-[0.5rem] font-mono text-white/50 py-0.5 border-b border-white/[0.03]"
                  >
                    <span className="w-8 text-white/20">{row.id}</span>
                    <span className="w-10">{row.year}</span>
                    <span className="w-14 text-right text-emerald-400/80">
                      {row.price}
                    </span>
                    <span className="w-12 text-right text-white/35">
                      {row.hrs}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Training progress */}
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-black/50 rounded-xl px-3 py-2.5 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.5rem] text-white/40 font-mono">
                    Training RandomForest...
                  </span>
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-[0.45rem] text-yellow-400/70"
                  >
                    ● Processing
                  </motion.span>
                </div>
                <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 rounded-full"
                    style={{
                      boxShadow: "0 0 10px rgba(16, 185, 129, 0.3)",
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[0.4rem] text-white/20 font-mono">
                    Epoch 1/100
                  </span>
                  <span className="text-[0.4rem] text-white/20 font-mono">
                    n_estimators=100
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Visualization */}
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-black/50 rounded-xl px-3 py-2.5 border border-white/5">
                <span className="text-[0.5rem] text-white/40 font-mono mb-2 block">
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
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-emerald-600/80 to-emerald-400/60"
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[0.4rem] text-white/15 font-mono">
                    $10K
                  </span>
                  <span className="text-[0.4rem] text-white/15 font-mono">
                    $90K
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {phase >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-emerald-500/[0.08] border border-emerald-500/20 rounded-xl px-3 py-2.5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-400 text-[0.6rem]">✓</span>
                  <span className="text-[0.55rem] text-emerald-400 font-semibold">
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
                      <span className="text-[0.4rem] text-white/30 block">
                        {metric.label}
                      </span>
                      <span className="text-[0.65rem] text-white/80 font-mono font-semibold">
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
   MAIN PAGE
   ════════════════════════════════════════════ */

export default function Home() {
  const [introVisible, setIntroVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCode, setShowCode] = useState(false);
  const [countersStarted, setCountersStarted] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);
  const [isTouch, setIsTouch] = useState(false);

  const heroRef = useRef(null);

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
    setIsTouch("ontouchstart" in window);
  }, []);

  // Intro: appear from bottom, then disappear
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
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const fn = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [isTouch]);

  useEffect(() => {
    if (!countersStarted) return;
    const targets = [10, 15, 4];
    const start = Date.now();
    const dur = 2000;
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 4);
      setCounts(targets.map((t) => Math.floor(e * t)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [countersStarted]);

  useEffect(() => {
    if (!heroRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setCountersStarted(true);
      },
      { threshold: 0.1 },
    );
    obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    setMobileNav(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const codeLines = [
    {
      c: (
        <>
          <span className="text-violet-light">const</span>{" "}
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
          <span className="text-green-400">&quot;SDE & AI Engineer&quot;</span>,
        </>
      ),
      d: 0.5,
    },
    {
      c: (
        <>
          &nbsp;&nbsp;<span className="text-blue-400">branch</span>:{" "}
          <span className="text-green-400">&quot;AI & Data Science&quot;</span>,
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
          &nbsp;&nbsp;<span className="text-gray-500">]</span>,
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
  ];

  return (
    <>
      {/* Noise */}
      <div
        className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Cursor glow */}
      {!isTouch && (
        <motion.div
          className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-[9999]"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
          }}
          animate={{ x: mousePos.x - 250, y: mousePos.y - 250 }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      )}

      {/* ══════ INTRO — "Hello" from bottom ══════ */}
      <AnimatePresence>
        {introVisible && (
          <motion.div
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
          >
            <div
              className="absolute w-[500px] h-[500px] bg-violet rounded-full blur-[200px] opacity-[0.06] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ animation: "pulseGlow 4s ease-in-out infinite" }}
            />

            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-playfair italic text-[clamp(5rem,16vw,14rem)] font-bold bg-gradient-to-r from-white via-violet-light to-violet bg-clip-text text-transparent select-none"
              style={{ letterSpacing: "-0.02em" }}
            >
              Hello
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════ MAIN ══════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={!introVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* NAV */}
        <motion.nav
          initial={{ y: -100 }}
          animate={!introVisible ? { y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`fixed top-0 left-0 w-full z-[1000] px-6 md:px-10 flex justify-between items-center transition-all duration-300 ${
            scrolled
              ? "py-4 bg-black/85 backdrop-blur-xl border-b border-white/[0.06]"
              : "py-5 bg-transparent"
          }`}
        >
          <button
            onClick={() => scrollTo("home")}
            className="font-grotesk text-2xl font-bold text-white bg-transparent border-none cursor-pointer"
          >
            A<span className="text-violet">.</span>P
          </button>
          <ul className="hidden md:flex gap-8 list-none">
            {navItems.map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="relative text-gray-400 text-[0.85rem] font-medium tracking-wider uppercase hover:text-white transition-colors bg-transparent border-none cursor-pointer group"
                >
                  {item}
                  <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-violet transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>
          <button
            className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer z-[1001]"
            onClick={() => setMobileNav(!mobileNav)}
          >
            <motion.span
              animate={mobileNav ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-[25px] h-[2px] bg-white block"
            />
            <motion.span
              animate={{ opacity: mobileNav ? 0 : 1 }}
              className="w-[25px] h-[2px] bg-white block"
            />
            <motion.span
              animate={mobileNav ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-[25px] h-[2px] bg-white block"
            />
          </button>
          <AnimatePresence>
            {mobileNav && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 w-[280px] h-screen bg-[#0a0a0a]/98 backdrop-blur-xl border-l border-white/[0.06] flex flex-col pt-[100px] px-10 gap-8 z-[1000]"
              >
                {navItems.map((item, i) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="text-gray-400 text-[0.85rem] font-medium tracking-wider uppercase hover:text-white transition-colors text-left bg-transparent border-none cursor-pointer"
                  >
                    {item}
                  </motion.button>
                ))}
              </motion.div>
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
            className="absolute w-[600px] h-[600px] bg-violet rounded-full blur-[150px] opacity-[0.08] -top-[200px] -right-[100px]"
            style={{ animation: "orbFloat 18s ease-in-out infinite" }}
          />
          <div
            className="absolute w-[400px] h-[400px] bg-violet-dark rounded-full blur-[150px] opacity-[0.06] -bottom-[100px] -left-[100px]"
            style={{ animation: "orbFloat 18s ease-in-out infinite 6s" }}
          />

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full bg-violet opacity-0"
                style={{
                  left: p.left,
                  width: p.size,
                  height: p.size,
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
              <div className="inline-flex items-center gap-2 px-[18px] py-2 border border-violet/30 rounded-full bg-violet/[0.08] mb-7">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[0.8rem] text-violet-light font-medium tracking-wider">
                  Open to Opportunities
                </span>
              </div>

              <h1 className="font-grotesk text-[clamp(2.8rem,5.5vw,5rem)] font-bold leading-[1.05] mb-3">
                Hi, I&apos;m
                <br />
                <span className="bg-gradient-to-r from-violet-light via-violet to-purple-400 bg-clip-text text-transparent">
                  {info.name}
                </span>
              </h1>

              <div className="font-mono text-[clamp(0.85rem,1.4vw,1.15rem)] text-gray-400 mb-7 flex items-center gap-2.5 flex-wrap">
                <span className="text-white/90">SDE</span>
                <span className="w-1.5 h-1.5 bg-violet rounded-full" />
                <span className="text-white/90">Full Stack Developer</span>
                <span className="w-1.5 h-1.5 bg-violet rounded-full" />
                <span className="text-white/90">AI / ML Engineer</span>
              </div>

              <p className="text-[1.05rem] text-gray-400 leading-[1.85] mb-10 max-w-[540px]">
                Passionate{" "}
                <strong className="text-white">AI & Data Science</strong>{" "}
                engineer with hands-on expertise in full-stack development and
                machine learning. I build intelligent, scalable web applications
                and AI-powered solutions — actively seeking{" "}
                <strong className="text-white">SDE</strong>,{" "}
                <strong className="text-white">Full Stack</strong>, and{" "}
                <strong className="text-white">AI/ML</strong> roles where I can
                engineer products that make a real-world impact.
              </p>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => scrollTo("contact")}
                  className="group relative overflow-hidden inline-flex items-center gap-2.5 px-9 py-4 bg-gradient-to-r from-violet-dark to-violet text-white rounded-xl text-[0.95rem] font-semibold transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_15px_50px_rgba(139,92,246,0.45)] border-none cursor-pointer"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  💬 Get in Touch
                </button>
                <button
                  onClick={() => scrollTo("projects")}
                  className="inline-flex items-center gap-2.5 px-9 py-4 bg-transparent text-white border border-white/[0.08] rounded-xl text-[0.95rem] font-semibold transition-all duration-300 hover:border-violet hover:bg-violet/[0.08] hover:-translate-y-[3px] cursor-pointer"
                >
                  📂 View Projects
                </button>
              </div>

              <div className="flex gap-10 mt-12 pt-8 border-t border-white/[0.06]">
                {[
                  { label: "Projects Built", i: 0 },
                  { label: "Technologies", i: 1 },
                  { label: "Certifications", i: 2 },
                ].map(({ label, i }) => (
                  <div key={label}>
                    <div className="font-grotesk text-3xl md:text-4xl font-bold">
                      {counts[i]}
                      <span className="text-violet">+</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT - code block */}
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
                    className="absolute border border-violet/[0.08] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      width: s,
                      height: s,
                      animation: `ringPulse 4s ease-in-out infinite ${i}s`,
                    }}
                  />
                ))}
                <div
                  className="absolute w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ animation: "rotateOrbit 12s linear infinite" }}
                >
                  <div className="absolute -top-1 left-1/2 w-2 h-2 bg-violet rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
                </div>
                <div
                  className="absolute w-[370px] h-[370px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: "rotateOrbit 18s linear infinite reverse",
                  }}
                >
                  <div className="absolute top-1/2 -left-1 w-1.5 h-1.5 bg-purple-400 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
                </div>

                <div
                  className="absolute top-1/2 left-1/2 w-[360px] bg-[#0d0d0d]/95 border border-white/[0.08] rounded-2xl p-7 backdrop-blur-xl font-mono text-[0.78rem]"
                  style={{
                    animation:
                      "codeFloat 6s ease-in-out infinite, glowPulse 4s ease-in-out infinite",
                  }}
                >
                  <div className="flex gap-2 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
                    <span className="ml-auto text-[0.6rem] text-gray-600 font-mono">
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
                      <span className="text-gray-600 mr-3 text-[0.65rem] select-none">
                        {i + 1}
                      </span>
                      {line.c}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Divider />

        {/* ══════ SKILLS ══════ */}
        <section id="skills" className="py-[100px] px-6 md:px-10 bg-[#0A0A0A]">
          <div className="max-w-[1200px] mx-auto">
            <SectionHead
              tag="Skills"
              title="My "
              hl="Tech Stack"
              sub="Technologies and tools I use to bring ideas to life."
            />
            <div className="overflow-hidden mb-10 py-5">
              <div
                className="flex gap-5 w-max"
                style={{ animation: "marquee 30s linear infinite" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.animationPlayState = "paused")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.animationPlayState = "running")
                }
              >
                {[...marqueeItems, ...marqueeItems].map((s, i) => (
                  <span
                    key={i}
                    className="px-6 py-2.5 bg-[#111] border border-white/[0.06] rounded-full font-mono text-[0.8rem] text-gray-400 whitespace-nowrap transition-all duration-300 hover:border-violet hover:text-violet-light hover:bg-violet/[0.08] cursor-default shrink-0"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {skillCategories.map((cat, idx) => (
                <SkillCard key={cat.title} cat={cat} idx={idx} />
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ══════ EXPERIENCE ══════ */}
        <section id="experience" className="py-[100px] px-6 md:px-10">
          <div className="max-w-[1200px] mx-auto">
            <SectionHead
              tag="Experience"
              title="Where I've "
              hl="Worked"
              sub="Professional experience building real-world applications."
            />
            <div className="relative pl-10">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-violet to-white/[0.06]" />
              <ExpCard />
            </div>
          </div>
        </section>

        <Divider />

        {/* ══════ PROJECTS ══════ */}
        <section
          id="projects"
          className="py-[100px] px-6 md:px-10 bg-[#0A0A0A] relative overflow-hidden"
        >
          <div className="absolute w-[400px] h-[400px] bg-violet rounded-full blur-[200px] opacity-[0.04] top-[20%] -left-[100px]" />
          <div className="absolute w-[300px] h-[300px] bg-purple-500 rounded-full blur-[200px] opacity-[0.03] bottom-[20%] -right-[100px]" />
          <div className="max-w-[1200px] mx-auto relative z-[2]">
            <SectionHead
              tag="Projects"
              title="Featured "
              hl="Work"
              sub="Some of the projects I've built from the ground up."
            />
            <div className="space-y-10">
              {projectsData.map((p, i) => (
                <ProjectCard key={p.title} project={p} idx={i} />
              ))}
            </div>
            <CtaButton />
          </div>
        </section>

        <Divider />

        {/* ══════ CERTIFICATIONS ══════ */}
        <section id="certifications" className="py-[100px] px-6 md:px-10">
          <div className="max-w-[1200px] mx-auto">
            <SectionHead
              tag="Certifications"
              title="Continuous "
              hl="Learning"
              sub="Credentials that validate my commitment to growth."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificationsData.map((c, i) => (
                <CertCard key={c.title} cert={c} idx={i} />
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ══════ CONTACT ══════ */}
        <section
          id="contact"
          className="py-[100px] px-6 md:px-10 bg-[#0A0A0A] relative overflow-hidden"
        >
          <div className="absolute w-[500px] h-[500px] bg-violet rounded-full blur-[200px] opacity-[0.05] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="max-w-[700px] mx-auto text-center relative z-[2]">
            <SectionHead
              tag="Contact"
              title="Let's Build "
              hl="Something Great"
              sub="I'm currently open to new opportunities in Software Development and AI/ML roles. Whether you have a project idea, a job opportunity, or just want to say hi — my inbox is always open."
              center
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-[50px]">
              {[
                {
                  icon: "📧",
                  label: "Email",
                  value: info.email,
                  href: `mailto:${info.email}`,
                },
                {
                  icon: "📱",
                  label: "Phone",
                  value: info.phone,
                  href: `tel:${info.phone.replace(/-/g, "")}`,
                },
                {
                  icon: "💼",
                  label: "LinkedIn",
                  value: "adityapatil0604",
                  href: info.linkedin,
                },
              ].map((c, i) => (
                <ContactCardEl key={c.label} card={c} idx={i} />
              ))}
            </div>
            <div className="flex justify-center gap-4">
              {[
                { href: info.github, emoji: "🐙" },
                { href: info.linkedin, emoji: "💼" },
                { href: `mailto:${info.email}`, emoji: "✉️" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[52px] h-[52px] bg-[#111] border border-white/[0.06] rounded-[14px] flex items-center justify-center text-gray-400 text-lg transition-all duration-300 hover:border-violet hover:text-violet-light hover:bg-violet/[0.08] hover:-translate-y-[5px] hover:shadow-[0_10px_30px_rgba(139,92,246,0.2)]"
                >
                  {s.emoji}
                </a>
              ))}
            </div>
          </div>
        </section>

        <footer className="text-center py-10 border-t border-white/[0.06]">
          <p className="font-mono text-[0.8rem] text-gray-500">
            Designed & Built by{" "}
            <span className="text-violet">Aditya Patil</span> &nbsp;|&nbsp; ©{" "}
            {new Date().getFullYear()}
          </p>
        </footer>
      </motion.div>
    </>
  );
}

/* ════════════════════════════════════════════
   SUB COMPONENTS
   ════════════════════════════════════════════ */

function Divider() {
  return (
    <div
      className="w-full h-[1px]"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), rgba(139,92,246,0.08), rgba(255,255,255,0.06), transparent)",
      }}
    />
  );
}

function SectionHead({ tag, title, hl, sub, center }) {
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
        className={`font-mono text-[0.8rem] text-violet mb-3 tracking-[2px] uppercase flex items-center gap-2 ${center ? "justify-center" : ""}`}
      >
        <span className="text-gray-500">{"//"}</span>
        {tag}
      </p>
      <h2 className="font-grotesk text-[clamp(2rem,4vw,3rem)] font-bold mb-4">
        {title}
        <span className="bg-gradient-to-r from-violet-light to-violet bg-clip-text text-transparent">
          {hl}
        </span>
      </h2>
      <p
        className={`text-base text-gray-400 ${center ? "max-w-[600px] mx-auto" : "max-w-[600px]"}`}
      >
        {sub}
      </p>
    </motion.div>
  );
}

function SkillCard({ cat, idx }) {
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
      className="relative bg-[#111] border border-white/[0.06] rounded-[20px] p-8 transition-all duration-300 hover:border-violet/30 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(139,92,246,0.1)] group overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-dark to-violet-light scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      <div className="w-12 h-12 bg-violet/[0.08] border border-violet/15 rounded-[14px] flex items-center justify-center mb-5 text-xl transition-all duration-300 group-hover:bg-violet/15 group-hover:scale-110">
        {cat.icon}
      </div>
      <h3 className="font-grotesk text-[1.1rem] font-semibold mb-4">
        {cat.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {cat.tags.map((t) => (
          <span
            key={t}
            className="px-3.5 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-lg text-[0.75rem] text-gray-400 transition-all duration-300 hover:bg-violet/[0.08] hover:border-violet/30 hover:text-violet-light hover:-translate-y-0.5 cursor-default"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function ExpCard() {
  const { ref, visible } = useInView();
  const e = experienceData;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      className="relative mb-10 group"
    >
      <div className="absolute -left-[47px] top-2 w-4 h-4 bg-black border-[3px] border-violet rounded-full z-[2] transition-all duration-300 group-hover:bg-violet group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]" />
      <div className="bg-[#111] border border-white/[0.06] rounded-[20px] p-9 transition-all duration-300 hover:border-violet/30 hover:shadow-[0_15px_50px_rgba(139,92,246,0.08)] hover:translate-x-2">
        <h3 className="font-grotesk text-[1.4rem] font-semibold mb-1.5">
          {e.role}
        </h3>
        <p className="text-violet text-base font-medium mb-1.5">{e.company}</p>
        <p className="font-mono text-[0.8rem] text-gray-500 mb-5">Internship</p>
        <ul className="list-none space-y-3">
          {e.points.map((p, i) => (
            <li
              key={i}
              className="relative pl-[22px] text-[0.9rem] text-gray-400 leading-[1.7]"
            >
              <span className="absolute left-0 text-violet">▹</span>
              {p}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-white/[0.06]">
          {e.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-violet/[0.08] border border-violet/15 rounded-md font-mono text-[0.7rem] text-violet-light"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ══════ PROJECT CARD — NO TILT, WITH ANIMATIONS ══════ */
function ProjectCard({ project: p, idx }) {
  const { ref, visible } = useInView();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: idx * 0.2,
        ease: [0.34, 1.56, 0.64, 1],
      }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative rounded-[24px] p-[1px] transition-all duration-500"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${p.accent}66, ${p.accent}22, ${p.accent}66)`
            : "rgba(255,255,255,0.06)",
          boxShadow: isHovered ? `0 30px 80px ${p.accent}15` : "none",
        }}
      >
        <div className="relative bg-[#0a0a0a] rounded-[23px] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr]">
            {/* LEFT — Live animation */}
            <div
              className={`relative h-[320px] lg:h-auto lg:min-h-[440px] overflow-hidden`}
            >
              {/* Dark bg with subtle gradient */}
              <div className="absolute inset-0 bg-[#070710]" />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-40`}
              />

              {/* Subtle grid */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                  backgroundSize: "25px 25px",
                }}
              />

              {/* Animation component */}
              <div className="relative z-10 h-full">
                {idx === 0 ? <DevDialogueAnimation /> : <MLPipelineAnimation />}
              </div>
            </div>

            {/* RIGHT — content */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <p
                className="font-mono text-[0.7rem] tracking-[3px] uppercase mb-3"
                style={{ color: p.accent }}
              >
                {p.tagline}
              </p>

              <h3 className="font-grotesk text-[1.8rem] lg:text-[2rem] font-bold mb-2 flex items-center gap-3">
                {p.title}
                <motion.span
                  animate={
                    isHovered
                      ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                  className="text-2xl"
                >
                  {p.icon}
                </motion.span>
              </h3>

              {/* Links */}
              <div className="flex gap-3 mb-5">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white/60 text-[0.7rem] font-medium transition-all duration-300 hover:bg-violet/10 hover:border-violet/30 hover:text-white"
                  >
                    🔗 GitHub
                  </a>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white/60 text-[0.7rem] font-medium transition-all duration-300 hover:bg-violet/10 hover:border-violet/30 hover:text-white"
                  >
                    🌐 Live Demo
                  </a>
                )}
              </div>

              <p className="text-[0.95rem] text-gray-400 leading-[1.8] mb-6">
                {p.description}
              </p>

              <div className="space-y-3 mb-7">
                {p.features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={visible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: idx * 0.15 + i * 0.08 + 0.3 }}
                    className="flex items-start gap-3 group/feat"
                  >
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center text-[0.6rem] mt-0.5 shrink-0 transition-transform duration-300 group-hover/feat:scale-110"
                      style={{
                        background: `${p.accent}15`,
                        border: `1px solid ${p.accent}30`,
                      }}
                    >
                      ⚡
                    </div>
                    <span className="text-[0.85rem] text-gray-400 leading-[1.6] group-hover/feat:text-gray-300 transition-colors">
                      {f}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-6 border-t border-white/[0.06]">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3.5 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg font-mono text-[0.72rem] text-gray-500 transition-all duration-300 hover:text-violet-light hover:-translate-y-0.5 cursor-default"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = `${p.accent}40`)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.06)")
                    }
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CtaButton() {
  const { ref, visible } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="text-center mt-[60px]"
    >
      <a
        href={info.github}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative overflow-hidden inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-violet-dark to-violet text-white rounded-xl text-[0.95rem] font-semibold transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_15px_50px_rgba(139,92,246,0.4)]"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        🐙 See More Projects on GitHub
      </a>
    </motion.div>
  );
}

function CertCard({ cert: c, idx }) {
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
      className="bg-[#111] border border-white/[0.06] rounded-2xl p-7 flex gap-5 items-start transition-all duration-300 hover:border-violet/30 hover:-translate-y-[5px] hover:shadow-[0_15px_50px_rgba(139,92,246,0.08)]"
    >
      <div className="w-11 h-11 min-w-[44px] bg-violet/[0.08] border border-violet/15 rounded-xl flex items-center justify-center text-xl">
        {c.icon}
      </div>
      <div>
        <h4 className="font-grotesk text-base font-semibold mb-1">{c.title}</h4>
        <p className="text-[0.8rem] text-violet mb-2.5">{c.issuer}</p>
        <p className="text-[0.8rem] text-gray-500 leading-[1.6]">{c.desc}</p>
      </div>
    </motion.div>
  );
}

function ContactCardEl({ card: c, idx }) {
  const { ref, visible } = useInView();
  return (
    <motion.a
      ref={ref}
      href={c.href}
      target={c.label === "LinkedIn" ? "_blank" : undefined}
      rel={c.label === "LinkedIn" ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: idx * 0.1,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className="bg-[#111] border border-white/[0.06] rounded-2xl px-5 py-7 text-white transition-all duration-300 hover:border-violet/30 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(139,92,246,0.1)] block no-underline text-center"
    >
      <div className="text-3xl mb-3.5">{c.icon}</div>
      <div className="text-[0.75rem] text-gray-500 uppercase tracking-[2px] mb-1.5">
        {c.label}
      </div>
      <div className="font-grotesk text-[0.9rem] font-medium text-gray-400 break-all">
        {c.value}
      </div>
    </motion.a>
  );
}
