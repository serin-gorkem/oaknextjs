import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  swcMinify: true,

  // ✅ Modern image formats ve CSS optimizasyon
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizeCss: true,
  },

  // ✅ Cache headers
  async headers() {
    return [
      {
        source: "/(.*)\\.(js|css|png|jpg|jpeg|svg|webp|woff2|ico)$",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)\\.(html|json)$",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, stale-while-revalidate=300",
          },
        ],
      },
    ];
  },
};

export default nextConfig;