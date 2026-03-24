"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const wordsArray = words.split(" ");

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="text-white text-2xl leading-snug tracking-wide md:text-3xl lg:text-4xl">
          <motion.div>
            {wordsArray.map((word, idx) => (
              <motion.span
                key={word + idx}
                className="text-white opacity-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.25,
                  delay: idx * 0.1,
                }}
              >
                {word}{" "}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
