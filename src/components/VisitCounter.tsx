"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const NAMESPACE = "xavier-mla-website";
const KEY = "visit-count";

export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const incrementAndFetch = async () => {
      try {
        // Increment and get the count
        const res = await fetch(
          `https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`
        );
        const data = await res.json();
        setCount(data.value);
      } catch (error) {
        // Fallback: try to just get the count without incrementing
        try {
          const res = await fetch(
            `https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`
          );
          const data = await res.json();
          setCount(data.value || 0);
        } catch {
          setCount(0);
        }
      }
    };

    // Check if already counted in this session
    const sessionCounted = sessionStorage.getItem("xavier_session_counted");

    if (!sessionCounted) {
      incrementAndFetch();
      sessionStorage.setItem("xavier_session_counted", "true");
    } else {
      // Just fetch without incrementing
      fetch(`https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`)
        .then((res) => res.json())
        .then((data) => setCount(data.value || 0))
        .catch(() => setCount(0));
    }
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
