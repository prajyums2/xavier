"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ShimmerButton({
  shimmerColor = "#ffffff",
  shimmerSize = "0.05em",
  shimmerDuration = "3s",
  borderRadius = "100px",
  background = "rgba(0, 122, 77, 1)",
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        } as React.CSSProperties
      }
      className={cn(
        "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 [background:var(--bg)] [border-radius:var(--radius)] text-white",
        "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-[1px]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 overflow-visible [container-type:size]",
          "animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]"
        )}
      >
        <div className="absolute inset-[-100%] w-auto rotate-0 animate-spin-around [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
      </div>
      {children}
      <div className="pointer-events-none absolute inset-[1px] rounded-[inherit] bg-[var(--bg)] [border-radius:var(--radius)]" />
      <div
        className={cn(
          "absolute inset-[1px] rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          "shadow-[inset_0_-8px_10px_#ffffff1f]",
          "transform-gpu transition-all duration-300 ease-in-out",
          "[clip-path:inset(0_0_0_0_round_var(--radius))]"
        )}
      />
      <div className="relative z-10 flex items-center gap-2">{children}</div>
    </button>
  );
}
