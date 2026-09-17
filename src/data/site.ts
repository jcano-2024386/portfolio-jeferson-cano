// Contenido de la portada — imágenes de trabajo reales, no símbolos 3D genéricos.

export const hero = {
  eyebrow: "Jeferson Cano · Desarrollador frontend y producto",
  eyebrowSecond: "Guatemalteco · Disponible para proyectos freelance",
  titleLine1: "Construyo interfaces",
  titleLine2: "que ganan premios",
  subtitle:
    "Frontend primero. Hackathons, producto real en FREEPOL y demos que corren bajo presión. De la UI al deploy.",
  statement:
    "De la idea a un producto usable, con evidencia — no con adjetivos.",
  facts: [
    { value: "1.er", label: "lugar · Cursor Hackathon UVG 2026" },
    { value: "2×", label: "3.er lugar · Buildathon + Cursor x Tec" },
    { value: "5", label: "proyectos con caso de estudio" },
  ],
  images: [
    { src: "/work/uvg-campeones.webp", label: "UVG · CAMPEONES" },
    { src: "/work/buildathon-win.webp", label: "Buildathon · 3.er" },
    { src: "/work/cursor-hackathon.webp", label: "Cursor x Tec · 3.er" },
    { src: "/work/robokit-ufg.webp", label: "UFG · ROBOKIT" },
  ],
} as const;

export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "GSAP",
  "Three.js",
  "Vue",
  "Node.js",
  "C#",
  ".NET",
  "Supabase",
  "Redis",
  "Docker",
  "React Native",
] as const;

export interface ApproachStep {
  index: string;
  title: string;
  text: string;
  image: string;
  imageLabel: string;
}

export const approach: ApproachStep[] = [
  {
    index: "01",
    title: "Entender",
    text: "Antes de abrir Figma o el editor: qué problema, para quién y qué tiene que pasar para que valga la pena. Alcance corto y medible.",
    image: "/work/ecobuild-info.webp",
    imageLabel: "EcoBuild · alcance",
  },
  {
    index: "02",
    title: "Construir",
    text: "UI, estados y flujos primero. React/Next cuando el producto lo pide; hardware+web cuando el reto es ROBOKIT. Entregas que se pueden probar.",
    image: "/work/ecobuild-hero.webp",
    imageLabel: "EcoBuild · producto",
  },
  {
    index: "03",
    title: "Demostrar",
    text: "Deploy, captura y narrativa. En hackathons y en producto real: que alguien más pueda usar lo que construiste sin que estés ahí.",
    image: "/work/uvg-campeones.webp",
    imageLabel: "UVG · evidencia",
  },
];

export interface Service {
  title: string;
  text: string;
}

export const services: Service[] = [
  {
    title: "Interfaces web",
    text: "Frontends con Next.js y React: landings, paneles y productos con motion al servicio de la jerarquía.",
  },
  {
    title: "Producto en FREEPOL",
    text: "Documentación técnica, B.I.M.O. y apoyo en mecánicas de campaña e integraciones de mensajería.",
  },
  {
    title: "Hackathon / MVP",
    text: "Prototipos en días: EcoBuild, ROBOKIT, DevRep y demos que aguantan el pitch.",
  },
  {
    title: "Sistemas full stack",
    text: "Bancos, clínicas y paneles con .NET, Node y clientes web/móvil cuando el equipo lo necesita.",
  },
  {
    title: "IA aplicada",
    text: "Asistentes y flujos conectados al producto — entrenamiento y documentación, no wrappers vacíos.",
  },
  {
    title: "Creativo (secundario)",
    text: "Narrativa, Ren'Py e ilustración cuando el proyecto pide arte o historia.",
  },
];

export const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Cómo trabajo", href: "/#enfoque" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Trayectoria", href: "/#trayectoria" },
  { label: "Contacto", href: "/#contacto" },
] as const;

/** Covers reales por índice de proyecto */
export const projectCovers: Record<string, string> = {
  "01": "/work/ecobuild-hero.webp",
  "02": "/work/robokit-ufg.webp",
  "03": "/work/cursor-hackathon.webp",
  "04": "/projects/saas.webp",
  "05": "/work/github-profile.webp",
  "06": "/work/ecobuild-info.webp",
};

export const linkedinVideos = {
  cursorTec:
    "https://www.linkedin.com/posts/javier-gonz%C3%A1lez-544a913a7_4-horas-para-hacer-un-proyecto-funcional-activity-7483657628288585728-8LDY",
  elSalvador:
    "https://www.linkedin.com/posts/javier-gonz%C3%A1lez-544a913a7_4-horas-para-hacer-un-proyecto-funcional-activity-7483657628288585728-8LDY",
} as const;
