"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Play, Plus } from "lucide-react";

import { BlurText } from "@/components/BlurText";
import { Cursor } from "@/components/Cursor";
import { Preloader } from "@/components/preloader";
import { Magnetic } from "@/components/ui/magnetic";
import { Spotlight } from "@/components/ui/spotlight";
import { TiltCard } from "@/components/ui/tilt-card";
import {
  achievements,
  interests,
  milestones,
  profile,
  stats,
} from "@/data/profile";
import { projects } from "@/data/projects";
import { stack } from "@/data/site";
import { asset } from "@/lib/asset";

gsap.registerPlugin(ScrollTrigger);

const mailto = `mailto:${profile.email}?subject=${encodeURIComponent("Hablemos de tu proyecto")}`;

let lenisInstance: Lenis | null = null;

function scrollToHash(hash: string) {
  const el =
    hash === "#" || hash === "#top"
      ? null
      : document.querySelector<HTMLElement>(hash);
  if (lenisInstance) {
    lenisInstance.scrollTo(el ?? 0, { offset: -8, duration: 1.35 });
    return;
  }
  if (el) el.scrollIntoView({ behavior: "smooth" });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

const NAV_LINKS = [
  { label: "Work", href: "#work", id: "work" },
  { label: "Wins", href: "#wins", id: "wins" },
  { label: "About", href: "#about", id: "about" },
  { label: "Path", href: "#path", id: "path" },
  { label: "Contact", href: "#contact", id: "contact" },
] as const;

/* -------------------------------------------------------------------------- */

function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        bar.style.transform = `scaleX(${self.progress})`;
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px] bg-white/5">
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-[#ff6b1a]" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Navbar({ started }: { started: boolean }) {
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("work");

  useEffect(() => {
    if (!started) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.15 },
      );
    });
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ctx.revert();
      window.removeEventListener("scroll", onScroll);
    };
  }, [started]);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -45% 0px", threshold: 0 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [started]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToHash(href), 60);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-6 py-6 transition-all duration-500 md:px-20 md:py-7 ${
          scrolled ? "bg-[#080808]/75 backdrop-blur-xl border-b border-white/5" : ""
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
        <button
          type="button"
          onClick={() => go("#top")}
          className="relative text-sm font-black tracking-tighter text-white"
        >
          JC<span className="text-[#ff6b1a]">.</span>
        </button>

        <ul className="relative hidden items-center gap-1 text-[11px] font-medium uppercase tracking-[0.28em] md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => go(link.href)}
                className={`flex items-center gap-2 px-3 py-2 text-white/45 transition-colors duration-300 hover:text-white ${
                  active === link.id ? "nav-link-active" : ""
                }`}
              >
                <span className="nav-dot" />
                {link.label}
              </button>
            </li>
          ))}
          <li className="ml-2">
            <Magnetic intensity={0.25} springOptions={{ bounce: 0 }}>
              <a
                href={mailto}
                className="btn-shine flex items-center rounded-full bg-[#ff6b1a] px-5 py-2 font-bold text-black transition-colors duration-300 hover:bg-white"
              >
                Hablemos
              </a>
            </Magnetic>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-[60] flex size-10 flex-col items-center justify-center gap-[6px] md:hidden"
          aria-label={open ? "Cerrar" : "Menú"}
        >
          <span className={`block h-[1.5px] w-6 bg-white transition-all ${open ? "translate-y-[7.5px] rotate-45" : ""}`} />
          <span className={`block h-[1.5px] w-6 bg-white transition-all ${open ? "scale-x-0 opacity-0" : ""}`} />
          <span className={`block h-[1.5px] w-6 bg-white transition-all ${open ? "-translate-y-[7.5px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[55] flex flex-col justify-center bg-black/95 px-10 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => go(link.href)}
                  className="text-4xl font-black tracking-tighter text-white/70 hover:text-white"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href={mailto}
                className="mt-4 block rounded-2xl bg-[#ff6b1a] py-4 text-center text-xl font-bold text-black"
              >
                Hablemos
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */

function Hero({ started }: { started: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const name = "Jeferson.";

  useEffect(() => {
    if (!started) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.05 });
      tl.from(".hero-label", { y: 24, opacity: 0, duration: 0.75, ease: "power3.out" })
        .from(".hero-line", { y: 90, opacity: 0, duration: 1.05, ease: "power4.out" }, "-=0.45")
        .from(
          ".hero-letter",
          {
            y: 110,
            opacity: 0,
            rotateX: -42,
            stagger: 0.04,
            duration: 1.1,
            ease: "power4.out",
          },
          "-=0.8",
        )
        .from(".hero-sub", { y: 28, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .from(
          ".hero-cta",
          { y: 16, opacity: 0, stagger: 0.08, duration: 0.55, ease: "power3.out" },
          "-=0.3",
        );

      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "bottom 65%",
          end: "bottom 5%",
          scrub: 1.2,
        },
        opacity: 0,
        y: -70,
        filter: "blur(6px)",
      });
    }, ref);
    return () => ctx.revert();
  }, [started]);

  return (
    <section
      id="top"
      ref={ref}
      className="section-pad relative flex min-h-[115vh] flex-col justify-center overflow-hidden"
    >
      <div className="pointer-events-none absolute -left-20 top-1/3 size-[36vw] rounded-full bg-[#ff6b1a]/[0.06] blur-[110px]" />
      <div className="pointer-events-none absolute right-[-12%] top-[18%] size-[40vw] rounded-full bg-white/[0.03] blur-[130px]" />

      <div className="relative z-10 max-w-5xl">
        <div className="hero-label mb-6 flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#ff6b1a] md:text-xs">
            Frontend Developer · Guatemala
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-widest text-white/50">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
            Disponible para proyectos
          </span>
        </div>

        <h1 className="hero-clamp-text relative z-10 mb-10 flex flex-col font-black leading-[0.75] tracking-tighter">
          <span className="hero-line ghost z-0 block">Hey, I&apos;m</span>
          <span className="hero-perspective relative z-10 -mt-2 block text-white md:-mt-6">
            {name.split("").map((char, index) => (
              <span key={`${char}-${index}`} className="hero-letter inline-block will-change-transform">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h1>

        <div className="hero-sub flex max-w-xl flex-col gap-5">
          <BlurText
            text="Construyo *interfaces* que ganan premios. Frontend, producto e IA aplicada — demos que corren bajo presión, no slides."
            delay={26}
            animateBy="words"
            direction="bottom"
            stepDuration={0.18}
            animateOnMount={started}
            className="text-base font-medium leading-[1.65] text-white/60 md:text-[17px]"
          />
          <BlurText
            text="Campeón *Cursor* *UVG* · 3.er *EcoBuild* · 3.er *DevRep* · Invitado *UFG* *El* *Salvador* · World Cup of Startups."
            delay={16}
            animateBy="words"
            direction="bottom"
            stepDuration={0.16}
            animateOnMount={started}
            className="text-xs font-light leading-relaxed text-white/35 md:text-sm"
          />

          <div className="mt-6 flex flex-wrap gap-3">
            <Magnetic intensity={0.28} springOptions={{ bounce: 0 }}>
              <button
                type="button"
                onClick={() => scrollToHash("#work")}
                className="hero-cta btn-shine inline-flex items-center gap-2 rounded-full bg-[#ff6b1a] px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-white"
              >
                Ver proyectos
              </button>
            </Magnetic>
            <a
              href={mailto}
              className="hero-cta inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              Contactar
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>

          <p className="hero-cta mt-12 text-[10px] font-medium uppercase tracking-[0.4em] text-white/28">
            Scroll ↓
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function Stats() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        y: 48,
        opacity: 0,
        rotateX: 8,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".stat-banner", {
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-pad relative py-10 md:py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Banner de impacto */}
      <div className="stat-banner relative mb-5 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] md:mb-6">
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-50" />
        <div className="pointer-events-none absolute -left-10 top-1/2 size-56 -translate-y-1/2 rounded-full bg-[#ff6b1a]/25 blur-[80px]" />
        <div className="relative flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between md:p-7">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-[#ff6b1a]">
              Resultados 2026
            </p>
            <p className="mt-2 max-w-xl text-lg font-bold tracking-tight text-white md:text-2xl">
              Premios, demos y producto real — no solo slides.
            </p>
          </div>
          <button
            type="button"
            onClick={() => scrollToHash("#wins")}
            className="btn-shine inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white/70 transition-colors hover:border-[#ff6b1a]/50 hover:text-white"
          >
            Ver wins <ArrowUpRight className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className="stat-item group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#ff6b1a]/45 md:p-6"
          >
            <Spotlight
              className="from-[#ff6b1a]/35 via-[#ff6b1a]/10 to-transparent blur-2xl"
              size={200}
            />
            <div className="relative flex items-start justify-between">
              <span className="font-mono text-[10px] text-white/25">
                0{index + 1}
              </span>
              <span className="rounded-full border border-[#ff6b1a]/35 bg-[#ff6b1a]/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#ff6b1a]">
                {stat.accent}
              </span>
            </div>
            <p
              className="relative mt-5 font-black tracking-tighter text-[#ff6b1a] transition-transform duration-500 group-hover:scale-[1.04]"
              style={{ fontSize: "clamp(2.8rem, 6vw, 4.2rem)" }}
            >
              {stat.value}
            </p>
            <p className="relative mt-3 text-sm font-semibold text-white md:text-base">
              {stat.title}
            </p>
            <p className="relative mt-1 text-xs leading-relaxed text-white/40">
              {stat.label}
            </p>
            <div className="relative mt-5 h-px w-8 bg-[#ff6b1a]/60 transition-all duration-500 group-hover:w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}

function TechMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 py-6 md:py-7">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808]" />
      <div className="flex w-max animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
        {[...stack, ...stack].map((tech, index) => (
          <span
            key={`${tech}-${index}`}
            className="flex items-center text-2xl font-black uppercase tracking-tighter text-white/[0.12] transition-colors hover:text-[#ff6b1a]/70 md:text-5xl"
          >
            {tech}
            <Plus className="mx-6 size-4 text-[#ff6b1a]/50 md:mx-8" />
          </span>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function Wins() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".win-card", {
        scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
        y: 56,
        opacity: 0,
        stagger: 0.12,
        duration: 0.95,
        ease: "power3.out",
      });
      gsap.utils.toArray<HTMLElement>(".win-img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="wins" ref={ref} className="section-pad py-16 md:py-24">
      <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.5em] text-[#ff6b1a]">
        Wins 2026
      </p>
      <h2
        className="mb-10 font-black leading-none tracking-tighter text-white"
        style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
      >
        Hackathons
        <span className="block ghost">ganados.</span>
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {achievements.map((win, index) => (
          <article
            key={win.title}
            className={`win-card group relative overflow-hidden rounded-2xl border border-white/10 ${
              index === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
            }`}
          >
            <div className="win-img absolute inset-0">
              <Image
                src={asset(win.image)}
                alt={win.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[#ff6b1a]/10" />
            {win.video && (
              <a
                href={win.video}
                target="_blank"
                rel="noreferrer"
                className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#ff6b1a] px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black transition-transform hover:scale-105"
              >
                <Play className="size-3" fill="currentColor" />
                Video
              </a>
            )}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#ff6b1a]">
                {win.detail}
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-white transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
                {win.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function FreepolSpotlight() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fp-block", {
        scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
        y: 40,
        opacity: 0,
        stagger: 0.09,
        duration: 0.75,
        ease: "power3.out",
      });
      gsap.from(".fp-metric", {
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        y: 18,
        opacity: 0,
        stagger: 0.06,
        duration: 0.55,
        delay: 0.25,
        ease: "power2.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const chips = [
    "Documentación técnica",
    "Entrenamiento B.I.M.O.",
    "Mecánicas de campaña",
    "WhatsApp · Telegram · TikTok",
    "Ruleta · Rasca · Puntos · OCR",
  ];

  const metrics = [
    { k: "SaaS", v: "B2B lealtad" },
    { k: "Rol", v: "Docs + IA" },
    { k: "Estado", v: "Producción" },
    { k: "Canales", v: "WA · TG · TT" },
  ];

  return (
    <section ref={ref} className="section-pad py-12 md:py-16">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]">
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-60" />
        <div className="pointer-events-none absolute -right-24 -top-24 size-[520px] rounded-full bg-[#ff6b1a]/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 size-[360px] rounded-full bg-cyan-400/15 blur-[110px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff6b1a]/60 to-transparent" />

        <div className="relative grid items-stretch gap-0 lg:grid-cols-12">
          {/* Copy + métricas */}
          <div className="fp-block flex flex-col justify-between gap-8 p-7 md:p-10 lg:col-span-5 lg:p-12">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="pulse-dot size-2 rounded-full bg-[#ff6b1a]" />
                <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-[#ff6b1a]">
                  Producto real · Hyper Reality
                </p>
              </div>
              <h2
                className="font-black leading-[0.88] tracking-tighter text-white"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.6rem)" }}
              >
                FREEPOL
                <span className="block ghost text-[0.7em]">/ B.I.M.O.</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/55 md:text-[15px]">
                Documentación del SaaS de lealtad y entrenamiento del asistente
                B.I.M.O.: ruleta, rasca y gana, puntos, OCR e integraciones
                multicanal.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {chips.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-[9px] uppercase tracking-widest text-white/55 backdrop-blur-sm transition-colors hover:border-[#ff6b1a]/40 hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <Link
                href="/proyectos/freepol"
                className="btn-shine mt-8 inline-flex items-center gap-2 rounded-full bg-[#ff6b1a] px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-white"
              >
                Ver caso de estudio <ArrowUpRight className="size-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {metrics.map((m) => (
                <div
                  key={m.k}
                  className="fp-metric rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm"
                >
                  <p className="text-[9px] uppercase tracking-[0.35em] text-white/35">{m.k}</p>
                  <p className="mt-1.5 text-sm font-semibold text-white">{m.v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Escena visual densa — sin hueco muerto */}
          <div className="fp-block relative min-h-[420px] overflow-hidden border-t border-white/10 lg:col-span-7 lg:min-h-[560px] lg:border-l lg:border-t-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#141414] via-[#0c0c0c] to-[#101018]" />
            <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_70%_40%,rgba(255,107,26,0.25),transparent_55%)]" />

            {/* Mockup principal */}
            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
              <div className="relative w-full max-w-md">
                <div className="pointer-events-none absolute -inset-[2px] rounded-[2rem] opacity-70 fp-glow-ring blur-[1px]" />
                <TiltCard tiltAmount={10} className="relative w-full">
                  <div className="relative aspect-[9/11] overflow-hidden rounded-[1.75rem] border border-white/20 bg-white shadow-[0_50px_100px_rgba(0,0,0,0.65)]">
                    <Image
                      src={asset("/work/freepol-ui.webp")}
                      alt="FREEPOL — interfaz de registro"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 90vw, 42vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-5">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#ff6b1a]">
                        UI · Onboarding
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        Flujos reales del producto
                      </p>
                    </div>
                  </div>
                </TiltCard>

                {/* Badges flotantes */}
                <div className="float-y absolute -left-3 top-10 hidden rounded-2xl border border-white/15 bg-black/70 px-4 py-3 backdrop-blur-md md:block">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">Asistente</p>
                  <p className="mt-1 text-sm font-bold text-white">B.I.M.O.</p>
                </div>
                <div className="float-y-delay absolute -right-2 bottom-24 hidden rounded-2xl border border-[#ff6b1a]/40 bg-[#ff6b1a] px-4 py-2.5 shadow-[0_0_40px_rgba(255,107,26,0.35)] md:block">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black">
                    En producción
                  </p>
                </div>
                <div className="float-y absolute -right-4 top-1/3 hidden rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-[10px] uppercase tracking-widest text-white/80 backdrop-blur md:block">
                  Docs + IA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        })
        .from(".about-label", { y: 14, opacity: 0, duration: 0.35 })
        .from(".about-h", { y: 40, opacity: 0, duration: 0.55, ease: "power4.out" }, 0.05)
        .from(".about-p", { y: 20, opacity: 0, duration: 0.4 }, 0.15)
        .from(".about-skill", { x: -10, opacity: 0, stagger: 0.03, duration: 0.28 }, 0.2);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="section-pad relative py-16 md:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col lg:col-span-6">
          <p className="about-label mb-4 text-[10px] font-medium uppercase tracking-[0.5em] text-[#ff6b1a]">
            About
          </p>
          <h2
            className="about-h mb-6 font-black leading-[0.88] tracking-tighter"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}
          >
            <span className="block text-white">Frontend.</span>
            <span className="block text-white">Producto.</span>
            <span className="block ghost">Evidencia.</span>
          </h2>

          {profile.about.map((text) => (
            <BlurText
              key={text}
              text={text}
              delay={20}
              animateBy="words"
              direction="bottom"
              stepDuration={0.18}
              className="about-p mb-4 max-w-lg text-sm font-light leading-relaxed text-white/50 md:text-base"
            />
          ))}

          <Magnetic intensity={0.25} springOptions={{ bounce: 0 }}>
            <a
              href={mailto}
              className="about-p btn-shine mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#ff6b1a]/30 px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#ff6b1a] transition-colors duration-300 hover:bg-[#ff6b1a] hover:text-black"
            >
              Escribirme
              <ArrowUpRight className="size-3.5" />
            </a>
          </Magnetic>
        </div>

        <div className="relative lg:col-span-6">
          <div className="pointer-events-none absolute -inset-6 grid-fade opacity-50" />
          <div className="grid grid-cols-2 gap-3">
            <TiltCard className="col-span-2" tiltAmount={8}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={asset("/work/uvg-campeones.webp")}
                  alt="Jeferson Cano — Campeones UVG"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.3em] text-white/70">
                  UVG · Campeones
                </span>
              </div>
            </TiltCard>
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={asset("/work/buildathon-win.webp")}
                alt="Buildathon"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={asset("/work/robokit-ufg.webp")}
                alt="ROBOKIT UFG"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
          </div>

          <p className="about-p mb-3 mt-6 text-[10px] uppercase tracking-[0.4em] text-white/50">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {stack.slice(0, 12).map((tech) => (
              <span
                key={tech}
                className="about-skill rounded-full border border-white/12 px-3 py-1.5 text-[10px] uppercase tracking-widest text-white/35 transition-colors hover:border-white hover:bg-white hover:text-[#ff6b1a]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function Work() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".work-item").forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 92%",
            toggleActions: "play none none none",
          },
          y: 50,
          opacity: 0,
          duration: 0.75,
          delay: (i % 3) * 0.05,
          ease: "power3.out",
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={ref}
      className="section-pad relative w-full pb-16 pt-8 md:pb-24"
    >
      <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.5em] text-[#ff6b1a]">
            Selected Work
          </p>
          <h2
            className="font-black leading-none tracking-tighter text-white"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
          >
            Projects
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-white/40">
          EcoBuild, ROBOKIT, DevRep, FREEPOL y sistemas de Kinal — con demo,
          video o caso de estudio.
        </p>
      </div>

      {/* Grid denso con imágenes — sin lista vacía de texto */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/proyectos/${project.slug}`}
            className={`work-item group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] ${
              index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
            }`}
          >
            <Spotlight
              className="from-[#ff6b1a]/30 via-[#ff6b1a]/10 to-transparent blur-2xl"
              size={220}
            />
            <div
              className={`relative overflow-hidden ${
                index === 0 ? "aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[420px]" : "aspect-[16/11]"
              }`}
            >
              <Image
                src={asset(project.cover)}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes={index === 0 ? "66vw" : "33vw"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
              <div className="absolute left-4 top-4 flex gap-2">
                <span className="rounded-full bg-black/50 px-2.5 py-1 font-mono text-[10px] text-white/60 backdrop-blur">
                  {project.index}
                </span>
                {project.result && (
                  <span className="rounded-full bg-[#ff6b1a] px-2.5 py-1 text-[9px] font-bold uppercase text-black">
                    {project.result}
                  </span>
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {project.kind}
                </p>
                <h3
                  className={`font-black tracking-tight text-white ${
                    index === 0 ? "text-3xl md:text-4xl" : "text-xl"
                  }`}
                >
                  {project.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-white/45">
                  {project.statement}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white">
                    Caso <ArrowUpRight className="size-3" />
                  </span>
                  {project.demo && (
                    <span className="text-[10px] uppercase tracking-widest text-emerald-400">
                      Demo
                    </span>
                  )}
                  {project.video && (
                    <span className="text-[10px] uppercase tracking-widest text-[#ff6b1a]">
                      Video
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function Path() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = listRef.current?.querySelectorAll<HTMLElement>(".path-item");
      if (!steps) return;
      const triggers = Array.from(steps).map((step, index) =>
        ScrollTrigger.create({
          trigger: step,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => setActive(index),
          onEnterBack: () => setActive(index),
        }),
      );
      gsap.from(".path-item", {
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        x: -20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.65,
        ease: "power3.out",
      });
      return () => triggers.forEach((t) => t.kill());
    }, ref);
    return () => ctx.revert();
  }, []);

  const current = milestones[active] ?? milestones[0];

  return (
    <section id="path" ref={ref} className="section-pad relative py-16 md:py-24">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 grid-fade opacity-40 lg:block" />

      <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.5em] text-[#ff6b1a]">
            Trajectory
          </p>
          <h2
            className="font-black leading-none tracking-tighter text-white"
            style={{ fontSize: "clamp(2.6rem, 6vw, 4.8rem)" }}
          >
            El camino
          </h2>
        </div>
        <p className="max-w-xs text-sm text-white/40">
          Scroll o click en cada hito — la foto cambia en vivo.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div ref={listRef} className="relative lg:col-span-5">
          <div className="absolute bottom-4 left-[11px] top-4 w-px bg-gradient-to-b from-[#ff6b1a] via-[#ff6b1a]/35 to-transparent" />
          <div className="space-y-3">
            {milestones.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(index)}
                className={`path-item relative w-full pl-12 text-left transition-all duration-400 md:pl-14 ${
                  active === index ? "opacity-100" : "opacity-40 hover:opacity-75"
                }`}
              >
                <div
                  className={`absolute left-1.5 top-3 size-4 rounded-full border-4 border-[#080808] transition-all ${
                    active === index
                      ? "scale-110 bg-[#ff6b1a] shadow-[0_0_22px_rgba(255,107,26,0.55)]"
                      : "bg-white/30"
                  }`}
                />
                <div
                  className={`rounded-2xl border p-3.5 transition-all md:p-4 ${
                    active === index
                      ? "border-[#ff6b1a]/35 bg-[#ff6b1a]/5"
                      : "border-transparent hover:border-white/10 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] text-[#ff6b1a]">{item.year}</span>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">
                      {item.label}
                    </span>
                  </div>
                  <h3 className="mt-1 text-base font-bold text-white md:text-lg">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/45">{item.text}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="sticky top-24 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0c0c0c] shadow-[0_40px_80px_rgba(0,0,0,0.45)]">
            <Spotlight
              className="from-[#ff6b1a]/25 via-[#ff6b1a]/10 to-transparent blur-2xl"
              size={280}
            />
            <div className="relative aspect-[16/12] w-full md:aspect-[16/11]">
              {milestones.map((item, index) => (
                <div
                  key={item.image}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
                  }`}
                >
                  <Image
                    src={asset(item.image)}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="55vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                </div>
              ))}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#ff6b1a]">
                    {current.year} · {current.label}
                  </p>
                  <p className="mt-2 text-2xl font-black text-white md:text-3xl">{current.title}</p>
                </div>
                <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-sm text-white/60 backdrop-blur">
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(milestones.length).padStart(2, "0")}
                </span>
              </div>
            </div>
            {/* Mini thumbs */}
            <div className="flex gap-2 overflow-x-auto border-t border-white/10 bg-black/40 p-3">
              {milestones.map((item, index) => (
                <button
                  key={`thumb-${item.image}`}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition-all ${
                    active === index
                      ? "border-[#ff6b1a] opacity-100"
                      : "border-white/10 opacity-45 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={asset(item.image)}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Interests() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".interest-card", {
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        y: 28,
        opacity: 0,
        stagger: 0.08,
        duration: 0.65,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-pad relative overflow-hidden border-t border-white/5 py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(ellipse_at_30%_0%,rgba(255,107,26,0.18),transparent_50%)]" />
      <div className="relative mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.5em] text-[#ff6b1a]">
            Outside code
          </p>
          <h2 className="text-3xl font-black tracking-tighter text-white md:text-5xl">
            Lo que me mueve
          </h2>
        </div>
      </div>
      <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {interests.map((item, index) => (
          <div
            key={item.title}
            className="interest-card group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#ff6b1a]/40"
          >
            <Spotlight
              className="from-[#ff6b1a]/30 via-[#ff6b1a]/10 to-transparent blur-2xl"
              size={180}
            />
            <span className="font-mono text-[10px] text-white/25">
              0{index + 1}
            </span>
            <h3 className="mt-3 text-lg font-bold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/40">{item.text}</p>
            <div className="mt-5 h-px w-10 bg-[#ff6b1a]/50 transition-all group-hover:w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        })
        .from(".contact-label", { y: 14, opacity: 0, duration: 0.35 })
        .from(".contact-h", { y: 44, opacity: 0, duration: 0.6, ease: "power4.out" }, 0.05)
        .from(".contact-link", { y: 20, opacity: 0, stagger: 0.08, duration: 0.4 }, 0.2);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      className="section-pad relative overflow-hidden py-16 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-40" />
      <div className="pointer-events-none absolute -right-20 top-10 size-[420px] rounded-full bg-[#ff6b1a]/15 blur-[120px]" />

      <p className="contact-label relative mb-8 text-[10px] font-medium uppercase tracking-[0.5em] text-[#ff6b1a]">
        Contact
      </p>

      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0c0c]">
        <div className="grid items-center gap-10 p-8 md:grid-cols-12 md:gap-8 md:p-12">
          <div className="md:col-span-5">
            <p className="contact-link mb-5 text-sm text-white/45">
              ¿Proyecto, colaboración o freelance? Escríbeme y te respondo con
              alcance claro.
            </p>
            <a
              href={mailto}
              className="contact-link mb-8 block break-all text-xl font-bold text-white transition-colors hover:text-[#ff6b1a] md:text-2xl"
            >
              {profile.email}
            </a>
            <div className="contact-link flex flex-wrap gap-3">
              {[
                { label: "GitHub", href: profile.github },
                { label: "LinkedIn", href: profile.linkedin },
                { label: "Email", href: mailto },
              ].map((social) => (
                <Magnetic key={social.label} intensity={0.3} springOptions={{ bounce: 0 }}>
                  <a
                    href={social.href}
                    target={social.label === "Email" ? undefined : "_blank"}
                    rel="noreferrer"
                    className="btn-shine inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white transition-colors hover:border-[#ff6b1a]/50 hover:bg-[#ff6b1a] hover:text-black"
                  >
                    {social.label}
                    <ArrowUpRight className="size-3" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <div className="md:col-span-7">
            <h2
              className="contact-h font-black leading-[0.88] tracking-tighter"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
            >
              <span className="block text-white">Let&apos;s build</span>
              <span className="block text-white">something</span>
              <span className="block ghost-orange">cool.</span>
            </h2>
            <Magnetic intensity={0.2} springOptions={{ bounce: 0 }}>
              <a
                href={mailto}
                className="contact-link btn-shine mt-8 inline-flex items-center gap-2 rounded-full bg-[#ff6b1a] px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-white"
              >
                Abrir correo <ArrowUpRight className="size-4" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="section-pad border-t border-white/10 py-10">
      <div className="flex flex-col items-start justify-between gap-4 text-sm text-white/30 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Jeferson Cano · Frontend · Guatemala</p>
        <button
          type="button"
          onClick={() => scrollToHash("#top")}
          className="text-[10px] uppercase tracking-[0.3em] transition-colors hover:text-[#ff6b1a]"
        >
          Volver arriba ↑
        </button>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */

export function HomeExperience() {
  const [started, setStarted] = useState(false);
  const blurWrapRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const handleComplete = useCallback(() => setStarted(true), []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    lenisInstance = lenis;

    lenis.on("scroll", () => {
      ScrollTrigger.update();
      if (blurWrapRef.current && footerRef.current) {
        const footerTop = footerRef.current.getBoundingClientRect().top;
        const vh = window.innerHeight;
        blurWrapRef.current.style.opacity = String(
          footerTop >= vh ? 1 : Math.max(0, footerTop / vh),
        );
      }
    });

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisInstance = null;
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <main className="bg-[#080808] text-white">
      <Preloader onComplete={handleComplete} />
      <div className="grain-overlay" />
      <div className="vignette" />
      <ScrollProgress />
      <Cursor />
      <Navbar started={started} />
      <div ref={blurWrapRef} className="bottom-blur" />

      <div className={`relative z-10 transition-opacity duration-700 ${started ? "opacity-100" : "opacity-0"}`}>
        <Hero started={started} />
        <Stats />
        <TechMarquee />
        <Wins />
        <FreepolSpotlight />
        <About />
        <Work />
        <Path />
        <Interests />
        <Contact />
        <div ref={footerRef}>
          <Footer />
        </div>
      </div>
    </main>
  );
}
