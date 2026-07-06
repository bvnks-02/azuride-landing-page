import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // R3F escape hatch: useFrame callbacks mutate useMemo'd materials and
    // uniforms every frame on purpose — that is the standard way to animate
    // without re-rendering, and the §4.3 performance budget depends on it.
    // The react-compiler-backed immutability rule can't know this. Scoped to
    // the 3D directory only; the rule stays on everywhere else.
    files: ["components/three/**"],
    rules: {
      "react-hooks/immutability": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
