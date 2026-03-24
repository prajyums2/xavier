"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FutureSlide {
  image: string;
  title: string;
  description: string;
  amount?: string;
}

const futureSlides: FutureSlide[] = [
  {
    image: "/assets/website-future/Wadakkanchery Court Complex.jpg",
    title: "വടക്കാഞ്ചേരി കോടതി സമുച്ചയം",
    description: "ഗവ. ഗേൾസ് ഹൈസ്കൂളിന് സമീപം 63.6 സെൻ്റ് ഭൂമിയിൽ ഒരുങ്ങുന്നത് അഞ്ചു നിലകളിലായി 68,000 സ്ക്വയർ ഫീറ്റ് വിസ്തൃതിയുള്ള കോടതി സമുച്ചയം",
  },
  {
    image: "/assets/website-future/Medical College Super Speciality Block 1.jpg",
    title: "മെഡിക്കൽ കോളേജ് സൂപ്പർ സ്പെഷ്യാലിറ്റി ബ്ലോക്ക്",
    description: "തൃശ്ശൂർ ഗവ. മെഡിക്കൽ കോളേജ് സൂപ്പർ സ്പെഷ്യാലിറ്റി ബ്ലോക്ക്",
    amount: "199.41 കോടി",
  },
  {
    image: "/assets/website-future/Medical College Mother & Child Block 1.jpg",
    title: "മെഡിക്കൽ കോളേജ് അമ്മയും കുഞ്ഞും ബ്ലോക്ക്",
    description: "തൃശ്ശൂർ ഗവ. മെഡിക്കൽ കോളേജ് അമ്മയും കുഞ്ഞും ബ്ലോക്ക്",
    amount: "279 കോടി",
  },
  {
    image: "/assets/website-future/Medical College Critical Care block.jpg",
    title: "മെഡിക്കൽ കോളേജ് ക്രിട്ടിക്കൽ കെയർ ബ്ലോക്ക്",
    description: "തൃശ്ശൂർ ഗവ. മെഡിക്കൽ കോളേജ് ക്രിട്ടിക്കൽ കെയർ ബ്ലോക്ക്",
    amount: "23.25 കോടി",
  },
  {
    image: "/assets/website-future/Ayurveda Hospital.jpg",
    title: "ആയുർവേദ വിഷവൈദ്യ ആശുപത്രി",
    description: "ആധുനിക സൗകര്യങ്ങളോടുകൂടിയ ആയുർവേദ വിഷവൈദ്യ ആശുപത്രി",
  },
  {
    image: "/assets/website-future/Family Health Centre Mundathikkode.jpg",
    title: "മുണ്ടത്തിക്കോട് കുടുംബാരോഗ്യ കേന്ദ്രം",
    description: "മണ്ഡലത്തിലെ ആരോഗ്യ സേവനം മെച്ചപ്പെടുത്തുന്നതിനായി",
  },
  {
    image: "/assets/website-future/Community Health Centre Adat.jpg",
    title: "അടാട്ട് സാമൂഹ്യാരോഗ്യ കേന്ദ്രം",
    description: "അടാട്ട് പ്രദേശത്തെ ആരോഗ്യ സേവനങ്ങൾക്കായി",
  },
  {
    image: "/assets/website-future/Community Health Centre Tholur.jpg",
    title: "തോളൂർ സാമൂഹ്യാരോഗ്യ കേന്ദ്രം",
    description: "തോളൂർ പ്രദേശത്തെ ആരോഗ്യ സേവനങ്ങൾക്കായി",
  },
  {
    image: "/assets/website-future/Kuttur GHSS.jpg",
    title: "കുറ്റൂർ ഗവ. സ്‌കൂൾ ഹയർസെക്കന്ററി ബ്ലോക്ക്",
    description: "വിദ്യാഭ്യാസ മേഖലയിലെ വികസനം",
    amount: "4 കോടി",
  },
  {
    image: "/assets/website-future/Wadakkanchery Boys HSS.jpg",
    title: "വടക്കാഞ്ചേരി ഗവ. ബോയ്സ് എച്ച്എസ്എസ്",
    description: "വിദ്യാഭ്യാസ മേഖലയിലെ വികസനം",
    amount: "7 കോടി",
  },
  {
    image: "/assets/website-future/Varadium GUPS.jpg",
    title: "വരടിയം ഗവ. യു.പി. സ്‌കൂൾ",
    description: "വിദ്യാഭ്യാസ മേഖലയിലെ വികസനം",
    amount: "3 കോടി",
  },
  {
    image: "/assets/website-future/Institute of Fashion Design.jpg",
    title: "ഗവ. ഇൻസ്റ്റിറ്റ്യൂട്ട് ഓഫ് ഫാഷൻ ഡിസൈനിങ്",
    description: "വടക്കാഞ്ചേരി ഗവ. ഇൻസ്റ്റിറ്റ്യൂട്ട് ഓഫ് ഫാഷൻ ഡിസൈനിങ്",
    amount: "1.50 കോടി",
  },
  {
    image: "/assets/website-future/Working Women Hostel.jpg",
    title: "വർക്കിംഗ് വിമൻസ് ഹോസ്റ്റൽ",
    description: "ഹൗസിങ് ബോർഡ്, മുളങ്കുന്നത്തുകാവ്",
    amount: "13.65 കോടി",
  },
  {
    image: "/assets/website-future/Amala Women Amenities Centre.jpg",
    title: "അമല നഗർ വനിത സൗഹൃദ അമിനിറ്റീസ് സെന്റർ",
    description: "സ്ത്രീകൾക്കായുള്ള സൗകര്യങ്ങൾ",
  },
  {
    image: "/assets/website-future/Vilangankunnu Watch Tower.jpg",
    title: "വിലങ്ങൻകുന്ന് വാച്ച് ടവർ",
    description: "വിനോദ സഞ്ചാര മേഖലയിലെ പുതിയ ആകർഷണം",
  },
  {
    image: "/assets/website-future/Vilangankunnu Restaurant & Seminar Hall.jpg",
    title: "വിലങ്ങൻകുന്ന് റെസ്റ്റോറന്റ് & സെമിനാർ ഹാൾ",
    description: "വിനോദ സഞ്ചാര മേഖലയിലെ പുതിയ സൗകര്യങ്ങൾ",
  },
  {
    image: "/assets/website-future/Wadakkanchery Cultural Convention Centre 1.jpg",
    title: "വടക്കാഞ്ചേരി കൾച്ചറൽ കൺവെൻഷൻ സെന്റർ",
    description: "സാംസ്കാരിക പരിപാടികൾക്കായുള്ള ആധുനിക കൺവെൻഷൻ സെന്റർ",
    amount: "9 കോടി",
  },
  {
    image: "/assets/website-future/Sreekeralavarma Library.jpg",
    title: "വടക്കാഞ്ചേരി ശ്രീകേരളവർമ്മ പബ്ലിക് ലൈബ്രറി ഹാൾ",
    description: "വായനാ സംസ്കാരം വളർത്തുന്നതിനായി",
  },
  {
    image: "/assets/website-future/Food Safety Office.jpg",
    title: "വടക്കാഞ്ചേരി ഫുഡ് സേഫ്റ്റി കം ഹെൽത്ത് സബ് സെൻറർ",
    description: "ഭക്ഷ്യ സുരക്ഷ ഉറപ്പാക്കുന്നതിനായി",
  },
  {
    image: "/assets/website-future/Wadakkanchery District Hospital Casualty Block.jpg",
    title: "ജില്ലാ ആശുപത്രി കാഷ്വാലിറ്റി ബ്ലോക്ക്",
    description: "അടിയന്തര വൈദ്യസഹായത്തിനായുള്ള പുതിയ കാഷ്വാലിറ്റി ബ്ലോക്ക്",
    amount: "8.35 കോടി",
  },
  {
    image: "/assets/website-future/Pazhamukk GUPS.jpg",
    title: "മുണ്ടൂർ പഴമുക്ക് എൽ.പി. സ്കൂൾ",
    description: "വിദ്യാഭ്യാസ മേഖലയിലെ വികസനം",
  },
  {
    image: "/assets/website-future/Wadakkanchery Bypass Road.jpg",
    title: "വടക്കഞ്ചേരി ബൈപ്പാസ്",
    description: "223 കോടി രൂപയുടെ DPR കിഫ്ബിക്ക് സമർപ്പിച്ചു. 27.60 കോടി രൂപയുടെ മേൽപ്പാലത്തിൻ്റെ ഡ്രോയിങ് റെയിൽവേയുടെ പരിഗണനയിൽ.",
    amount: "223 കോടി",
  },
];

export function FutureWorksCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

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
            <div key={index} className="relative flex-[0_0_100%] min-w-0">
              <div className="relative min-h-[70vh] md:min-h-[80vh] flex items-center">
                {/* Background Image */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  loading={index < 3 ? "eager" : "lazy"}
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                {/* Content */}
                <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-12">
                  <div className="max-w-3xl">
                    {/* Amount badge */}
                    {slide.amount && (
                      <motion.span
                        key={`amount-${selectedIndex === index}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={selectedIndex === index ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4 }}
                        className="inline-block px-3 py-1.5 mb-4 text-xs md:text-sm font-bold text-white bg-blue-600 rounded"
                      >
                        ₹ {slide.amount}
                      </motion.span>
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
                      animate={selectedIndex === index ? { width: 64 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="h-1 bg-blue-500 mb-4"
                    />

                    {/* Description */}
                    <motion.p
                      key={`desc-${selectedIndex === index}`}
                      initial={{ opacity: 0 }}
                      animate={selectedIndex === index ? { opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.25 }}
                      className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2.5 rounded-full transition-all border border-white/10"
        aria-label="Previous"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2.5 rounded-full transition-all border border-white/10"
        aria-label="Next"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 max-w-[80vw] overflow-x-auto pb-1">
        {futureSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "h-1 rounded-full transition-all duration-500 shrink-0",
              selectedIndex === index
                ? "bg-blue-400 w-5"
                : "bg-white/30 w-1 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
