"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      
      if (currentPage > 3) pages.push("...");
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) pages.push(i);
      
      if (currentPage < totalPages - 2) pages.push("...");
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all text-sm font-medium border",
          currentPage === 1
            ? "border-slate-200 text-slate-300 cursor-not-allowed"
            : "border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-slate-400"
              >
                <MoreHorizontal className="w-4 h-4" />
              </span>
            );
          }

          const pageNum = page as number;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={cn(
                "w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all text-sm font-medium border",
                currentPage === pageNum
                  ? "bg-red-600 border-red-600 text-white shadow-sm"
                  : "border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300"
              )}
              aria-label={`Page ${pageNum}`}
              aria-current={currentPage === pageNum ? "page" : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all text-sm font-medium border",
          currentPage === totalPages
            ? "border-slate-200 text-slate-300 cursor-not-allowed"
            : "border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400"
        )}
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
