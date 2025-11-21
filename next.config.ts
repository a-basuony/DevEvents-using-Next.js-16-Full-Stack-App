import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  // أي تعديل في الكود يظهر فورًا بدون refresh — وهذا من مزايا Turbopack.
};

export default nextConfig;
