"use client";

import React from "react";
import { motion } from "framer-motion";

export function ConstituencyMap() {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative w-full aspect-[16/10] md:aspect-[16/8] rounded-xl overflow-hidden border border-slate-200 shadow-lg"
      >
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=76.15%2C10.55%2C76.35%2C10.70&layer=mapnik&marker=10.6283%2C76.2503"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="വടക്കാഞ്ചേരി മണ്ഡലം മാപ്പ്"
          className="grayscale-[30%] hover:grayscale-0 transition-all duration-500"
        />

        {/* Overlay label */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
            <p className="text-xs font-bold text-slate-900">വടക്കാഞ്ചേരി നിയോജക മണ്ഡലം</p>
            <p className="text-[10px] text-slate-500">തൃശൂർ ജില്ല, കേരളം</p>
          </div>
        </div>
      </motion.div>

      {/* Constituency details */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "ജില്ല", value: "തൃശൂർ" },
          { label: "നിയമസഭാ മണ്ഡലം", value: "വടക്കാഞ്ചേരി" },
          { label: "ലോകസഭാ മണ്ഡലം", value: "ആലത്തൂർ" },
          { label: "പ്രധാന പട്ടണം", value: "വടക്കാഞ്ചേരി" },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-lg p-3 text-center"
          >
            <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider mb-1">
              {item.label}
            </p>
            <p className="text-sm md:text-base font-bold text-slate-900">
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
