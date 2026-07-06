"use client";

import { Canvas } from "@react-three/fiber";
import { ConvergenceScene } from "./ConvergenceScene";

type ConvergenceCanvasProps = {
  onDegrade: () => void;
  navigate: (href: string) => void;
};

/** The lazy-loaded WebGL entry point — nothing outside components/three
 *  imports three (build spec §6 bundle boundary). */
export default function ConvergenceCanvas({ onDegrade, navigate }: ConvergenceCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 48 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
      tabIndex={-1}
      className="!pointer-events-auto"
    >
      <ConvergenceScene onDegrade={onDegrade} navigate={navigate} />
    </Canvas>
  );
}
