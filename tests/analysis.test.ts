import { expect, it } from "vitest";
import { compareCategories, relativeChange } from "../src/services/analysis";
it("compares totals and keeps category share relative to the whole dataset", () => {
  const all = compareCategories();
  expect(all.previous).toBe(18450);
  expect(all.current).toBe(25250);
  expect(all.change).toBeCloseTo(6800 / 18450);
  const filtered = compareCategories(1);
  expect(filtered.rows).toHaveLength(1);
  expect(filtered.current).toBe(12650);
  expect(filtered.rows[0].share).toBeCloseTo(12650 / 25250);
  expect(all.rows.reduce((s, r) => s + r.share, 0)).toBeCloseTo(1);
});
it("does not report a misleading percentage for zero baselines or declines", () => {
  expect(relativeChange(0, 100)).toBeNull();
  expect(relativeChange(100, 75)).toBe(-0.25);
});
