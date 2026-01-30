---
title: "NOTICIA INSTITUCIONAL COMPLETA: Grupo FyT fortalece colaboración internacional"
date: 2026-01-29
status: Implementada y funcional
---

# 📋 NOTICIA INSTITUCIONAL COMPLETA

## PARTE 1 — OVERVIEW (TIMELINE INSTITUCIONAL)

### Representación en el listado de noticias:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  29 de enero de 2026                [COLABORACIÓN]          │
│                                                             │
│  Grupo FyT fortalece colaboración internacional con la      │
│  Universidad de Guadalajara                                │
│                                                             │
│  Se consolida una conexión académica internacional          │
│  orientada al fortalecimiento de la divulgación científica │
│  y el desarrollo de investigación computacional e in       │
│  silico.                                                   │
│                                                             │
│                              [Ver comunicado →]            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Características del overview:**
- ✓ Sin imagen
- ✓ Fecha en formato institucional (29 de enero de 2026)
- ✓ Categoría clara: COLABORACIÓN
- ✓ Título institucional breve
- ✓ Resumen de 1-2 líneas máximo
- ✓ CTA discreto: "Ver comunicado"
- ✓ Enfoque en hecho institucional (no emocional)
- ✓ Tono formal, académico, tercera persona

---

## PARTE 2 — PÁGINA INDIVIDUAL DE LA NOTICIA

### 1. Encabezado Institucional

```
┌──────────────────────────────────────────────────────────────┐
│                      COLABORACIÓN    │    29 de enero de 2026 │
│                                                              │
│ Grupo FyT fortalece colaboración internacional con la       │
│ Universidad de Guadalajara                                 │
│                                                              │
│ Intercambio académico internacional y vinculación de        │
│ estudiante doctoral marca el inicio de una cooperación     │
│ institucional con impacto en la investigación biomédica.  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Estructura:**
- Categoría: COLABORACIÓN (badge azul)
- Fecha: 29 de enero de 2026 (con icono de calendario)
- Título H1: "Grupo FyT fortalece colaboración internacional con la Universidad de Guadalajara"
- Subtítulo contextual: "Intercambio académico internacional y vinculación de estudiante doctoral marca el inicio de una cooperación institucional con impacto en la investigación biomédica."

### 2. Espacio para Imagen Principal

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  📸 Ubicar imagen al inicio del contenido                   │
│                                                              │
│  Foto documental de reunión académica o acto de            │
│  cooperación institucional entre las dos universidades     │
│                                                              │
│  Alt text: "Encuentro académico colaborativo entre la      │
│  Universidad de Cartagena y la Universidad de Guadalajara" │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 3. Contenido Redactado

El texto está estructurado en 8 bloques temáticos claros sin subtítulos explícitos:

1. **Párrafo introductorio (lead)**: Contexto general de la colaboración
2. **Origen de la colaboración**: Cómo surge el interés investigativo
3. **Establecimiento de vínculos con el Grupo FyT**: Conexión formal
4. **Líneas de trabajo y vinculación estudiantil**: Proyección conjunta
5. **Proyecto de investigación conjunto**: Detalles del proyecto (con énfasis visual)
6. **Acercamiento institucional en UdG**: Validación internacional
7. **Impacto e implicaciones futuras**: Consecuencias y alcance

**Características del contenido:**
- ✓ Claro, coherente, sin repeticiones
- ✓ Sin exageraciones
- ✓ Tono formal y académico
- ✓ El protagonista es el Grupo FyT y las instituciones
- ✓ Apto para evaluación académica
- ✓ Puede leerse en 5 años sin perder contexto

### 4. Bloque de Cierre Institucional

```
┌──────────────────────────────────────────────────────────────┐
│  INSTITUCIONES INVOLUCRADAS                                 │
│  • Universidad de Cartagena                                 │
│  • Universidad de Guadalajara                               │
│  • Centro Universitario de los Altos (CUALTOS)             │
│  • Centro Universitario de Ciencias de la Salud (CUCS)     │
│  • Instituto de Investigaciones en Ciencias Biomédicas     │
│                                                              │
│  GRUPOS DE INVESTIGACIÓN                                    │
│  • Grupo de Investigación en Farmacología y Terapéutica    │
│  • Grupos de investigación en análisis de datos y          │
│    computación aplicada                                    │
│                                                              │
│  ENLACES RELACIONADOS                                       │
│  [Página del Grupo FyT] [Investigación] [Contactos]       │
│                                                              │
│                      ← Ver todas las noticias              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 5. Navegación

- Enlace para volver al overview: "← Ver todas las noticias"
- Links opcionales a noticia anterior/siguiente (cuando existan)

---

## PARTE 3 — CRITERIOS DE CALIDAD VERIFICADOS

### Validación de autoevaluación:

✓ **La noticia no parece un artículo de blog**
- Tono institucional, no editorial
- Protagonista: grupo e instituciones
- No narrativas personales

✓ **El overview se siente como un registro institucional**
- Timeline cronológico
- Categorización clara
- Metadata estructurada
- Sin recursos visuales (coherente con sitios institucionales)

✓ **La página individual se siente como un comunicado académico**
- Estructura formal
- Información verificable
- Atribuciones claras
- Cierre institucional

✓ **El contenido puede leerse dentro de 5 años sin perder contexto**
- Fecha clara
- Hechos específicos
- Nombres de instituciones y personas
- No referencias efímeras

✓ **La carga de la página está optimizada**
- Imagen solo en página individual (no en overview)
- Estructura HTML limpia
- Metadata reducida

---

## ARCHIVOS CREADOS E IMPLEMENTADOS

### Tipos TypeScript
- `/src/types/noticias.ts` - Interfaz `Noticia`, `NoticiaOverview`, `NoticiaUI`

### Datos
- `/src/data/noticias.ts` - Registro de noticias con funciones auxiliares
  - `noticias` array
  - `getNoticiaBySlug(slug)` 
  - `getAllNoticias(ascending)`
  - `getNoticiasByCategory(category)`

### Componentes UI
- `/src/components/noticias/NoticiaCard.tsx` - Tarjeta para overview
- `/src/components/noticias/NoticiaHero.tsx` - Hero de página individual
- `/src/components/noticias/NoticiaClosing.tsx` - Cierre institucional

### Páginas
- `/src/components/News.tsx` - Componente actualizado con lista y filtros
- `/src/pages/NoticiaPage.tsx` - Página individual de noticia

### Routing
- `/src/App.tsx` - Ruta `/noticias/:slug` añadida

---

## ESTRUCTURA TÉCNICA FINAL

```
fyt-lab-connect/
├── src/
│   ├── components/
│   │   ├── News.tsx [✓ ACTUALIZADO - Con timeline]
│   │   └── noticias/
│   │       ├── NoticiaCard.tsx [✓ NUEVO]
│   │       ├── NoticiaHero.tsx [✓ NUEVO]
│   │       └── NoticiaClosing.tsx [✓ NUEVO]
│   ├── data/
│   │   └── noticias.ts [✓ NUEVO - Datos de noticia]
│   ├── pages/
│   │   ├── Noticias.tsx [Existente]
│   │   └── NoticiaPage.tsx [✓ NUEVO]
│   ├── types/
│   │   └── noticias.ts [✓ NUEVO - Tipos TS]
│   └── App.tsx [✓ ACTUALIZADO - Ruta añadida]
```

---

## CÓMO USAR ESTA NOTICIA

### Agregar más noticias en el futuro:

1. Abrir `/src/data/noticias.ts`
2. Añadir nuevo objeto `Noticia` al array `noticias`
3. Seguir la misma estructura y tono
4. Las rutas se generan automáticamente con el slug

### Estructura mínima de una noticia:
```typescript
{
  slug: "url-friendly-titulo", // Único
  date: "YYYY-MM-DD",
  category: "Colaboración|Evento|Publicación|...",
  title: "Título institucional",
  summary: "Resumen 1-2 líneas",
  cta: "Ver comunicado",
  subtitle: "Subtítulo contextual (opcional)",
  imageAlt: "Descripción de imagen",
  content: "<p>Contenido HTML...</p>",
  principalInstitutions: ["Institución 1", "Institución 2"],
  researchGroups: ["Grupo 1"],
  relatedLinks: [{title: "Enlace", url: "/ruta"}]
}
```

---

## NOTAS DE IMPLEMENTACIÓN

**Decisiones de diseño:**
- Las imágenes aparecen SOLO en páginas individuales (no en overview)
- El timeline está ordenado por fecha descendente (más recientes primero)
- Filtros por categoría y búsqueda en el overview
- Paginación: 6 noticias por página
- Tono: formal, académico, tercera persona (protagonista: institución)
- Responsive: optimizado para móvil y desktop

**Performance:**
- Lazy loading de componentes
- SEO con JSON-LD schema
- Meta tags Open Graph y Twitter
- Canonical URLs
- Rutas dinámicas sin regeneración SSG

---

## ESTADO ACTUAL

✅ **COMPLETADO Y FUNCIONAL**

La noticia "Grupo FyT fortalece colaboración internacional con la Universidad de Guadalajara" está lista para:
- Visualización en el timeline (overview)
- Lectura en página individual
- Búsqueda y filtrado
- Compartir en redes sociales
- Indexación en buscadores

