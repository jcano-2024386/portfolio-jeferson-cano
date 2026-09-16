"use client";

import Image from "next/image";

import { asset } from "@/lib/asset";

interface ProjectStageProps {
  index: string;
  label: string;
  cover: string;
}

/** Portada fotográfica del caso de estudio (relacionada al proyecto). */
export function ProjectStage({ index, label, cover }: ProjectStageProps) {
  return (
    <div className="relative h-[55svh] w-full overflow-hidden border-y border-white/10 bg-[#070707] md:h-[80svh]">
      <Image
        src={asset(cover)}
        alt={label}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-5 md:px-10">
        <span className="section-label">Proyecto {index}</span>
        <span className="section-label">{label}</span>
      </div>
    </div>
  );
}
