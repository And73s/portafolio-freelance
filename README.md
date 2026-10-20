# Portafolio freelance — Carlos Andrés Martínez Portillo

Portafolio bilingüe orientado a desarrollo de dashboards, análisis de datos y procesos ETL. Construido con Astro, TypeScript, Bootstrap 5.3 y CSS propio. No usa Tailwind, backend, seguimiento de visitantes ni servicios de pago.

Sitio público: [and73s.github.io/portafolio-freelance](https://and73s.github.io/portafolio-freelance/).

## Ejecutar

Requisitos: Node.js 24 y pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm test
pnpm exec playwright install chromium
pnpm test:e2e
pnpm build
pnpm preview
```

La ruta inicial recuerda el idioma elegido y abre `/es/` por defecto. Las rutas explícitas `/es/` y `/en/` siempre respetan su idioma. El tema oscuro es inicial; idioma y tema son las únicas preferencias persistidas, sin datos personales.

## Organización

- `src/data/config.ts`: nombre, correo, disponibilidad y perfiles.
- `src/i18n/index.ts`: contenido ES/EN centralizado y tipado; editar proyectos y servicios aquí.
- `src/layouts/Layout.astro`: navegación, metadatos y controles globales.
- `src/pages/[lang]/index.astro`: composición editorial de la página.
- `src/components/Lab.astro`: interfaz accesible del laboratorio.
- `src/scripts/lab.ts`: dashboard, pestañas y análisis de variaciones.
- `src/services/analysis.ts`: comparación trimestral y participación por categoría con datos ficticios.
- `src/services/reports.ts`: validación, consolidación y exportación segura.
- `src/services/report.worker.ts`: procesamiento de archivos en segundo plano.
- `src/styles/global.css`: variables de color, tipografía y componentes visuales.
- `tests`: pruebas unitarias y flujos Playwright.

## Decisiones de diseño y dependencias

Bootstrap aporta exclusivamente grid responsive y utilidades; se importa su CSS local. Los controles, pestañas y menú emplean HTML semántico, estados ARIA y estilos propios. No se incluye el bundle JS de Bootstrap porque no se necesitan sus plugins. La apariencia usa azul tinta, acentos azules, superficies planas, líneas y radios mínimos. Cada sección tiene una composición propia. Tipografía del sistema para evitar descargas externas. Sin emojis, degradados, efectos glow, glassmorphism ni animación decorativa.

Astro genera HTML estático; TypeScript valida el código. Chart.js ofrece visualizaciones con tablas equivalentes. Papa Parse implementa CSV con comillas y saltos de línea correctamente. ExcelJS lee XLSX y se carga bajo demanda en un worker; es la dependencia de mayor tamaño y no forma parte de la descarga inicial. Vitest prueba transformaciones y Playwright prueba navegación y flujos reales.

## Configuración personal pendiente

En `src/data/config.ts`, añadir correo y URLs reales de GitHub, LinkedIn, Workana y Upwork. Vacíos por defecto: el formulario permanece deshabilitado y los perfiles muestran un aviso de configuración pendiente. No hay envíos simulados. Al añadir correo, el formulario valida los campos y abre un borrador `mailto:`; el visitante lo revisa y envía desde su cliente de correo. Algunos clientes tienen límites de longitud para estos enlaces.

Activar `available` únicamente cuando la disponibilidad esté confirmada. No se afirman clientes, certificaciones, métricas de impacto ni años de experiencia. Los proyectos se presentan como conceptos demostrativos independientes. Sustituir las descripciones solo con información publicable y verificada.

## Demos y seguridad

El dashboard presenta datos ficticios de enero a junio de 2026, filtros y actualizaciones simuladas. No existe streaming desde una fábrica. Los valores por producto corresponden a un producto de ejemplo por categoría.

Reportes: CSV UTF-8 o primera hoja de XLSX. Columnas obligatorias `id,product,category,amount`; importe decimal con punto, máximo dos decimales. Límite de 5 archivos, 2 MB por archivo, 10.000 filas totales y 20 columnas para XLSX. Los duplicados son registros idénticos en las cuatro columnas; un ID repetido con valores distintos se conserva. Los textos tienen máximo 200 caracteres. No se aceptan objetos, celdas de fórmula ni números inválidos en XLSX. CSV trata los textos como texto, nunca como instrucciones. La exportación CSV neutraliza prefijos de fórmula y usa escape CSV. Se muestra una vista previa de 20 filas y se exportan todos los registros únicos.

Los archivos no se suben a servidores y no se persisten. El worker se termina a los 15 segundos, también al terminar o fallar. Un archivo comprimido malicioso puede consumir memoria durante su descompresión antes de verificar las filas: no hay garantía de aislamiento de memoria frente a archivos hostiles. No se debe usar esta demo como servicio de recepción de archivos no confiables.

La demo de análisis compara enero–marzo con abril–junio de 2026. Calcula la variación sobre el trimestre anterior y la participación de cada categoría sobre el total del trimestre actual. Filtrar no cambia ese denominador. No se atribuyen causas ni se generan pronósticos. La demo ETL carga el resultado en memoria y permite exportar CSV; no se conecta a un almacén de datos remoto.

Los datos se pierden al recargar. No hay claves privadas, autenticación, base de datos, `eval` ni inserción de HTML desde archivos; las vistas previas se construyen con `textContent`.

## SEO, accesibilidad y rendimiento

`lang`, títulos y descripciones por idioma, canonical, hreflang, Open Graph, sitemap y robots se generan en build. Configurar `SITE_URL` y `BASE_PATH` antes de publicar: `example.com` es solo un placeholder local. La portada no usa imágenes pesadas. Los gráficos ofrecen tablas equivalentes. Hay enlaces de salto, foco visible, navegación por teclado en pestañas, etiquetas en formularios, menú con estado expandido y respeto por `prefers-reduced-motion`.

WCAG 2.2 AA y Lighthouse (90 rendimiento / 95 accesibilidad / 95 buenas prácticas / 95 SEO) son objetivos, no certificaciones. Ejecutar Lighthouse sobre el build de producción desplegado y revisar teclado/lector de pantalla antes de anunciar cumplimiento. GitHub Pages no permite configurar libremente encabezados HTTP: en un hosting que sí lo permita añadir CSP, `X-Content-Type-Options: nosniff`, Referrer-Policy y Permissions-Policy, probando los workers y scripts generados antes de activar una CSP estricta.

## Publicación manual en GitHub Pages

1. Crear un repositorio propio y subir el código con `pnpm-lock.yaml`. No subir `node_modules`, `.playwright` ni `.pnpm-store`.
2. Completar correo, perfiles y contenido personal.
3. En Settings → Pages seleccionar GitHub Actions.
4. Ejecutar manualmente **Publish portfolio** desde Actions. El workflow no publica automáticamente al hacer push.
5. El workflow obtiene el origen y subdirectorio del repositorio con `configure-pages`, ejecuta Vitest y build, y publica `dist`.

Para un build manual en PowerShell:

```powershell
$env:SITE_URL = 'https://TU-USUARIO.github.io'
$env:BASE_PATH = '/TU-REPOSITORIO'
pnpm build
```

Para un dominio propio o repositorio `TU-USUARIO.github.io`, usar `/` como base y configurar el dominio en GitHub. Después de cada cambio, ejecutar pruebas y build, subir el código y lanzar de nuevo el workflow. Las pruebas de navegador requieren instalar Chromium y ejecutarse antes de publicar; no se ejecutan en el workflow inicial.

## Fases implementadas

1. Arquitectura: estructura estática, dependencias y configuración.
2. Diseño: sistema visual propio, responsive, navegación y temas.
3. Internacionalización: contenido, rutas y preferencias ES/EN.
4. Contenido: servicios, proyectos, perfil, proceso y contacto configurable.
5. Demos: dashboard, proceso ETL con CSV/XLSX y análisis trimestral por categorías.
6. Calidad: comprobación de tipos, pruebas unitarias y flujos de navegador.
7. Publicación: desplegado en GitHub Pages mediante el workflow manual. Correo y perfiles profesionales pendientes de configuración.

## Verificación realizada

- `astro check`: 0 errores, 0 advertencias.
- `astro build`: compilación estática correcta; también se comprobó una base `/portfolio` durante la implementación.
- Vitest: validación, consolidación, exportación segura, comparación trimestral y denominadores de porcentajes.
- Playwright sobre el build estático: idioma y persistencia, temas, navegación móvil, filtros, CSV, descarga, errores, XLSX real, rechazo de fórmulas, análisis de variaciones, formulario, teclado y etiquetas.
- Capturas revisadas en escritorio (1440 px) y móvil (375 px), con temas oscuro y claro; sin desbordamiento horizontal en los tamaños probados.
- Pendiente: medición Lighthouse, auditoría completa WCAG y validación en Safari/Firefox. No se afirman puntuaciones ni conformidad no medidas.
