import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // ✅ JS, CSS, font ve medya dosyalarını uzun süre cache’le
        source: "/(.*)\\.(js|css|png|jpg|jpeg|svg|webp|woff2|ico)$",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // ✅ HTML ve JSON verilerini kısa süreli tut (veri tazeliği için)
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
