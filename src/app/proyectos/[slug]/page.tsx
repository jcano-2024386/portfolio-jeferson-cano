import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { profile } from "@/data/profile";
import { getProject, projects } from "@/data/projects";
import { asset } from "@/lib/asset";

interface ProjectPageProps {
  params: { slug: string };
}

export function generateStaticParams(): { slug: string }[] {
  return projects.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: `${project.name} — Jeferson Cano`,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const position = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(position + 1) % projects.length];
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(`Proyecto · ${project.name}`)}`;

  // Galería secundaria según slug
  const gallery: string[] =
    project.slug === "ecobuild"
      ? [project.cover, "/work/ecobuild-info.webp", "/work/buildathon-win.webp"]
      : project.slug === "robokit"
        ? [project.cover, "/work/cursor-hackathon.webp"]
        : project.slug === "freepol"
          ? [project.cover, "/work/freepol-ui.webp"]
          : [project.cover];

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <div className="grain-overlay" />

      <header className="section-pad pb-12 pt-28 md:pb-20 md:pt-36">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-white/40 transition-colors hover:text-[#ff6b1a]"
        >
          <ArrowLeft className="size-3.5" /> Todos los proyectos
        </Link>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#ff6b1a]">
            Proyecto {project.index} · {project.year}
          </p>
          {project.result && (
            <span className="rounded-full bg-[#ff6b1a]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#ff6b1a]">
              {project.result}
            </span>
          )}
        </div>

        <h1
          className="mt-5 font-black uppercase leading-[0.8] tracking-tighter"
          style={{ fontSize: "clamp(3rem, 11vw, 9rem)" }}
        >
          {project.name}
        </h1>
        <p className="mt-4 text-[10px] uppercase tracking-[0.35em] text-white/35">
          {project.kind}
        </p>
        <p className="mt-8 max-w-3xl font-serif text-2xl italic leading-snug text-white/70 md:text-4xl">
          {project.statement}
        </p>
      </header>

      <div className="relative h-[55svh] w-full overflow-hidden border-y border-white/10 md:h-[78svh]">
        <Image
          src={asset(project.cover)}
          alt={project.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
      </div>

      {gallery.length > 1 && (
        <div className="section-pad grid gap-3 py-6 sm:grid-cols-3">
          {gallery.slice(1).map((src) => (
            <div
              key={src}
              className="relative aspect-video overflow-hidden rounded-xl border border-white/10"
            >
              <Image src={asset(src)} alt="" fill className="object-cover" sizes="33vw" />
            </div>
          ))}
        </div>
      )}

      <article className="section-pad py-20 md:py-32">
        <section className="grid gap-10 border-t border-white/10 pt-9 md:grid-cols-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 md:col-span-3">
            El proyecto
          </p>
          <div className="md:col-span-8">
            <p className="text-3xl font-medium leading-tight md:text-5xl">{project.summary}</p>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/55">{project.problem}</p>
          </div>
        </section>

        <section className="mt-24 grid gap-10 border-t border-white/10 pt-9 md:grid-cols-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 md:col-span-3">
            Mi papel
          </p>
          <div className="md:col-span-8">
            <p className="text-2xl leading-relaxed text-white/85">{project.role}</p>
            <ol className="mt-12">
              {project.contribution.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[2rem_1fr] gap-4 border-b border-white/10 py-5"
                >
                  <span className="font-mono text-xs text-[#ff6b1a]">0{index + 1}</span>
                  <span className="text-lg text-white/75">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mt-24 grid gap-10 border-t border-white/10 pt-9 md:grid-cols-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 md:col-span-3">
            Stack
          </p>
          <div className="flex flex-wrap gap-3 md:col-span-8">
            {project.stack.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-white/12 px-4 py-2 text-sm uppercase tracking-wider text-white/70"
              >
                {technology}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-24 flex flex-wrap items-center gap-6 border-t border-white/10 pt-9">
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center gap-3 rounded-full border border-white/30 px-6 text-[11px] font-mono uppercase tracking-[0.2em] transition-colors hover:bg-white hover:text-black"
          >
            Repositorio <ArrowUpRight className="size-4" />
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-[#ff6b1a]"
            >
              Ver demo ↗
            </a>
          )}
          {project.video && (
            <a
              href={project.video}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] uppercase tracking-[0.2em] text-[#ff6b1a]"
            >
              Ver video ↗
            </a>
          )}
          <a href={mailto} className="text-[11px] uppercase tracking-[0.2em] text-[#ff6b1a]">
            ¿Algo similar? Escríbeme ↗
          </a>
        </section>
      </article>

      <Link
        href={`/proyectos/${next.slug}`}
        className="group block border-t border-white/10 bg-[#0b0b0b] py-20 md:py-28"
      >
        <div className="section-pad flex items-end justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
              Siguiente · {next.index}
            </span>
            <p
              className="mt-4 font-black uppercase leading-[0.85] tracking-tighter transition-transform duration-700 group-hover:translate-x-3"
              style={{ fontSize: "clamp(2.6rem, 8vw, 8rem)" }}
            >
              {next.name}
            </p>
          </div>
          <ArrowRight className="mb-3 size-8 shrink-0 text-white/40 transition-colors group-hover:text-[#ff6b1a] md:size-12" />
        </div>
      </Link>
    </main>
  );
}
