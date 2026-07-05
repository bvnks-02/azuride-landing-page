"use client";

import { Canvas } from "@react-three/fiber";
import { ConvergenceScene } from "./ConvergenceScene";

type ConvergenceCanvasProps = {
  onDegrade: () => void;
  enableBloom: boolean;
};

/** The lazy-loaded WebGL entry point — nothing outside components/three
 *  imports three (build spec §6 bundle boundary). */
export default function ConvergenceCanvas({
  onDegrade,
  enableBloom,
}: ConvergenceCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.4], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
      tabIndex={-1}
      className="!pointer-events-auto"
    >
      <ConvergenceScene onDegrade={onDegrade} enableBloom={enableBloom} />
    </Canvas>
  );
}
