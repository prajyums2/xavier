"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MessageCircle,
  Radio,
} from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  { image: "/assets/website-general/1.jpg" },
  { image: "/assets/website-general/2.jpg" },
  { image: "/assets/website-general/3.jpg" },
  { image: "/assets/website-general/4.jpg" },
  { image: "/assets/website-general/5.jpg" },
  { image: "/assets/website-general/6.JPG" },
  { image: "/assets/website-general/7.jpg" },
  { image: "/assets/website-general/8.jpg" },
  { image: "/assets/website-general/9.jpg" },
  { image: "/assets/website-general/10.jpg" },
  { image: "/assets/website-general/11.jpg" },
  { image: "/assets/website-general/12.JPG" },
  { image: "/assets/website-general/13.jpg" },
  { image: "/assets/website-general/14.jpg" },
  { image: "/assets/website-general/15.jpg" },
  { image: "/assets/website-general/16.jpg" },
  { image: "/assets/website-general/17.jpg" },
  { image: "/assets/website-general/18.jpg" },
  { image: "/assets/website-general/20.jpg" },
  { image: "/assets/website-general/21.jpg" },
];

const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/XavierChittilappillyMLA",
    label: "Facebook",
    color: "bg-[#1877F2] hover:bg-[#166FE5]",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/xavier_chittilappilly",
    label: "Instagram",
    color: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
  },
  {
    icon: Youtube,
    href: "https://www.youtube.com/@xavierchittilappilly",
    label: "YouTube",
    color: "bg-[#FF0000] hover:bg-[#CC0000]",
  },
  {
    icon: Radio,
    href: "https://www.whatsapp.com/channel/0029VaVpXX34tRs0K4Qi0G26",
    label: "WhatsApp Channel",
    color: "bg-[#25D366] hover:bg-[#20BD5A]",
  },
  {
    icon: MessageCircle,
    href: "https://api.whatsapp.com/send?phone=7356578486",
    label: "WhatsApp Chat",
    color: "bg-[#128C7E] hover:bg-[#075E54]",
  },
  {
    icon: Phone,
    href: "tel:+919446228486",
    label: "Phone",
    color: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    icon: Mail,
    href: "mailto:caxavica@gmail.com",
    label: "Email",
    color: "bg-slate-600 hover:bg-slate-700",
  },
];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 50 }, [
    Autoplay({ delay: 4500, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative flex-[0_0_100%] min-w-0 h-full"
            >
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
                quality={100}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* Overlay images */}
      {/* Top left — Vector Smart Object */}
      <div className="absolute top-0 left-0 z-10 pointer-events-none p-8">
        <Image
          src="/assets/Vector Smart Object.png"
          alt=""
          width={300}
          height={300}
          className="w-[120px] h-auto sm:w-[150px] md:w-[200px] lg:w-[200px] opacity-80"
          priority
        />
      </div>

      {/* Bottom right — Xavier Typo */}
      <div className="absolute bottom-0 right-0 z-10 pointer-events-none">
        <Image
          src="/assets/xavier typo 2.png"
          alt=""
          width={400}
          height={400}
          className="w-[150px] h-auto sm:w-[200px] md:w-[280px] lg:w-[380px] opacity-90"
          priority
        />
      </div>

      {/* === BOTTOM CONTENT AREA === */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        {/* Mobile: stacked layout */}
        <div className="md:hidden px-5 pb-6">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-600/90 backdrop-blur-sm text-white text-[10px] font-semibold rounded-sm mb-2">
              <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
              LDF സ്ഥാനാർത്ഥി
            </span>
            <h1
              className="text-3xl font-bold text-white leading-[1.1] mb-1"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
            >
              സേവ്യർ
              <br />
              ചിറ്റിലപ്പിള്ളി
            </h1>
            <div className="w-8 h-[2px] bg-red-500 mb-1.5" />
            <p className="text-xs text-white/70 font-medium">
              വടക്കാഞ്ചേരി നിയോജക മണ്ഡലം
            </p>
          </motion.div>

          {/* CTA Buttons — centered below text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center gap-2 mt-4 pointer-events-auto"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.06 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "flex items-center justify-around w-9 h-9 rounded-full text-white shadow-lg",
                  link.color,
                )}
              >
                <link.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </motion.div>

          {/* Dots — below CTA */}
          <div className="flex justify-center gap-1.5 mt-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  selectedIndex === index
                    ? "bg-white w-5"
                    : "bg-white/30 w-1 hover:bg-white/60",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: original layout */}
        <div className="hidden md:block px-10 lg:px-14 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="inline-flex items-center gap-2 px-2.5 py-1 bg-red-600/90 backdrop-blur-sm text-white text-sm font-semibold rounded-sm mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LDF സ്ഥാനാർത്ഥി
            </span>
            <h1
              className="text-5xl lg:text-7xl font-bold text-white mb-2 leading-[1.1] tracking-tight"
              style={{ textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}
            >
              സേവ്യർ
              <br />
              ചിറ്റിലപ്പിള്ളി
            </h1>
            <div className="w-12 h-[3px] bg-red-500 mb-2" />
            <p className="text-lg text-white/80 font-medium mb-5">
              വടക്കാഞ്ചേരി നിയോജക മണ്ഡലം
            </p>

            {/* CTA Buttons — horizontal row below text on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-wrap gap-2 pointer-events-auto"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1 + index * 0.06 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-white text-xs font-semibold shadow-lg",
                    link.color,
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-black/20 backdrop-blur-sm hover:bg-black/40 text-white p-2 rounded-full transition-all duration-300 border border-white/10 hover:border-white/30"
        aria-label="Previous"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-black/20 backdrop-blur-sm hover:bg-black/40 text-white p-2 rounded-full transition-all duration-300 border border-white/10 hover:border-white/30"
        aria-label="Next"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Slide counter */}
      <div className="absolute top-5 right-5 md:top-8 md:right-10 z-20">
        <span className="text-white/40 text-[11px] font-mono tabular-nums">
          <span className="text-white">
            {String(selectedIndex + 1).padStart(2, "0")}
          </span>
          <span className="mx-1">/</span>
          <span>{String(slides.length).padStart(2, "0")}</span>
        </span>
      </div>

      {/* Desktop Dots */}
      <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20 gap-1.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "h-1 rounded-full transition-all duration-500",
              selectedIndex === index
                ? "bg-white w-6"
                : "bg-white/30 w-1 hover:bg-white/60",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
