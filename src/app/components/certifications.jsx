"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

// ==========================================
// ICONS
// ==========================================
const Icons = {
  GitHub: (
    <svg
      className="w-6 h-6 text-slate-900"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  ),
  LeetCode: (
    <svg
      className="w-6 h-6 text-amber-500"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.939 5.939 0 0 0 1.271 1.541l11.966 11.97c.351.35.802.539 1.32.539.46 0 .867-.14 1.25-.41.4-.29.69-.73.81-1.24.12-.52.05-1.07-.22-1.55l-9.73-9.73h13.1c.42 0 .81-.15 1.13-.42.34-.28.56-.69.64-1.13.08-.43-.02-.87-.27-1.23-.27-.37-.67-.6-1.1-.6h-9.98l4.47-4.47c.33-.33.51-.76.51-1.2 0-.44-.18-.87-.51-1.2L14.444.44A1.37 1.37 0 0 0 13.483 0zm-2.02 4.49 4.3 4.3h-9.15l4.85-4.3zM8.14 8.78l-4.14 4.14 4.14 4.14 4.14-4.14-4.14-4.14z" />
    </svg>
  ),
  Info: (
    <svg
      className="w-4 h-4 text-slate-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  ChevronDown: (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  HexBadge: ({ text, colorCode }) => {
    const colors = {
      bronze: "text-amber-600 group-hover:text-amber-500",
      red: "text-red-600 group-hover:text-red-500",
      pink: "text-pink-600 group-hover:text-pink-500",
      purple: "text-purple-600 group-hover:text-purple-500",
    };
    return (
      <div className="relative flex items-center justify-center w-6 h-6 group transition-transform hover:scale-110 cursor-pointer">
        <svg
          className={`w-full h-full drop-shadow-sm transition-colors ${colors[colorCode]}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 2.5l8.66 5v10L12 21.5l-8.66-5v-10L12 2.5z"
            stroke="currentColor"
            strokeWidth="2"
            fill="#ffffff"
          />
        </svg>
        <span className={`absolute text-[9px] font-bold ${colors[colorCode]}`}>
          {text}
        </span>
      </div>
    );
  },
  Nvidia: (
    <svg
      className="w-6 h-6 text-slate-700"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12h6M12 9v6" strokeWidth="1.5" />
    </svg>
  ),
  Globe: (
    <svg
      className="w-6 h-6 text-slate-700"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
    </svg>
  ),
  Robot: (
    <svg
      className="w-6 h-6 text-slate-700"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="1.8"
    >
      <rect x="5" y="8" width="14" height="12" rx="2" />
      <circle cx="9" cy="13" r="1.5" fill="currentColor" />
      <circle cx="15" cy="13" r="1.5" fill="currentColor" />
      <path d="M12 8V5M9 5h6M8 20v2M16 20v2" />
    </svg>
  ),
  Code: (
    <svg
      className="w-6 h-6 text-slate-700"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="1.8"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
};

// ==========================================
// DATA GENERATION (PURE SPEED, NO LAG)
// ==========================================
const GH_COLORS = [
  "bg-[#ebedf0]",
  "bg-[#9be9a8]",
  "bg-[#40c463]",
  "bg-[#30a14e]",
  "bg-[#216e39]",
];
const GH_MONTHS = [
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
];

const LC_COLORS = [
  "bg-[#ebedf0]",
  "bg-[#bcedc7]",
  "bg-[#80d898]",
  "bg-[#3ec46d]",
  "bg-[#249e52]",
];
const LC_MONTHS = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];

function seededRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function generateGitHubExactPattern() {
  const data = [];
  for (let w = 0; w < 53; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const r = seededRandom(w * 10 + d);
      let level = 0;
      // Exactly matching screenshot: End of year (Aug/Sep) is very dense
      if (w < 10)
        level = r > 0.8 ? 1 : 0; // Oct/Nov Sparse
      else if (w < 40)
        level = r > 0.5 ? Math.floor(r * 4) : 0; // Middle
      else level = r > 0.1 ? Math.floor(r * 5) : 2; // Aug/Sep VERY DENSE (guarantees greens)
      week.push(Math.min(4, Math.max(0, level)));
    }
    data.push(week);
  }
  return data;
}

function generateLeetCodeExactPattern() {
  const monthWidths = [4, 4, 5, 4, 4, 5, 4, 4, 5, 4, 4, 5];
  const data = [];
  let weekCounter = 0;
  for (let m = 0; m < 12; m++) {
    const monthCols = [];
    for (let w = 0; w < monthWidths[m]; w++) {
      const col = [];
      for (let d = 0; d < 7; d++) {
        const r = seededRandom(weekCounter * 20 + d + 50);
        let level = 0;
        if (m < 3)
          level = r > 0.95 ? 1 : 0; // Oct, Nov, Dec empty
        else level = Math.floor(r * 4) + 1; // Jan to Sep Solid Block
        col.push(level);
      }
      monthCols.push(col);
      weekCounter++;
    }
    data.push(monthCols);
  }
  return data;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ==========================================
// GITHUB COMPONENT (PURE HTML = FAST)
// ==========================================
function GitHubHeatmap() {
  const data = useMemo(() => generateGitHubExactPattern(), []);

  return (
    <motion.div variants={fadeUp} className="w-full mb-10">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm overflow-hidden">
        {/* CLEAR PLATFORM HEADER */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-5">
          <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
            {Icons.GitHub}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 leading-none">
              GitHub
            </h3>
            <span className="text-sm text-slate-500 font-medium">
              Open Source Contributions
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <p className="text-[15px] font-medium text-slate-600">
            <span className="font-extrabold text-slate-900 text-lg mr-1.5">
              733
            </span>
            contributions in the last year
          </p>
          <div className="flex items-center gap-1.5 text-[13px] text-slate-500 cursor-pointer hover:text-slate-800 transition-colors">
            Contribution settings {Icons.ChevronDown}
          </div>
        </div>

        {/* Grid Area - Hardcoded width ensures Aug/Sep never clip */}
        <div className="overflow-x-auto pb-4 scrollbar-hide pr-4">
          <div className="w-[780px]">
            {" "}
            {/* Fixed width guarantees layout */}
            {/* Month Labels - Flex justified perfectly over 742px grid */}
            <div className="flex justify-between ml-[30px] mb-2 w-[742px] pr-2">
              {GH_MONTHS.map((m, i) => (
                <div key={i} className="text-xs text-slate-500 font-medium">
                  {m}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              {/* Day Labels */}
              <div className="flex flex-col justify-between py-0 text-[10px] text-slate-400 w-6 shrink-0 h-[95px]">
                <span className="mt-[11px]">Mon</span>
                <span>Wed</span>
                <span className="mb-[11px]">Fri</span>
              </div>

              {/* PURE DOM GRID - NO FRAMER MOTION LAG */}
              <div className="flex gap-[3px] w-[742px]">
                {data.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((level, di) => (
                      <div
                        key={di}
                        className={`w-[11px] h-[11px] rounded-[2px] ${GH_COLORS[level]} ring-1 ring-black/5 cursor-pointer hover:ring-slate-400 hover:ring-2`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-2 text-xs font-medium text-slate-400">
          <a href="#" className="hover:text-blue-500 transition-colors">
            Learn how we count contributions
          </a>
          <div className="flex items-center gap-1.5">
            <span>Less</span>
            {GH_COLORS.map((c, i) => (
              <div
                key={i}
                className={`w-[11px] h-[11px] rounded-[2px] ${c} ring-1 ring-black/5`}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// LEETCODE COMPONENT (PURE HTML = FAST)
// ==========================================
function LeetCodeHeatmap() {
  const monthData = useMemo(() => generateLeetCodeExactPattern(), []);
  const badges = [
    { text: "6", colorCode: "bronze" },
    { text: "7", colorCode: "red" },
    { text: "8", colorCode: "pink" },
    { text: "9", colorCode: "purple" },
  ];

  return (
    <motion.div variants={fadeUp} className="w-full mb-16">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
        {/* CLEAR PLATFORM HEADER */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-5">
          <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
            {Icons.LeetCode}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 leading-none">
              LeetCode
            </h3>
            <span className="text-sm text-slate-500 font-medium">
              Problem Solving & Algorithms
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <p className="text-[15px] font-medium text-slate-600 flex items-center gap-2">
            <span className="font-extrabold text-slate-900 text-lg">738</span>
            submissions in the past one year
            <span className="cursor-pointer hover:text-blue-500 transition-colors ml-1">
              {Icons.Info}
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-5 text-[13px] text-slate-500">
            <span>
              Total active days:{" "}
              <span className="font-bold text-slate-700">269</span>
            </span>
            <span>
              Max streak: <span className="font-bold text-slate-700">246</span>
            </span>
            <button className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 font-medium border border-slate-200 shadow-sm">
              Current <span>{Icons.ChevronDown}</span>
            </button>
          </div>
        </div>

        {/* Grid Area */}
        <div className="overflow-x-auto pb-6 scrollbar-hide pr-4">
          {/* PURE DOM GRID - NO FRAMER MOTION LAG */}
          <div className="min-w-[780px] flex gap-[10px]">
            {monthData.map((monthCols, mIndex) => (
              <div key={mIndex} className="flex flex-col items-center gap-3">
                <div className="flex gap-[3px]">
                  {monthCols.map((col, cIndex) => (
                    <div key={cIndex} className="flex flex-col gap-[3px]">
                      {col.map((level, dIndex) => (
                        <div
                          key={dIndex}
                          className={`w-[11px] h-[11px] rounded-[2px] ${LC_COLORS[level]} ring-1 ring-black/5 cursor-pointer hover:ring-slate-400 hover:ring-2`}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Badges / Months */}
                <div className="flex flex-col items-center relative w-full h-8">
                  {mIndex < 8 ? (
                    <span className="text-xs text-slate-500 font-medium">
                      {LC_MONTHS[mIndex]}
                    </span>
                  ) : (
                    <div
                      className="absolute top-0 animate-bounce"
                      style={{ animationDuration: "3s" }}
                    >
                      <Icons.HexBadge
                        text={badges[mIndex - 8].text}
                        colorCode={badges[mIndex - 8].colorCode}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// CERT CARDS & EXPORT
// ==========================================
function CertCard({ cert }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-start gap-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default group relative overflow-hidden">
      <div className="w-14 h-14 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:shadow-sm transition-all duration-300 relative z-10 text-slate-700 group-hover:text-blue-600">
        {cert.icon}
      </div>
      <div className="flex flex-col min-w-0 relative z-10 pt-1">
        <h4 className="text-lg font-bold text-slate-900 mb-1 leading-snug group-hover:text-blue-600 transition-colors">
          {cert.title}
        </h4>
        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3 block">
          {cert.org}
        </span>
        <p className="text-sm text-slate-600 leading-relaxed font-medium">
          {cert.description}
        </p>
      </div>
    </div>
  );
}

const certifications = [
  {
    id: 1,
    title: "Nvidia Deep Learning",
    org: "NVIDIA",
    description:
      "Practical skills in building, training, and optimizing deep neural networks for computer vision and data analysis.",
    icon: Icons.Nvidia,
  },
  {
    id: 2,
    title: "Responsive Web Design",
    org: "freeCodeCamp",
    description:
      "Proficiency in developing responsive websites providing optimal viewing experience across all devices.",
    icon: Icons.Globe,
  },
  {
    id: 3,
    title: "Complete A.I. & ML, Data Science",
    org: "Udemy / ZTM",
    description:
      "Mastered ML workflow — from data visualization with Pandas to deep neural networks with Scikit-Learn.",
    icon: Icons.Robot,
  },
  {
    id: 4,
    title: "Complete Web Development",
    org: "Udemy",
    description:
      "Full-stack expertise covering React & Tailwind frontend, Node.js backend, MongoDB & Prisma, and deployment.",
    icon: Icons.Code,
  },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="py-24 bg-[#fafafa] selection:bg-blue-500 selection:text-white overflow-hidden relative"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-[1000px] mx-auto px-6 relative z-10"
      >
        <motion.div
          variants={fadeUp}
          className="mb-14 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Continuous{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Learning
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-500 font-medium max-w-2xl">
            A visual record of my daily coding habits, problem-solving streaks,
            and professional certifications.
          </p>
        </motion.div>

        <GitHubHeatmap />
        <LeetCodeHeatmap />

        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4"
        >
          {certifications.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
