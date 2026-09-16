"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

interface WordSegment {
  word: string;
  punctuation: string;
  isItalic: boolean;
}

function buildKeyframes(
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>,
) {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((step) => Object.keys(step)),
  ]);
  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach((key) => {
    keyframes[key] = [from[key], ...steps.map((step) => step[key])];
  });
  return keyframes;
}

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "chars";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  stepDuration?: number;
  animateOnMount?: boolean;
}

export function BlurText({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  stepDuration = 0.35,
  animateOnMount = false,
}: BlurTextProps) {
  const elements = useMemo(() => {
    if (animateBy !== "words") {
      return text.split("").map((char) => ({
        word: char,
        punctuation: "",
        isItalic: false,
      }));
    }

    let inItalic = false;
    return text.split(" ").map((word) => {
      let currentItalic = inItalic;
      let cleanWord = word;
      let punctuation = "";

      if (cleanWord.startsWith("*")) {
        cleanWord = cleanWord.slice(1);
        inItalic = true;
        currentItalic = true;
      }

      const trailingMatch = cleanWord.match(
        /^(.*?)\*([.,/#!$%^&*;:{}=\-_`~()]*)$/,
      );
      if (trailingMatch) {
        cleanWord = trailingMatch[1];
        punctuation = trailingMatch[2];
        inItalic = false;
      }

      return {
        word: cleanWord,
        punctuation,
        isItalic: currentItalic,
      } satisfies WordSegment;
    });
  }, [text, animateBy]);

  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (animateOnMount) {
      setInView(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, animateOnMount]);

  const fromSnapshot = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction],
  );

  const toSnapshots = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction],
  );

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, index) =>
    stepCount === 1 ? 0 : index / (stepCount - 1),
  );

  return (
    <p ref={ref} className={className}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        return (
          <motion.span
            key={`${segment.word}-${index}`}
            style={{ display: "inline-block" }}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={{
              duration: totalDuration,
              times,
              delay: (index * delay) / 1000,
            }}
          >
            {segment.isItalic ? (
              <span className="font-serif italic text-white/90">
                {segment.word}
              </span>
            ) : (
              segment.word
            )}
            {segment.punctuation}&nbsp;
          </motion.span>
        );
      })}
    </p>
  );
}
