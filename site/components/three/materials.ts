import * as THREE from "three";
import { TOKENS } from "@/lib/tokens";

/**
 * Shader materials for the mark (build spec §4.1): vertex-based radial
 * gradients instead of baked textures, so they stay crisp at any zoom and
 * the stops stay animatable.
 */

/** Ring: cerulean at the outer rim -> ink navy toward the hole. */
export function createRingMaterial(majorRadius: number, tubeRadius: number) {
  return new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      uOuter: { value: new THREE.Color(TOKENS.cerulean) },
      uInner: { value: new THREE.Color(TOKENS.navy) },
      uMin: { value: majorRadius - tubeRadius },
      uMax: { value: majorRadius + tubeRadius },
      uOpacity: { value: 1 },
    },
    vertexShader: /* glsl */ `
      varying float vRadial;
      uniform float uMin;
      uniform float uMax;
      void main() {
        float r = length(position.xy);
        vRadial = clamp((r - uMin) / (uMax - uMin), 0.0, 1.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vRadial;
      uniform vec3 uOuter;
      uniform vec3 uInner;
      uniform float uOpacity;
      void main() {
        gl_FragColor = vec4(mix(uInner, uOuter, vRadial), uOpacity);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
}

/** Diamond core: navy at the points -> emerald center, with an emissive
 *  emerald term so it reads as glowing even without bloom. */
export function createCoreMaterial(radius: number) {
  return new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      uEdge: { value: new THREE.Color(TOKENS.navy) },
      uCenter: { value: new THREE.Color(TOKENS.emerald) },
      uRadius: { value: radius },
      uEmissive: { value: 0.3 },
      uOpacity: { value: 1 },
    },
    vertexShader: /* glsl */ `
      varying float vR;
      uniform float uRadius;
      void main() {
        // distance from the camera axis, not 3D length — the emerald must
        // sit at the screen center of the camera-facing diamond
        vR = clamp(length(position.xy) / uRadius, 0.0, 1.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vR;
      uniform vec3 uEdge;
      uniform vec3 uCenter;
      uniform float uEmissive;
      uniform float uOpacity;
      void main() {
        float t = smoothstep(0.05, 0.72, vR);
        vec3 c = mix(uCenter, uEdge, t);
        c += uCenter * uEmissive * (1.0 - t);
        gl_FragColor = vec4(c, uOpacity);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
}

/** Petal outline geometry: a vesica ("lens") pointing +Y, built from two
 *  quadratic curves, extruded thin. Local origin sits at the inner tip so
 *  rotation/translation along the petal's own axis reads as unfolding. */
export function createPetalGeometry() {
  const shape = new THREE.Shape();
  const length = 1.5;
  const halfWidth = 0.78;
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(halfWidth, length * 0.42, 0, length);
  shape.quadraticCurveTo(-halfWidth, length * 0.42, 0, 0);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.05,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2,
    curveSegments: 24,
  });
  geometry.center();
  // re-offset so origin is the inner tip (y = -length/2 after centering)
  geometry.translate(0, length / 2, 0);
  return geometry;
}
