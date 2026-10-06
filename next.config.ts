import type { NextConfig } from "next";
import { IMAGE_VERSION } from "./lib/image-version";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    // Локальные изображения с query‑строкой требуют явного разрешения (сброс кеша через `?v=`)
    localPatterns: [{ pathname: "/**", search: "" }, { pathname: "/**", search: `?v=${IMAGE_VERSION}` }],
  },
};

export default nextConfig;
