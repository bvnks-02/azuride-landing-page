import { describe, expect, it } from "vitest";
import { BRANCH_ACCENT, TOKENS } from "./tokens";

describe("brand tokens", () => {
  it("matches sampled logo hexes exactly", () => {
    expect(TOKENS.emerald).toBe("#14B88B");
    expect(TOKENS.cerulean).toBe("#008FC3");
    expect(TOKENS.harbor).toBe("#0075A1");
    expect(TOKENS.navy).toBe("#004869");
  });

  it("maps branch accents per design.md §2.3", () => {
    expect(BRANCH_ACCENT.construction).toBe(TOKENS.navy);
    expect(BRANCH_ACCENT.communication).toBe(TOKENS.harbor);
    expect(BRANCH_ACCENT.tech).toBe(TOKENS.cerulean);
    expect(BRANCH_ACCENT.healthcare).toBe(TOKENS.emerald);
  });
});
