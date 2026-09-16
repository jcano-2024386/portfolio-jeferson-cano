import Image from "next/image";

import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

const visualStyles = {
  amber: "[--glow:rgba(232,184,109,.58)] [--x:70%] [--y:42%]",
  signal: "[--glow:rgba(147,255,193,.42)] [--x:58%] [--y:48%]",
  blue: "[--glow:rgba(105,150,255,.45)] [--x:68%] [--y:38%]",
  steel: "[--glow:rgba(210,218,230,.32)] [--x:43%] [--y:55%]",
  ember: "[--glow:rgba(255,112,72,.38)] [--x:72%] [--y:60%]",
} as const;

interface ProjectVisualProps {
  name: string;
  index: string;
  visual: keyof typeof visualStyles;
  cover?: string;
  className?: string;
}

export function ProjectVisual({
  name,
  index,
  visual,
  cover,
  className,
}: ProjectVisualProps) {
  return (
    <div
      className={cn(
        "project-visual relative isolate min-h-[22rem] overflow-hidden",
        cover && "has-image",
        visualStyles[visual],
        className,
      )}
      aria-hidden="true"
    >
      {cover ? (
        <>
          <Image
            src={asset(cover)}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        </>
      ) : (
        <>
          <div className="absolute -right-[8%] top-1/2 h-[72%] w-[52%] -translate-y-1/2 rotate-12 border border-white/20 bg-white/[0.035] backdrop-blur-[2px]" />
          <div className="absolute right-[12%] top-[18%] size-40 rotate-45 border border-white/10 md:size-56" />
        </>
      )}
      <span className="display absolute bottom-3 left-4 text-[6rem] font-bold leading-none text-white/[0.08] md:text-[10rem]">
        {index}
      </span>
      <span className="section-label absolute right-5 top-5 text-white/70">
        {name}
      </span>
    </div>
  );
}
