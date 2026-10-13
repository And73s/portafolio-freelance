import { translations, type Locale } from "../i18n";
import { exportCSV, type RecordRow } from "../services/reports";
import { download } from "../utils/download";
const root = document.querySelector<HTMLElement>(".lab")!;
const lang = root.dataset.locale as Locale,
  t = translations[lang];
const money = (n: number) =>
  new Intl.NumberFormat(lang, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);
const el = <T extends HTMLElement = HTMLElement>(id: string) =>
  document.getElementById(id) as T;
const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>("[role=tab]"));
function activate(index: number, focus = false) {
  tabs.forEach((tab, i) => {
    tab.setAttribute("aria-selected", String(i === index));
    tab.tabIndex = i === index ? 0 : -1;
    el(`panel-${i}`).hidden = i !== index;
  });
  if (focus) tabs[index].focus();
}
tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => activate(i));
  tab.addEventListener("keydown", (e) => {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % 3;
    else if (e.key === "ArrowLeft") next = (i + 2) % 3;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 2;
    else return;
    e.preventDefault();
    activate(next, true);
  });
});
document
  .querySelectorAll<HTMLElement>("[data-demo-link]")
  .forEach((a) =>
    a.addEventListener("click", () => activate(Number(a.dataset.demoLink))),
  );
function row(parent: HTMLElement, values: string[]) {
  const tr = document.createElement("tr");
  values.forEach((value) => {
    const td = document.createElement("td");
    td.textContent = value;
    tr.append(td);
  });
  parent.append(tr);
}
async function dashboard() {
  const { Chart, registerables } = await import("chart.js");
  Chart.register(...registerables);
  let revision = 0;
  const monthly = [
    [2800, 1100, 1600],
    [3250, 1250, 1800],
    [3100, 1450, 2100],
    [3800, 1650, 1950],
    [4200, 1800, 2400],
    [4650, 2100, 2700],
  ];
  const charts: InstanceType<typeof Chart>[] = [];
  function update() {
    const count = Number(el<HTMLSelectElement>("period").value),
      category = Number(el<HTMLSelectElement>("category").value);
    const data = monthly
      .slice(-count)
      .map((r, i) => r.map((n, j) => n + revision * (i + 1) * (j + 1) * 37));
    const totals = data.map((r) =>
      r.reduce((s, n, j) => s + (!category || category === j + 1 ? n : 0), 0),
    );
    const total = totals.reduce((a, b) => a + b, 0);
    const orders = data.reduce(
      (sum, r) =>
        sum +
        r.reduce(
          (s, n, j) =>
            s +
            (!category || category === j + 1
              ? Math.round(n / [75, 25, 120][j])
              : 0),
          0,
        ),
      0,
    );
    el("metric-0").textContent = money(total);
    el("metric-1").textContent = String(orders);
    el("metric-2").textContent = money(total / orders);
    const labels = data.map((_, i) =>
      new Intl.DateTimeFormat(lang, { month: "short", timeZone: "UTC" }).format(
        new Date(Date.UTC(2026, 6 - count + i, 1)),
      ),
    );
    el("sales-table").replaceChildren();
    labels.forEach((label, i) =>
      row(el("sales-table"), [label, money(totals[i])]),
    );
    const catTotals = [0, 1, 2].map((j) => data.reduce((s, r) => s + r[j], 0));
    el("top-table").replaceChildren();
    catTotals
      .map((n, j) => ({ n, j }))
      .filter(({ j }) => !category || category === j + 1)
      .sort((a, b) => b.n - a.n)
      .forEach(({ n, j }) =>
        row(el("top-table"), [
          `${t.products[j]} · ${t.categories[j + 1]}`,
          money(n),
        ]),
      );
    charts.forEach((c) => c.destroy());
    charts.length = 0;
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--muted")
      .trim();
    const grid = getComputedStyle(document.documentElement)
      .getPropertyValue("--line")
      .trim();
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();
    charts.push(
      new Chart(el<HTMLCanvasElement>("sales-chart"), {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: t.sales,
              data: totals,
              borderColor: accent,
              backgroundColor: accent,
              tension: 0.25,
              pointRadius: 3,
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color }, grid: { display: false } },
            y: { ticks: { color }, grid: { color: grid } },
          },
        },
      }),
    );
    charts.push(
      new Chart(el<HTMLCanvasElement>("category-chart"), {
        type: "bar",
        data: {
          labels: t.categories.slice(1),
          datasets: [
            {
              label: t.sales,
              data: catTotals.map((n, j) =>
                !category || category === j + 1 ? n : 0,
              ),
              backgroundColor: [accent, "#7d97b5", "#5e7e9d"],
              borderRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          indexAxis: "y",
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color }, grid: { color: grid } },
            y: { ticks: { color }, grid: { display: false } },
          },
        },
      }),
    );
  }
  update();
  ["period", "category"].forEach((id) =>
    el(id).addEventListener("change", update),
  );
  el("refresh").addEventListener("click", () => {
    revision++;
    update();
  });
  document.addEventListener("themechange", update);
}
void dashboard();
let processed: RecordRow[] = [];
el("sample").addEventListener("click", () =>
  download(
    "id,product,category,amount\r\nD001,Sample A,Equipment,125.50\r\nD002,Sample B,Supplies,48.00\r\nD001,Sample A,Equipment,125.50",
    "sample.csv",
  ),
);
el("process").addEventListener("click", () => {
  processed = [];
  el("download").hidden = true;
  el("preview").hidden = true;
  const button = el<HTMLButtonElement>("process");
  button.disabled = true;
  el("file-status").textContent = lang === "es" ? "Procesando…" : "Processing…";
  const worker = new Worker(
    new URL("../services/report.worker.ts", import.meta.url),
    { type: "module" },
  );
  const finish = () => {
    worker.terminate();
    clearTimeout(timeout);
    button.disabled = false;
  };
  const fail = () => {
    el("file-status").textContent = t.fileError;
    finish();
  };
  const timeout = setTimeout(fail, 15000);
  worker.onerror = fail;
  worker.onmessage = (event) => {
    if (!event.data.ok) {
      fail();
      return;
    }
    const result = event.data.result as {
      rows: RecordRow[];
      duplicates: number;
      total: number;
    };
    processed = result.rows;
    el("file-status").textContent =
      `${t.fileDone}: ${processed.length} / ${result.duplicates} / ${money(result.total)}`;
    const tbody = el("preview").querySelector("tbody")!;
    tbody.replaceChildren();
    processed
      .slice(0, 20)
      .forEach((r) =>
        row(tbody, [r.id, r.product, r.category, money(r.amount)]),
      );
    el("preview").hidden = false;
    el("download").hidden = false;
    finish();
  };
  worker.postMessage(Array.from(el<HTMLInputElement>("files").files ?? []));
});
el("download").addEventListener("click", () =>
  download(exportCSV(processed), "processed.csv"),
);
const quantities = [0, 0, 0],
  prices = [35, 12, 24];
let status = -1;
function renderCart() {
  const cart = el("cart");
  cart.replaceChildren();
  let total = 0;
  quantities.forEach((q, i) => {
    if (!q) return;
    total += q * prices[i];
    const li = document.createElement("li"),
      label = document.createElement("span");
    label.textContent = `${t.products[i]} × ${q}`;
    const remove = document.createElement("button");
    remove.className = "button-small";
    remove.textContent = t.remove;
    remove.disabled = status !== -1;
    remove.setAttribute("aria-label", `${t.remove}: ${t.products[i]}`);
    remove.addEventListener("click", () => {
      quantities[i] = 0;
      renderCart();
    });
    li.append(label, remove);
    cart.append(li);
  });
  if (!total) cart.textContent = t.empty;
  el("cart-total").textContent = money(total);
  el<HTMLButtonElement>("confirm").disabled = !total || status !== -1;
  el("confirm").hidden = status !== -1;
  el("next").hidden = status < 0 || status === 2;
  el("order-state").textContent =
    status < 0 ? "" : `DEMO-001 · ${t.states[status]}`;
  root
    .querySelectorAll<HTMLButtonElement>("[data-add]")
    .forEach(
      (b) =>
        (b.disabled = status !== -1 || quantities[Number(b.dataset.add)] >= 99),
    );
}
root.querySelectorAll<HTMLElement>("[data-add]").forEach((b) =>
  b.addEventListener("click", () => {
    const index = Number(b.dataset.add);
    if (status === -1 && quantities[index] < 99) quantities[index]++;
    renderCart();
  }),
);
el("confirm").addEventListener("click", () => {
  if (quantities.some(Boolean) && status === -1) status = 0;
  renderCart();
});
el("next").addEventListener("click", () => {
  if (status >= 0 && status < 2) status++;
  renderCart();
});
el("reset").addEventListener("click", () => {
  quantities.fill(0);
  status = -1;
  renderCart();
});
renderCart();
