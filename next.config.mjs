/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/portfolio-jeferson-cano" : "";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  transpilePackages: ["three"],
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
};

export default nextConfig;
