"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CaptionCarousel } from "@/components/CaptionCarousel";
import { FutureWorksCarousel } from "@/components/FutureWorksCarousel";
import { AchievementsGrid } from "@/components/AchievementsGrid";
import { Compare } from "@/components/acernity/Compare";
import { BudgetBreakdown } from "@/components/BudgetBreakdown";
import { BookFlip } from "@/components/BookFlip";
import {
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Phone,
  Mail,
  Radio,
} from "lucide-react";

// ---- Animation Variants ----

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ---- Before After Data ----

const beforeAfterItems = [
  {
    beforeImage: "/assets/before-after/Adat 51 thara Before.jpg",
    afterImage: "/assets/before-after/Adat 51 thara After.jpg",
    title: "അടാട്ട് 51 തറ പാലം — 1.21 കോടി",
  },
  {
    beforeImage: "/assets/before-after/GLPS Ottupara Before.jpg",
    afterImage: "/assets/before-after/GLPS Ottupara After.jpg",
    title: "ഗവണ്മെന്റ് എൽ.പി. സ്കൂൾ ഓട്ടുപാറ — 1.98 കോടി",
  },
  {
    beforeImage: "/assets/before-after/GUPS Puthuruthy Before.jpg",
    afterImage: "/assets/before-after/GUPS Puthuruthy After.jpg",
    title: "പുതുരുത്തി ജി.യു.പി.എസ്. — 1.36 കോടി",
  },
  {
    beforeImage: "/assets/before-after/Koode Waiting Facility Before.png",
    afterImage: "/assets/before-after/Koode Waiting Facility After.png",
    title: "കൂടെ വെയ്റ്റിംഗ് ഫെസിലിറ്റി — മെഡിക്കൽ കോളേജ്",
  },
  {
    beforeImage: "/assets/before-after/Peechi - Vazhani Before.jpg",
    afterImage: "/assets/before-after/Peechi - Vazhani After.jpg",
    title: "പീച്ചി - വാഴാനി ടൂറിസം കോറിഡോർ റോഡ് — 58.80 കോടി",
  },
  {
    beforeImage: "/assets/before-after/Wadakkanchery Krishibhavan Before.jpg",
    afterImage: "/assets/before-after/Wadakkanchery Krishibhavan After.jpg",
    title: "വടക്കാഞ്ചേരി സ്മാർട്ട് കൃഷിഭവൻ — 2 കോടി",
  },
];

// ---- Section Header Component ----

function SectionHeader({
  subtitle,
  title,
}: {
  subtitle: string;
  title: string;
}) {
  return (
    <div className="text-center mb-10 md:mb-12">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="text-xs tracking-[0.1em] uppercase text-slate-400 mb-2 font-medium"
      >
        {subtitle}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 48 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="h-0.5 bg-red-600 mx-auto"
      />
    </div>
  );
}

// ---- Main Page ----

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Fullscreen Hero Carousel with CTAs */}
      <section id="home">
        <HeroCarousel />
      </section>

      {/* 2. Budget Breakdown — Total Investment */}
      <BudgetBreakdown />

      {/* 3. Captioned Project Gallery */}
      <section id="projects" className="bg-white">
        <div className="py-10 md:py-14">
          <SectionHeader subtitle="ഗാലറി" title="വികസന പദ്ധതികൾ" />
        </div>
        <CaptionCarousel />
      </section>

      {/* 4. Future Works Slideshow */}
      <section className="relative">
        <div className="py-10 md:py-14 bg-white">
          <SectionHeader subtitle="ഭാവി പദ്ധതികൾ" title="മുന്നോട്ടുള്ള വഴി" />
        </div>
        <FutureWorksCarousel />
      </section>

      {/* 5. MLA Booklet — Book Flip */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader subtitle="പുസ്തകം" title="എംഎൽഎ വികസന റിപ്പോർട്ട്" />
          <BookFlip />
        </div>
      </section>

      {/* 6. Achievements with Photos */}
      <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <SectionHeader subtitle="നേട്ടങ്ങൾ" title="അഞ്ച് വർഷത്തെ വികസനം" />
          <AchievementsGrid />
        </div>
      </section>

      {/* 7. Before / After — Aceternity Compare */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeader subtitle="മാറ്റം" title="മുൻപും ശേഷവും" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {beforeAfterItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <h3 className="text-sm md:text-base font-bold text-slate-800 mb-3 text-center leading-snug">
                  {item.title}
                </h3>
                <Compare
                  firstImage={item.beforeImage}
                  secondImage={item.afterImage}
                  firstImageLabel="അന്ന്"
                  secondImageLabel="ഇന്ന്"
                  slideMode="drag"
                  showHandlebar={true}
                  className="rounded-xl border border-slate-200 shadow-md"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Candidate Message */}
      <section className="py-20 md:py-28 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-center">
              {/* Portrait — first on mobile, right on desktop */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2 flex justify-center"
              >
                <div className="relative">
                  <div className="w-64 h-80 md:w-96 md:h-full rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="/assets/portrait/portrait.jpg"
                      alt="സേവ്യർ ചിറ്റിലപ്പിള്ളി"
                      width={400}
                      height={500}
                      className="w-full h-full object-cover object-top lg:object-center"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-red-200 -z-10" />
                </div>
              </motion.div>

              {/* Quote + Signature — second on mobile, left on desktop */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <div className="text-6xl md:text-8xl font-serif text-red-200 leading-none mb-4 select-none">
                  &ldquo;
                </div>

                <blockquote className="font-kartika space-y-4 text-base md:text-lg lg:text-xl text-slate-700 leading-relaxed -mt-8">
                  <p>
                    സമാനതകളില്ലാത്ത വികസനത്തിനാണ് ഒരു ദശാബ്ദത്തിനിടയിൽ കേരളം
                    സാക്ഷ്യം വഹിച്ചത്.
                  </p>
                  <p>
                    കേന്ദ്ര സർക്കാരിന്റെ രാഷ്ട്രീയ സാമ്പത്തിക ഉപരോധങ്ങളെയും,
                    പ്രകൃതി ദുരന്തങ്ങളെയും അതിജീവിച്ചുകൊണ്ടാണ് ഈ നേട്ടങ്ങളെല്ലാം
                    സാധ്യമായത്.
                  </p>
                  <p>
                    മതനിരപേക്ഷ കേരളം രാജ്യത്തിന് മുന്നിലൊരു മാനവിക ബദൽ
                    ഉയർത്തിപ്പിടിച്ചു.
                  </p>
                  <p>
                    നവകേരളത്തിലേക്കുള്ള യാത്രയോട് മുഖംതിരിഞ്ഞ് നിന്ന രാഷ്ട്രീയ
                    നേതൃത്വം വടക്കാഞ്ചേരി മണ്ഡലത്തിനുണ്ടായിരുന്നു.
                  </p>
                  <p>
                    ഈ വിടവിനെ മറികടന്നുകൊണ്ടുള്ള മുന്നേറ്റമാണ് നമ്മുടെ മണ്ഡലം
                    കഴിഞ്ഞ അഞ്ച് വർഷം കൊണ്ട് നേടിയെടുത്തത്.
                  </p>
                  <p>
                    മുടങ്ങിക്കിടന്നിരുന്ന പദ്ധതികൾ ത്വരിതപ്പെടുത്താനും, പുതിയ
                    പദ്ധതികൾ രൂപപ്പെടുത്താനും നമുക്ക് സാധിച്ചു.
                  </p>
                  <p>
                    കേരളത്തിന്റെ പുരോഗതിക്കൊപ്പം ഓടിയെത്തിയ ഈ അഞ്ച് വർഷത്തെ
                    ഇടപെടലുകളുടെയും, വികസനപ്രവർത്തനങ്ങളുടെയും ഒരു ചെറിയ
                    പരിച്ഛേദമാണ് ഈ പുസ്തകത്തിൽ ഉൾപ്പെടുത്തിയിരിക്കുന്നത്.
                  </p>
                  <p className="font-semibold text-slate-900">
                    ഏറെയുണ്ട് പറയാൻ, നാടിന്റെ പുരോഗതി, അത് നമുക്ക്
                    മുന്നിലുണ്ടല്ലോ...!!!
                  </p>
                </blockquote>

                {/* Signature */}
                <div className="mt-10 pt-6 border-t border-slate-200">
                  <div className="w-48 md:w-56 h-16 md:h-20 mb-3 relative">
                    <Image
                      src="/assets/portrait/signature.png"
                      alt="Signature"
                      width={224}
                      height={80}
                      className="w-full h-full object-contain object-left"
                      loading="lazy"
                    />
                  </div>
                  <p className="font-kartika text-base md:text-lg font-bold text-slate-900">
                    സേവ്യർ ചിറ്റിലപ്പിള്ളി
                  </p>
                  {/* <p className="font-kartika text-xs md:text-sm text-slate-500">
                    LDF സ്ഥാനാർഥി — വടക്കാഞ്ചേരി
                  </p> */}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="py-12 md:py-16 bg-slate-950 text-white">
        <div className="container mx-auto px-6">
          <div className=" mx-auto">
            {/* Top section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {/* Candidate Info */}
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  സേവ്യർ ചിറ്റിലപ്പിള്ളി
                </h3>
                <p className="text-sm text-white/50 mb-3">
                  LDF സ്ഥാനാർഥി — വടക്കാഞ്ചേരി നിയോജക മണ്ഡലം
                </p>
                <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-white/40">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>വടക്കാഞ്ചേരി, തൃശൂർ ജില്ല, കേരളം</span>
                </div>
              </div>

              {/* Quick Links */}
              <div className="text-center">
                <h4 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wider">
                  ലിങ്കുകൾ
                </h4>
                <ul className="space-y-2 text-sm text-white/50">
                  <li>
                    <a
                      href="#home"
                      className="hover:text-white transition-colors"
                    >
                      ഹോം
                    </a>
                  </li>
                  <li>
                    <a
                      href="#projects"
                      className="hover:text-white transition-colors"
                    >
                      വികസന പദ്ധതികൾ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="hover:text-white transition-colors"
                    >
                      അറിയുക
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact CTA Buttons */}
              <div className="text-center md:text-right">
                <h4 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wider">
                  ബന്ധപ്പെടുക
                </h4>
                <div className="flex flex-wrap justify-center md:justify-end gap-2">
                  <a
                    href="https://www.facebook.com/XavierChittilappillyMLA"
                    className="flex items-center gap-1.5 px-3 py-2 bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                    Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/xavier_chittilappilly"
                    className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white text-xs font-medium rounded-lg transition-opacity hover:opacity-90"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    Instagram
                  </a>
                  <a
                    href="https://www.youtube.com/@xavierchittilappilly"
                    className="flex items-center gap-1.5 px-3 py-2 bg-[#FF0000] hover:bg-[#CC0000] text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    YouTube
                  </a>
                  <a
                    href="https://www.whatsapp.com/channel/0029VaVpXX34tRs0K4Qi0G26"
                    className="flex items-center gap-1.5 px-3 py-2 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    WhatsApp Channel
                  </a>
                  <a
                    href="https://api.whatsapp.com/send?phone=7356578486"
                    className="flex items-center gap-1.5 px-3 py-2 bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp Chat
                  </a>
                  <a
                    href="tel:+919446228486"
                    className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Phone
                  </a>
                  <a
                    href="mailto:caxavica@gmail.com"
                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email
                  </a>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-16 h-0.5 bg-red-500 mx-auto mb-6" />

            {/* Bottom */}
            <div className="text-center text-xs text-white/25">
              © 2026 സേവ്യർ ചിറ്റിലപ്പിള്ളി
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
