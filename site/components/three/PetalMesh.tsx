"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BRANCH_ACCENT, type Branch } from "@/lib/tokens";
import { BRANCHES } from "@/lib/branches";
import { createPetalGeometry } from "./materials";
import { useScrollStore } from "./scrollStore";

const WHITE = new THREE.Color("#F5F8FA");

type PetalMeshProps = {
  branch: Branch;
  /** 0..3 — quadrant index; petal points outward at index * 90°. */
  index: number;
};

/**
 * One petal of the mark. Progress mapping per build spec §4.2:
 *   0.0–0.4  separate outward along the petal's own radial axis
 *   0.4–0.7  flatten toward camera, scale up, tint white -> accent
 *   0.7–1.0  fade with the whole scene (opacity handled here per-material)
 * Hover at rest (progress < 0.05): full accent tint + DOM teaser via store.
 */
export function PetalMesh({ branch, index }: PetalMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  const geometry = useMemo(() => createPetalGeometry(), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: WHITE.clone(),
        roughness: 0.5,
        metalness: 0.02,
        transparent: true,
        // matte white must read as the logo's white, not gallery gray
        emissive: WHITE.clone(),
        emissiveIntensity: 0.35,
      }),
    [],
  );

  const angle = (index * Math.PI) / 2; // N, E, S, W
  const accent = useMemo(() => new THREE.Color(BRANCH_ACCENT[branch]), [branch]);
  const tmpColor = useMemo(() => new THREE.Color(), []);
  const tipWorld = useMemo(() => new THREE.Vector3(), []);
  const hoverRef = useRef(0); // smoothed hover amount

  useFrame((_, delta) => {
    const { progress, hovered, setTeaserPos } = useScrollStore.getState();
    const group = groupRef.current;
    const mesh = meshRef.current;
    if (!group || !mesh) return;

    // Phase 1: outward separation along own axis
    const p1 = THREE.MathUtils.clamp(progress / 0.4, 0, 1);
    const eased1 = 1 - Math.pow(1 - p1, 3);
    // rest: inner tip near center so tips graze the ring's inner edge
    const travel = 0.08 + eased1 * 1.15;
    group.position.set(Math.sin(angle) * travel, Math.cos(angle) * travel, 0);
    // unfold: slight backward tilt at rest, flattening as it separates
    group.rotation.set((1 - eased1) * -0.12, 0, -angle);

    // Phase 2: face camera, grow, tint
    const p2 = THREE.MathUtils.clamp((progress - 0.4) / 0.3, 0, 1);
    const eased2 = 1 - Math.pow(1 - p2, 3);
    const s = 1 + eased2 * 0.15;
    group.scale.setScalar(s);

    // Hover only meaningful at rest
    const isHovered = hovered === branch && progress < 0.05;
    hoverRef.current = THREE.MathUtils.damp(hoverRef.current, isHovered ? 1 : 0, 8, delta);

    const tint = Math.max(eased2, hoverRef.current);
    material.color.copy(tmpColor.copy(WHITE).lerp(accent, tint));
    material.emissive.copy(material.color);

    // Phase 3: scene fade
    const p3 = THREE.MathUtils.clamp((progress - 0.7) / 0.3, 0, 1);
    material.opacity = 1 - p3;

    // Teaser anchor: project the petal tip to screen space
    if (isHovered) {
      tipWorld.set(0, 1.15, 0).applyMatrix4(mesh.matrixWorld).project(camera);
      setTeaserPos({
        x: ((tipWorld.x + 1) / 2) * size.width,
        y: ((1 - tipWorld.y) / 2) * size.height,
      });
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={material}
        onClick={() => {
          // Canvas lives in its own reconciler root, outside the router
          // context — plain navigation is the reliable path here.
          if (useScrollStore.getState().progress < 0.05) {
            const target = BRANCHES.find((b) => b.branch === branch);
            if (target) window.location.assign(target.href);
          }
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          const { progress, setHovered } = useScrollStore.getState();
          if (progress < 0.05) {
            setHovered(branch);
            document.body.style.cursor = "pointer";
          }
        }}
        onPointerOut={() => {
          const { setHovered, setTeaserPos } = useScrollStore.getState();
          setHovered(null);
          setTeaserPos(null);
          document.body.style.cursor = "";
        }}
      />
    </group>
  );
}
