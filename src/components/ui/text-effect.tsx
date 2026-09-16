"use client";

import { AnimatePresence, motion, Variants } from "motion/react";
import React from "react";

export type PresetType = "blur" | "fade-in-blur" | "scale" | "fade" | "slide";
export type PerType = "word" | "char" | "line";

export interface TextEffectProps {
  children: string;
  per?: PerType;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  preset?: PresetType;
  delay?: number;
  speedReveal?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
}

const defaultStaggerTimes: Record<PerType, number> = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
};

const presetVariants: Record<PresetType, { container: Variants; item: Variants }> = {
  blur: {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    },
    item: {
      hidden: { opacity: 0, filter: "blur(12px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
  },
  "fade-in-blur": {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    },
    item: {
      hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    },
  },
  scale: {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    },
    item: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
    },
  },
  fade: {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    },
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  },
  slide: {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
  },
};

const AnimationComponent: React.FC<{
  segment: string;
  variants: Variants;
  per: PerType;
}> = React.memo(({ segment, variants, per }) => {
  if (per === "line") {
    return (
      <motion.span variants={variants} className="block">
        {segment}
      </motion.span>
    );
  }

  if (per === "word") {
    return (
      <motion.span aria-hidden="true" variants={variants} className="inline-block whitespace-pre">
        {segment}
      </motion.span>
    );
  }

  return (
    <motion.span className="inline-block whitespace-pre">
      {segment.split("").map((char, charIndex) => (
        <motion.span
          key={`char-${charIndex}`}
          aria-hidden="true"
          variants={variants}
          className="inline-block whitespace-pre"
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
});

AnimationComponent.displayName = "AnimationComponent";

const splitText = (text: string, per: PerType) => {
  if (per === "line") return text.split("\n");
  return text.split(/(\s+)/);
};

/**
 * TextEffect — animación de texto con efectos blur, fade, scale, slide.
 */
export function TextEffect({
  children,
  per = "word",
  as = "p",
  className,
  preset = "fade",
  delay = 0,
  speedReveal = 1,
  trigger = true,
  onAnimationComplete,
}: TextEffectProps) {
  const segments = splitText(children, per);
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const baseVariants = presetVariants[preset];
  const stagger = defaultStaggerTimes[per] / speedReveal;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <AnimatePresence mode="popLayout">
      {trigger && (
        <MotionTag
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          className={className}
          onAnimationComplete={onAnimationComplete}
        >
          {per !== "line" && <span className="sr-only">{children}</span>}
          {segments.map((segment, index) => (
            <AnimationComponent
              key={`${per}-${index}-${segment}`}
              segment={segment}
              variants={baseVariants.item}
              per={per}
            />
          ))}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}
