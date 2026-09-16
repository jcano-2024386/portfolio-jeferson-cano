"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glareEnabled?: boolean;
  tiltAmount?: number;
  perspective?: number;
}

/**
 * TiltCard — tarjeta con efecto de inclinación 3D al hacer hover.
 * Inspirado en react-tilt pero con framer-motion para mejor performance.
 */
export function TiltCard({
  children,
  className,
  glareEnabled = true,
  tiltAmount = 15,
  perspective = 1000,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltAmount, -tiltAmount]), {
    stiffness: 300,
    damping: 30,
  });

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltAmount, tiltAmount]), {
    stiffness: 300,
    damping: 30,
  });

  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  // Calcular el fondo del glare fuera del JSX condicional
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.8), transparent 60%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="h-full w-full"
      >
        {children}

        {/* Glare effect */}
        {glareEnabled && (
          <motion.div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
            style={{
              opacity: isHovered ? 0.15 : 0,
              background: glareBackground,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
