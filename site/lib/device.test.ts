import { describe, expect, it } from "vitest";
import { getRenderTier } from "./device";

describe("getRenderTier", () => {
  const base = {
    reducedMotion: false,
    viewportWidth: 1440,
    webglOk: true,
    hardwareConcurrency: 8,
  };

  it("full 3d on capable desktop", () => {
    expect(getRenderTier(base)).toBe("full3d");
  });

  it("static when reduced motion, regardless of capability", () => {
    expect(getRenderTier({ ...base, reducedMotion: true })).toBe("static");
    expect(
      getRenderTier({ ...base, reducedMotion: true, webglOk: false }),
    ).toBe("static");
  });

  it("css fallback under 768px", () => {
    expect(getRenderTier({ ...base, viewportWidth: 767 })).toBe("css");
  });

  it("css fallback when webgl unavailable", () => {
    expect(getRenderTier({ ...base, webglOk: false })).toBe("css");
  });

  it("css fallback on low core count", () => {
    expect(getRenderTier({ ...base, hardwareConcurrency: 2 })).toBe("css");
  });
});
