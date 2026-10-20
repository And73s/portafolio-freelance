export type Locale = "es" | "en";
const es = {
  title: "Dashboards, análisis de datos y ETL",
  description:
    "Carlos Andrés Martínez Portillo. Desarrollo de dashboards, análisis de datos y procesos ETL con Python, SQL, pandas y Power Query.",
  nav: ["Servicios", "Proyectos", "Laboratorio", "Sobre mí", "Contacto"],
  skip: "Saltar al contenido",
  menu: "Abrir navegación",
  theme: "Cambiar tema",
  eyebrow: "DASHBOARDS / ANÁLISIS DE DATOS / ETL",
  hero: "Tus datos, conectados.",
  heroAccent: "Tu operación, más clara.",
  intro:
    "Soy Carlos Andrés Martínez Portillo, ingeniero industrial. Desarrollo dashboards, analizo datos y construyo procesos ETL para convertir archivos dispersos en indicadores que puedas consultar y entender.",
  explore: "Explorar proyectos",
  quote: "Hablemos de tu proyecto",
  role: "Ingeniero industrial · Dashboards y datos",
  available: "Disponible para nuevos proyectos",
  diagramLabel: "DE LA FUENTE AL INDICADOR",
  diagram: [
    "Excel, bases de datos y APIs",
    "Extraer · Transformar · Cargar",
    "Datos preparados para analizar",
  ],
  diagramNote: "Definir el indicador es tan importante como preparar el dato.",
  serviceTitle: "De los datos a las respuestas.",
  serviceIntro:
    "Tres servicios que conectan el origen de la información con las preguntas de tu negocio.",
  services: [
    [
      "Desarrollo de dashboards",
      "Cuando necesitas consultar tus indicadores sin reconstruir un reporte.",
      "Dashboards web con KPIs, filtros y visualizaciones para seguir ventas, producción y operación. Definimos juntos qué medir y cómo interpretarlo.",
    ],
    [
      "Análisis de datos",
      "Cuando los números cambian y necesitas entender dónde.",
      "Análisis exploratorio, comparaciones entre períodos y segmentación con Python, pandas y SQL. Resultados con contexto, supuestos y limitaciones explícitas.",
    ],
    [
      "Procesos ETL",
      "Cuando los datos llegan de distintas fuentes y formatos.",
      "Extracción, transformación y carga desde archivos, bases de datos y APIs. Limpieza, validaciones y consolidación para preparar datasets reutilizables y reportes consistentes.",
    ],
  ],
  projectTitle: "Preparar. Analizar. Visualizar.",
  projectIntro:
    "Explora tres demostraciones de trabajo con datos. Son ejemplos independientes con información completamente ficticia.",
  demoLabel: "CONCEPTO DEMOSTRATIVO",
  projects: [
    [
      "Dashboard comercial",
      "Los indicadores en una sola vista.",
      "Ventas, pedidos y ticket promedio con filtros por período y categoría. Una demo web con tablas y gráficos; las actualizaciones son simuladas.",
      "Chart.js / TypeScript / Visualización de datos",
    ],
    [
      "Flujo ETL de reportes",
      "De archivos dispersos a un dataset limpio.",
      "Extrae registros de CSV y Excel, valida columnas e importes, elimina duplicados y carga el resultado en una vista previa exportable. Todo se procesa en el navegador.",
      "CSV / Excel / Validación / Consolidación",
    ],
    [
      "Análisis de variaciones",
      "Qué cambió entre dos períodos.",
      "Compara ventas entre trimestres, explora categorías y observa su participación en el total. Cálculos descriptivos sobre datos ficticios, sin atribuir causas ni hacer pronósticos.",
      "Comparación de períodos / Segmentación / Estadística descriptiva",
    ],
  ],
  tryDemo: "Probar demostración",
  labTitle: "No solo lo leas. Pruébalo.",
  labIntro:
    "Explora indicadores, prepara un dataset y compara resultados. Las tres demos funcionan localmente en tu navegador.",
  tabs: ["Dashboard", "Proceso ETL", "Análisis de datos"],
  fictitious: "DATOS FICTICIOS · DEMOSTRACIÓN LOCAL",
  period: "Período",
  periods: ["Últimos 3 meses", "Últimos 6 meses"],
  category: "Categoría",
  categories: ["Todas", "Equipamiento", "Insumos", "Servicios"],
  metrics: ["Ventas totales", "Pedidos", "Ticket promedio"],
  evolution: "Evolución de ventas",
  breakdown: "Ventas por categoría",
  top: "Productos destacados",
  chartAlt: "Gráfico de ventas. Los valores también se muestran en la tabla.",
  month: "Mes",
  sales: "Ventas",
  refresh: "Simular actualización",
  fileTitle: "Extrae, transforma y prepara tus datos.",
  fileHelp:
    "CSV o XLSX · Máximo 5 archivos, 2 MB por archivo y 10.000 filas en total. Columnas: id, product, category, amount. Los archivos se procesan localmente y no se suben a un servidor.",
  sample: "Descargar ejemplo CSV",
  upload: "Seleccionar archivos",
  process: "Procesar archivos",
  download: "Descargar CSV limpio",
  fileIdle: "Selecciona uno o varios archivos para comenzar.",
  fileError:
    "No se pudo procesar. Revisa límites, formato, columnas y valores numéricos. No se admiten fórmulas.",
  fileDone: "Registros únicos / duplicados eliminados / importe total",
  preview: "Vista previa · primeros 20 registros",
  products: ["Kit de oficina", "Cuaderno técnico", "Soporte de escritorio"],
  aboutTitle: "El indicador empieza en el proceso.",
  about:
    "Mi formación en ingeniería industrial me ayuda a relacionar los datos con la operación: de dónde vienen, cómo se registran y qué pregunta debe responder cada indicador. Combino Python, SQL, pandas y Power Query para preparar información, analizarla y desarrollar dashboards que permitan consultarla con claridad.",
  aboutNote: "Definiciones claras. Datos validados. Análisis reproducibles.",
  processTitle: "Una forma clara de avanzar.",
  steps: [
    [
      "Entender",
      "Definimos las preguntas, los indicadores y las fuentes disponibles.",
    ],
    [
      "Preparar",
      "Revisamos calidad, formatos y reglas de transformación de los datos.",
    ],
    [
      "Analizar y construir",
      "Exploramos los resultados y desarrollamos el dashboard o flujo ETL.",
    ],
    [
      "Validar y entregar",
      "Contrastamos los cálculos y documentamos fuentes, reglas y actualización.",
    ],
  ],
  written:
    "Comunicación principalmente escrita, decisiones documentadas y entregables acordados.",
  contactTitle: "¿Qué necesitas entender de tus datos?",
  contactIntro:
    "Cuéntame qué fuentes tienes, qué indicadores necesitas y cómo preparas hoy tus reportes.",
  fields: [
    "Nombre",
    "Correo electrónico",
    "Tipo de servicio",
    "Descripción del proyecto",
    "Presupuesto aproximado (opcional)",
  ],
  select: "Selecciona un servicio",
  prepare: "Preparar correo",
  mailHelp:
    "Se abrirá tu aplicación de correo con un borrador. El formulario no envía ni almacena tus datos.",
  unconfigured:
    "Contacto pendiente de configuración: aún no se ha añadido el correo profesional.",
  prepared:
    "Borrador preparado. Revisa y envía el mensaje desde tu aplicación de correo.",
  footer: "Dashboards, análisis de datos y ETL.",
  source: "Perfiles profesionales pendientes de configuración.",
  rights: "Diseñado con intención. Construido con Astro.",
  analysisTitle: "¿Dónde cambió el resultado?",
  analysisIntro:
    "Compara enero–marzo con abril–junio de 2026. Selecciona una categoría para examinar su evolución.",
  analysisLabels: ["Ene–mar 2026", "Abr–jun 2026", "Variación"],
  analysisColumns: [
    "Categoría",
    "Período anterior",
    "Período actual",
    "Variación",
    "Participación actual",
  ],
  analysisNote:
    "Variación = (actual − anterior) / anterior. La participación usa el total de todas las categorías del trimestre actual, incluso al filtrar. Los cambios describen los datos; no explican sus causas.",
  analysisMissing: "No calculable",
  analysisTable: "Comparación trimestral · datos ficticios",
};
type Copy = { [K in keyof typeof es]: (typeof es)[K] };
const en: Copy = {
  title: "Dashboards, data analysis and ETL",
  description:
    "Carlos Andrés Martínez Portillo. Dashboard development, data analysis and ETL pipelines with Python, SQL, pandas and Power Query.",
  nav: ["Services", "Projects", "Lab", "About", "Contact"],
  skip: "Skip to content",
  menu: "Open navigation",
  theme: "Switch theme",
  eyebrow: "DASHBOARDS / DATA ANALYSIS / ETL",
  hero: "Your data, connected.",
  heroAccent: "Your operation, in focus.",
  intro:
    "I’m Carlos Andrés Martínez Portillo, an industrial engineer. I develop dashboards, analyze data and build ETL pipelines to turn scattered files into metrics you can explore and understand.",
  explore: "Explore projects",
  quote: "Let’s discuss your project",
  role: "Industrial engineer · Dashboards & data",
  available: "Available for new projects",
  diagramLabel: "FROM SOURCE TO METRIC",
  diagram: [
    "Spreadsheets, databases and APIs",
    "Extract · Transform · Load",
    "Data ready for analysis",
  ],
  diagramNote: "Defining the metric matters as much as preparing the data.",
  serviceTitle: "From data to answers.",
  serviceIntro:
    "Three services connecting your information sources to your business questions.",
  services: [
    [
      "Dashboard development",
      "When tracking your metrics means rebuilding a report every time.",
      "Web dashboards with KPIs, filters and visualizations for sales, production and operations. We define what to measure and how to interpret it.",
    ],
    [
      "Data analysis",
      "When the numbers change and you need to understand where.",
      "Exploratory analysis, period comparisons and segmentation with Python, pandas and SQL. Findings include context, assumptions and clear limitations.",
    ],
    [
      "ETL pipelines",
      "When your data comes from different sources and formats.",
      "Extract, transform and load data from files, databases and APIs. Cleaning, validation and consolidation to create reusable datasets and consistent reports.",
    ],
  ],
  projectTitle: "Prepare. Analyze. Visualize.",
  projectIntro:
    "Explore three demonstrations of working with data. These independent examples use entirely fictional information.",
  demoLabel: "DEMONSTRATION CONCEPT",
  projects: [
    [
      "Sales dashboard",
      "Your metrics in one view.",
      "Sales, orders and average order value with period and category filters. A web demo with tables and charts; updates are simulated.",
      "Chart.js / TypeScript / Data visualization",
    ],
    [
      "Reporting ETL workflow",
      "From scattered files to a clean dataset.",
      "Extract records from CSV and Excel, validate columns and amounts, remove duplicates and load an exportable preview. Processing stays in your browser.",
      "CSV / Excel / Validation / Consolidation",
    ],
    [
      "Variance analysis",
      "What changed between two periods.",
      "Compare quarterly sales, explore categories and review their share of the total. Descriptive calculations on fictional data, without causal claims or forecasts.",
      "Period comparison / Segmentation / Descriptive statistics",
    ],
  ],
  tryDemo: "Try the demo",
  labTitle: "Don’t just read. Try it.",
  labIntro:
    "Explore metrics, prepare a dataset and compare results. All three demos run locally in your browser.",
  tabs: ["Dashboard", "ETL workflow", "Data analysis"],
  fictitious: "FICTIONAL DATA · LOCAL DEMO",
  period: "Period",
  periods: ["Last 3 months", "Last 6 months"],
  category: "Category",
  categories: ["All", "Equipment", "Supplies", "Services"],
  metrics: ["Total sales", "Orders", "Average order"],
  evolution: "Sales over time",
  breakdown: "Sales by category",
  top: "Top products",
  chartAlt: "Sales chart. Values are also available in the table.",
  month: "Month",
  sales: "Sales",
  refresh: "Simulate an update",
  fileTitle: "Extract, transform and prepare your data.",
  fileHelp:
    "CSV or XLSX · Up to 5 files, 2 MB per file and 10,000 rows in total. Columns: id, product, category, amount. Files are processed locally and never uploaded to a server.",
  sample: "Download sample CSV",
  upload: "Select files",
  process: "Process files",
  download: "Download clean CSV",
  fileIdle: "Select one or more files to get started.",
  fileError:
    "Unable to process. Check limits, format, columns and numeric values. Formulas are not accepted.",
  fileDone: "Unique records / removed duplicates / total amount",
  preview: "Preview · first 20 records",
  products: ["Office kit", "Technical notebook", "Desk stand"],
  aboutTitle: "Every metric starts with a process.",
  about:
    "My industrial engineering background helps me connect data with operations: where it comes from, how it is recorded and which question each metric should answer. I combine Python, SQL, pandas and Power Query to prepare and analyze information, and develop dashboards that make it easy to explore.",
  aboutNote: "Clear definitions. Validated data. Reproducible analysis.",
  processTitle: "A clear path forward.",
  steps: [
    [
      "Understand",
      "We define the questions, metrics and available data sources.",
    ],
    ["Prepare", "We review data quality, formats and transformation rules."],
    [
      "Analyze and build",
      "We explore findings and develop the dashboard or ETL workflow.",
    ],
    [
      "Validate and deliver",
      "We verify calculations and document sources, rules and updates.",
    ],
  ],
  written:
    "Primarily written communication, documented decisions and agreed deliverables.",
  contactTitle: "What do you need to learn from your data?",
  contactIntro:
    "Tell me which sources you have, which metrics you need and how you currently prepare reports.",
  fields: [
    "Name",
    "Email",
    "Service",
    "Project description",
    "Approximate budget (optional)",
  ],
  select: "Select a service",
  prepare: "Prepare email",
  mailHelp:
    "Your email application will open with a draft. This form does not send or store your information.",
  unconfigured:
    "Contact setup pending: a professional email address has not been added yet.",
  prepared: "Draft prepared. Review and send it from your email application.",
  footer: "Dashboards, data analysis and ETL.",
  source: "Professional profiles pending configuration.",
  rights: "Designed with intention. Built with Astro.",
  analysisTitle: "Where did the result change?",
  analysisIntro:
    "Compare January–March with April–June 2026. Select a category to examine its performance.",
  analysisLabels: ["Jan–Mar 2026", "Apr–Jun 2026", "Change"],
  analysisColumns: [
    "Category",
    "Previous period",
    "Current period",
    "Change",
    "Current share",
  ],
  analysisNote:
    "Change = (current − previous) / previous. Share uses the current-quarter total across all categories, even when filtered. Changes describe the data; they do not explain its causes.",
  analysisMissing: "Not calculable",
  analysisTable: "Quarterly comparison · fictional data",
};
export const translations: Record<Locale, Copy> = { es, en };
