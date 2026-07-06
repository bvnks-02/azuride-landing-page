"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
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
};

/**
 * The emerald glow is done entirely in the core shader's emissive term —
 * a postprocessing bloom pass would cost ~150KB gz against the §4.3
 * 180KB budget for a subtle gain.
 */
export function ConvergenceScene({ onDegrade }: ConvergenceSceneProps) {
  const coreRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.Points>(null!);
  const lightRef = useRef<THREE.DirectionalLight>(null!);

  const ringMaterial = useMemo(() => createRingMaterial(RING_MAJOR, RING_TUBE), []);
  const coreMaterial = useMemo(() => createCoreMaterial(CORE_RADIUS), []);

  const particleGeometry = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 2.2 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = Math.sin(theta) * r * 0.8;
      positions[i * 3 + 2] = -1.2 - Math.random() * 1.6;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const particleMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color(TOKENS.cerulean),
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

    // Scene fade over p 0.7–1.0 (§4.2 handoff)
    const fade = 1 - THREE.MathUtils.clamp((progress - 0.7) / 0.3, 0, 1);
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
        <PetalMesh key={b.branch} branch={b.branch} index={i} />
      ))}
    </>
  );
}
