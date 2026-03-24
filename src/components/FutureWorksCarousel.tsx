"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FutureSlide {
  title: string;
  description: string;
  status?: "planning" | "approved" | "ongoing";
}

const futureSlides: FutureSlide[] = [
  {
    title: "വടക്കാഞ്ചേരി ടൗൺഷെഡ്",
    description: "നഗര ഗതാഗത കുരുക്ക് പരിഹരിക്കുന്നതിനായി ആധുനിക ടൗൺഷെഡ് നിർമ്മാണം",
    status: "planning",
  },
  {
    title: "പുതിയ ആശുപത്രി കെട്ടിടം",
    description: "വടക്കാഞ്ചേരി ജില്ലാ ആശുപത്രിയുടെ വിപുലീകരണവും നവീകരണവും",
    status: "approved",
  },
  {
    title: "IT പാർക്ക്",
    description: "യുവാക്കൾക്ക് തൊഴിൽ അവസരങ്ങൾ സൃഷ്ടിക്കുന്നതിനായി ഒരു IT പാർക്ക് സ്ഥാപിക്കൽ",
    status: "planning",
  },
  {
    title: "കായിക അക്കാദമി",
    description: "അന്തർദേശീയ നിലവാരമുള്ള കായിക പരിശീലന കേന്ദ്രം സ്ഥാപിക്കൽ",
    status: "planning",
  },
  {
    title: "ടൂറിസം സർക്യൂട്ട്",
    description: "വാഴാനി, പൂമല ഡാം, ചിമ്മിനി ഡാം എന്നിവ ഉൾപ്പെടുത്തി ടൂറിസം സർക്യൂട്ട് വികസനം",
    status: "ongoing",
  },
  {
    title: "സ്മാർട്ട് റോഡുകൾ",
    description: "സോളാർ ലൈറ്റുകളും ഡിജിറ്റൽ ബോർഡുകളുമുള്ള ആധുനിക റോഡ് ശൃംഖല",
    status: "approved",
  },
  {
    title: "കാർഷിക സംസ്കരണ കേന്ദ്രം",
    description: "കർഷകർക്ക് മൂല്യവർധിത ഉൽപ്പന്നങ്ങൾ തയ്യാറാക്കാൻ സഹായിക്കുന്ന കേന്ദ്രം",
    status: "planning",
  },
  {
    title: "ജല ശുദ്ധീകരണ പ്ലാന്റ്",
    description: "മണ്ഡലത്തിലെ എല്ലാ പ്രദേശങ്ങൾക്കും ശുദ്ധജലം ഉറപ്പാക്കുന്ന പദ്ധതി",
    status: "approved",
  },
];

const statusConfig = {
  planning: { label: "ആസൂത്രണത്തിൽ", color: "bg-amber-500" },
  approved: { label: "അനുമതി ലഭിച്ചു", color: "bg-emerald-500" },
  ongoing: { label: "നടപ്പിലാക്കുന്നു", color: "bg-blue-500" },
};

export function FutureWorksCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
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
    <div className="relative w-full overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {futureSlides.map((slide, index) => (
            <div
              key={index}
              className="relative flex-[0_0_100%] min-w-0"
            >
              <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 md:py-36 lg:py-44 px-6 md:px-16 min-h-[60vh] md:min-h-[70vh] flex items-center">
                {/* Background pattern */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                <div className="relative z-10 max-w-3xl mx-auto text-center">
                  {/* Status badge */}
                  {slide.status && (
                    <motion.div
                      key={`status-${selectedIndex === index}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={selectedIndex === index ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4 }}
                      className="mb-5"
                    >
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-white",
                          statusConfig[slide.status].color
                        )}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        {statusConfig[slide.status].label}
                      </span>
                    </motion.div>
                  )}

                  {/* Title */}
                  <motion.h3
                    key={`title-${selectedIndex === index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={selectedIndex === index ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
                  >
                    {slide.title}
                  </motion.h3>

                  {/* Divider */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={selectedIndex === index ? { width: 48 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="h-0.5 bg-blue-500 mx-auto mb-5"
                  />

                  {/* Description */}
                  <motion.p
                    key={`desc-${selectedIndex === index}`}
                    initial={{ opacity: 0 }}
                    animate={selectedIndex === index ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="text-base md:text-lg text-white/70 leading-relaxed"
                  >
                    {slide.description}
                  </motion.p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={scrollPrev}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2.5 rounded-full transition-all border border-white/10"
        aria-label="Previous"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2.5 rounded-full transition-all border border-white/10"
        aria-label="Next"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {futureSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "h-1 rounded-full transition-all duration-500",
              selectedIndex === index
                ? "bg-white w-5"
                : "bg-white/30 w-1 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
