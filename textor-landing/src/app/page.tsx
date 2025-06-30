"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

const TAGLINES = [
  "starting with a better way to learn",
  "breaking down complex ideas clearly",
  "explaining every step, not just the answer",
  "turning confusion into confidence",
  "solving the hard questions together",
  "teaching how to write a stronger argument",
  "helping students think, not just finish",
  "walking through tricky math, line by line",
  "making studying feel less overwhelming",
  "being the quiet tutor in every text",
];

function useTypewriter(text: string, speed = 40, pause = 1200, deleteSpeed = 20, key?: string | number) {
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCharIdx(0);
    setDisplay("");
    setDeleting(false);
  }, [text, key]);

  useEffect(() => {
    if (!deleting && charIdx < text.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplay(text.slice(0, charIdx + 1));
        setCharIdx((i) => i + 1);
      }, speed);
    } else if (!deleting && charIdx === text.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplay(text.slice(0, charIdx - 1));
        setCharIdx((i) => i - 1);
      }, deleteSpeed);
    } else if (deleting && charIdx === 0) {
      timeoutRef.current = setTimeout(() => setDeleting(false), 200);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, charIdx, deleting, speed, pause, deleteSpeed, key]);

  const showUnderscore = (!deleting && charIdx < text.length) || (deleting && charIdx > 0);
  return display + (showUnderscore ? "_" : "");
}

function CyclingSMSBox() {
  const [index, setIndex] = useState(0);
  const [waitingForNext, setWaitingForNext] = useState(false);
  const typewriter = useTypewriter(TAGLINES[index], 40, 1200, 20, index);

  useEffect(() => {
    if (typewriter === "" && !waitingForNext) {
      setWaitingForNext(true);
      const timeout = setTimeout(() => {
        setIndex((i) => (i + 1) % TAGLINES.length);
        setWaitingForNext(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [typewriter, waitingForNext]);

  const displayText = typewriter === "" ? "\u00A0" : typewriter;

  return (
    <div className="flex justify-center w-full mb-6">
      <div
        className="rounded-2xl bg-[#007AFF] border-4 border-[#007AFF] shadow-md px-8 py-4 text-[22px] text-white font-bold sms-bubble transition-all duration-500 min-h-[3.5rem] max-w-2xl text-center"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
      >
        {displayText}
      </div>
    </div>
  );
}

export default function Home() {
  const [index, setIndex] = useState(0);
  const typewriter = useTypewriter(TAGLINES[index]);
  const mainRef = useRef<HTMLDivElement>(null);
  const [showTitle, setShowTitle] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (typewriter.endsWith("_") && !typewriter.slice(0, -1).endsWith("_")) {
      const timeout = setTimeout(() => {
        setIndex((i) => (i + 1) % TAGLINES.length);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [typewriter]);

  useEffect(() => {
    setTimeout(() => setShowTitle(true), 100);
    setTimeout(() => setShowBubble(true), 600);
    setTimeout(() => setShowTagline(true), 1100);
    setTimeout(() => setShowButton(true), 1600);
  }, []);

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-row items-center justify-center">
        <main ref={mainRef} className="relative z-40 flex flex-col items-center justify-center">
          <h1 className={`text-8xl font-black tracking-tight mb-8 select-none text-black transition-all duration-700 ${showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>Textor</h1>
          <div className={`w-full transition-all duration-700 ${showBubble ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
            <CyclingSMSBox />
          </div>
          <p className={`text-xl text-black font-semibold mb-20 mt-8 transition-all duration-700 ${showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>The First Personalized AI Tutor</p>
          <Link href="/form">
            <button className={`px-8 py-4 rounded-full bg-black text-white text-xl font-semibold hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 shadow-lg transition-all duration-700 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
              Try now →
            </button>
          </Link>
        </main>
      </div>
    </div>
  );
}
