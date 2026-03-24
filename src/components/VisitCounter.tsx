"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Get current count from localStorage
    let currentCount = parseInt(localStorage.getItem("xavier_visit_count") || "0", 10);

    // Check if this session already counted
    const sessionCounted = sessionStorage.getItem("xavier_session_counted");

    if (!sessionCounted) {
      currentCount += 1;
      localStorage.setItem("xavier_visit_count", currentCount.toString());
      sessionStorage.setItem("xavier_session_counted", "true");
    }

    setCount(currentCount);
  }, []);

  if (count === null) return null;

  return (
    <div className="flex items-center gap-2 text-white/40 text-xs">
      <Eye className="w-3.5 h-3.5" />
      <span>
        {count.toLocaleString()} സന്ദർശനങ്ങൾ
      </span>
    </div>
  );
}
