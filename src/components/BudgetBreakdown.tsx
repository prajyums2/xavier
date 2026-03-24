"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Heart,
  GraduationCap,
  TreePine,
  Route,
  Building2,
  Droplets,
  Baby,
  Trophy,
  Music,
  Zap,
  Lightbulb,
  Users,
  Wallet,
} from "lucide-react";

const allProjects = [
  { category: "കിഫ്ബി സൂപ്പർ സ്പെഷ്യാലിറ്റി", amount: 478.41, icon: Heart },
  { category: "മെഡിക്കൽ കോളേജ്", amount: 188.88, icon: Heart },
  { category: "റോഡുകൾ", amount: 179.21, icon: Route },
  { category: "വൈദ്യുതി", amount: 130.25, icon: Zap },
  { category: "കൃഷി - ജലസേചനം", amount: 65.68, icon: TreePine },
  { category: "പാലങ്ങൾ", amount: 44.16, icon: Building2 },
  { category: "കെട്ടിടങ്ങൾ", amount: 42.18, icon: Building2 },
  { category: "എംഎൽഎ ആസ്ഥി വികസനം", amount: 26.96, icon: Wallet },
  { category: "പൊതുവിദ്യാഭ്യാസം", amount: 24.0, icon: GraduationCap },
  { category: "ടൂറിസം", amount: 19.4, icon: TreePine },
  { category: "ജില്ലാ ആശുപത്രി", amount: 18.66, icon: Heart },
  { category: "ആരോഗ്യ ശൃംഖല", amount: 14.57, icon: Heart },
  { category: "കായികം", amount: 12.87, icon: Trophy },
  { category: "ഉന്നത വിദ്യാഭ്യാസം", amount: 9.5, icon: GraduationCap },
  { category: "സാംസ്കാരികം", amount: 9.26, icon: Music },
  { category: "അംബേദ്ക്കർ ഗ്രാമം", amount: 7.0, icon: Users },
  { category: "അങ്കണവാടികൾ", amount: 2.96, icon: Baby },
  { category: "ഹൈമാസ്റ്റ് ലൈറ്റുകൾ", amount: 2.88, icon: Lightbulb },
  { category: "കുടിവെള്ളം", amount: 2.85, icon: Droplets },
];

const total = 1279.68;

// Size buckets with better mobile sizes
function getBubbleSize(amount: number) {
  if (amount >= 400)
    return "w-[130px] h-[130px] sm:w-[155px] sm:h-[155px] md:w-[190px] md:h-[190px] lg:w-[210px] lg:h-[210px]";
  if (amount >= 150)
    return "w-[110px] h-[110px] sm:w-[125px] sm:h-[125px] md:w-[155px] md:h-[155px] lg:w-[175px] lg:h-[175px]";
  if (amount >= 100)
    return "w-[105px] h-[105px] sm:w-[120px] sm:h-[120px] md:w-[145px] md:h-[145px] lg:w-[160px] lg:h-[160px]";
  if (amount >= 40)
    return "w-[95px] h-[95px] sm:w-[110px] sm:h-[110px] md:w-[135px] md:h-[135px] lg:w-[150px] lg:h-[150px]";
  if (amount >= 20)
    return "w-[90px] h-[90px] sm:w-[105px] sm:h-[105px] md:w-[125px] md:h-[125px] lg:w-[140px] lg:h-[140px]";
  if (amount >= 10)
    return "w-[85px] h-[85px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[135px] lg:h-[135px]";
  if (amount >= 5)
    return "w-[80px] h-[80px] sm:w-[95px] sm:h-[95px] md:w-[115px] md:h-[115px] lg:w-[130px] lg:h-[130px]";
  return "w-[75px] h-[75px] sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] lg:w-[125px] lg:h-[125px]";
}

// Text sizes based on bubble size
function getTextSize(amount: number) {
  if (amount >= 400) return "text-[11px] sm:text-sm md:text-base lg:text-lg";
  if (amount >= 150) return "text-[10px] sm:text-xs md:text-sm lg:text-base";
  if (amount >= 100) return "text-[10px] sm:text-xs md:text-sm lg:text-base";
  if (amount >= 40) return "text-[9px] sm:text-[11px] md:text-xs lg:text-sm";
  if (amount >= 20) return "text-[9px] sm:text-[10px] md:text-xs lg:text-sm";
  if (amount >= 10) return "text-[8px] sm:text-[10px] md:text-[11px] lg:text-xs";
  if (amount >= 5) return "text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px]";
  return "text-[7px] sm:text-[8px] md:text-[10px] lg:text-[11px]";
}

function getCategorySize(amount: number) {
  if (amount >= 400) return "text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px]";
  if (amount >= 100) return "text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px]";
  if (amount >= 20) return "text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px]";
  return "text-[5px] sm:text-[6px] md:text-[7px] lg:text-[8px]";
}

function getIconSize(amount: number) {
  if (amount >= 400) return "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6";
  if (amount >= 100) return "w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5";
  if (amount >= 20) return "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4";
  return "w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5";
}

// Animated counter
function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 80 });
  const displayValue = useTransform(springValue, (v) =>
    v.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsub = displayValue.on("change", (v) => setDisplay(v));
    return unsub;
  }, [displayValue]);

  return <span ref={ref}>{display}</span>;
}

// Single Bubble
function Bubble({
  item,
  index,
}: {
  item: (typeof allProjects)[0];
  index: number;
}) {
  const sizeClass = getBubbleSize(item.amount);
  const textClass = getTextSize(item.amount);
  const catClass = getCategorySize(item.amount);
  const iconClass = getIconSize(item.amount);
  const opacity = Math.max(0.12, Math.min(0.4, item.amount / 500));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.1 + index * 0.04,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.12,
        boxShadow: "0 12px 40px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
        transition: { duration: 0.25 },
      }}
      className={`${sizeClass} rounded-full cursor-default flex flex-col items-center justify-center text-center relative group`}
      style={{
        background: `rgba(59, 130, 246, ${opacity})`,
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow:
          "0 8px 32px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      {/* Glass shine effect */}
      <div className="absolute top-2 left-3 w-8 h-4 sm:w-10 sm:h-5 bg-white/[0.08] rounded-full blur-sm pointer-events-none group-hover:bg-white/[0.15] transition-all duration-300" />

      {/* Hover glow ring */}
      <div className="absolute inset-0 rounded-full bg-blue-400/0 group-hover:bg-blue-400/10 transition-all duration-300 pointer-events-none" />

      {/* Icon */}
      <item.icon
        className={`${iconClass} text-white/30 group-hover:text-white/50 mb-0.5 sm:mb-1 relative z-10 transition-colors duration-300`}
      />

      {/* Amount */}
      <div className="relative z-10 leading-none flex items-baseline gap-0.5">
        <span
          className={`${textClass} font-extrabold text-white tabular-nums group-hover:text-white transition-colors duration-300`}
        >
          ₹{item.amount}
        </span>
        <span className="text-[5px] sm:text-[6px] md:text-[7px] lg:text-[8px] text-white/40 font-medium">
          കോടി
        </span>
      </div>

      {/* Category */}
      <div className="relative z-10 mt-1 px-2 sm:px-3 leading-snug">
        <span
          className={`${catClass} text-white/50 group-hover:text-white/70 font-medium line-clamp-2 transition-colors duration-300`}
        >
          {item.category}
        </span>
      </div>

      {/* Tooltip on hover */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-slate-800/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] text-white whitespace-nowrap z-20 pointer-events-none shadow-lg">
        {item.category}: ₹{item.amount} കോടി
        <br />
        <span className="text-blue-300">
          {((item.amount / total) * 100).toFixed(1)}%
        </span>
      </div>
    </motion.div>
  );
}

export function BudgetBreakdown() {
  return (
    <section className="relative py-20 md:py-28 bg-slate-950 text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-blue-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* HERO TOTAL */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-blue-400/70 mb-4 font-medium">
            പുരോഗതിയുടെ അഞ്ച് വർഷങ്ങൾ
          </p>
          <div className="flex items-baseline justify-center">
            <span className="text-lg sm:text-xl md:text-2xl text-blue-400/50 font-light mr-1">
              ₹
            </span>
            <span className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-extrabold tracking-tighter leading-none text-white">
              <AnimatedNumber value={total} />
            </span>
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-blue-400 ml-1 sm:ml-2 self-end mb-0.5 sm:mb-1 md:mb-2">
              കോടി
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-white/25 mt-3">
            വടക്കാഞ്ചേരി നിയോജക മണ്ഡലം
          </p>
        </motion.div>

        {/* STACKED BAR — properly rounded on both ends */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-14 md:mb-18"
          style={{ transformOrigin: "left" }}
        >
          <div className="flex h-3 md:h-4 rounded-full overflow-hidden">
            {allProjects.slice(0, 8).map((item, i, arr) => {
              const colors = [
                "bg-blue-600",
                "bg-blue-500",
                "bg-sky-500",
                "bg-cyan-500",
                "bg-indigo-500",
                "bg-teal-500",
                "bg-slate-500",
                "bg-blue-400",
              ];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  viewport={{ once: true }}
                  style={{ width: `${(item.amount / total) * 100}%` }}
                  className={`${colors[i]} relative group cursor-pointer ${i === arr.length - 1 ? "rounded-r-full" : ""}`}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 px-2 py-0.5 rounded text-[9px] whitespace-nowrap z-10 pointer-events-none">
                    {item.category}: ₹{item.amount}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* BUBBLES */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center items-end gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            {allProjects.map((item, index) => (
              <Bubble key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
