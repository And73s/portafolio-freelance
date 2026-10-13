import { describe, it, expect } from "vitest";
import {
  consolidate,
  validateRows,
  exportCSV,
  safeCell,
} from "../src/services/reports";
describe("report validation and safe exports", () => {
  const sample = { id: "001", product: "A", category: "B", amount: "12.50" };
  it("normalizes records and removes exact duplicates without losing distinct IDs", () => {
    const result = consolidate(
      validateRows([sample, sample, { ...sample, id: "002" }]),
    );
    expect(result.rows).toHaveLength(2);
    expect(result.duplicates).toBe(1);
    expect(result.total).toBe(25);
  });
  it("rejects missing fields, invalid numbers, formulas and excessive rows", () => {
    for (const row of [
      { id: "1" },
      { ...sample, amount: "=1+1" },
      { ...sample, amount: "Infinity" },
      { ...sample, amount: "1e9" },
      { ...sample, product: { formula: "X" } },
    ])
      expect(() => validateRows([row])).toThrow();
    expect(() => validateRows(Array(10001).fill(sample))).toThrow();
  });
  it("escapes formula prefixes even after whitespace and CSV quotes", () => {
    for (const input of ["=1+1", " +SUM(A1)", "\t@evil", "-5", "\r=1"])
      expect(safeCell(input)).toBe(`'${input}`);
    expect(
      exportCSV([
        { id: "1", product: "=SUM(1,2)", category: "test", amount: 4 },
      ]),
    ).toContain('"\'=SUM(1,2)"');
  });
});
