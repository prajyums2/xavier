"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "മുൻപ്",
  afterLabel = "ശേഷം",
  title,
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      setSliderPosition(percent);
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-base md:text-lg font-bold text-slate-900 mb-4 text-center">
        {title}
      </h3>
      <div
        ref={containerRef}
        className="relative aspect-[16/10] md:aspect-[16/9] w-full overflow-hidden rounded-xl cursor-col-resize select-none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (full) */}
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Before Image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <Image
            src={beforeImage}
            alt={beforeLabel}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider Handle */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-col-resize"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            <div className="flex items-center gap-0.5">
              <svg className="w-3 h-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <svg className="w-3 h-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded">
            {beforeLabel}
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded">
            {afterLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

// Export a container for multiple before/after comparisons
interface BeforeAfterItem {
  beforeImage: string;
  afterImage: string;
  title: string;
}

const defaultItems: BeforeAfterItem[] = [
  {
    beforeImage: "/assets/20250125_124434.jpg",
    afterImage: "/assets/20250506_090036.jpg",
    title: "അടാട്ട് തറ പാലം",
  },
  {
    beforeImage: "/assets/20250203_110634.jpg",
    afterImage: "/assets/20250506_072153.jpg",
    title: "ഇൻഡോർ സ്റ്റേഡിയം",
  },
  {
    beforeImage: "/assets/DSC09906.JPG",
    afterImage: "/assets/20250904_180148.jpg",
    title: "വാഴാനി മ്യൂസിക്കൽ ഫൗണ്ടൻ",
  },
];

export function BeforeAfterSection({ items = defaultItems }: { items?: BeforeAfterItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          viewport={{ once: true }}
        >
          <BeforeAfterSlider
            beforeImage={item.beforeImage}
            afterImage={item.afterImage}
            title={item.title}
          />
        </motion.div>
      ))}
    </div>
  );
}
