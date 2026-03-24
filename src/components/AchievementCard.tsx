"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Building2,
  Route,
  Award,
  GraduationCap,
  Droplets,
  TreePine,
  Landmark,
  Heart,
  Lightbulb,
  BookOpen,
  Stethoscope,
  Home,
  Tractor,
  Trophy,
  School,
  Users,
  Star,
} from "lucide-react";

interface AchievementCardProps {
  title: string;
  description?: string;
  amount?: string;
  icon: React.ElementType;
  image?: string;
  index: number;
}

export function AchievementCard({
  title,
  description,
  amount,
  icon: Icon,
  image,
  index,
}: AchievementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      viewport={{ once: true, margin: "-30px" }}
    >
      <Card className="group relative overflow-hidden border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl h-full bg-white">
        {/* Image */}
        {image && (
          <div className="relative w-full aspect-[16/10] overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {amount && (
              <div className="absolute bottom-3 left-3">
                <span className="inline-block px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded shadow">
                  {amount.includes("കോടി") || amount.includes("ലക്ഷം") || amount.includes("രൂप") ? `₹ ${amount}` : amount}
                </span>
              </div>
            )}
          </div>
        )}

        <CardContent className={image ? "p-4" : "p-5"}>
          <div className="flex items-start gap-3">
            {!image && (
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center shrink-0 shadow-sm"
              >
                <Icon className="w-5 h-5 text-white" />
              </motion.div>
            )}
            <div className="flex-1 min-w-0">
              {!image && amount && (
                <span className="inline-block text-xs font-semibold text-red-600 mb-1">
                  {amount.includes("കോടി") || amount.includes("ലക്ഷം") || amount.includes("രൂപ") ? `₹ ${amount}` : amount}
                </span>
              )}
              <h3 className="text-sm md:text-base font-bold text-slate-900 leading-snug mb-1">
                {title}
              </h3>
              {description && (
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
        </CardContent>

        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </Card>
    </motion.div>
  );
}

export const achievements = [
  {
    title: "ചൂലിശ്ശേരി പോൾ കാസ്റ്റിംഗ് യാർഡ്",
    description: "മൂന്ന് ജില്ലകളിലേക്കുള്ള ഇലക്ട്രിക്ക് പോസ്റ്റുകൾ ഇവിടെ നിർമ്മിക്കുന്നു.",
    amount: "5.85 കോടി",
    icon: Building2,
    image: "/assets/website-complete/Choolissery Pole Casting Yard 1.jpg",
  },
  {
    title: "സെന്റ് പയസ് ടെൻത്ത് യു പി സ്കൂൾ ബസ്",
    description: "എംഎൽഎ ഫണ്ടിൽ നിന്നും സ്കൂൾ ബസ് അനുവദിച്ചു.",
    amount: "19 ലക്ഷം",
    icon: GraduationCap,
    image: "/assets/website-complete/St. Pius School Bus.jpg",
  },
  {
    title: "മുണ്ടൂർ ഇ.എം.എസ് ഇൻഡോർ സ്റ്റേഡിയം",
    description: "മേപ്പിൾ വുഡ് ഫ്ലോറിംഗ് നിർമ്മാണം.",
    amount: "46 ലക്ഷം",
    icon: Trophy,
    image: "/assets/website-complete/Mapple wood flooring.JPG",
  },
  {
    title: "അടാട്ട് 51 തറ പാലം",
    description: "ജനങ്ങളുടെ സുരക്ഷിത യാത്രയ്ക്കായി",
    amount: "1.21 കോടി",
    icon: Route,
    image: "/assets/website-complete/Adat 51 thara 1.jpg",
  },
  {
    title: "ഗവണ്മെന്റ് എൽ.പി. സ്കൂൾ ഓട്ടുപാറ",
    description: "പരുത്തിപ്ര ഗവണ്മെന്റ് എൽ.പി. സ്കൂൾ.",
    amount: "1.98 കോടി",
    icon: School,
    image: "/assets/website-complete/GLPS Ottupara 1.jpg",
  },
  {
    title: "വാഴാനി മ്യൂസിക്കൽ ഫൗണ്ടൻ",
    description: "ലേസർ പ്രൊജക്ഷൻ ഓൺ വാട്ടർ സ്ക്രീൻ - നിർമ്മാണം അന്തിമഘട്ടത്തിൽ.",
    amount: "5.99 കോടി",
    icon: Droplets,
    image: "/assets/website-complete/Vazhani Musical Fountain.jpg",
  },
  {
    title: "വാഴാനി കുട്ടവഞ്ചി സവാരി",
    description: "വിനോദ സഞ്ചാര മേഖലയിലെ പുതിയ ആകർഷണം.",
    icon: TreePine,
    image: "/assets/website-complete/Vazhani Kuttavanji.jpg",
  },
  {
    title: "ഭൂമി അവകാശികൾക്ക് പട്ടയം",
    description: "4,094 കുടുംബങ്ങൾക്ക് അഞ്ച് വർഷത്തിനിടെ ഭൂമിയുടെ ഉടമകളായി. കുമരനെല്ലൂർ, മുണ്ടത്തിക്കോട്, മണലിത്തറ, അവണൂർ, ഇത്തപ്പാറ, മൈലാടുംകുന്ന്, പാമ്പൂർ എന്നിവിടങ്ങളിലെ പതിറ്റാണ്ടുകളായുള്ള പട്ടയപ്രശ്നങ്ങൾ പരിഹരിച്ചു.",
    amount: "4,094 പട്ടയങ്ങൾ",
    icon: Landmark,
    image: "/assets/website-complete/Pattayam 1.jpg",
  },
  {
    title: "മുണ്ടൂർ പുറ്റേക്കര നാലുവരി പാത",
    description: "കുപ്പിക്കഴുത്ത് നാലുവരി പാതയാക്കി വികസിപ്പിക്കാൻ 58 കോടി രൂപയുടെ പുതുക്കിയ ഭരണാനുമതി. ഭൂമി ഏറ്റെടുക്കുന്നതിന് 25.57 കോടി രൂപ അനുവദിച്ചു.",
    amount: "58 കോടി",
    icon: Route,
    image: "/assets/website-complete/Mundur Puttekara.jpg",
  },
  {
    title: "പതിയാർകുളങ്ങര വി.സി.ബി.",
    description: "ജല സംരക്ഷണ പദ്ധതി",
    amount: "94 ലക്ഷം",
    icon: Droplets,
    image: "/assets/website-complete/Pathiyar Kulangara VCB.png",
  },
  {
    title: "മെഡിക്കൽ കോളേജ് സബ് ട്രഷറി",
    description: "ആരോഗ്യ മേഖലയ്ക്ക് കരുത്ത്",
    amount: "2 കോടി",
    icon: Heart,
    image: "/assets/website-complete/Medical College Subtreasury.png",
  },
  {
    title: "മുന്നോട്ട് - പ്രതിഭ ആദരം",
    description: "വടക്കാഞ്ചേരി മണ്ഡലത്തിലെ പ്രതിഭകൾക്ക് എംഎൽഎയുടെ ആദരം, 4 വർഷങ്ങളിലും",
    icon: Star,
    image: "/assets/website-complete/Munnott 1.jpg",
  },
  {
    title: "കിഫ്‌ബി പദ്ധതികൾ",
    description: "തിരുവനന്തപുരം കിഫ്‌ബി ഹെഡ്ക്വാർട്ടേഴ്സിൽ അവലോകന യോഗങ്ങൾ",
    icon: Building2,
    image: "/assets/website-complete/KIIFB.jpg",
  },
  {
    title: "അങ്കണവാടി കെട്ടിടങ്ങൾ",
    description: "മണ്ഡലത്തിലെ 16 അങ്കണവാടികൾക്ക് എംഎൽഎ ഫണ്ടിൽ നിന്നും പുതിയ കെട്ടിടങ്ങൾ",
    amount: "3 കോടി",
    icon: Users,
    image: "/assets/website-complete/Anganwadi 1.jpg",
  },
  {
    title: "പീച്ചി - വാഴാനി ടൂറിസം കോറിഡോർ റോഡ്",
    description: "പൊങ്ങണംകാട് മുതൽ കരുമത്ര വരെ 11.65 കി.മീ. ബി.എം. & ബി.സി. ഉന്നത നിലവാരത്തിൽ. പൂർണ്ണമായും സംസ്ഥാന സർക്കാർ പണം ചെലവഴിച്ചു.",
    amount: "58.80 കോടി",
    icon: Route,
    image: "/assets/website-complete/Peechi Vazhani Tourism Corridor Road 1.jpg",
  },
  {
    title: "എംആർഐ സ്കാനിംഗ് മെഷീൻ",
    description: "തൃശ്ശൂർ ഗവ. മെഡിക്കൽ കോളേജ് അത്യാഹിത വിഭാഗം ട്രോമ ബ്ലോക്കിൽ 10 കോടി രൂപ ചെലവിൽ പുതിയ എംആർഐ സ്കാനിംഗ് മെഷീൻ.",
    amount: "10 കോടി",
    icon: Stethoscope,
    image: "/assets/website-complete/MRI Scan.JPG",
  },
  {
    title: "ആശ്വാസ് വാടക വീട്",
    description: "മെഡിക്കൽ കോളേജിലെത്തുന്നവർക്കായി",
    amount: "4 കോടി",
    icon: Home,
    image: "/assets/website-complete/Ashwas Rental Home.JPG",
  },
  {
    title: "ഹൈമാസ്റ്റ് - മിനിമാസ്റ്റ് ലൈറ്റുകൾ",
    description: "മണ്ഡലത്തിലെ 127 കേന്ദ്രങ്ങളിൽ എംഎൽഎ ഫണ്ടിൽ നിന്നും ലൈറ്റുകൾ സ്ഥാപിച്ചു",
    amount: "3 കോടി",
    icon: Lightbulb,
    image: "/assets/website-complete/Himast Light.jpg",
  },
  {
    title: "ലൈബ്രറി പുസ്തക വിതരണം",
    description: "മണ്ഡലത്തിലെ എല്ലാ ലൈബ്രറികൾക്കും, 9 സ്കൂൾ ലൈബ്രറികൾക്കുമായി പുസ്തകങ്ങൾ വിതരണം ചെയ്തു.",
    amount: "11 ലക്ഷം",
    icon: BookOpen,
    image: "/assets/website-complete/Library Book distibution.jpg",
  },
  {
    title: "പൂമല ഡാം കയാക്കിങ്",
    description: "വിനോദ സഞ്ചാര മേഖലയിലെ പുതിയ ആകർഷണം",
    icon: TreePine,
    image: "/assets/website-complete/Kayaking Poomala Dam.jpg",
  },
  {
    title: "തൃശ്ശൂർ - കുറ്റിപ്പുറം സംസ്‌ഥാനപാത",
    description: "സംസ്‌ഥാനപാതയിൽ പ്രവൃത്തി പൂർത്തിയായി",
    amount: "229.9 കോടി",
    icon: Route,
    image: "/assets/website-complete/Thrissur - Kuttipuram Road.jpg",
  },
  {
    title: "വർണ്ണകൂടാരം",
    description: "മണ്ഡലത്തിലെ സ്‌കൂളുകളിൽ വർണ്ണകൂടാരം",
    amount: "1 കോടി",
    icon: School,
    image: "/assets/website-complete/Varnakoodaram 1.jpg",
  },
  {
    title: "ചൂരക്കാട്ടുകര ജി.യു.പി.എസ്.",
    description: "വിദ്യാഭ്യാസ മേഖലയിലെ വികസനം",
    amount: "1 കോടി",
    icon: GraduationCap,
    image: "/assets/website-complete/GUPS Choorakkaatukara.jpg",
  },
  {
    title: "പുതുരുത്തി ജി.യു.പി.എസ്.",
    description: "വിദ്യാഭ്യാസ മേഖലയിലെ വികസനം",
    amount: "1.36 കോടി",
    icon: GraduationCap,
    image: "/assets/website-complete/GUPS Puthuruthy.jpg",
  },
  {
    title: "മണ്ഡലത്തിലെ റോഡുകൾ",
    description: "ബിഎം & ബിസി നിലവാരത്തിൽ റോഡ് വികസനം",
    amount: "180 കോടി",
    icon: Route,
    image: "/assets/website-complete/Road.jpg",
  },
  {
    title: "വടക്കാഞ്ചേരി സ്മാർട്ട് കൃഷിഭവൻ",
    description: "കാർഷിക മേഖലയ്ക്ക് കരുത്ത്",
    amount: "2 കോടി",
    icon: Tractor,
    image: "/assets/website-complete/Krishibhavan Wky.jpg",
  },
  {
    title: "ട്രോമ കെയർ യൂണിറ്റ്",
    description: "തൃശ്ശൂർ ഗവ. മെഡിക്കൽ കോളേജ് എയർ കണ്ടീഷൻഡ് ട്രോമ കെയർ യൂണിറ്റ് ( റെഡ്, ഓറഞ്ച്, യെല്ലോ സോണുകൾ )",
    amount: "7 കോടി",
    icon: Stethoscope,
    image: "/assets/website-complete/Trauma Care.png",
  },
];
