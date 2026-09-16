export const profile = {
  name: "Jeferson Andre Cano Lopez",
  shortName: "Jeferson Cano",
  role: "Desarrollador frontend y producto",
  location: "Guatemala",
  email: "jef3rson123@gmail.com",
  tagline: "Frontend · Producto · Hackathons",
  intro:
    "Construyo interfaces que se sienten terminadas. Compito en hackathons, colaboro en producto real y llevo ideas a un deploy que alguien más puede usar.",
  about: [
    "Soy *frontend* primero: tipografía, ritmo, estados y detalle. En FREEPOL documento el producto y apoyo el entrenamiento de *B.I.M.O.*, el asistente de IA del ecosistema de lealtad.",
    "Estudio Perito en Informática en *Kinal*. En 2026 gané el *Cursor Hackathon UVG*, llevé EcoBuild al *3.er* del Buildathon SDLC, DevRep al *3.er* en Cursor x Tec, y viajé a El Salvador con *ROBOKIT*.",
    "También estuve en *primera fila* en la World Cup of Startups 2026. Me importa entregar demos que corren — no slides bonitos.",
  ],
  github: "https://github.com/jcano-2024386",
  githubSchool: "https://github.com/jcano-2024386",
  linkedin:
    "https://www.linkedin.com/in/jeferson-andre-cano-lopez-2a4146417/",
} as const;

export const stats = [
  {
    value: "1.er",
    title: "Campeón UVG",
    label: "Cursor Hackathon · 2026",
    accent: "Win",
  },
  {
    value: "2×",
    title: "Podio nacional",
    label: "Buildathon + Cursor x Tec",
    accent: "3.er",
  },
  {
    value: "01",
    title: "Internacional",
    label: "ROBOKIT · UFG El Salvador",
    accent: "SV",
  },
  {
    value: "06",
    title: "Casos vivos",
    label: "Proyectos con estudio + demo",
    accent: "Work",
  },
] as const;

export const capabilities = [
  {
    number: "01",
    title: "Frontend de producto",
    text: "Interfaces claras con Next.js y React: jerarquía, motion y flujos que se entienden sin manual.",
    tools: "Next.js · React · TypeScript · Tailwind · GSAP",
  },
  {
    number: "02",
    title: "Hackathons bajo presión",
    text: "Entregar demos que corren: alcance corto, evidencia y UI que vende la idea en minutos.",
    tools: "React · Three.js · Vue · WebSerial",
  },
  {
    number: "03",
    title: "Documentación e IA aplicada",
    text: "Material técnico y entrenamiento de asistentes (B.I.M.O.) conectados al producto real.",
    tools: "FREEPOL · Supabase · Integraciones",
  },
  {
    number: "04",
    title: "Sistemas académicos",
    text: "Bancos, clínicas y paneles con microservicios, auth y Scrum de punta a punta.",
    tools: ".NET · Node.js · React Native · Docker",
  },
] as const;

export const milestones = [
  {
    year: "2024",
    label: "Inicio",
    title: "Entro a Kinal",
    text: "APIs REST, JWT, React, Scrum y las bases del Perito en Informática.",
    image: "/work/github-profile.webp",
  },
  {
    year: "Feb 2026",
    label: "Producto",
    title: "Colaborador · FREEPOL",
    text: "Documentación, B.I.M.O. y apoyo en mecánicas de campaña en Hyper Reality.",
    image: "/work/freepol-ui.webp",
  },
  {
    year: "May 2026",
    label: "Buildathon",
    title: "EcoBuild · 3.er lugar",
    text: "Materiales sostenibles con evidencia. UI, comparación y demo en cuatro días.",
    image: "/work/ecobuild-hero.webp",
  },
  {
    year: "Jul 2026",
    label: "Internacional",
    title: "ROBOKIT · UFG El Salvador",
    text: "Invitado. Hardware + WebSerial: circuitos ESP32 desde el navegador.",
    image: "/work/robokit-ufg.webp",
  },
  {
    year: "Ago 2026",
    label: "Cursor x Tec",
    title: "DevRep · 3.er lugar",
    text: "Cuatro horas. Un proyecto funcional. Análisis de reputación para developers.",
    image: "/work/cursor-hackathon.webp",
  },
  {
    year: "Sep 2026",
    label: "Campeones",
    title: "Cursor Hackathon UVG · 1.er",
    text: "Campeones en la Universidad del Valle de Guatemala.",
    image: "/work/uvg-campeones.webp",
  },
] as const;

export const goals = [
  "Seguir como ingeniero de producto: frontend serio, sistemas claros y demos que corren.",
  "Cerrar Kinal y entrar a Ingeniería en Sistemas sin soltar proyectos reales.",
  "Tomar encargos donde diseño, negocio e interfaz compartan la misma conversación.",
] as const;

export type Achievement = {
  title: string;
  detail: string;
  image: string;
  video?: string;
};

export const achievements: Achievement[] = [
  {
    title: "Campeones · Cursor Hackathon UVG",
    detail: "1.er lugar · Universidad del Valle de Guatemala · 2026",
    image: "/work/uvg-campeones.webp",
  },
  {
    title: "Buildathon SDLC · EcoBuild",
    detail: "3.er lugar · materiales con evidencia · demo en vivo",
    image: "/work/buildathon-win.webp",
  },
  {
    title: "Cursor x Tec · DevRep",
    detail: "3.er lugar · 4 horas · proyecto funcional",
    image: "/work/cursor-hackathon.webp",
    video:
      "https://www.linkedin.com/posts/javier-gonz%C3%A1lez-544a913a7_4-horas-para-hacer-un-proyecto-funcional-activity-7483657628288585728-8LDY",
  },
  {
    title: "ROBOKIT · UFG El Salvador",
    detail: "Invitado internacional · hardware + WebSerial",
    image: "/work/robokit-ufg.webp",
    video:
      "https://www.linkedin.com/posts/javier-gonz%C3%A1lez-544a913a7_4-horas-para-hacer-un-proyecto-funcional-activity-7483657628288585728-8LDY",
  },
];

export const interests = [
  {
    title: "Música",
    text: "$uicideboy$, Deftones, Pantera, Xavier Wulf, Ken Carson, Playboi Carti, JOJI.",
  },
  {
    title: "Juegos",
    text: "Cyberpunk 2077, Ultrakill, Sekiro, Red Dead Redemption 2.",
  },
  {
    title: "Arte",
    text: "Dibujo digital, personajes y narrativa visual (NARCIX55).",
  },
  {
    title: "Música / prod",
    text: "FL Studio cuando no estoy en el editor.",
  },
] as const;
