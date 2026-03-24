"use client";

import React, { useState, useMemo, useCallback } from "react";
import Fuse from "fuse.js";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { AchievementCard, achievements } from "@/components/AchievementCard";
import { Pagination } from "@/components/ui/Pagination";

// Manglish to Malayalam transliteration mapping
const manglishMap: Record<string, string> = {
  // Common words
  "school": "സ്കൂൾ",
  "scool": "സ്കൂൾ",
  "skool": "സ്കൂൾ",
  "road": "റോഡ്",
  "rod": "റോഡ്",
  "bridge": "പാലം",
  "palam": "പാലം",
  "paalam": "പാലം",
  "hospital": "ആശുപത്രി",
  "ashupathri": "ആശുപത്രി",
  "medical": "മെഡിക്കൽ",
  "medikal": "മെഡിക്കൽ",
  "college": "കോളേജ്",
  "kollej": "കോളേജ്",
  "anganwadi": "അങ്കണവാടി",
  "anganvadi": "അങ്കണവാടി",
  "bus": "ബസ്",
  "bas": "ബസ്",
  "light": "ലൈറ്റ്",
  "lait": "ലൈറ്റ്",
  "stadium": "സ്റ്റേഡിയം",
  "stediom": "സ്റ്റേഡിയം",
  "library": "ലൈബ്രറി",
  "laibrari": "ലൈബ്രറി",
  "krishi": "കൃഷി",
  "kayaking": "കയാക്കിങ്",
  "dam": "ഡാം",
  "pattayam": "പട്ടയം",
  "vazhani": "വാഴാനി",
  "vazani": "വാഴാനി",
  "mundur": "മുണ്ടൂർ",
  "mundoor": "മുണ്ടൂർ",
  "wadakkancherry": "വടക്കാഞ്ചേരി",
  "wadakancheri": "വടക്കാഞ്ചേരി",
  "vadakkanchery": "വടക്കാഞ്ചേരി",
  "adat": "അടാട്ട്",
  "adatt": "അടാട്ട്",
  "ottupara": "ഓട്ടുപാറ",
  "oothupara": "ഓട്ടുപാറ",
  "paruthipara": "പരുത്തിപ്ര",
  "fountain": "ഫൗണ്ടൻ",
  "phauntan": "ഫൗണ്ടൻ",
  "kuttavanji": "കുട്ടവഞ്ചി",
  "kayak": "കയാക്കിങ്",
  "pooram": "പുറ്റേക്കര",
  "puttekara": "പുറ്റേക്കര",
  "tourism": "ടൂറിസം",
  "toorism": "ടൂറിസം",
  "peechee": "പീച്ചി",
  "peechi": "പീച്ചി",
  "mri": "എംആർഐ",
  "scan": "സ്കാൻ",
  "trauma": "ട്രോമ",
  "tronma": "ട്രോമ",
  "care": "കെയർ",
  "ker": "കെയർ",
  "kiifb": "കിഫ്‌ബി",
  "kifb": "കിഫ്‌ബി",
  "ashwas": "ആശ്വാസ്",
  "ashvas": "ആശ്വാസ്",
  "rental": "വാടക",
  "vataka": "വാടക",
  "house": "വീട്",
  "veedu": "വീട്",
  "himaast": "ഹൈമാസ്റ്റ്",
  "himast": "ഹൈമാസ്റ്റ്",
  "book": "പുസ്തകം",
  "pusthakam": "പുസ്തകം",
  "pustakam": "പുസ്തകം",
  "thrissur": "തൃശ്ശൂർ",
  "trichur": "തൃശ്ശൂർ",
  "trissur": "തൃശ്ശൂർ",
  "kuttipuram": "കുറ്റിപ്പുറം",
  "kuttipparam": "കുറ്റിപ്പുറം",
  "varnakoodaram": "വർണ്ണകൂടാരം",
  "kutira": "കൃഷിഭവൻ",
  "krishibhavan": "കൃഷിഭവൻ",
  "choorakkadukara": "ചൂരക്കാട്ടുകര",
  "choorakkaatukara": "ചൂരക്കാട്ടുകര",
  "puthuruthy": "പുതുരുത്തി",
  "pothuruthi": "പുതുരുത്തി",
  "vcb": "വി.സി.ബി.",
  "pathiyar": "പതിയാർ",
  "kulangara": "കുളങ്ങര",
  "subtreasury": "സബ് ട്രഷറി",
  "satraashari": "സബ് ട്രഷറി",
  "munnott": "മുന്നോട്ട്",
  "sneha": "സ്നേഹ",
  "looram": "ലൂറം",
};

// Transliterate Manglish to Malayalam
function transliterate(text: string): string {
  const lower = text.toLowerCase().trim();

  // Check direct matches first
  for (const [manglish, malayalam] of Object.entries(manglishMap)) {
    if (lower.includes(manglish.toLowerCase())) {
      return malayalam;
    }
  }

  // Character-level transliteration
  const charMap: Record<string, string> = {
    a: "അ", aa: "ആ", i: "ഇ", ee: "ഈ", u: "ഉ", oo: "ഊ",
    e: "എ", ai: "ഐ", o: "ഒ", ou: "ഔ", am: "ം", ah: "ഃ",
    k: "ക്", ka: "ക", kaa: "കാ", ki: "കി", kee: "കീ",
    ku: "കു", koo: "കൂ", ke: "കെ", kai: "കൈ", ko: "കൊ", kou: "കൗ",
    ng: "ങ്", nga: "ങ", ngaa: "ങാ", ngi: "ങി", ngee: "ങീ",
    ch: "ച്", cha: "ച", chaa: "ചാ", chi: "ചി", chee: "ചീ",
    nj: "ഞ്", nja: "ഞ", njaa: "ഞാ",
    t: "ട്", ta: "ട", taa: "ടാ", ti: "ടി", tee: "ടീ",
    d: "ഡ്", da: "ഡ", daa: "ഡാ", di: "ഡി", dee: "ഡീ",
    n: "ന്", na: "ന", naa: "നാ", ni: "നി", nee: "നീ",
    th: "ത്", tha: "ത", thaa: "താ", thi: "തി", thee: "തീ",
    dh: "ധ്", dha: "ധ", dhaa: "ധാ",
    p: "പ്", pa: "പ", paa: "പാ", pi: "പി", pee: "പീ",
    ph: "ഫ്", pha: "ഫ", phaa: "ഫാ",
    b: "ബ്", ba: "ബ", baa: "ബാ",
    m: "മ്", ma: "മ", maa: "മാ", mi: "മി", mee: "മീ",
    y: "യ്", ya: "യ", yaa: "യാ",
    r: "ര്", ra: "ര", raa: "രാ",
    l: "ല്", la: "ല", laa: "ലാ", li: "ലി", lee: "ലീ",
    v: "വ്", va: "വ", vaa: "വാ", vi: "വി", vee: "വീ",
    sh: "ശ്", sha: "ശ", shaa: "ശാ",
    s: "സ്", sa: "സ", saa: "സാ", si: "സി", see: "സീ",
    h: "ഹ്", ha: "ഹ", haa: "ഹാ",
    j: "ജ്", ja: "ജ", jaa: "ജാ",
    zh: "ഴ്", zha: "ഴ", zhaa: "ഴാ",
    rr: "റ്", rra: "റ", rraa: "റാ",
    nn: "ണ്", nna: "ണ", nnaa: "ണാ",
    ll: "ള്", lla: "ള", llaa: "ളാ",
  };

  let result = lower;
  // Sort by length descending to match longer patterns first
  const sortedKeys = Object.keys(charMap).sort((a, b) => b.length - a.length);

  for (const key of sortedKeys) {
    result = result.split(key).join(charMap[key]);
  }

  return result;
}

interface Achievement {
  title: string;
  description?: string;
  amount?: string;
  icon: any;
  image?: string;
}

// Create searchable data
interface SearchableItem {
  title: string;
  titleManglish: string;
  description: string;
  descriptionManglish: string;
  amount: string;
  original: Achievement;
}

function createSearchableData(items: Achievement[]): SearchableItem[] {
  return items.map((item) => ({
    title: item.title,
    titleManglish: transliterate(item.title),
    description: item.description || "",
    descriptionManglish: transliterate(item.description || ""),
    amount: item.amount || "",
    original: item,
  }));
}

export function AchievementsSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const searchableData = useMemo(() => createSearchableData(achievements), []);

  const fuse = useMemo(
    () =>
      new Fuse(searchableData, {
        keys: [
          { name: "title", weight: 2 },
          { name: "titleManglish", weight: 2 },
          { name: "description", weight: 1 },
          { name: "descriptionManglish", weight: 1 },
          { name: "amount", weight: 0.5 },
        ],
        threshold: 0.4,
        distance: 100,
        includeScore: true,
      }),
    [searchableData]
  );

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return achievements;
    }

    // Also search with transliterated query
    const transliteratedQuery = transliterate(searchQuery);
    const results1 = fuse.search(searchQuery);
    const results2 = fuse.search(transliteratedQuery);

    // Combine and deduplicate results
    const seen = new Set<string>();
    const combined: Achievement[] = [];

    [...results1, ...results2].forEach((result) => {
      const key = result.item.title;
      if (!seen.has(key)) {
        seen.add(key);
        combined.push(result.item.original);
      }
    });

    return combined;
  }, [searchQuery, fuse]);

  // Reset page when search changes
  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedAchievements = filteredResults.slice(startIndex, endIndex);

  return (
    <div>
      {/* Search Input */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="തിരയുക... (Malayalam / Manglish)"
            className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3 text-slate-500" />
            </button>
          )}
        </div>

        {/* Search hints */}
        <div className="mt-2 text-center">
          <p className="text-xs text-slate-400">
            {searchQuery
              ? `${filteredResults.length} ഫലങ്ങൾ കണ്ടെത്തി`
              : "ഉദാ: 'road', 'palam', 'school', 'medical' എന്ന് ടൈപ്പ് ചെയ്യുക"}
          </p>
        </div>
      </div>

      {/* Results Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${searchQuery}-${currentPage}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {displayedAchievements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {displayedAchievements.map((achievement, index) => (
                <AchievementCard
                  key={`${achievement.title}-${startIndex + index}`}
                  title={achievement.title}
                  description={achievement.description}
                  amount={achievement.amount}
                  icon={achievement.icon}
                  image={achievement.image}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 text-sm">
                &ldquo;{searchQuery}&rdquo; എന്നതിന് ഫലങ്ങൾ ലഭ്യമല്ല
              </p>
              <p className="text-slate-400 text-xs mt-1">
                മറ്റൊരു വാക്ക് ഉപയോഗിച്ച് ശ്രമിക്കുക
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex flex-col items-center gap-3">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          <p className="text-xs text-slate-400">
            {startIndex + 1}-{Math.min(endIndex, filteredResults.length)} /{" "}
            {filteredResults.length} നേട്ടങ്ങൾ
          </p>
        </div>
      )}
    </div>
  );
}
