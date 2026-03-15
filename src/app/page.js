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
    gradient: "from-violet-600/30 via-purple-600/20 to-indigo-600/30",
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
    gradient: "from-emerald-600/30 via-teal-600/20 to-cyan-600/30",
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
  const nodesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Create nodes
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

    const connectionDist = 180;
    const mouseDist = 200;

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    let time = 0;

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Update node positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        // Pulse effect
        node.radius =
          node.baseRadius + Math.sin(time * 2 + node.pulseOffset) * 0.5;

        // Mouse repulsion
        const dx = node.x - mouseRef.current.x;
        const dy = node.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseDist && dist > 0) {
          const force = (mouseDist - dist) / mouseDist;
          node.vx += (dx / dist) * force * 0.08;
          node.vy += (dy / dist) * force * 0.08;
        }

        // Speed limit
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > 1) {
          node.vx = (node.vx / speed) * 1;
          node.vy = (node.vy / speed) * 1;
        }

        // Friction
        node.vx *= 0.999;
        node.vy *= 0.999;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const opacity = (1 - dist / connectionDist) * 0.15;

            // Check if near mouse for highlight
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2;
            const mouseDx = midX - mouseRef.current.x;
            const mouseDy = midY - mouseRef.current.y;
            const mouseDist2 = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
            const mouseInfluence = mouseDist2 < 200 ? 1.5 : 1;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * mouseInfluence})`;
            ctx.lineWidth = 0.5 + (1 - dist / connectionDist) * 0.5;
            ctx.stroke();

            // Data pulse traveling along connections
            if (Math.random() < 0.001) {
              const pulsePos = (time * 50) % 1;
              const px = nodes[i].x + (nodes[j].x - nodes[i].x) * pulsePos;
              const py = nodes[i].y + (nodes[j].y - nodes[i].y) * pulsePos;
              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(167, 139, 250, 0.6)`;
              ctx.fill();
            }
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const dx = node.x - mouseRef.current.x;
        const dy = node.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isNearMouse = dist < 200;

        // Node glow
        if (isNearMouse) {
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

        // Node circle
        ctx.beginPath();
        ctx.arc(
          node.x,
          node.y,
          isNearMouse ? node.radius * 1.5 : node.radius,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = isNearMouse
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
   MAIN PAGE
   ════════════════════════════════════════════ */

export default function Home() {
  const [introPhase, setIntroPhase] = useState("typing");
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCode, setShowCode] = useState(false);
  const [countersStarted, setCountersStarted] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);
  const [isTouch, setIsTouch] = useState(false);
  const [helloOpacity, setHelloOpacity] = useState(0);

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

  // Detect touch
  useEffect(() => {
    setIsTouch("ontouchstart" in window);
  }, []);

  // Intro: smooth fade in of "Hello" then fade out
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Phase 1: Fade in Hello smoothly
    const fadeInTimer = setTimeout(() => {
      setHelloOpacity(1);
    }, 300);

    // Phase 2: Hold it visible
    const holdTimer = setTimeout(() => {
      setIntroPhase("visible");
    }, 2200);

    // Phase 3: Fade out and remove
    const fadeOutTimer = setTimeout(() => {
      setIntroPhase("done");
      document.body.style.overflow = "";
    }, 3500);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(holdTimer);
      clearTimeout(fadeOutTimer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowCode(true), 4200);
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

  const handleTilt = useCallback((e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const rx = (e.clientY - r.top - r.height / 2) / 20;
    const ry = (r.width / 2 - (e.clientX - r.left)) / 20;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-12px)`;
  }, []);

  const resetTilt = useCallback((e) => {
    e.currentTarget.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  }, []);

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
          <span className="text-green-400">
            &quot;Full Stack Dev&quot;
          </span>, <span className="text-green-400">&quot;DSA&quot;</span>,
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

      {/* ══════ INTRO — ONLY "Hello" ══════ */}
      <AnimatePresence>
        {introPhase !== "done" && (
          <motion.div
            exit={{ opacity: 0, scale: 1.05, filter: "blur(30px)" }}
            transition={{ duration: 1.2, ease: [0.645, 0.045, 0.355, 1] }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
          >
            {/* Subtle bg ambiance */}
            <div
              className="absolute w-[500px] h-[500px] bg-violet rounded-full blur-[200px] opacity-[0.06] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ animation: "pulseGlow 4s ease-in-out infinite" }}
            />

            {/* Just "Hello" — smooth fade in with elegant font */}
            <h1
              className="font-playfair italic text-[clamp(5rem,16vw,14rem)] font-bold bg-gradient-to-r from-white via-violet-light to-violet bg-clip-text text-transparent select-none transition-all duration-[2000ms] ease-out"
              style={{
                opacity: helloOpacity,
                transform: `translateY(${helloOpacity === 0 ? "30px" : "0"}) scale(${helloOpacity === 0 ? 0.9 : 1})`,
                letterSpacing: "-0.02em",
              }}
            >
              Hello
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════ MAIN ══════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={introPhase === "done" ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        {/* NAV */}
        <motion.nav
          initial={{ y: -100 }}
          animate={introPhase === "done" ? { y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
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
          {/* NEURAL NETWORK BACKGROUND */}
          <NeuralNetworkBg />

          {/* Gradient orbs on top of neural net */}
          <div
            className="absolute w-[600px] h-[600px] bg-violet rounded-full blur-[150px] opacity-[0.08] -top-[200px] -right-[100px]"
            style={{ animation: "orbFloat 18s ease-in-out infinite" }}
          />
          <div
            className="absolute w-[400px] h-[400px] bg-violet-dark rounded-full blur-[150px] opacity-[0.06] -bottom-[100px] -left-[100px]"
            style={{ animation: "orbFloat 18s ease-in-out infinite 6s" }}
          />

          {/* Subtle floating particles */}
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

          {/* HERO CONTENT */}
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-[2]">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={introPhase === "done" ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 1,
                delay: 0.3,
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

            {/* RIGHT — slightly smaller code block */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={introPhase === "done" ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 1,
                delay: 0.6,
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
                <ProjectCard
                  key={p.title}
                  project={p}
                  idx={i}
                  onTilt={handleTilt}
                  onReset={resetTilt}
                />
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
        className={`font-mono text-[0.8rem] text-violet mb-3 tracking-[2px] uppercase flex items-center gap-2 ${
          center ? "justify-center" : ""
        }`}
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
        className={`text-base text-gray-400 ${
          center ? "max-w-[600px] mx-auto" : "max-w-[600px]"
        }`}
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

/* ══════ REDESIGNED PROJECT CARD — FULL WIDTH STACKED ══════ */
function ProjectCard({ project: p, idx, onTilt, onReset }) {
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
        onMouseMove={onTilt}
        onMouseLeave={(e) => {
          onReset(e);
          setIsHovered(false);
        }}
        onMouseEnter={() => setIsHovered(true)}
        className="relative rounded-[24px] p-[1px] transition-all duration-500"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${p.accent}66, ${p.accent}22, ${p.accent}66)`
            : "rgba(255,255,255,0.06)",
          transformStyle: "preserve-3d",
          boxShadow: isHovered ? `0 30px 80px ${p.accent}20` : "none",
        }}
      >
        <div className="relative bg-[#0a0a0a] rounded-[23px] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr]">
            {/* LEFT — visual banner */}
            <div
              className={`relative h-[250px] lg:h-auto lg:min-h-[400px] bg-gradient-to-br ${p.gradient} overflow-hidden`}
            >
              {/* Grid overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />

              {/* Floating circles */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[15%] right-[15%] w-[120px] h-[120px] rounded-full border border-white/10"
                style={{ boxShadow: `0 0 40px ${p.accent}15` }}
              />
              <motion.div
                animate={{
                  y: [0, 15, 0],
                  x: [0, -8, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-[20%] left-[10%] w-[80px] h-[80px] rounded-full border border-white/5"
              />

              {/* Project icon */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl lg:text-8xl opacity-40"
              >
                {p.icon}
              </motion.div>

              {/* Project number */}
              <div className="absolute top-6 left-6 font-mono text-[0.7rem] text-white/30 tracking-[4px] uppercase">
                Project 0{idx + 1}
              </div>

              {/* Links */}
              <div className="absolute bottom-6 left-6 flex gap-3">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl text-white/80 text-[0.75rem] font-medium transition-all duration-300 hover:bg-violet/20 hover:border-violet/40 hover:text-white"
                  >
                    <span>🔗</span> GitHub
                  </a>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl text-white/80 text-[0.75rem] font-medium transition-all duration-300 hover:bg-violet/20 hover:border-violet/40 hover:text-white"
                  >
                    <span>🌐</span> Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* RIGHT — content */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              {/* Tagline */}
              <p
                className="font-mono text-[0.7rem] tracking-[3px] uppercase mb-3"
                style={{ color: p.accent }}
              >
                {p.tagline}
              </p>

              <h3 className="font-grotesk text-[1.8rem] lg:text-[2rem] font-bold mb-4 flex items-center gap-3">
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

              <p className="text-[0.95rem] text-gray-400 leading-[1.8] mb-6">
                {p.description}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-7">
                {p.features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={visible ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: idx * 0.15 + i * 0.08 + 0.3,
                    }}
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

              {/* Tech */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-white/[0.06]">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3.5 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg font-mono text-[0.72rem] text-gray-500 transition-all duration-300 hover:text-violet-light hover:-translate-y-0.5 cursor-default"
                    style={{
                      "--hover-border": `${p.accent}40`,
                    }}
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
