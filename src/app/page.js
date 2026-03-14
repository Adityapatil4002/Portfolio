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
    github: "https://github.com/Adityapatil4002",
    live: "#",
    color: "from-violet-500/20 via-purple-500/10 to-blue-500/20",
    accentEmoji: "💡",
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
    github: "https://github.com/Adityapatil4002",
    color: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
    accentEmoji: "🧪",
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
   HOOK
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
   MAIN PAGE COMPONENT
   ════════════════════════════════════════════ */

export default function Home() {
  const [introPhase, setIntroPhase] = useState("typing"); // "typing" | "visible" | "done"
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCode, setShowCode] = useState(false);
  const [countersStarted, setCountersStarted] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);
  const [typedText, setTypedText] = useState("");
  const [isTouch, setIsTouch] = useState(false);

  const heroRef = useRef(null);

  // Generate once
  const particles = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        dur: `${6 + Math.random() * 10}s`,
        delay: `${Math.random() * 10}s`,
        size: `${2 + Math.random() * 3}px`,
      })),
    [],
  );

  const matrixCols = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${(i / 20) * 100 + Math.random() * 5}%`,
        duration: `${4 + Math.random() * 8}s`,
        delay: `${Math.random() * 5}s`,
        chars: Array.from({ length: 8 + Math.floor(Math.random() * 12) }, () =>
          String.fromCharCode(0x30a0 + Math.random() * 96),
        ).join("\n"),
        opacity: 0.03 + Math.random() * 0.05,
      })),
    [],
  );

  const horizLines = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        top: `${15 + i * 15}%`,
        duration: `${8 + Math.random() * 10}s`,
        delay: `${Math.random() * 6}s`,
        opacity: 0.02 + Math.random() * 0.03,
      })),
    [],
  );

  // Detect touch
  useEffect(() => {
    setIsTouch("ontouchstart" in window);
  }, []);

  // Typing animation
  useEffect(() => {
    const fullText = "Hello.";
    let idx = 0;
    document.body.style.overflow = "hidden";

    const typeInterval = setInterval(() => {
      idx++;
      setTypedText(fullText.slice(0, idx));
      if (idx >= fullText.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          setIntroPhase("visible");
          setTimeout(() => {
            setIntroPhase("done");
            document.body.style.overflow = "";
          }, 1500);
        }, 800);
      }
    }, 200);

    return () => {
      clearInterval(typeInterval);
      document.body.style.overflow = "";
    };
  }, []);

  // Delayed code reveal
  useEffect(() => {
    const t = setTimeout(() => setShowCode(true), 4500);
    return () => clearTimeout(t);
  }, []);

  // Scroll watcher
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Mouse tracker
  useEffect(() => {
    if (isTouch) return;
    const fn = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [isTouch]);

  // Counter animation
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

  // Start counters when hero visible
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
          <span className="text-green-400">&quot;React&quot;</span>,{" "}
          <span className="text-green-400">&quot;Node.js&quot;</span>,
        </>
      ),
      d: 1.0,
    },
    {
      c: (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="text-green-400">&quot;Python&quot;</span>,{" "}
          <span className="text-green-400">&quot;ML&quot;</span>
        </>
      ),
      d: 1.1,
    },
    {
      c: (
        <>
          &nbsp;&nbsp;<span className="text-gray-500">]</span>,
        </>
      ),
      d: 1.2,
    },
    {
      c: (
        <>
          &nbsp;&nbsp;<span className="text-blue-400">passion</span>:{" "}
          <span className="text-orange-400">&quot;∞&quot;</span>,
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

  /* ════════ RENDER ════════ */
  return (
    <>
      {/* Noise overlay */}
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

      {/* ══════ INTRO SCREEN ══════ */}
      <AnimatePresence>
        {introPhase !== "done" && (
          <motion.div
            exit={{ opacity: 0, scale: 1.15, filter: "blur(20px)" }}
            transition={{ duration: 1, ease: [0.645, 0.045, 0.355, 1] }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
          >
            {/* Intro bg grid */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Intro orbs */}
            <div
              className="absolute w-[400px] h-[400px] bg-violet rounded-full blur-[150px] opacity-[0.08] top-1/4 left-1/4"
              style={{ animation: "orbFloat 10s ease-in-out infinite" }}
            />
            <div
              className="absolute w-[300px] h-[300px] bg-purple-600 rounded-full blur-[150px] opacity-[0.06] bottom-1/4 right-1/4"
              style={{
                animation: "orbFloat 10s ease-in-out infinite 3s",
              }}
            />

            <div className="relative text-center">
              {/* Typing text */}
              <div className="inline-block relative">
                <h1 className="font-mono text-[clamp(4rem,14vw,12rem)] font-bold bg-gradient-to-r from-white via-violet-light to-violet bg-clip-text text-transparent whitespace-nowrap">
                  {typedText}
                </h1>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-[4px] md:w-[6px] h-[clamp(3.5rem,12vw,10rem)] bg-violet ml-1 align-middle"
                  style={{ verticalAlign: "text-bottom" }}
                />
              </div>

              {/* Subtitle after typing */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={introPhase === "visible" ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-mono text-[clamp(0.7rem,2vw,1rem)] text-gray-500 mt-6 tracking-[4px] uppercase"
              >
                {"< Welcome to my world />"}
              </motion.p>

              {/* Scroll hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={introPhase === "visible" ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              >
                <span className="text-[0.7rem] text-gray-600 tracking-widest uppercase">
                  scroll down
                </span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-5 h-8 border-2 border-gray-600 rounded-full flex justify-center pt-1"
                >
                  <div className="w-1 h-2 bg-violet rounded-full" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════ MAIN CONTENT ══════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={introPhase === "done" ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        {/* ── NAVBAR ── */}
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

          {/* Desktop links */}
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

          {/* Mobile toggle */}
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

          {/* Mobile menu */}
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

        {/* ══════ HERO SECTION ══════ */}
        <section
          id="home"
          ref={heroRef}
          className="min-h-screen flex items-center relative overflow-hidden pt-[120px] pb-20 px-6 md:px-10"
        >
          {/* BG: animated grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              animation: "gridMove 20s linear infinite",
            }}
          />

          {/* BG: matrix rain */}
          {matrixCols.map((col) => (
            <div
              key={col.id}
              className="absolute font-mono text-[10px] text-violet whitespace-pre leading-[14px] pointer-events-none"
              style={{
                left: col.left,
                top: "-10%",
                opacity: col.opacity,
                animation: `matrixFall ${col.duration} linear ${col.delay} infinite`,
                writingMode: "vertical-rl",
              }}
            >
              {col.chars}
            </div>
          ))}

          {/* BG: horizontal scanning lines */}
          {horizLines.map((line) => (
            <div
              key={line.id}
              className="absolute h-[1px] w-[200px] pointer-events-none"
              style={{
                top: line.top,
                opacity: line.opacity,
                background:
                  "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)",
                animation: `horizontalDrift ${line.duration} linear ${line.delay} infinite`,
              }}
            />
          ))}

          {/* BG: gradient orbs */}
          <div
            className="absolute w-[700px] h-[700px] bg-violet rounded-full blur-[120px] opacity-[0.12] -top-[250px] -right-[150px]"
            style={{ animation: "orbFloat 18s ease-in-out infinite" }}
          />
          <div
            className="absolute w-[500px] h-[500px] bg-violet-dark rounded-full blur-[120px] opacity-[0.1] -bottom-[150px] -left-[150px]"
            style={{ animation: "orbFloat 18s ease-in-out infinite 6s" }}
          />
          <div
            className="absolute w-[350px] h-[350px] bg-purple-600 rounded-full blur-[100px] opacity-[0.08] top-[40%] left-[40%]"
            style={{ animation: "orbFloat 18s ease-in-out infinite 12s" }}
          />

          {/* BG: pulse circles */}
          <div
            className="absolute w-[600px] h-[600px] border border-violet/[0.03] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ animation: "pulseGlow 6s ease-in-out infinite" }}
          />
          <div
            className="absolute w-[800px] h-[800px] border border-violet/[0.02] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ animation: "pulseGlow 6s ease-in-out infinite 2s" }}
          />

          {/* BG: floating particles */}
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

          {/* BG: orbiting dots */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
            style={{ animation: "rotateOrbit 30s linear infinite" }}
          >
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-violet/30 rounded-full" />
            <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-violet/20 rounded-full" />
            <div className="absolute top-1/2 left-0 w-1 h-1 bg-violet/25 rounded-full" />
          </div>

          {/* HERO CONTENT */}
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-[2]">
            {/* LEFT SIDE */}
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

              {/* Stats */}
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

            {/* RIGHT SIDE - CODE BLOCK */}
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
              <div className="relative w-[480px] h-[480px]">
                {/* Rings */}
                {[340, 420, 520].map((s, i) => (
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

                {/* Orbiting dots */}
                <div
                  className="absolute w-[340px] h-[340px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: "rotateOrbit 12s linear infinite",
                  }}
                >
                  <div className="absolute -top-1 left-1/2 w-2 h-2 bg-violet rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
                </div>
                <div
                  className="absolute w-[420px] h-[420px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: "rotateOrbit 18s linear infinite reverse",
                  }}
                >
                  <div className="absolute top-1/2 -left-1 w-1.5 h-1.5 bg-purple-400 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
                </div>

                {/* Code block */}
                <div
                  className="absolute top-1/2 left-1/2 w-[400px] bg-[#0d0d0d]/95 border border-white/[0.08] rounded-2xl p-8 backdrop-blur-xl font-mono text-[0.85rem]"
                  style={{
                    animation:
                      "codeFloat 6s ease-in-out infinite, glowPulse 4s ease-in-out infinite",
                  }}
                >
                  <div className="flex gap-2 mb-5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
                    <span className="ml-auto text-[0.65rem] text-gray-600 font-mono">
                      developer.js
                    </span>
                  </div>
                  {codeLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={showCode ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: line.d }}
                      className="my-1.5 leading-relaxed"
                    >
                      <span className="text-gray-600 mr-3 text-[0.7rem] select-none">
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

            {/* Marquee */}
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

        {/* FOOTER */}
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
        className={`relative rounded-[24px] p-[1px] transition-all duration-500 ${
          isHovered ? "shadow-[0_30px_80px_rgba(139,92,246,0.15)]" : ""
        }`}
        style={{
          background: isHovered
            ? "linear-gradient(135deg, rgba(139,92,246,0.4), rgba(139,92,246,0.1), rgba(168,85,247,0.4))"
            : "rgba(255,255,255,0.06)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative bg-[#0d0d0d] rounded-[23px] p-0 overflow-hidden">
          {/* Top gradient banner */}
          <div
            className={`h-[140px] relative overflow-hidden bg-gradient-to-br ${p.color}`}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <motion.div
              animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-4 right-6 text-4xl opacity-60"
            >
              {p.accentEmoji}
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0], x: [0, -5, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-4 left-6 text-5xl opacity-30"
            >
              {p.icon}
            </motion.div>

            <div className="absolute top-5 left-6 font-mono text-[0.7rem] text-white/40 tracking-widest">
              PROJECT 0{idx + 1}
            </div>

            <div className="absolute top-4 right-4 flex gap-2">
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center text-white/70 transition-all duration-300 hover:bg-violet/30 hover:text-white hover:border-violet/40 hover:scale-110 text-xs"
                >
                  🔗
                </a>
              )}
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center text-white/70 transition-all duration-300 hover:bg-violet/30 hover:text-white hover:border-violet/40 hover:scale-110 text-xs"
                >
                  🌐
                </a>
              )}
            </div>
          </div>

          {/* Card content */}
          <div className="p-8 pt-6">
            <div className="mb-4">
              <h3 className="font-grotesk text-[1.5rem] font-bold mb-1.5 flex items-center gap-3">
                {p.title}
                <motion.span
                  animate={isHovered ? { rotate: [0, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-lg"
                >
                  {p.icon}
                </motion.span>
              </h3>
              <p className="font-mono text-[0.7rem] text-violet tracking-widest uppercase">
                {p.tagline}
              </p>
            </div>

            <p className="text-[0.9rem] text-gray-400 leading-[1.75] mb-5">
              {p.description}
            </p>

            <div className="space-y-2.5 mb-6">
              {p.features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: idx * 0.2 + i * 0.1 + 0.3 }}
                  className="flex items-start gap-3 group/feat"
                >
                  <span className="text-violet text-[0.65rem] mt-1.5 shrink-0 transition-transform duration-300 group-hover/feat:scale-125">
                    ⚡
                  </span>
                  <span className="text-[0.82rem] text-gray-400 leading-[1.6] group-hover/feat:text-gray-300 transition-colors">
                    {f}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-5 border-t border-white/[0.04]">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg font-mono text-[0.7rem] text-gray-500 transition-all duration-300 hover:border-violet/40 hover:text-violet-light hover:bg-violet/[0.06] hover:-translate-y-0.5 cursor-default"
                >
                  {t}
                </span>
              ))}
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
