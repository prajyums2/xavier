"use client";

import { cn } from "@/lib/utils";
import { motion, useSpring, useTransform, useMotionValue, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number;
  decimalPlaces?: number;
}

export function NumberTicker({
  value,
  direction = "up",
  className,
  delay = 0,
  decimalPlaces = 0,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const displayValue = useTransform(springValue, (current) =>
    direction === "down"
      ? Math.ceil(current).toLocaleString()
      : current.toFixed(decimalPlaces)
  );

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [motionValue, isInView, delay, value, direction]);

  return (
    <motion.span ref={ref} className={cn("inline-block tabular-nums", className)}>
      {displayValue}
    </motion.span>
  );
}
