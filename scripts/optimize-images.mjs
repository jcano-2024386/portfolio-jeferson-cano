/**
 * Optimiza PNG grandes de NARCIX55 / Imora a WebP para el portafolio.
 * Ejecutar: node scripts/optimize-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const NARCIX = "C:\\Users\\jef3r\\OneDrive\\Documentos\\NARCIX55";
const IMORA_DIRS = [
  "C:\\Users\\jef3r\\OneDrive\\Documentos\\JUEGO ASSETS (562 imagenes)\\IMORA ULTIMATE",
  "C:\\Users\\jef3r\\OneDrive\\Documentos\\JUEGO ASSETS (562 imagenes)\\IMORA 1",
  "C:\\Users\\jef3r\\Downloads\\myimoraandroidgirl-0.1-win",
];

const root = process.cwd();
const artOut = path.join(root, "public", "art");
const projectsOut = path.join(root, "public", "projects");

fs.mkdirSync(artOut, { recursive: true });
fs.mkdirSync(projectsOut, { recursive: true });

/** Piezas SFW curadas → nombre de salida */
const artMap = [
  ["NEW ERA 2026.png", "new-era-2026.webp"],
  ["BLADERUNNER 2047 V2.png", "blade-runner.webp"],
  ["LUCY.png", "lucy.webp"],
  ["MOTO.png", "moto.webp"],
  ["ANGEL.png", "angel.webp"],
  ["AZUKA.png", "azuka.webp"],
  ["CIENTIFICA.png", "cientifica.webp"],
  ["DANTE.png", "dante.webp"],
  ["GOJO.png", "gojo.webp"],
  ["KILL BILL.png", "kill-bill.webp"],
  ["MAGIK.png", "magik.webp"],
  ["MAID 4.png", "maid.webp"],
  ["MIKUUUUUUUUUUUU.png", "miku.webp"],
  ["MUSIC.png", "music.webp"],
  ["PERSONA 5.png", "persona5.webp"],
  ["REI.png", "rei.webp"],
];

async function toWebp(src, dest, width = 1600) {
  if (!fs.existsSync(src)) {
    console.warn("MISSING", src);
    return;
  }
  await sharp(src)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(dest);
  const kb = Math.round(fs.statSync(dest).size / 1024);
  console.log("OK", path.basename(dest), `${kb}kb`);
}

async function findFirstImage(dirs) {
  const exts = new Set([".png", ".jpg", ".jpeg", ".webp"]);
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    const hit = files.find((f) => exts.has(path.extname(f).toLowerCase()));
    if (hit) return path.join(dir, hit);
    // un nivel más
    for (const f of files) {
      const p = path.join(dir, f);
      if (!fs.statSync(p).isDirectory()) continue;
      const nested = fs.readdirSync(p);
      const n = nested.find((x) => exts.has(path.extname(x).toLowerCase()));
      if (n) return path.join(p, n);
    }
  }
  return null;
}

async function main() {
  for (const [srcName, outName] of artMap) {
    await toWebp(path.join(NARCIX, srcName), path.join(artOut, outName), 1400);
  }

  // Hero Imora: preferir NEW ERA / arte propio si no hay screenshot de juego
  const imoraSrc =
    (await findFirstImage(IMORA_DIRS)) ||
    path.join(NARCIX, "NEW ERA 2026.png");
  await toWebp(imoraSrc, path.join(projectsOut, "imora-hero.webp"), 1800);

  // Placeholders de proyecto: usar piezas atmosféricas propias
  await toWebp(
    path.join(NARCIX, "SPACE.png"),
    path.join(projectsOut, "ecobuild.webp"),
    1400
  );
  {
    const robokitSrc = ["SERPIENTE.png", "STEINS GATE CINEM.png", "MOTO.png"]
      .map((n) => path.join(NARCIX, n))
      .find((p) => fs.existsSync(p));
    if (robokitSrc) {
      await toWebp(robokitSrc, path.join(projectsOut, "robokit.webp"), 1400);
    }
  }
  // Hero background
  await toWebp(
    path.join(NARCIX, "BLADERUNNER 2047 V2.png"),
    path.join(projectsOut, "hero-bg.webp"),
    2000
  );

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
