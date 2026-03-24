"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam = ({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}: BorderBeamProps) => {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        "absolute inset-[0] rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "pointer-events-none",
        className
      )}
    >
      <motion.div
        animate={{ rotate: "360deg" }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        }}
        className="absolute aspect-square w-[calc(var(--size)*1px)] animate-border-spin rounded-[inherit] [background:conic-gradient(from_calc(270deg-(var(--anchor)*0.5*1deg)),transparent_0,var(--color-from)_var(--anchor)*1deg,transparent_var(--anchor)*1deg)] [offset-path:content-box]"
        style={{
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
        }}
      />
    </div>
  );
};
