"use client";

/**
 * HeroBackground.tsx
 * AZURID hero-section background — "reality being scanned into data".
 *
 * Layers:
 *  1. CSS radial glow (cerulean → emerald, matches logo)
 *  2. R3F point-cloud field (photogrammetry-style particles, mouse parallax + drift)
 *  3. Low-poly wireframe fragment (suggests a 3D model mid-construction)
 *  4. GSAP entrance fade/scale-in on mount
 *
 * Usage:
 *   <section className="relative overflow-hidden">
 *     <HeroBackground />
 *     <div className="relative z-10"> ...your hero text/logo... </div>
 *   </section>
 *
 * Brand colors only (design.md §2): cerulean #008FC3, emerald #14B88B.
 * Reduced-motion: R3F scene skipped entirely; CSS glow carries atmosphere.
 */

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
// Named imports for type references only. JSX intrinsics like
// <icosahedronGeometry>, <meshBasicMaterial>, <pointsMaterial> are resolved
// by R3F from the `three` namespace (aliased to lib/three-slim.ts), so they
// don't need to be imported here — but they DO need to be exported from
// three-slim.ts or they'll be undefined at runtime.
import {
  BufferAttribute,
  BufferGeometry,
  MathUtils,
  Mesh,
  Points,
} from "three";
import gsap from "gsap";
import { TOKENS } from "@/lib/tokens";

const PARTICLE_COUNT = 110;
const FIELD_RADIUS = 9;

// useSyncExternalStore for prefers-reduced-motion — avoids setState-in-effect
// lint error and matches the pattern in ConvergenceHero.tsx.
const reducedMotionSubscribe = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getServerReducedMotion = () => false;

function useReducedMotion() {
  return useSyncExternalStore(
    reducedMotionSubscribe,
    getReducedMotion,
    getServerReducedMotion,
  );
}

/** Sparse drifting point-cloud, evokes LiDAR/photogrammetry scan data. */
function ParticleField({ reduced }: { reduced: boolean }) {
  const pointsRef = useRef<Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Seeded PRNG (mulberry32) — keeps useMemo pure and layout identical across mounts.
  const rand = useMemo(() => {
    let seed = 0x9e3779b9;
    return () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }, []);

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = FIELD_RADIUS * Math.cbrt(rand());
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
      arr[i * 3 + 2] = r * Math.cos(phi) * 0.6 - 2;
    }
    return arr;
  }, [rand]);

  // Slight per-particle phase offsets for the sine-wave float
  const phases = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i] = rand() * Math.PI * 2;
    }
    return arr;
  }, [rand]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const geo = pointsRef.current.geometry as BufferGeometry;
    const posAttr = geo.attributes.position as BufferAttribute;

    if (!reduced) {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const baseY = positions[i * 3 + 1];
        posAttr.setY(i, baseY + Math.sin(t * 0.4 + phases[i]) * 0.15);
      }
      posAttr.needsUpdate = true;

      // gentle parallax tilt toward cursor (±~0.35 rad range)
      pointsRef.current.rotation.y = MathUtils.lerp(
        pointsRef.current.rotation.y,
        mouse.current.x * 0.08,
        0.03,
      );
      pointsRef.current.rotation.x = MathUtils.lerp(
        pointsRef.current.rotation.x,
        mouse.current.y * 0.05,
        0.03,
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color={TOKENS.cerulean}
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** A single low-poly wireframe fragment, slowly rotating — "the model being built". */
function WireframeFragment({ reduced }: { reduced: boolean }) {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current || reduced) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.06;
    meshRef.current.rotation.x = Math.sin(t * 0.08) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={[3.2, 0.6, -3]} scale={2.4}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color={TOKENS.emerald} wireframe transparent opacity={0.08} />
    </mesh>
  );
}

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 1.02 },
      { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" },
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Layer 1: radial glow, CSS only — cheapest, always rendered */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 68% 42%, ${TOKENS.emerald}22 0%, ${TOKENS.cerulean}14 35%, transparent 65%)`,
        }}
      />

      {/* Layer 2 & 3: R3F scene — skipped entirely on reduced motion for perf,
          the CSS glow above still carries the atmosphere on its own. */}
      {!reduced && (
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 1.5]}
          style={{ position: "absolute", inset: 0 }}
        >
          <ParticleField reduced={reduced} />
          <WireframeFragment reduced={reduced} />
        </Canvas>
      )}
    </div>
  );
}