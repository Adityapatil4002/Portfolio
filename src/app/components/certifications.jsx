"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

// ==========================================
// INLINE ICONS
// ==========================================
const Icons = {
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
  HexBadge: ({ text }) => (
    <div className="relative flex items-center justify-center w-[22px] h-[22px] group transition-transform hover:scale-110 cursor-pointer">
      <svg
        className="w-full h-full text-slate-700 drop-shadow-sm group-hover:text-emerald-500 transition-colors"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M12 2.5l8.66 5v10L12 21.5l-8.66-5v-10L12 2.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="#ffffff"
        />
      </svg>
      <span className="absolute text-[7px] font-bold text-slate-700 group-hover:text-emerald-600">
        {text}
      </span>
    </div>
  ),
};

// ==========================================
// DATA
// ==========================================
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

// ==========================================
// HEATMAP GENERATORS & COLORS
// ==========================================
const GH_COLORS = [
  "bg-[#ebedf0]",
  "bg-[#9be9a8]",
  "bg-[#40c463]",
  "bg-[#30a14e]",
  "bg-[#216e39]",
];
const LC_COLORS = [
  "bg-[#ebedf0]",
  "bg-[#bcedc7]",
  "bg-[#80d898]",
  "bg-[#3ec46d]",
  "bg-[#249e52]",
];

const GH_MONTHS = [
  "Aug",
  "Sep",
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
];
const LC_MONTHS = [
  "Sep",
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
];

function seeded(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// GitHub: 53 Continuous Columns
function generateGitHubHeatmap() {
  const data = [];
  for (let w = 0; w < 53; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const r = seeded(w * 17 + d * 3 + 11);
      let level = 0;
      if (w < 8) level = r > 0.75 ? Math.floor(r * 2) : 0;
      else if (w < 16)
        level = r > 0.4 ? Math.floor(r * 3) + 1 : Math.floor(r * 2);
      else level = Math.min(4, Math.floor(r * 5));
      week.push(Math.min(4, Math.max(0, level)));
    }
    data.push(week);
  }
  return data;
}

// LeetCode: Grouped into 12 distinct month blocks
function generateLeetCodeHeatmap() {
  const monthWidths = [4, 4, 5, 4, 4, 5, 4, 4, 5, 4, 4, 5];
  const data = [];
  let weekCounter = 0;

  for (let m = 0; m < 12; m++) {
    const monthCols = [];
    for (let w = 0; w < monthWidths[m]; w++) {
      const col = [];
      for (let d = 0; d < 7; d++) {
        const r = seeded(weekCounter * 17 + d * 3 + 77);
        let level = 0;
        if (m < 4) {
          level = r > 0.94 ? 1 : 0;
        } else {
          level = Math.floor(r * 4) + 1;
        }
        col.push(level);
      }
      monthCols.push(col);
      weekCounter++;
    }
    data.push(monthCols);
  }
  return data;
}

// ==========================================
// ANIMATIONS
// ==========================================
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardHover = {
  y: -6,
  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.08)",
  borderColor: "#cbd5e1",
};

// ==========================================
// GITHUB COMPONENT
// ==========================================
function GitHubHeatmap() {
  const data = useMemo(() => generateGitHubHeatmap(), []);
  const years = ["2026", "2025", "2024"];
  const activeYear = "2026";

  return (
    <motion.div variants={fadeUp} className="w-full mb-8">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-[17px] font-medium text-slate-800">
            <span className="font-extrabold text-slate-900 text-xl mr-1">
              697
            </span>
            contributions in the last year
          </h2>

          <div className="flex items-center gap-4 text-[13px] text-slate-500">
            {/* Year Segmented Control */}
            <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-200/80">
              {years.map((y) => (
                <button
                  key={y}
                  className={`px-4 py-1 rounded-md font-semibold transition-all ${
                    y === activeYear
                      ? "bg-white text-blue-600 shadow-sm border border-slate-200/50"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800 transition-colors">
              Contribution settings {Icons.ChevronDown}
            </div>
          </div>
        </div>

        {/* Grid Area */}
        <div className="overflow-x-auto pb-2 scrollbar-hide">
          <div className="min-w-[760px]">
            {/* Month Labels */}
            <div className="flex ml-8 mb-2">
              {GH_MONTHS.map((m, i) => (
                <div
                  key={i}
                  className="text-xs text-slate-500"
                  style={{ width: `${100 / GH_MONTHS.length}%` }}
                >
                  {m}
                </div>
              ))}
            </div>

            {/* Grid & Days */}
            <div className="flex gap-2">
              {/* Day Labels - properly aligned with the 7 rows */}
              <div className="flex flex-col justify-between py-0 text-[10px] text-slate-400 w-7 shrink-0 h-[95px]">
                <span className="mt-[11px]">Mon</span>
                <span>Wed</span>
                <span className="mb-[11px]">Fri</span>
              </div>

              {/* Exact Fixed Size Grid */}
              <div className="flex gap-[3px]">
                {data.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((level, di) => (
                      <motion.div
                        key={di}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: wi * 0.01 + di * 0.01,
                          type: "spring",
                          stiffness: 300,
                        }}
                        whileHover={{
                          scale: 1.4,
                          zIndex: 10,
                          borderRadius: "2px",
                        }}
                        className={`w-[11px] h-[11px] rounded-[2px] ${GH_COLORS[level]} cursor-pointer ring-1 ring-black/5`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 text-xs font-medium">
          <a
            href="#"
            className="text-slate-400 hover:text-blue-500 transition-colors"
          >
            Learn how we count contributions
          </a>
          <div className="flex items-center gap-1.5 text-slate-400">
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
// LEETCODE COMPONENT
// ==========================================
function LeetCodeHeatmap() {
  const monthData = useMemo(() => generateLeetCodeHeatmap(), []);

  return (
    <motion.div variants={fadeUp} className="w-full mb-16">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm group hover:shadow-md transition-all duration-300">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-[17px] font-medium text-slate-700 flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-xl">667</span>
              submissions in the past one year
              <span className="cursor-pointer hover:text-blue-500 transition-colors ml-1">
                {Icons.Info}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-5 text-[13px] text-slate-500">
            <span>
              Total active days:{" "}
              <span className="font-bold text-slate-700">228</span>
            </span>
            <span>
              Max streak: <span className="font-bold text-slate-700">205</span>
            </span>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 font-medium border border-slate-200/80 shadow-sm">
              Current <span>{Icons.ChevronDown}</span>
            </button>
          </div>
        </div>

        {/* Grid Area - Blocked by Month */}
        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="min-w-[760px] flex gap-[10px]">
            {monthData.map((monthCols, mIndex) => (
              <div key={mIndex} className="flex flex-col items-center gap-3">
                {/* Columns inside the month block */}
                <div className="flex gap-[3px]">
                  {monthCols.map((col, cIndex) => (
                    <div key={cIndex} className="flex flex-col gap-[3px]">
                      {col.map((level, dIndex) => (
                        <motion.div
                          key={dIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay:
                              mIndex * 0.06 + cIndex * 0.015 + dIndex * 0.01,
                            type: "spring",
                            stiffness: 300,
                          }}
                          whileHover={{
                            scale: 1.4,
                            zIndex: 10,
                            borderRadius: "2px",
                          }}
                          className={`w-[11px] h-[11px] rounded-[2px] ${LC_COLORS[level]} cursor-pointer ring-1 ring-black/5`}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Month Label & Dynamic Badges */}
                <div className="flex flex-col items-center relative w-full">
                  <span className="text-xs text-slate-500 font-medium">
                    {LC_MONTHS[mIndex]}
                  </span>

                  {/* Hex badges aligned perfectly under May and July */}
                  {mIndex === 8 && (
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                      className="absolute top-6"
                    >
                      <Icons.HexBadge text="50" />
                    </motion.div>
                  )}
                  {mIndex === 10 && (
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="absolute top-6"
                    >
                      <Icons.HexBadge text="100" />
                    </motion.div>
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
// CERT CARD
// ==========================================
function CertCard({ cert }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={cardHover}
      className="bg-white border border-slate-200 rounded-2xl p-6 flex items-start gap-5 shadow-sm transition-all duration-300 cursor-default group relative overflow-hidden"
    >
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="w-14 h-14 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:shadow-md group-hover:border-slate-200 transition-all duration-300 relative z-10 text-slate-700 group-hover:text-blue-600">
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
    </motion.div>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
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
        {/* Header */}
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

        {/* 1) GitHub Contributions */}
        <GitHubHeatmap />

        {/* 2) LeetCode Submissions */}
        <LeetCodeHeatmap />

        {/* 3) Certification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {certifications.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
