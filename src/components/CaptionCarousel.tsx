"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CaptionSlide {
  image: string;
  title: string;
  subtitle: string;
  amount?: string;
}

const slides: CaptionSlide[] = [
  {
    image: "/assets/website-complete/Choolissery Pole Casting Yard 1.jpg",
    title: "ചൂലിശ്ശേരി പോൾ കാസ്റ്റിംഗ് യാർഡ്",
    subtitle: "മൂന്ന് ജില്ലകളിലേക്കുള്ള ഇലക്ട്രിക്ക് പോസ്റ്റുകൾ ഇവിടെ നിർമ്മിക്കുന്നു",
    amount: "5.85 കോടി",
  },
  {
    image: "/assets/website-complete/Choolissery Pole Casting 2.jpg",
    title: "ചൂലിശ്ശേരി പോൾ കാസ്റ്റിംഗ് യാർഡ്",
    subtitle: "മൂന്ന് ജില്ലകളിലേക്കുള്ള ഇലക്ട്രിക്ക് പോസ്റ്റുകൾ ഇവിടെ നിർമ്മിക്കുന്നു",
    amount: "5.85 കോടി",
  },
  {
    image: "/assets/website-complete/St. Pius School Bus.jpg",
    title: "സെന്റ് പയസ് ടെൻത്ത് യു പി സ്കൂൾ ബസ്",
    subtitle: "എംഎൽഎ ഫണ്ടിൽ നിന്നും സ്കൂൾ ബസ് അനുവദിച്ചു",
    amount: "19 ലക്ഷം",
  },
  {
    image: "/assets/website-complete/Mapple wood flooring.JPG",
    title: "മുണ്ടൂർ ഇ.എം.എസ് ഇൻഡോർ സ്റ്റേഡിയം",
    subtitle: "മേപ്പിൾ വുഡ് ഫ്ലോറിംഗ് നിർമ്മാണം",
    amount: "46 ലക്ഷം",
  },
  {
    image: "/assets/website-complete/Adat 51 thara 1.jpg",
    title: "അടാട്ട് 51 തറ പാലം",
    subtitle: "ജനങ്ങളുടെ സുരക്ഷിത യാത്രയ്ക്കായി",
    amount: "1.21 കോടി",
  },
  {
    image: "/assets/website-complete/Adat 51 thara 2.jpg",
    title: "അടാട്ട് 51 തറ പാലം",
    subtitle: "ജനങ്ങളുടെ സുരക്ഷിത യാത്രയ്ക്കായി",
    amount: "1.21 കോടി",
  },
  {
    image: "/assets/website-complete/GLPS Ottupara 1.jpg",
    title: "ഗവണ്മെന്റ് എൽ.പി. സ്കൂൾ ഓട്ടുപാറ",
    subtitle: "പരുത്തിപ്ര ഗവണ്മെന്റ് എൽ.പി. സ്കൂൾ",
    amount: "1.98 കോടി",
  },
  {
    image: "/assets/website-complete/GLPS Ottupara 2.jpg",
    title: "ഗവണ്മെന്റ് എൽ.പി. സ്കൂൾ ഓട്ടുപാറ",
    subtitle: "പരുത്തിപ്ര ഗവണ്മെന്റ് എൽ.പി. സ്കൂൾ",
    amount: "1.98 കോടി",
  },
  {
    image: "/assets/website-complete/Vazhani Musical Fountain.jpg",
    title: "വാഴാനി മ്യൂസിക്കൽ ഫൗണ്ടൻ",
    subtitle: "ലേസർ പ്രൊജക്ഷൻ ഓൺ വാട്ടർ സ്ക്രീൻ - നിർമ്മാണം അന്തിമഘട്ടത്തിൽ",
    amount: "5.99 കോടി",
  },
  {
    image: "/assets/website-complete/Vazhani Kuttavanji.jpg",
    title: "വാഴാനി കുട്ടവഞ്ചി സവാരി",
    subtitle: "വിനോദ സഞ്ചാര മേഖലയിലെ പുതിയ ആകർഷണം",
  },
  {
    image: "/assets/website-complete/Pattayam 1.jpg",
    title: "ഭൂമി അവകാശികൾക്ക് പട്ടയം",
    subtitle: "4,094 കുടുംബങ്ങൾക്ക് അഞ്ച് വർഷത്തിനിടെ ഭൂമിയുടെ ഉടമകളായി",
    amount: "4,094 പട്ടയങ്ങൾ",
  },
  {
    image: "/assets/website-complete/Pattayam 2.jpg",
    title: "ഭൂമി അവകാശികൾക്ക് പട്ടയം",
    subtitle: "കുമരനെല്ലൂർ തെലുങ്കർ നഗർ, മുണ്ടത്തിക്കോട് കുംഭാര നഗർ എന്നിവിടങ്ങളിലെ പട്ടയപ്രശ്നങ്ങൾ പരിഹരിച്ചു",
    amount: "4,094 പട്ടയങ്ങൾ",
  },
  {
    image: "/assets/website-complete/Telungar Nagar.png",
    title: "ഭൂമി അവകാശികൾക്ക് പട്ടയം",
    subtitle: "മണലിത്തറ മലാക്ക, അവണൂർ അംബേദ്ക്കർ, ഇത്തപ്പാറ മിച്ചഭൂമികൾ",
    amount: "4,094 പട്ടയങ്ങൾ",
  },
  {
    image: "/assets/website-complete/Pattayam 3.jpg",
    title: "ഭൂമി അവകാശികൾക്ക് പട്ടയം",
    subtitle: "മൈലാടുംകുന്ന്, പാമ്പൂർ വലിയപറമ്പ് പതിറ്റാണ്ടുകളായുള്ള പ്രശ്നങ്ങൾ പരിഹരിച്ചു",
    amount: "4,094 പട്ടയങ്ങൾ",
  },
  {
    image: "/assets/website-complete/Mundur Puttekara.jpg",
    title: "മുണ്ടൂർ പുറ്റേക്കര നാലുവരി പാത",
    subtitle: "കുപ്പിക്കഴുത്ത് നാലുവരി പാതയാക്കി വികസിപ്പിക്കാൻ പുതുക്കിയ ഭരണാനുമതി",
    amount: "58 കോടി",
  },
  {
    image: "/assets/website-complete/Pathiyar Kulangara VCB.png",
    title: "പതിയാർകുളങ്ങര വി.സി.ബി.",
    subtitle: "ജല സംരക്ഷണ പദ്ധതി",
    amount: "94 ലക്ഷം",
  },
  {
    image: "/assets/website-complete/Medical College Subtreasury.png",
    title: "മെഡിക്കൽ കോളേജ് സബ് ട്രഷറി",
    subtitle: "ആരോഗ്യ മേഖലയ്ക്ക് കരുത്ത്",
    amount: "2 കോടി",
  },
  {
    image: "/assets/website-complete/Munnott 1.jpg",
    title: "മുന്നോട്ട്",
    subtitle: "വടക്കാഞ്ചേരി മണ്ഡലത്തിലെ പ്രതിഭകൾക്ക് എംഎൽഎയുടെ ആദരം, 4 വർഷങ്ങളിലും",
  },
  {
    image: "/assets/website-complete/Munnott 2.JPG",
    title: "മുന്നോട്ട്",
    subtitle: "വടക്കാഞ്ചേരി മണ്ഡലത്തിലെ പ്രതിഭകൾക്ക് എംഎൽഎയുടെ ആദരം",
  },
  {
    image: "/assets/website-complete/KIIFB.jpg",
    title: "മണ്ഡലത്തിലെ കിഫ്‌ബി പദ്ധതികൾ",
    subtitle: "തിരുവനന്തപുരം കിഫ്‌ബി ഹെഡ്ക്വാർട്ടേഴ്സിൽ അവലോകന യോഗങ്ങൾ",
  },
  {
    image: "/assets/website-complete/Anganwadi 1.jpg",
    title: "അങ്കണവാടി കെട്ടിടങ്ങൾ",
    subtitle: "മണ്ഡലത്തിലെ 16 അങ്കണവാടികൾക്ക് എംഎൽഎ ഫണ്ടിൽ നിന്നും പുതിയ കെട്ടിടങ്ങൾ",
    amount: "3 കോടി",
  },
  {
    image: "/assets/website-complete/Anganwadi 2.JPG",
    title: "അങ്കണവാടി കെട്ടിടങ്ങൾ",
    subtitle: "മണ്ഡലത്തിലെ 16 അങ്കണവാടികൾക്ക് എംഎൽഎ ഫണ്ടിൽ നിന്നും പുതിയ കെട്ടിടങ്ങൾ",
    amount: "3 കോടി",
  },
  {
    image: "/assets/website-complete/Peechi Vazhani Tourism Corridor Road 1.jpg",
    title: "പീച്ചി - വാഴാനി ടൂറിസം കോറിഡോർ റോഡ്",
    subtitle: "പൊങ്ങണംകാട് മുതൽ കരുമത്ര വരെ 11.65 കി.മീ. റോഡ് ബി.എം. & ബി.സി. ഉന്നത നിലവാരത്തിൽ",
    amount: "58.80 കോടി",
  },
  {
    image: "/assets/website-complete/Peechi Vazhani Tourism Corridor Road 2.jpg",
    title: "പീച്ചി - വാഴാനി ടൂറിസം കോറിഡോർ റോഡ്",
    subtitle: "പൂർണ്ണമായും സംസ്ഥാന സർക്കാർ പണം ചെലവഴിച്ച് നിർമ്മിച്ചത്",
    amount: "58.80 കോടി",
  },
  {
    image: "/assets/website-complete/MRI Scan.JPG",
    title: "എംആർഐ സ്കാനിംഗ് മെഷീൻ",
    subtitle: "തൃശ്ശൂർ ഗവ. മെഡിക്കൽ കോളേജ് അത്യാഹിത വിഭാഗം ട്രോമ ബ്ലോക്കിൽ പുതിയ എംആർഐ",
    amount: "10 കോടി",
  },
  {
    image: "/assets/website-complete/Ashwas Rental Home.JPG",
    title: "ആശ്വാസ് വാടക വീട്",
    subtitle: "മെഡിക്കൽ കോളേജിലെത്തുന്നവർക്കായി",
    amount: "4 കോടി",
  },
  {
    image: "/assets/website-complete/Himast Light.jpg",
    title: "ഹൈമാസ്റ്റ് - മിനിമാസ്റ്റ് ലൈറ്റുകൾ",
    subtitle: "മണ്ഡലത്തിലെ 127 കേന്ദ്രങ്ങളിൽ എംഎൽഎ ഫണ്ടിൽ നിന്നും ലൈറ്റുകൾ സ്ഥാപിച്ചു",
    amount: "3 കോടി",
  },
  {
    image: "/assets/website-complete/Library Book distibution.jpg",
    title: "ലൈബ്രറി പുസ്തക വിതരണം",
    subtitle: "മണ്ഡലത്തിലെ എല്ലാ ലൈബ്രറികൾക്കും 9 സ്കൂൾ ലൈബ്രറികൾക്കും പുസ്തകങ്ങൾ",
    amount: "11 ലക്ഷം",
  },
  {
    image: "/assets/website-complete/Kayaking Poomala Dam.jpg",
    title: "പൂമല ഡാം കയാക്കിങ്",
    subtitle: "വിനോദ സഞ്ചാര മേഖലയിലെ പുതിയ ആകർഷണം",
  },
  {
    image: "/assets/website-complete/Thrissur - Kuttipuram Road.jpg",
    title: "തൃശ്ശൂർ - കുറ്റിപ്പുറം സംസ്‌ഥാനപാത",
    subtitle: "സംസ്‌ഥാനപാതയിൽ പ്രവൃത്തി പൂർത്തിയായി",
    amount: "229.9 കോടി",
  },
  {
    image: "/assets/website-complete/Varnakoodaram 1.jpg",
    title: "വർണ്ണകൂടാരം",
    subtitle: "മണ്ഡലത്തിലെ സ്‌കൂളുകളിൽ വർണ്ണകൂടാരം",
    amount: "1 കോടി",
  },
  {
    image: "/assets/website-complete/GUPS Choorakkaatukara.jpg",
    title: "ചൂരക്കാട്ടുകര ജി.യു.പി.എസ്.",
    subtitle: "വിദ്യാഭ്യാസ മേഖലയിലെ വികസനം",
    amount: "1 കോടി",
  },
  {
    image: "/assets/website-complete/GUPS Puthuruthy.jpg",
    title: "പുതുരുത്തി ജി.യു.പി.എസ്.",
    subtitle: "വിദ്യാഭ്യാസ മേഖലയിലെ വികസനം",
    amount: "1.36 കോടി",
  },
  {
    image: "/assets/website-complete/Road.jpg",
    title: "മണ്ഡലത്തിലെ റോഡുകൾ",
    subtitle: "ബിഎം & ബിസി നിലവാരത്തിൽ റോഡ് വികസനം",
    amount: "180 കോടി",
  },
  {
    image: "/assets/website-complete/Krishibhavan Wky.jpg",
    title: "വടക്കാഞ്ചേരി സ്മാർട്ട് കൃഷിഭവൻ",
    subtitle: "കാർഷിക മേഖലയ്ക്ക് കരുത്ത്",
    amount: "2 കോടി",
  },
  {
    image: "/assets/website-complete/Trauma Care.png",
    title: "ട്രോമ കെയർ യൂണിറ്റ്",
    subtitle: "തൃശ്ശൂർ ഗവ. മെഡിക്കൽ കോളേജ് എയർ കണ്ടീഷൻഡ് ട്രോമ കെയർ യൂണിറ്റ്",
    amount: "7 കോടി",
  },
];

export function CaptionCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
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
    <div className="relative w-full overflow-hidden bg-slate-900">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="relative flex-[0_0_100%] min-w-0">
              <div className="relative aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  quality={90}
                  loading={index < 3 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 lg:p-12">
                  <motion.div
                    key={selectedIndex === index ? `a${index}` : `i${index}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={
                      selectedIndex === index
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 16 }
                    }
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl"
                  >
                    {slide.amount && (
                      <span className="inline-block px-3 py-1 mb-3 text-xs md:text-sm font-bold text-white bg-red-600 rounded">
                        {slide.amount.includes("കോടി") || slide.amount.includes("ലക്ഷം") || slide.amount.includes("രൂപ") ? `₹ ${slide.amount}` : slide.amount}
                      </span>
                    )}
                    <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
                      {slide.title}
                    </h3>
                    <p className="text-sm md:text-base lg:text-lg text-white/80 leading-relaxed">
                      {slide.subtitle}
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 max-w-[80vw] overflow-x-auto pb-1">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "h-1 rounded-full transition-all duration-500 shrink-0",
              selectedIndex === index
                ? "bg-white w-5"
                : "bg-white/40 w-1 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
