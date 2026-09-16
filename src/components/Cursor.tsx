"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState<boolean | null>(null);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isTouch !== false) return;
    const el = cursorRef.current;
    if (!el) return;

    let mx = -200;
    let my = -200;
    let cx = -200;
    let cy = -200;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (event: MouseEvent) => {
      mx = event.clientX;
      my = event.clientY;
    };
    const onEnter = () => {
      targetScale = 2.6;
    };
    const onLeave = () => {
      targetScale = 1;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.querySelectorAll("a, button").forEach((node) => {
      node.addEventListener("mouseenter", onEnter);
      node.addEventListener("mouseleave", onLeave);
    });

    const observer = new MutationObserver(() => {
      document
        .querySelectorAll("a:not([data-cur]), button:not([data-cur])")
        .forEach((node) => {
          node.setAttribute("data-cur", "1");
          node.addEventListener("mouseenter", onEnter);
          node.addEventListener("mouseleave", onLeave);
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const frame = () => {
      raf = requestAnimationFrame(frame);
      cx += (mx - cx) * 0.11;
      cy += (my - cy) * 0.11;
      scale += (targetScale - scale) * 0.1;
      el.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%) scale(${scale})`;
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, [isTouch]);

  if (isTouch !== false) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[99999] size-[38px] rounded-full bg-white mix-blend-difference"
      style={{ willChange: "transform" }}
    />
  );
}
