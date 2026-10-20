import { test, expect } from "@playwright/test";
import ExcelJS from "exceljs";
test.beforeEach(async ({ page }) => {
  page.on("pageerror", (error) => {
    throw error;
  });
});
test("language preference, theme, navigation and mobile layout", async ({
  page,
}) => {
  await page.goto("/es/");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await page.getByRole("button", { name: "Cambiar tema" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("link", { name: "Read in English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.goto("/");
  await expect(page).toHaveURL(/\/en\//);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .locator("#navigation")
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(page).toHaveURL(/#services$/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("dashboard filters, report processing, download and error handling", async ({
  page,
}) => {
  await page.goto("/es/");
  await expect(page.locator("#metric-0")).not.toHaveText("—");
  const original = await page.locator("#metric-0").textContent();
  await page.locator("#category").selectOption("1");
  await expect(page.locator("#metric-0")).not.toHaveText(original!);
  await expect(page.locator("#sales-table tr")).toHaveCount(3);
  await page.getByRole("tab", { name: "Proceso ETL" }).click();
  await page.locator("#files").setInputFiles({
    name: "demo.csv",
    mimeType: "text/csv",
    buffer: Buffer.from(
      "id,product,category,amount\n1,A,B,10\n1,A,B,10\n2,C,B,20",
    ),
  });
  await page.locator("#process").click();
  await expect(page.locator("#file-status")).toContainText("2 / 1 /");
  await expect(page.locator("#preview tbody tr")).toHaveCount(2);
  const download = page.waitForEvent("download");
  await page.locator("#download").click();
  expect((await download).suggestedFilename()).toBe("processed.csv");
  await page.locator("#files").setInputFiles({
    name: "bad.csv",
    mimeType: "text/csv",
    buffer: Buffer.from("wrong\ndata"),
  });
  await page.locator("#process").click();
  await expect(page.locator("#file-status")).toContainText(
    "No se pudo procesar",
  );
  await expect(page.locator("#download")).toBeHidden();
});
test("quarterly analysis filters and honest contact configuration", async ({
  page,
}) => {
  await page.goto("/en/");
  await page.getByRole("tab", { name: /Data analysis/ }).click();
  await expect(page.locator("#analysis-metric-1")).toHaveText("$25,250.00");
  await expect(page.locator("#analysis-table tr")).toHaveCount(3);
  await page.locator("#analysis-category").selectOption("1");
  await expect(page.locator("#analysis-metric-1")).toHaveText("$12,650.00");
  await expect(page.locator("#analysis-table tr")).toHaveCount(1);
  await page.locator("#analysis-category").selectOption("0");
  await expect(page.locator("#analysis-table tr")).toHaveCount(3);
  await page.setViewportSize({ width: 375, height: 812 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await expect(page.locator("#contact-form button")).toBeDisabled();
});
test("XLSX input works and formula cells are rejected", async ({ page }) => {
  await page.goto("/en/");
  await page.getByRole("tab", { name: "ETL workflow" }).click();
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Demo");
  sheet.addRow(["id", "product", "category", "amount"]);
  sheet.addRow(["1", "Sample", "Equipment", 25]);
  await page.locator("#files").setInputFiles({
    name: "demo.xlsx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    buffer: Buffer.from(await workbook.xlsx.writeBuffer()),
  });
  await page.locator("#process").click();
  await expect(page.locator("#file-status")).toContainText("1 / 0 /");
  sheet.getCell("D2").value = { formula: "1+1", result: 2 };
  await page.locator("#files").setInputFiles({
    name: "formula.xlsx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    buffer: Buffer.from(await workbook.xlsx.writeBuffer()),
  });
  await page.locator("#process").click();
  await expect(page.locator("#file-status")).toContainText("Unable to process");
});
test("keyboard tabs, semantic labels and visual review captures", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/es/");
  await expect(page.locator("#metric-0")).not.toHaveText("—");
  await page.screenshot({
    path: "test-results/desktop-dark.png",
    fullPage: true,
  });
  await page.locator("#tab-0").focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#tab-1")).toBeFocused();
  await expect(page.locator("#panel-1")).toBeVisible();
  expect(await page.locator("h1").count()).toBe(1);
  expect(
    await page
      .locator("input:not([type=hidden]),select,textarea")
      .evaluateAll((elements) =>
        elements.every((e) => !!document.querySelector(`label[for="${e.id}"]`)),
      ),
  ).toBe(true);
  await page.getByRole("button", { name: "Cambiar tema" }).click();
  await page.screenshot({
    path: "test-results/desktop-light.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({
    path: "test-results/mobile-light.png",
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
