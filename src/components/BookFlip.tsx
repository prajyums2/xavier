"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  ExternalLink,
  Download,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs";

const pdfUrl = "/assets/ഇതാണ് മാറ്റം.pdf";

// Single page canvas
const BookPage = React.forwardRef<
  HTMLDivElement,
  { pageNum: number; pdf: any; w: number; h: number }
>(({ pageNum, pdf, w, h }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!pdf || !canvasRef.current || done) return;
    let cancelled = false;

    const render = async () => {
      try {
        const page = await pdf.getPage(pageNum);
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const vp = page.getViewport({ scale: 1 });
        const scale = Math.min(w / vp.width, h / vp.height);
        const svp = page.getViewport({ scale });

        canvas.width = svp.width;
        canvas.height = svp.height;

        await page.render({ canvasContext: ctx, viewport: svp }).promise;
        if (!cancelled) setDone(true);
      } catch (e) {
        console.error("Page render error:", e);
      }
    };

    render();
    return () => {
      cancelled = true;
    };
  }, [pdf, pageNum, w, h, done]);

  return (
    <div
      ref={ref}
      className="bg-white relative"
      style={{
        width: w,
        height: h,
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      {!done && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <Loader2 className="w-5 h-5 text-red-400 animate-spin" />
        </div>
      )}
      <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-slate-400 font-mono">
        {pageNum}
      </div>
    </div>
  );
});

BookPage.displayName = "BookPage";

export function BookFlip() {
  const [pdf, setPdf] = useState<any>(null);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [cur, setCur] = useState(0);
  const [spread, setSpread] = useState(true);
  const bookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Book dimensions - large, fills screen
  const [dims, setDims] = useState({ w: 480, h: 680 });

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (vw < 480) setDims({ w: Math.floor(vw * 0.85), h: Math.floor(vh * 0.55) });
      else if (vw < 640) setDims({ w: 300, h: 430 });
      else if (vw < 768) setDims({ w: 340, h: 485 });
      else if (vw < 1024) setDims({ w: 400, h: 570 });
      else if (vw < 1280) setDims({ w: 460, h: 655 });
      else setDims({ w: 520, h: 740 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const doc = await pdfjsLib.getDocument(pdfUrl).promise;
        setPdf(doc);
        setPages(doc.numPages);
        setLoading(false);
      } catch (e) {
        console.error("PDF load error:", e);
        setErr(true);
        setLoading(false);
      }
    };
    load();
  }, []);

  const onFlip = useCallback((e: any) => setCur(e.data), []);

  const flipPrev = () => bookRef.current?.pageFlip().flipPrev();
  const flipNext = () => bookRef.current?.pageFlip().flipNext();

  // Calculate current spread display
  const getSpreadLabel = () => {
    if (!spread) return `${cur + 1} / ${pages}`;
    const left = cur;
    const right = Math.min(cur + 1, pages - 1);
    if (left === right) return `${left + 1} / ${pages}`;
    return `${left + 1}-${right + 1} / ${pages}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="w-12 h-12 text-red-500 animate-spin mb-4" />
        <p className="text-slate-500">PDF ലോഡ് ചെയ്യുന്നു...</p>
      </div>
    );
  }

  if (err) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <FileText className="w-16 h-16 text-slate-300 mb-4" />
        <p className="text-slate-500 mb-4">PDF ലോഡ് ചെയ്യാൻ കഴിഞ്ഞില്ല</p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          PDF നേരിട്ട് തുറക്കുക
        </a>
      </div>
    );
  }

  return (
    <div className="w-full" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col items-center"
      >
        {/* Toggle button only */}
        <div className="flex justify-center mb-5">
          <button
            onClick={() => setSpread(!spread)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors",
              spread
                ? "bg-red-50 border-red-200 text-red-700"
                : "border-slate-200 text-slate-600 hover:bg-slate-50"
            )}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            {spread ? "തുറന്ന പുസ്തകം" : "ഒറ്റ പേജ്"}
          </button>
        </div>

        {/* Book area */}
        <div className="relative flex items-center justify-center w-full">
          {/* Prev button */}
          <button
            onClick={flipPrev}
            disabled={cur === 0}
            className={cn(
              "absolute left-0 md:left-4 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all border",
              cur === 0
                ? "border-slate-200 text-slate-300 cursor-not-allowed bg-white"
                : "border-slate-300 text-slate-600 bg-white hover:bg-slate-50 shadow-lg"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Book shadow + container */}
          <div
            className="relative rounded-xl overflow-hidden"
            style={{
              boxShadow:
                "0 25px 80px rgba(0,0,0,0.3), 0 10px 30px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)",
            }}
          >
            {/* Book spine shadow */}
            {spread && (
              <div className="absolute top-0 bottom-0 left-1/2 w-6 -translate-x-1/2 bg-gradient-to-r from-black/15 via-black/5 to-black/15 z-20 pointer-events-none" />
            )}

            <HTMLFlipBook
              ref={bookRef}
              width={dims.w}
              height={dims.h}
              size="stretch"
              minWidth={spread ? 350 : 200}
              maxWidth={spread ? 600 : 600}
              minHeight={spread ? 500 : 280}
              maxHeight={850}
              startPage={0}
              drawShadow={true}
              flippingTime={800}
              usePortrait={!spread}
              startZIndex={0}
              autoSize={true}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={30}
              showPageCorners={true}
              disableFlipByClick={false}
              onFlip={onFlip}
              className="book-flip"
              style={{ margin: "0 auto" }}
            >
              {Array.from({ length: pages }, (_, i) => (
                <BookPage
                  key={i + 1}
                  pageNum={i + 1}
                  pdf={pdf}
                  w={dims.w}
                  h={dims.h}
                />
              ))}
            </HTMLFlipBook>
          </div>

          {/* Next button */}
          <button
            onClick={flipNext}
            disabled={cur >= pages - (spread ? 2 : 1)}
            className={cn(
              "absolute right-0 md:right-4 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all border",
              cur >= pages - (spread ? 2 : 1)
                ? "border-slate-200 text-slate-300 cursor-not-allowed bg-white"
                : "border-slate-300 text-slate-600 bg-white hover:bg-slate-50 shadow-lg"
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Page indicator */}
        <div className="mt-5 text-center">
          <p className="text-sm text-slate-500">
            പേജ്{" "}
            <span className="font-semibold text-slate-700">
              {getSpreadLabel()}
            </span>
          </p>
        </div>

        {/* Dots */}
        {pages > 0 && pages <= 20 && (
          <div className="flex justify-center gap-1 mt-3">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                onClick={() => bookRef.current?.pageFlip().flip(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  cur === i
                    ? "bg-red-600 w-5"
                    : "bg-slate-300 w-1.5 hover:bg-slate-400"
                )}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex items-center gap-3">
          <a
            href={pdfUrl}
            download
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-md"
          >
            <Download className="w-4 h-4" />
            ഡൗൺലോഡ്
          </a>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            പുതിയ ടാബ്
          </a>
        </div>
      </motion.div>
    </div>
  );
}
