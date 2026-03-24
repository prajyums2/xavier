"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CompareProps {
  firstImage?: string;
  secondImage?: string;
  firstImageLabel?: string;
  secondImageLabel?: string;
  className?: string;
  slideMode?: "hover" | "drag";
  showHandlebar?: boolean;
}

export function Compare({
  firstImage,
  secondImage,
  firstImageLabel,
  secondImageLabel,
  className,
  slideMode = "drag",
  showHandlebar = true,
}: CompareProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

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

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (slideMode === "hover") {
        handleMove(e.clientX);
      } else {
        if (!isDragging) return;
        handleMove(e.clientX);
      }
    },
    [isDragging, handleMove, slideMode]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  const handleMouseDown = () => {
    if (slideMode === "drag") {
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-xl cursor-col-resize select-none",
        className
      )}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
    >
      {/* Second Image (After - Full background) */}
      <div className="absolute inset-0">
        <Image
          src={secondImage || ""}
          alt={secondImageLabel || "After"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
          quality={85}
        />
      </div>

      {/* First Image (Before - Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden z-10"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative h-full" style={{ width: containerWidth || "100vw" }}>
          <Image
            src={firstImage || ""}
            alt={firstImageLabel || "Before"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            quality={85}
          />
        </div>
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-[3px] bg-white z-20 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
        style={{ left: `${sliderPosition}%` }}
      />

      {/* Handlebar */}
      {showHandlebar && (
        <div
          className="absolute top-1/2 z-30"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-white/50">
            <div className="flex items-center gap-0.5">
              <svg
                className="w-3 h-3 md:w-4 md:h-4 text-slate-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <svg
                className="w-3 h-3 md:w-4 md:h-4 text-slate-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Labels */}
      {firstImageLabel && (
        <div className="absolute top-3 left-3 z-20">
          <span className="px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-md">
            {firstImageLabel}
          </span>
        </div>
      )}
      {secondImageLabel && (
        <div className="absolute top-3 right-3 z-20">
          <span className="px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-md">
            {secondImageLabel}
          </span>
        </div>
      )}
    </div>
  );
}
