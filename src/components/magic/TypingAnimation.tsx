"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
}

export function TypingAnimation({
  children,
  className,
  duration = 100,
  delay = 0,
}: TypingAnimationProps) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay / 1000 }}
      className={cn(
        "inline-block whitespace-nowrap overflow-hidden",
        className
      )}
    >
      {children.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: delay / 1000 + index * (duration / 1000),
            duration: 0,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
