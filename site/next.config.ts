import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    viewTransition: true,
  },
  turbopack: {
    resolveAlias: {
      // Bundle budget (§4.3): serve fiber's `import * as THREE` a curated
      // subset so the unused rest of three.js tree-shakes out of the lazy
      // chunk. See lib/three-slim.ts before adding scene features.
      three: "./lib/three-slim.ts",
    },
  },
};

export default nextConfig;
