# Divulgación Científica: Editorial & SSG Publication Workflow

**Versión:** 1.0.0  
**Fecha:** 6 de enero, 2026  
**Autor:** FyT Lab Connect Engineering Team

---

## 📋 Overview

Este documento describe la arquitectura y flujo de publicación para la sección **Divulgación Científica** del sitio FyT Lab Connect, incluyendo:

- Automatización SSG (Static Site Generation)
- Generación dinámico de rutas
- SEO académico
- Pipeline editorial
- Lineamientos de contenido

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico

```
React 18 + Vite + TypeScript + SSR/SSG Híbrido
├── Client: SPA interactivo con React Router v6
├── Server: main.ssg.tsx para renderizado SSR
├── Build: Pipeline Multi-fase (client → SSR → validate → prerender → compress)
└── Deploy: HTML estático + JavaScript cliente
```

### Componentes Clave

| Componente | Ubicación | Propósito |
|---|---|---|
| **Fuente de datos** | `src/data/divulgacionPosts.ts` | Array de posts (fuente única de verdad) |
| **Generador de rutas** | `src/data/generateDivulgacionRoutes.ts` | Auto-generar rutas dinámicas & meta |
| **Integración SSG** | `src/seo/routesMeta.ts` | Inyectar rutas dinámicas en prerender |
| **SSR Prerender** | `src/main.ssg.tsx` | Renderizar y generar head dinámico |
| **Validación** | `scripts/validate-content.mjs` | Validar integridad de artículos |
| **Prerender Script** | `scripts/prerender-react.mjs` | Generar HTML estático + reportes |
| **UI Components** | `src/components/divulgacion/` | Hero, Card, AuthorBadge |
| **Página de Post** | `src/pages/DivulgacionPostPage.tsx` | Renderización de artículo individual |

---

## 📖 Estructura de un Post

### Tipo TypeScript

```typescript
interface DivulgacionPost {
  slug: string;                    // URL-safe identifier (a-z0-9, -)
  title: string;                   // Título completo (40-70 chars ideal)
  excerpt: string;                 // Meta description (120-160 chars)
  author: string;                  // Nombre del autor
  authorRole: string;              // Cargo/credenciales
  authorImage: string;             // Ruta a imagen (/images/equipo/...)
  date: string;                    // Formato: YYYY-MM-DD
  readTime: string;                // Ej: "7 min"
  category: string;                // Categoría temática
  tags: string[];                  // Array de etiquetas (3-5 recomendado)
  content: string;                 // HTML renderizado (o Markdown procesado)
}
```

### Ejemplo Validado (Publicado)

```typescript
{
  slug: "actualizacion-codigos-cups-atencion-farmaceutica",
  title: "La actualización y apropiación de los códigos CUPS: Un paso inapelable hacia la visibilidad de la profesión Químico Farmacéutica desde el ámbito de la atención farmacéutica en Colombia",
  excerpt: "La evolución de los códigos CUPS no debe verse como un simple ajuste administrativo, sino como una necesidad imperativa para otorgar visibilidad real a la profesión desde el ámbito de la atención farmacéutica...",
  author: "Antistio Alviz Amador",
  authorRole: "Q.F., MSc, PhD - Grupo de Investigación en Farmacología y Terapéutica (FyT)",
  authorImage: "/images/equipo/Antistio-Alviz-medium.webp",
  date: "2026-01-06",
  readTime: "7 min",
  category: "Política Farmacéutica",
  tags: ["Atención Farmacéutica", "CUPS", "Política de Salud", "Química Farmacéutica", "Colombia"],
  content: `<p>En el sistema de salud colombiano...</p>...`
}
```

---

## 🔄 Pipeline de Publicación

### Flujo General

```
1. DESARROLLO EDITORIAL
   └─ Redactar/editar artículo en src/data/divulgacionPosts.ts
      └─ Validar estructura TypeScript

2. BUILD CLIENT
   └─ npm run build:client
      └─ Compilar React + assets (Vite)

3. BUILD SSR
   └─ npm run build:ssr
      └─ Compilar main.ssg.tsx para Node.js

4. VALIDACIÓN CONTENIDO
   └─ npm run validate:content
      └─ Validar slugs, campos, excerpt, fecha
      └─ ⚠️ FAIL-FAST: bloqueador si hay errores

5. PRERENDER
   └─ npm run prerender
      └─ Invocar getRoutes() & render() de SSR
      └─ Generar /dist/divulgacion/*.html
      └─ Inyectar meta tags dinámicos
      └─ Validar head: title, canonical, OG
      └─ Generar reporte

6. COMPRESIÓN
   └─ node scripts/precompress.js
      └─ Crear gzip & brotli para CDN

7. DEPLOY
   └─ git push → CI/CD → GitHub Pages
      └─ Servir /dist como sitio estático
      └─ 404.html redirige a index.html (SPA fallback)
```

### Comandos

```bash
# Desarrollo local (SPA sin prerender)
npm run dev

# Build SSG completo (para producción)
npm run build:ssg

# Build rápido (SPA sin SSG)
npm run build

# Preview de la build
npm run preview
```

---

## ✏️ Cómo Añadir un Nuevo Artículo

### Paso 1: Preparar el Artículo

```typescript
// src/data/divulgacionPosts.ts
export const divulgacionPosts: DivulgacionPost[] = [
  // ... post existente (CUPS) ...
  
  {
    slug: "nuevo-articulo-url-safe",
    title: "Título del Nuevo Artículo (40-70 chars ideal)",
    excerpt: "Resumen de 120-160 caracteres para meta description...",
    author: "Nombre Completo",
    authorRole: "Cargo, Títulos académicos",
    authorImage: "/images/equipo/NombreApellido-medium.webp",
    date: "2026-01-15",
    readTime: "10 min",
    category: "Categoría Existente",
    tags: ["Tag1", "Tag2", "Tag3", "Tag4"],
    content: `<p>Contenido en HTML...</p>...`,
  }
];
```

### Paso 2: Validar

```bash
npm run build:ssg
# Verifica:
# - ✅ Slug único y URL-safe
# - ✅ Campos obligatorios presentes
# - ✅ Excerpt 120-160 caracteres
# - ✅ Fecha válida (YYYY-MM-DD)
```

### Paso 3: Revisar Generado

```bash
# Revisar archivo HTML prerenderizado
cat dist/divulgacion/nuevo-articulo-url-safe/index.html

# Verificar metadatos
grep -E "<title>|og:title|article:author" dist/divulgacion/nuevo-articulo-url-safe/index.html
```

### Paso 4: Commit & Deploy

```bash
git add src/data/divulgacionPosts.ts
git commit -m "content(divulgacion): add article about XXX"
git push origin develop
# CI/CD ejecuta build:ssg y deploya
```

---

## 🧪 SEO & Metadatos por Artículo

### Inyección Automática

Cada artículo recibe automáticamente:

```html
<!-- Metadatos Básicos -->
<title>Título del Artículo</title>
<meta name="description" content="Excerpt del artículo">
<meta name="author" content="Nombre del Autor">
<link rel="canonical" href="https://fyt-research.org/divulgacion/slug">

<!-- OpenGraph (redes sociales) -->
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:type" content="article">  <!-- ← Automático para posts -->
<meta property="og:url" content="...">
<meta property="article:author" content="...">
<meta property="article:published_time" content="2026-01-06">
<meta property="article:section" content="Política Farmacéutica">
<meta property="article:tag" content="CUPS">...

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">

<!-- Structured Data (JSON-LD) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "description": "...",
  "author": { "@type": "Person", "name": "...", "jobTitle": "..." },
  "datePublished": "2026-01-06",
  "publisher": { "@type": "Organization", "name": "Grupo FyT", "url": "..." }
}
</script>
```

### Validación en Build

El script `prerender-react.mjs` valida presencia de:
- ✅ `<title>`
- ✅ `<meta name="description">`
- ✅ `<link rel="canonical">`
- ✅ `<meta property="og:title">`

Si falta cualquiera → **warning impreso** (no bloqueador, pero indicador de calidad).

---

## 📊 Reportes & Monitoreo

### Reporte de Validación

```bash
npm run validate:content

# Output:
📊 ESTADÍSTICAS
─────────────
Total de artículos: 1
Categorías: Política Farmacéutica
Palabras totales: ~611
Último artículo: 6/1/2026

⚠️ ADVERTENCIAS
─────────────
[divulgacionPosts[0]] Título muy largo (184 chars). Recomendado: 40-70 chars.
[divulgacionPosts[0]] Excerpt muy largo (285 chars). Google truncará en ~160 chars.

✅ VALIDACIÓN EXITOSA
─────────────
1 artículo(s) validado(s) correctamente.
2 advertencia(s) detectada(s) (no bloquean el build).
```

### Reporte de Prerender

```bash
npm run prerender

# Output:
✅ Rutas prerenderizadas: 22/22

📁 Por sección:
   divulgacion                 2 ruta(s)  ← /divulgacion + /divulgacion/:slug
   investigacion               6 ruta(s)
   herramientas                5 ruta(s)
   ...

📄 Artículos prerenderizados: 1
   Ejemplos:
   • /divulgacion/actualizacion-codigos-cups-atencion-farmaceutica

✅ PRERENDER COMPLETADO EXITOSAMENTE
```

---

## 🔒 Decisiones Editoriales Actuales

### Por qué Solo 1 Artículo Publicado

**Decisión:** Publicar únicamente el artículo validado sobre "Códigos CUPS" del autor Antistio Alviz Amador.

**Justificación:**
1. **Contenido Validado:** Artículo académico real, no generado por IA
2. **Credibilidad Institucional:** Respaldo de experto del grupo FyT
3. **Relevancia Temática:** Aplicable a contexto colombiano de salud
4. **Calidad Editorial:** Cumple estándares de SEO académico

### Posts Comentados (No Publicados)

Tres artículos generados por IA permanecen comentados en el código:
- `futuro-farmacologia-personalizada`
- `microbioma-resistencia-antibioticos`
- `inteligencia-artificial-descubrimiento-farmacos`

**Razón:** Usados como pruebas internas de arquitectura SSG. Pueden reactivarse en futuro si:
- Se escriben versiones reales/validadas
- Se obtiene aprobación editorial
- Aplica política de contenido institucional

**Reversibilidad:** Descomenta bloques `/*...*/ ` en `src/data/divulgacionPosts.ts` y rerun `npm run build:ssg`.

---

## 🛠️ Troubleshooting

### Build falla con "Cannot find module"

**Causa:** Dependencia faltante  
**Solución:**
```bash
npm install
npm run build:ssg
```

### Slug no es URL-safe

**Error:** `Slug no es URL-safe: "Nombre con espacios"`  
**Solución:** Slug debe contener solo `a-z`, `0-9`, `-`
```typescript
slug: "nombre-con-guiones"  // ✅
slug: "Nombre con espacios" // ❌
```

### Excerpt muy largo

**Warning:** `Excerpt muy largo (285 chars). Google truncará en ~160 chars.`  
**Solución:** Acortar `excerpt` a máximo 160 caracteres.

### /divulgacion no aparece en sitio publicado

**Posible causa:** Build SSG incompleto  
**Solución:**
```bash
npm run build:ssg
# Verificar:
ls -lh dist/divulgacion/index.html
ls -lh dist/divulgacion/*/index.html
```

---

## 📝 Checklist Editorial

Antes de publicar un nuevo artículo:

- [ ] **Contenido:**
  - [ ] Escrito por autor identificado (no IA)
  - [ ] Validado académicamente
  - [ ] Libre de plagio
  - [ ] Relevante para comunidad FyT

- [ ] **Estructura:**
  - [ ] `slug` es URL-safe y único
  - [ ] `title` entre 40-70 caracteres
  - [ ] `excerpt` entre 120-160 caracteres
  - [ ] `author` y `authorRole` completos
  - [ ] `date` en formato YYYY-MM-DD
  - [ ] `tags` incluyen 3-5 etiquetas
  - [ ] `content` en HTML válido

- [ ] **Validación:**
  - [ ] `npm run build:ssg` pasa sin errores
  - [ ] Reporte de validación: 0 errores críticos
  - [ ] Reporte de prerender: ruta generada
  - [ ] `dist/divulgacion/slug/index.html` existe

- [ ] **Revisión SEO:**
  - [ ] `<title>` correcto en HTML
  - [ ] `og:type` = "article"
  - [ ] `article:author` poblado
  - [ ] JSON-LD Article presente

- [ ] **Git:**
  - [ ] Commit con mensaje descriptivo
  - [ ] Push a develop
  - [ ] CI/CD ejecutó build:ssg
  - [ ] Preview en GitHub Pages

---

## 🚀 Roadmap Futuro

1. **Imágenes destacadas (OG Image)**
   - Adicionar `featuredImage` a tipo Post
   - Auto-generar og:image con dimensiones 1200x630

2. **Paginación del listado**
   - Limitar posts/página a N artículos
   - Generar índices /divulgacion/page/2, etc.

3. **Filtrado por categoría**
   - Ruta dinámica `/divulgacion/categoria/:category`
   - Prerender todas las combinaciones

4. **Búsqueda full-text**
   - Indexar contenido en build time
   - Endpoint `/api/search?q=cups`

5. **Suscripción & RSS**
   - Generar `/divulgacion/feed.xml`
   - API de notificaciones

6. **Analytics**
   - Integrar Plausible o Google Analytics
   - Monitorear métricas de engagement por artículo

---

## 📞 Contacto & Soporte

Para preguntas sobre arquitectura SSG o proceso editorial:

- **Repositorio:** https://github.com/JoasSVega/fyt-lab-connect
- **Issues:** https://github.com/JoasSVega/fyt-lab-connect/issues
- **Rama principal:** develop

---

## 📄 Historial de Cambios

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0.0 | 2026-01-06 | Documentación inicial. SSG implementado. Post CUPS publicado. |

---

**Última actualización:** 6 de enero, 2026 23:16 UTC  
**Próxima revisión recomendada:** Cuando se añada segundo artículo validado
