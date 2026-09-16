"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

/** Cortina corta de entrada — contador + marca, luego sube. */
export function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const counter = counterRef.current;
    const bar = barRef.current;
    if (!root || !counter || !bar) return;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      document.documentElement.style.overflow = "";
      setDone(true);
      onComplete();
    };

    document.documentElement.style.overflow = "hidden";
    const state = { value: 0 };

    const timeline = gsap.timeline({ onComplete: finish });

    timeline
      .to(state, {
        value: 100,
        duration: 1.55,
        ease: "power2.inOut",
        onUpdate: () => {
          counter.textContent = String(Math.round(state.value)).padStart(3, "0");
          bar.style.transform = `scaleX(${state.value / 100})`;
        },
      })
      .to(
        ".loader-word",
        { yPercent: -110, duration: 0.55, ease: "power3.in", stagger: 0.04 },
        "-=0.15",
      )
      .to(root, { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, "-=0.15");

    // Failsafe: nunca dejar la cortina colgada
    const failsafe = window.setTimeout(finish, 4200);

    return () => {
      window.clearTimeout(failsafe);
      timeline.kill();
      document.documentElement.style.overflow = "";
    };
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-[#050505] px-6 py-7 text-white md:px-16 md:py-10"
      aria-live="polite"
      aria-label="Cargando portafolio"
    >
      <div className="flex items-start justify-between text-[10px] uppercase tracking-[0.35em] text-white/40">
        <span>Jeferson Cano</span>
        <span>Portfolio 2026</span>
      </div>

      <div className="overflow-hidden">
        <p className="flex flex-wrap gap-x-[0.2em] text-[clamp(2.8rem,10vw,8rem)] font-black uppercase leading-[0.85] tracking-tighter">
          <span className="loader-word inline-block">Jeferson</span>
          <span className="loader-word inline-block text-[#ff6b1a]">Cano</span>
        </p>
      </div>

      <div>
        <div className="flex items-end justify-between">
          <span
            ref={counterRef}
            className="font-mono text-sm tabular-nums text-white/60"
          >
            000
          </span>
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/35">
            Loading
          </span>
        </div>
        <div className="mt-3 h-px w-full bg-white/10">
          <div
            ref={barRef}
            className="h-full origin-left scale-x-0 bg-[#ff6b1a]"
          />
        </div>
      </div>
    </div>
  );
}
