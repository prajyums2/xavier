"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedListProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export function AnimatedList({
  className,
  children,
  delay = 100,
}: AnimatedListProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: (index * delay) / 1000,
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
