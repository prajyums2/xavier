"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AchievementCard, achievements } from "@/components/AchievementCard";
import { Pagination } from "@/components/ui/Pagination";

export function AchievementsGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(achievements.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedAchievements = achievements.slice(startIndex, endIndex);

  return (
    <div>
      {/* Grid */}
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
      >
        {displayedAchievements.map((achievement, index) => (
          <AchievementCard
            key={startIndex + index}
            title={achievement.title}
            description={achievement.description}
            amount={achievement.amount}
            icon={achievement.icon}
            image={achievement.image}
            index={index}
          />
        ))}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex flex-col items-center gap-3">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          <p className="text-xs text-slate-400">
            {startIndex + 1}-{Math.min(endIndex, achievements.length)} /{" "}
            {achievements.length}
          </p>
        </div>
      )}
    </div>
  );
}
