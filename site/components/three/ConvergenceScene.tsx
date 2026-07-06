"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
// Named imports only — `import * as THREE` defeats tree-shaking and blows
// the §4.3 bundle budget by keeping all of three.js in the chunk.
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  MathUtils,
  PointsMaterial,
  type DirectionalLight,
  type Mesh,
  type Points,
} from "three";
import { TOKENS } from "@/lib/tokens";
import { BRANCHES } from "@/lib/branches";
import { createCoreMaterial, createRingMaterial } from "./materials";
import { PetalMesh } from "./PetalMesh";
import { useScrollStore } from "./scrollStore";

const RING_MAJOR = 1.72;
const RING_TUBE = 0.16;
const CORE_RADIUS = 0.8;
const PARTICLE_COUNT = 220;

type ConvergenceSceneProps = {
  /** Called once if the runtime FPS probe fails — parent drops to CSS tier. */
  onDegrade: () => void;
  /** Client-side navigation callback (router.push) — props cross the Canvas
   *  reconciler boundary even though context doesn't. */
  navigate: (href: string) => void;
};

/**
 * The emerald glow is done entirely in the core shader's emissive term —
 * a postprocessing bloom pass would cost ~150KB gz against the §4.3
 * 180KB budget for a subtle gain.
 */
export function ConvergenceScene({ onDegrade, navigate }: ConvergenceSceneProps) {
  const coreRef = useRef<Mesh>(null!);
  const ringRef = useRef<Mesh>(null!);
  const particlesRef = useRef<Points>(null!);
  const lightRef = useRef<DirectionalLight>(null!);
  const camera = useThree((s) => s.camera);
  const pointer = useThree((s) => s.pointer);
  // Cursor-drift target (damped toward pointer at rest, returns to origin on scroll)
  const driftX = useRef(0);
  const driftY = useRef(0);

  const ringMaterial = useMemo(() => createRingMaterial(RING_MAJOR, RING_TUBE), []);
  const coreMaterial = useMemo(() => createCoreMaterial(CORE_RADIUS), []);

  const particleGeometry = useMemo(() => {
    // Seeded PRNG (mulberry32): the field is decorative, so a fixed seed
    // keeps the memo pure and the layout identical across mounts.
    let seed = 0x9e3779b9;
    const rand = () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 2.2 + rand() * 2.6;
      const theta = rand() * Math.PI * 2;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = Math.sin(theta) * r * 0.8;
      positions[i * 3 + 2] = -1.2 - rand() * 1.6;
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(positions, 3));
    return geo;
  }, []);

  const particleMaterial = useMemo(
    () =>
      new PointsMaterial({
        color: new Color(TOKENS.cerulean),
        size: 0.025,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      ringMaterial.dispose();
      coreMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, [ringMaterial, coreMaterial, particleGeometry, particleMaterial]);

  // Runtime FPS probe: average the first second; below ~30fps, bail out.
  const probe = useRef({ frames: 0, elapsed: 0, done: false });

  useFrame((state, delta) => {
    const { progress } = useScrollStore.getState();

    const p = probe.current;
    if (!p.done) {
      p.frames += 1;
      p.elapsed += delta;
      if (p.elapsed >= 1) {
        p.done = true;
        if (p.frames / p.elapsed < 30) onDegrade();
      }
    }

    // Cursor-reactive drift: at rest (progress < 0.05), the camera drifts
    // a few degrees toward the pointer — subtle, capped, damped. As scroll
    // begins, drift target returns to 0 so the camera settles back to base.
    const driftStrength = Math.max(0, 1 - progress / 0.05);
    const targetX = pointer.x * 0.3 * driftStrength;
    const targetY = pointer.y * 0.3 * driftStrength;
    driftX.current = MathUtils.damp(driftX.current, targetX, 4, delta);
    driftY.current = MathUtils.damp(driftY.current, targetY, 4, delta);
    camera.position.x = driftX.current;
    camera.position.y = driftY.current;
    // Base z is 7 (set in ConvergenceCanvas); keep it fixed.
    camera.position.z = 7;

    // Scene fade over p 0.7–1.0 (§4.2 handoff)
    const fade = 1 - MathUtils.clamp((progress - 0.7) / 0.3, 0, 1);
    ringMaterial.uniforms.uOpacity.value = fade;
    coreMaterial.uniforms.uOpacity.value = fade;
    particleMaterial.opacity = 0.18 * fade;

    // Core: slow rotation + faint breathing glow at rest
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.z = Math.sin(t * 0.25) * 0.05;
      coreMaterial.uniforms.uEmissive.value =
        0.3 + Math.sin(t * 1.2) * 0.05 * (1 - progress);
    }

    // Particle drift — texture, not a focal element
    if (particlesRef.current) {
      particlesRef.current.rotation.z = t * 0.012;
    }
  });

  return (
    <>
      {/* Soft key + fill; precise, optical read — deliberately under-lit */}
      <ambientLight intensity={1.3} />
      <directionalLight ref={lightRef} position={[2.5, 3.5, 4]} intensity={0.9} />
      <directionalLight position={[-3, -1.5, 2]} intensity={0.25} color={TOKENS.cerulean} />

      <points ref={particlesRef} geometry={particleGeometry} material={particleMaterial} />

      {/* Layering mirrors the logo: ring behind, petals between, core on top */}
      <mesh ref={ringRef} material={ringMaterial} position={[0, 0, -0.14]}>
        <torusGeometry args={[RING_MAJOR, RING_TUBE, 24, 96]} />
      </mesh>

      {/* Diamond core — flattened octahedron, navy points -> emerald center */}
      <mesh ref={coreRef} material={coreMaterial} scale={[1, 1, 0.4]} position={[0, 0, 0.32]}>
        <octahedronGeometry args={[CORE_RADIUS, 0]} />
      </mesh>

      {BRANCHES.map((b, i) => (
        <PetalMesh key={b.branch} branch={b.branch} index={i} navigate={navigate} />
      ))}
    </>
  );
}
