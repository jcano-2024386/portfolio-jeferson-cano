export interface Project {
  slug: string;
  index: string;
  name: string;
  kind: string;
  year: string;
  statement: string;
  summary: string;
  problem: string;
  role: string;
  contribution: string[];
  stack: string[];
  repo: string;
  demo?: string;
  video?: string;
  visual: "amber" | "signal" | "blue" | "steel" | "ember";
  cover: string;
  result?: string;
}

export const projects: Project[] = [
  {
    slug: "ecobuild",
    index: "01",
    name: "EcoBuild",
    kind: "Buildathon · Producto · 3D",
    year: "2026",
    statement: "Materiales de construcción, con evidencia.",
    summary:
      "Compara materiales sostenibles y convencionales con precios locales, fichas técnicas, mapa de proveedores y muestras 3D interactivas. 3.er lugar en el Buildathon SDLC 2026.",
    problem:
      "Elegir material sin datos locales ni fuentes claras termina en decisiones a ciegas. EcoBuild junta evidencia, cotización y demo en una sola experiencia.",
    role: "Desarrollo de la experiencia de interfaz en el equipo del Buildathon.",
    contribution: [
      "Jerarquía visual y flujos de comparación",
      "UI para fichas técnicas y cotización",
      "Narrativa de producto para el pitch",
      "Entrega bajo presión en cuatro días",
    ],
    stack: ["React", "Three.js", "GSAP", "Supabase", "OpenAI"],
    repo: "https://github.com/Memory-Jesu/EcoBuild",
    demo: "https://ecobuild-gt.vercel.app/",
    visual: "amber",
    cover: "/work/ecobuild-hero.webp",
    result: "3.er lugar",
  },
  {
    slug: "robokit",
    index: "02",
    name: "ROBOKIT",
    kind: "Hardware · WebSerial · Hackathon",
    year: "2026",
    statement: "Circuitos ESP32 desde el navegador.",
    summary:
      "Diseña, simula y flashea una placa ESP32 sin instalar toolchains. Incluye flujos de voz y automatización. Hackathon en la UFG, El Salvador — invitado.",
    problem:
      "El hardware intimida si pedís instalar IDEs y drivers. ROBOKIT acerca la placa a una UI que se entiende en minutos.",
    role: "Frontend / UX del flujo web en equipo.",
    contribution: [
      "Experiencia de diseño y flash en el navegador",
      "Claridad del flujo para usuarios no hardware",
      "Demo usable en un fin de semana",
    ],
    stack: ["Vue", "WebSerial", "Go", "n8n", "ElevenLabs"],
    repo: "https://github.com/jcano-2024386",
    video:
      "https://www.linkedin.com/posts/javier-gonz%C3%A1lez-544a913a7_4-horas-para-hacer-un-proyecto-funcional-activity-7483657628288585728-8LDY",
    visual: "signal",
    cover: "/work/robokit-ufg.webp",
    result: "Invitado · SV",
  },
  {
    slug: "devrep",
    index: "03",
    name: "DevRep",
    kind: "Cursor x Tec · Hackathon",
    year: "2026",
    statement: "4 horas. Un proyecto funcional. 3.er lugar.",
    summary:
      "Herramienta de análisis y reputación para desarrolladores. Construida en el Cursor x Tec Hackathon en cuatro horas — 3.er lugar.",
    problem:
      "Medir contribución real de un developer más allá de un contador de commits crudo.",
    role: "Desarrollo frontend en el equipo.",
    contribution: [
      "UI bajo presión en 4 horas",
      "Narrativa de producto para el pitch",
      "Demo usable al final del día",
    ],
    stack: ["Next.js", "TypeScript", "GitHub API"],
    repo: "https://github.com/jcano-2024386",
    video:
      "https://www.linkedin.com/posts/javier-gonz%C3%A1lez-544a913a7_4-horas-para-hacer-un-proyecto-funcional-activity-7483657628288585728-8LDY",
    visual: "ember",
    cover: "/work/cursor-hackathon.webp",
    result: "3.er lugar",
  },
  {
    slug: "freepol",
    index: "04",
    name: "FREEPOL / B.I.M.O.",
    kind: "SaaS · IA · Producto",
    year: "2026",
    statement: "Lealtad y campañas con un asistente que sí conoce el producto.",
    summary:
      "Colaboración en Hyper Reality: documentación técnica, entrenamiento de B.I.M.O. y apoyo en mecánicas de campaña (ruleta, rasca y gana, puntos, OCR) e integraciones.",
    problem:
      "Un SaaS de lealtad necesita documentación viva y un bot que no invente el flujo. B.I.M.O. se entrena con material real del producto.",
    role: "Colaborador · documentación e IA aplicada.",
    contribution: [
      "Documentación técnica del ecosistema",
      "Material de entrenamiento de B.I.M.O.",
      "Apoyo en mecánicas de campaña",
      "Integraciones WhatsApp, SMS, Telegram, TikTok",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Redis", "Claude"],
    repo: "https://github.com/jcano-2024386",
    visual: "blue",
    cover: "/work/freepol-ui.webp",
    result: "En producción",
  },
  {
    slug: "bancoking",
    index: "05",
    name: "BancoKing",
    kind: "Fintech · Microservicios · Kinal",
    year: "2026",
    statement: "La confianza también se diseña en la arquitectura.",
    summary:
      "Sistema bancario académico con autenticación, API y paneles web/móvil en un flujo Scrum real.",
    problem:
      "Coordinar identidad y operaciones entre servicios sin perder trazabilidad ni seguridad.",
    role: "Desarrollador en el equipo de Kinal.",
    contribution: [
      "Flujos de autenticación y paneles",
      "Integración entre servicios",
      "Trabajo bajo Scrum",
    ],
    stack: [".NET", "Node.js", "React Native", "Docker"],
    repo: "https://github.com/jcano-2024386/Sistema-Bancario-SCRUM",
    visual: "steel",
    cover: "/work/github-profile.webp",
  },
  {
    slug: "kinalmedic",
    index: "06",
    name: "KinalMedic",
    kind: "Salud · Admin · Microservicios",
    year: "2026",
    statement: "Enfermería institucional sin caos de hojas.",
    summary:
      "Gestión de enfermería con microservicios y panel admin para flujos clínicos académicos.",
    problem:
      "Los procesos clínicos académicos se rompen sin un panel claro y servicios separados.",
    role: "Desarrollador del sistema.",
    contribution: [
      "Panel administrativo",
      "Servicios de gestión",
      "Recorridos de usuario",
    ],
    stack: ["JavaScript", "Microservicios", "Admin"],
    repo: "https://github.com/jcano-2024386/KinalMedic",
    visual: "ember",
    cover: "/work/ecobuild-info.webp",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
