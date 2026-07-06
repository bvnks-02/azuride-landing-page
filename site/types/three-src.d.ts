// `lib/three-slim.ts` imports from three's source entry (allowed by the
// package's "./src/*" export) which ships no type declarations; the API is
// identical to the built entry, so reuse @types/three.
declare module "three/src/Three.js" {
  export * from "three";
}
