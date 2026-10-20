// Fictional quarterly totals: January–March and April–June 2026.
export const quarterlySales = [
  { category: 1, previous: 9150, current: 12650 },
  { category: 2, previous: 3800, current: 5550 },
  { category: 3, previous: 5500, current: 7050 },
];
export function relativeChange(
  previous: number,
  current: number,
): number | null {
  return previous === 0 ? null : (current - previous) / previous;
}
export function compareCategories(category = 0) {
  const total = quarterlySales.reduce((sum, r) => sum + r.current, 0);
  const rows = quarterlySales
    .filter((r) => !category || r.category === category)
    .map((r) => ({
      ...r,
      change: relativeChange(r.previous, r.current),
      share: r.current / total,
    }));
  const previous = rows.reduce((sum, r) => sum + r.previous, 0);
  const current = rows.reduce((sum, r) => sum + r.current, 0);
  return { rows, previous, current, change: relativeChange(previous, current) };
}
