/**
 * Curated `three` surface for the §4.3 bundle budget.
 *
 * `@react-three/fiber` does `import * as THREE from "three"` internally and
 * uses the whole namespace as its JSX catalogue, which retains all of
 * three.js in the lazy chunk (~229KB gz) no matter how app code imports it.
 * The `three` specifier is aliased to this module (next.config.ts →
 * turbopack.resolveAlias), so fiber's namespace — and therefore the bundle —
 * only spans what the Convergence scene actually uses. Imports here go to
 * `three/src/Three.js` (bare files, best tree-shaking granularity), which the
 * alias does not touch.
 *
 * If the scene gains a new three class or JSX intrinsic (<sphereGeometry>,
 * <pointLight>, ...), add its export here or it will be undefined at runtime.
 */
export {
  // fiber internals (grep `THREE.` in @react-three/fiber/dist/*.esm.js).
  // All of these are referenced via `import * as THREE` inside fiber; even
  // the shadow-map types and OrthographicCamera (only used in dead code
  // paths when shadows/orthographic are disabled) must exist at module
  // resolution time or Turbopack fails the build. They're cheap (enum
  // constants / class refs tree-shaken out of the runtime path).
  ACESFilmicToneMapping,
  BasicShadowMap,
  Clock,
  Color,
  ColorManagement,
  Layers,
  LinearSRGBColorSpace,
  NoToneMapping,
  Object3D,
  OrthographicCamera,
  PCFShadowMap,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Raycaster,
  RGBAFormat,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  UnsignedByteType,
  Vector2,
  Vector3,
  VSMShadowMap,
  WebGLRenderer,
  // scene code (components/three/**)
  BufferAttribute,
  BufferGeometry,
  ExtrudeGeometry,
  IcosahedronGeometry,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Points,
  PointsMaterial,
  Shape,
  // JSX intrinsics used in the scene
  AmbientLight,
  DirectionalLight,
  Group,
  OctahedronGeometry,
  TorusGeometry,
} from "three/src/Three.js";
