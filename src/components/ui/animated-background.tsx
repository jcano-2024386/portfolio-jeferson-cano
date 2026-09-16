"use client";

import React, { useId, useState, Children, isValidElement, ReactNode, ReactElement } from "react";
import { motion, AnimatePresence, Transition } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

/**
 * AnimatedBackground — fondo animado que sigue al elemento activo/hovereado.
 * Perfecto para menús, tabs, o listas de blog.
 * Nota: Los hijos deben tener data-id para funcionar.
 */
export function AnimatedBackground({
  children,
  className,
  transition = { type: "spring", bounce: 0, duration: 0.2 },
  enableHover = false,
  defaultValue,
  onValueChange,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = useState<string | null>(defaultValue ?? null);
  const uniqueId = useId();

  const handleSetActiveId = (id: string | null) => {
    setActiveId(id);
    if (id && onValueChange) {
      onValueChange(id);
    }
  };

  return (
    <>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;

        const childElement = child as ReactElement<{
          "data-id"?: string;
          className?: string;
          children?: ReactNode;
        }>;

        const id = childElement.props["data-id"];
        if (!id) return child;

        const isActive = activeId === id;

        return (
          <div
            className={cn("relative", childElement.props.className)}
            onMouseEnter={enableHover ? () => handleSetActiveId(id) : undefined}
            onMouseLeave={enableHover ? () => handleSetActiveId(null) : undefined}
            onClick={!enableHover ? () => handleSetActiveId(id) : undefined}
          >
            <AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId={`background-${uniqueId}`}
                  className={cn("absolute inset-0 -z-10", className)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                />
              )}
            </AnimatePresence>
            {childElement.props.children}
          </div>
        );
      })}
    </>
  );
}
