import Papa from "papaparse";
export interface RecordRow {
  id: string;
  product: string;
  category: string;
  amount: number;
}
const fields = ["id", "product", "category", "amount"] as const;
export function validateRows(rows: unknown[]): RecordRow[] {
  if (!rows.length || rows.length > 10000) throw new Error("rows");
  return rows.map((value) => {
    if (!value || typeof value !== "object") throw new Error("row");
    const row = value as Record<string, unknown>;
    if (
      fields.some((k) => !(k in row)) ||
      fields
        .slice(0, 3)
        .some(
          (k) =>
            typeof row[k] !== "string" ||
            !String(row[k]).trim() ||
            String(row[k]).length > 200,
        )
    )
      throw new Error("columns");
    const amount = String(row.amount).trim();
    if (
      !/^-?\d+(\.\d{1,2})?$/.test(amount) ||
      !Number.isFinite(Number(amount)) ||
      Math.abs(Number(amount)) > 1e9
    )
      throw new Error("amount");
    return {
      id: String(row.id).trim(),
      product: String(row.product).trim(),
      category: String(row.category).trim(),
      amount: Number(amount),
    };
  });
}
export function consolidate(rows: RecordRow[]) {
  const seen = new Set<string>();
  const unique = rows.filter((row) => {
    const key = JSON.stringify([row.id, row.product, row.category, row.amount]);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return {
    rows: unique,
    duplicates: rows.length - unique.length,
    total: unique.reduce((sum, r) => sum + r.amount, 0),
  };
}
export function safeCell(value: unknown) {
  const s = String(value);
  return /^[\s\u0000-\u001f]*[=+@-]/.test(s) || /^[\t\r\n]/.test(s)
    ? `'${s}`
    : s;
}
export function exportCSV(rows: RecordRow[]) {
  return Papa.unparse(
    {
      fields: [...fields],
      data: rows.map((r) => fields.map((f) => safeCell(r[f]))),
    },
    { newline: "\r\n" },
  );
}
export async function readFiles(files: File[]) {
  if (
    !files.length ||
    files.length > 5 ||
    files.some(
      (f) =>
        !f.size ||
        f.size > 2 * 1024 * 1024 ||
        !/^.+\.(csv|xlsx)$/i.test(f.name),
    )
  )
    throw new Error("limits");
  const all: RecordRow[] = [];
  for (const file of files) {
    let rows: unknown[];
    if (file.name.toLowerCase().endsWith(".csv")) {
      const parsed = Papa.parse<Record<string, string>>(await file.text(), {
        header: true,
        skipEmptyLines: "greedy",
        transformHeader: (h) => h.replace(/^\uFEFF/, "").trim(),
      });
      if (parsed.errors.length) throw new Error("csv");
      rows = parsed.data;
    } else {
      const { default: ExcelJS } = await import("exceljs");
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(await file.arrayBuffer());
      const sheet = workbook.worksheets[0];
      if (!sheet || sheet.rowCount > 10001 || sheet.columnCount > 20)
        throw new Error("sheet");
      const header = sheet.getRow(1).values as unknown[];
      const keys = header.slice(1).map(String);
      if (!fields.every((f) => keys.includes(f))) throw new Error("header");
      rows = [];
      sheet.eachRow((r, index) => {
        if (index === 1) return;
        const row: Record<string, unknown> = {};
        keys.forEach((key, i) => {
          const value = r.getCell(i + 1).value;
          if (value !== null && typeof value === "object")
            throw new Error("formula or object");
          row[key] = key === "amount" ? value : String(value ?? "");
        });
        rows.push(row);
      });
    }
    all.push(...validateRows(rows));
    if (all.length > 10000) throw new Error("total rows");
  }
  return consolidate(all);
}
