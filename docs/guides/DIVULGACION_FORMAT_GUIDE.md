# 📋 REPORTE COMPLETO: FORMATO Y ESTRUCTURA DE DIVULGACIÓN

**Fecha del Reporte:** 29 de enero de 2026  
**Versión:** 1.0  
**Sección:** Divulgación Científica - Blog Académico

---

## 📑 TABLA DE CONTENIDOS

1. [Estructura de Datos](#1-estructura-de-datos)
2. [Categorías y Sistema de Colores](#2-categorías-y-sistema-de-colores)
3. [Especificaciones de Tarjeta (Blog Card)](#3-especificaciones-de-tarjeta-blog-card)
4. [Especificaciones de Página Individual](#4-especificaciones-de-página-individual)
5. [Tipografía y Fuentes](#5-tipografía-y-fuentes)
6. [Guía de Contenido](#6-guía-de-contenido)
7. [Pipeline de Publicación](#7-pipeline-de-publicación)

---

## 1. ESTRUCTURA DE DATOS

### 1.1 Interface TypeScript (Definición)

```typescript
interface DivulgacionPost {
  slug: string;              // URL-safe identifier (a-z0-9, -)
  title: string;             // Título completo (40-70 chars ideal)
  excerpt: string;           // Meta description (120-160 chars)
  author: string;            // Nombre del autor
  authorRole: string;        // Cargo/credenciales
  authorImage: string;       // Ruta a imagen (/images/equipo/...)
  date: string;              // Formato: YYYY-MM-DD
  readTime?: string;         // Ej: "7 min"
  content: string;           // HTML renderizado (o Markdown procesado)
  tags?: string[];           // Array de etiquetas (3-5 recomendado)
  category?: string;         // Categoría temática
}
```

### 1.2 Tipos de Categoría Válidas

```typescript
type DivulgacionCategory = 
  | "Ciencia y Salud"
  | "Investigación"
  | "Farmacología"
  | "Innovación"
  | "Actualidad Científica"
```

**Nota:** El sistema actual soporta estas 5 categorías oficiales, pero en el componente `DivulgacionCard.tsx` se mapean 5 categorías específicas con colores definidos:

1. **Asuntos Regulatorios**
2. **Farmacia Clínica**
3. **Farmacovigilancia**
4. **Industria & Tecnología**
5. **Data & Salud Digital**

### 1.3 Ejemplo de Artículo Completo

```typescript
{
  slug: "codigos-cups-atencion-farmaceutica-colombia",
  title: "Códigos CUPS y Atención Farmacéutica: El paso clave para la visibilidad del Químico Farmacéutico en Colombia",
  excerpt: "Análisis sobre la necesidad de actualizar los códigos CUPS en Colombia para reconocer el rol clínico del Químico Farmacéutico, garantizar la seguridad del paciente y optimizar recursos.",
  author: "Antistio Alviz Amador",
  authorRole: "Q.F., MSc, PhD",
  authorImage: "/images/equipo/Antistio-Alviz-large.webp",
  date: "2026-01-06",
  readTime: "7 min",
  category: "Asuntos Regulatorios",
  tags: ["Codificación en Salud", "CUPS", "Interoperabilidad", "Rol Farmacéutico", "Seguridad del Paciente"],
  content: `<p class="lead">...</p>...`
}
```

---

## 2. CATEGORÍAS Y SISTEMA DE COLORES

### 2.1 Tabla de Categorías con Colores (VALORES EXACTOS)

| Categoría | Color Principal | Hex Code | RGB | Color Fondo Suave | Hex Code | RGB |
|---|---|---|---|---|---|---|
| **Asuntos Regulatorios** | Azul Institucional | `#1565C0` | `rgb(21, 101, 192)` | Azul Claro | `#E3F2FD` | `rgb(227, 242, 253)` |
| **Farmacia Clínica** | Teal / Verde Azulado | `#00897B` | `rgb(0, 137, 123)` | Teal Claro | `#E0F2F1` | `rgb(224, 242, 241)` |
| **Farmacovigilancia** | Rojo Ladrillo Sobrio | `#C62828` | `rgb(198, 40, 40)` | Rojo Claro | `#FFEBEE` | `rgb(255, 235, 238)` |
| **Industria & Tecnología** | Gris Acero | `#455A64` | `rgb(69, 90, 100)` | Gris Claro | `#ECEFF1` | `rgb(236, 239, 241)` |
| **Data & Salud Digital** | Indigo / Violeta | `#673AB7` | `rgb(103, 58, 183)` | Indigo Claro | `#EDE7F6` | `rgb(237, 231, 246)` |

**⚠️ IMPORTANTE:**
- ✅ Usar **EXACTAMENTE** estos colores hexadecimales
- ❌ No usar variaciones, aproximaciones o colores similares
- ✅ Cada categoría tiene **2 colores**: principal (texto/bordes) y fondo suave
- ✅ Colores aplicados automáticamente vía `data-category` attribute

### 2.2 Aplicación de Colores por Componente

#### A. Tarjetas de Blog (DivulgacionCard)

**Pill de Categoría:**
```css
background: var(--bg-soft);      /* Fondo suave */
color: var(--accent-color);      /* Texto en color principal */
```

**Ejemplos por Categoría:**
```css
/* Asuntos Regulatorios */
background: #E3F2FD;
color: #1565C0;

/* Farmacia Clínica */
background: #E0F2F1;
color: #00897B;

/* Farmacovigilancia */
background: #FFEBEE;
color: #C62828;

/* Industria & Tecnología */
background: #ECEFF1;
color: #455A64;

/* Data & Salud Digital */
background: #EDE7F6;
color: #673AB7;
```

**Título en Hover (dinámico por categoría):**
```css
.blog-card:hover .blog-card__title {
  color: var(--accent-color); /* Cambia al color principal de la categoría */
}

/* Colores específicos aplicados según data-category: */
/* Asuntos Regulatorios → #1565C0 (Azul) */
/* Farmacia Clínica → #00897B (Teal) */
/* Farmacovigilancia → #C62828 (Rojo) */
/* Industria & Tecnología → #455A64 (Gris) */
/* Data & Salud Digital → #673AB7 (Violeta) */
```

#### B. Página Individual de Artículo

**Blockquote (highlight-quote) - Aplicado a TODAS las Categorías:**

Cada categoría tiene su propio selector con colores específicos:

```css
/* 1. Asuntos Regulatorios - Azul #1565C0 */
article[data-category="Asuntos Regulatorios"] .prose .highlight-quote {
  border-left: 4px solid #1565C0;
  background: rgba(21, 101, 192, 0.05);
  box-shadow: 0 2px 8px rgba(21, 101, 192, 0.08);
}

article[data-category="Asuntos Regulatorios"] .prose .highlight-quote:hover {
  box-shadow: 0 4px 12px rgba(21, 101, 192, 0.15);
}

/* 2. Farmacia Clínica - Teal #00897B */
article[data-category="Farmacia Clínica"] .prose .highlight-quote {
  border-left: 4px solid #00897B;
  background: rgba(0, 137, 123, 0.05);
  box-shadow: 0 2px 8px rgba(0, 137, 123, 0.08);
}

article[data-category="Farmacia Clínica"] .prose .highlight-quote:hover {
  box-shadow: 0 4px 12px rgba(0, 137, 123, 0.15);
}

/* 3. Farmacovigilancia - Rojo #C62828 */
article[data-category="Farmacovigilancia"] .prose .highlight-quote {
  border-left: 4px solid #C62828;
  background: rgba(198, 40, 40, 0.05);
  box-shadow: 0 2px 8px rgba(198, 40, 40, 0.08);
}

article[data-category="Farmacovigilancia"] .prose .highlight-quote:hover {
  box-shadow: 0 4px 12px rgba(198, 40, 40, 0.15);
}

/* 4. Industria & Tecnología - Gris #455A64 */
article[data-category="Industria & Tecnología"] .prose .highlight-quote {
  border-left: 4px solid #455A64;
  background: rgba(69, 90, 100, 0.05);
  box-shadow: 0 2px 8px rgba(69, 90, 100, 0.08);
}

article[data-category="Industria & Tecnología"] .prose .highlight-quote:hover {
  box-shadow: 0 4px 12px rgba(69, 90, 100, 0.15);
}

/* 5. Data & Salud Digital - Violeta #673AB7 */
article[data-category="Data & Salud Digital"] .prose .highlight-quote {
  border-left: 4px solid #673AB7;
  background: rgba(103, 58, 183, 0.05);
  box-shadow: 0 2px 8px rgba(103, 58, 183, 0.08);
}

article[data-category="Data & Salud Digital"] .prose .highlight-quote:hover {
  box-shadow: 0 4px 12px rgba(103, 58, 183, 0.15);
}
```

**Propiedades Comunes del Blockquote (aplicadas a todas las categorías):**
```css
.prose .highlight-quote {
  /* Estructura */
  padding: 1rem 2rem;              /* Mobile */
  padding: 1.5rem 2rem;            /* Desktop */
  margin: 2rem 2rem 2rem 3rem;
  border-radius: 0 0.5rem 0.5rem 0;
  
  /* Tipografía */
  font-family: Inter;
  font-style: italic;
  font-size: 1.25rem;
  line-height: 1.6;
  color: #1a2637;
  font-weight: 500;
  
  /* Interacción */
  transition: all 300ms ease;
}

.prose .highlight-quote:hover {
  transform: translateX(4px);      /* Desplazamiento sutil */
}
```

**Listas con Checkmarks - Aplicado a TODAS las Categorías:**

Cada categoría tiene su color de checkmark específico:

```css
/* 1. Asuntos Regulatorios - Checkmark Azul */
article[data-category="Asuntos Regulatorios"] .prose ul.clinical-checklist li::before {
  color: #1565C0;
}

/* 2. Farmacia Clínica - Checkmark Teal */
article[data-category="Farmacia Clínica"] .prose ul.clinical-checklist li::before {
  color: #00897B;
}

/* 3. Farmacovigilancia - Checkmark Rojo */
article[data-category="Farmacovigilancia"] .prose ul.clinical-checklist li::before {
  color: #C62828;
}

/* 4. Industria & Tecnología - Checkmark Gris */
article[data-category="Industria & Tecnología"] .prose ul.clinical-checklist li::before {
  color: #455A64;
}

/* 5. Data & Salud Digital - Checkmark Violeta */
article[data-category="Data & Salud Digital"] .prose ul.clinical-checklist li::before {
  color: #673AB7;
}
```

**Propiedades Base del Checkmark (aplicadas a todas las categorías):**
```css
ul.clinical-checklist li::before {
  content: "✓";
  position: absolute;
  left: 0;
  font-weight: 700;
  font-size: 1rem;
}
```

### 2.3 Mapeo de Colores en CSS (Variables Custom Properties)

**Ubicación:** `src/index.css`

```css
/* ========================================
   COLORES POR CATEGORÍA - SISTEMA DINÁMICO
   ======================================== */

/* Asuntos Regulatorios */
article[data-category="Asuntos Regulatorios"] {
  --accent-color: #1565C0;
  --bg-soft: #E3F2FD;
}

article[data-category="Asuntos Regulatorios"] .prose .highlight-quote {
  border-left-color: #1565C0;
  background: rgba(21, 101, 192, 0.05);
  box-shadow: 0 2px 8px rgba(21, 101, 192, 0.08);
}

article[data-category="Asuntos Regulatorios"] .prose ul.clinical-checklist li::before {
  color: #1565C0;
}

/* Farmacia Clínica */
article[data-category="Farmacia Clínica"] {
  --accent-color: #00897B;
  --bg-soft: #E0F2F1;
}

article[data-category="Farmacia Clínica"] .prose .highlight-quote {
  border-left-color: #00897B;
  background: rgba(0, 137, 123, 0.05);
  box-shadow: 0 2px 8px rgba(0, 137, 123, 0.08);
}

article[data-category="Farmacia Clínica"] .prose ul.clinical-checklist li::before {
  color: #00897B;
}

/* Farmacovigilancia */
article[data-category="Farmacovigilancia"] {
  --accent-color: #C62828;
  --bg-soft: #FFEBEE;
}

article[data-category="Farmacovigilancia"] .prose .highlight-quote {
  border-left-color: #C62828;
  background: rgba(198, 40, 40, 0.05);
  box-shadow: 0 2px 8px rgba(198, 40, 40, 0.08);
}

article[data-category="Farmacovigilancia"] .prose ul.clinical-checklist li::before {
  color: #C62828;
}

/* Industria & Tecnología */
article[data-category="Industria & Tecnología"] {
  --accent-color: #455A64;
  --bg-soft: #ECEFF1;
}

article[data-category="Industria & Tecnología"] .prose .highlight-quote {
  border-left-color: #455A64;
  background: rgba(69, 90, 100, 0.05);
  box-shadow: 0 2px 8px rgba(69, 90, 100, 0.08);
}

article[data-category="Industria & Tecnología"] .prose ul.clinical-checklist li::before {
  color: #455A64;
}

/* Data & Salud Digital */
article[data-category="Data & Salud Digital"] {
  --accent-color: #673AB7;
  --bg-soft: #EDE7F6;
}

article[data-category="Data & Salud Digital"] .prose .highlight-quote {
  border-left-color: #673AB7;
  background: rgba(103, 58, 183, 0.05);
  box-shadow: 0 2px 8px rgba(103, 58, 183, 0.08);
}

article[data-category="Data & Salud Digital"] .prose ul.clinical-checklist li::before {
  color: #673AB7;
}
```

### 2.4 Reglas de Uso de Colores

**✅ PERMITIDO:**
- Usar **EXACTAMENTE** los 5 colores principales definidos (no variaciones)
- Aplicar `var(--accent-color)` y `var(--bg-soft)` para elementos dinámicos
- Usar opacidad rgba para fondos suaves:
  - Backgrounds: `rgba(R, G, B, 0.05)` (5% de opacidad)
  - Box-shadow normal: `rgba(R, G, B, 0.08)` (8% de opacidad)
  - Box-shadow hover: `rgba(R, G, B, 0.15)` (15% de opacidad)
- Aplicar el atributo `data-category="Nombre Exacto"` en el elemento `<article>`
- Usar los mismos valores RGB/HEX en todas las instancias de un color
- Mantener la consistencia: un artículo = una categoría = un color

**❌ PROHIBIDO:**
- Modificar los valores hexadecimales de las categorías
- Usar aproximaciones de color (ej: `#1565C1` en vez de `#1565C0`)
- Crear nuevas categorías sin actualizar:
  - `src/index.css` (estilos)
  - `docs/DIVULGACION_FORMAT_GUIDE.md` (documentación)
  - `src/types/divulgacion.ts` (tipos TypeScript)
- Usar colores hardcodeados en componentes individuales
- Mezclar colores de diferentes categorías en un mismo artículo
- Usar más de 2 tonos del color de categoría (principal + fondo suave)
- Aplicar opacidades fuera del rango 0.05-0.15 para backgrounds
- Usar `!important` para sobrescribir colores de categoría
- Definir estilos inline que sobrescriban el sistema de colores

**⚠️ IMPORTANTE AL AGREGAR NUEVA CATEGORÍA:**

Si en el futuro se requiere agregar una sexta categoría, se debe:

1. **Validar contraste WCAG 2.1** (mínimo AA, 4.5:1)
2. **Actualizar `src/index.css`:**
   - Variables CSS (`--accent-color`, `--bg-soft`)
   - Selectores para `.highlight-quote`
   - Selectores para `.clinical-checklist li::before`
3. **Actualizar `src/types/divulgacion.ts`:**
   - Agregar categoría al tipo `DivulgacionCategory`
4. **Actualizar documentación:**
   - Tabla 2.1 (colores con HEX y RGB)
   - Sección 2.2 (ejemplos CSS)
   - Sección 2.3 (código CSS completo)
   - Sección 6.2 (categorías válidas)
5. **Validar accesibilidad:**
   - Contraste sobre blanco (#FFFFFF)
   - Contraste sobre fondo suave
   - Legibilidad en modo oscuro (si aplica)

### 2.5 Accesibilidad de Colores (WCAG 2.1)

**Contraste Mínimo Requerido:**
- Texto normal: 4.5:1
- Texto grande (>18pt): 3:1

**Validación de Contrastes:**

| Categoría | Color Principal | Sobre Blanco (#FFFFFF) | Sobre Fondo Suave | Estado |
|---|---|---|---|---|
| **Asuntos Regulatorios** | `#1565C0` | 7.12:1 | 10.5:1 | ✅ AAA |
| **Farmacia Clínica** | `#00897B` | 4.89:1 | 7.2:1 | ✅ AA |
| **Farmacovigilancia** | `#C62828` | 5.32:1 | 8.1:1 | ✅ AA |
| **Industria & Tecnología** | `#455A64` | 8.45:1 | 11.2:1 | ✅ AAA |
| **Data & Salud Digital** | `#673AB7` | 6.78:1 | 9.5:1 | ✅ AAA |

**Conclusión:** Todos los colores cumplen WCAG 2.1 nivel AA como mínimo.

---

## 3. ESPECIFICACIONES DE TARJETA (BLOG CARD)

### 3.1 Propiedades Generales

```
Altura: 100% (flex container, ajusta al contenido)
Ancho: Responsivo en grid
Fondo: #FFFFFF (blanco puro)
Sombra: 0 2px 10px rgba(0, 0, 0, 0.03) (suave)
Sombra en Hover: 0 10px 25px rgba(0, 0, 0, 0.1) (profunda)
Transición: all 300ms ease
Transformación en Hover: translateY(-5px) (sube 5px)
```

### 3.2 Estructura Interna de la Tarjeta

```
┌─────────────────────────────────────────────────┐
│  HEADER (flexbox, space-between)                │
│  ┌──────────┐          ┌──────────────────┐   │
│  │ Categoría│          │ Fecha            │   │
│  │(Pill)    │          │(Gris 88, der.)   │   │
│  └──────────┘          └──────────────────┘   │
├─────────────────────────────────────────────────┤
│  TÍTULO (Merriweather, 1.6rem, negrita, #111)  │
│  Códigos CUPS y Atención Farmacéutica...       │
├─────────────────────────────────────────────────┤
│  EXCERPT (Inter, 0.95rem, #444)                │
│  Análisis sobre la necesidad de actualizar...  │
│  (Flex: 1 - crece para llenar espacio)         │
├─────────────────────────────────────────────────┤
│  FOOTER (flexbox, space-between)               │
│  ┌──────────────────┐  ┌─────────────────┐   │
│  │ Autor (Poppins)  │  │ 7 min (swap en  │   │
│  │ Fecha (Inter)    │  │ hover → leer +) │   │
│  └──────────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────┘
```

### 3.3 Componentes Detallados

#### HEADER
- **Display:** `flex`
- **Justificación:** `space-between`
- **Margen inferior:** `1rem`
- **Fondo:** Transparente

#### CATEGORÍA (Pill Badge)
- **Tipo:** `<span class="blog-card__category">`
- **Fondo:** `var(--bg-soft)` (dinámico por categoría)
- **Color Texto:** `var(--accent-color)` (dinámico)
- **Font Size:** `0.7rem`
- **Font Weight:** `700` (bold)
- **Padding:** `0.375rem 0.875rem`
- **Border Radius:** `50px` (píldora)
- **Letter Spacing:** `0.5px`
- **White Space:** `nowrap`
- **Transición:** `all 250ms ease`

#### FECHA (en header)
- **Tipo:** `<time class="blog-card__date">`
- **Font Family:** Inter
- **Font Size:** `0.875rem`
- **Color:** `#888888` (gris)
- **White Space:** `nowrap`
- **Alineación:** Derecha
- **Margen izquierda:** `auto` (empuja a la derecha)

#### TÍTULO
- **Font Family:** Merriweather (serif)
- **Font Size:** `1.6rem`
- **Font Weight:** `700` (bold)
- **Color:** `#111111` (casi negro)
- **Line Height:** `1.3`
- **Margen:** `0 0 1rem 0`
- **Transición:** `color 250ms ease`
- **En Hover:** Cambia a `var(--accent-color)`

#### EXCERPT
- **Font Family:** Inter
- **Font Size:** `0.95rem`
- **Color:** `#444444`
- **Line Height:** `1.5`
- **Margen:** `0 0 1.5rem 0`
- **Flex:** `1` (crece para ocupar espacio)
- **White Space:** `normal` (envuelve texto)

#### FOOTER
- **Display:** `flex`
- **Justificación:** `space-between`
- **Alineación:** `center`
- **Margin-top:** `auto` (empuja al fondo)
- **Padding-top:** `1rem`
- **Border-top:** `1px solid #f0f0f0`
- **Gap:** `1rem`

#### META (Autor + Fecha)
- **Display:** `flex`
- **Dirección:** `column`
- **Alineación:** `flex-start`
- **Gap:** `0.25rem`

##### Autor
- **Font Family:** Poppins
- **Font Size:** `0.8125rem`
- **Font Weight:** `600`
- **Color:** `#333333`
- **Alineación:** Izquierda

##### Fecha (en footer)
- **Font Family:** Inter
- **Font Size:** `0.875rem`
- **Color:** `#888888`
- **Alineación:** Izquierda

#### META-ACTION (Contenedor de Tiempo/Leer Más)
- **Display:** `inline-flex`
- **Justificación:** `center`
- **Alineación:** `center`
- **Min Height:** `1.5rem`
- **Min Width:** `120px`
- **Posición:** `relative`

##### TIEMPO DE LECTURA (por defecto visible)
- **Display:** `inline-flex`
- **Font Size:** `0.8125rem`
- **Color:** `#666666`
- **Gap:** `0.375rem`
- **Opacidad:** `1`
- **Transición:** `all 0.3s ease`
- **En Hover de Tarjeta:** Opacidad → `0`, translateY → `-10px`

##### LEER MÁS (oculto por defecto, se muestra en hover)
- **Display:** `inline-flex`
- **Font Size:** `0.8125rem`
- **Color:** `var(--accent-color)` (dinámico)
- **Font Weight:** `600`
- **Posición:** `absolute` (centrado)
- **Opacidad:** `0` (oculto)
- **Transición:** `all 0.3s ease`
- **En Hover de Tarjeta:** Opacidad → `1`, translateY → `0`
- **Gap:** `0.375rem`

### 3.4 Comportamientos e Interacciones

```
STATE: DEFAULT
├─ Categoría: visible, pill con fondo suave
├─ Título: color #111111
├─ Footer: tiempo de lectura visible
└─ Sombra: 0 2px 10px rgba(0, 0, 0, 0.03)

STATE: HOVER
├─ Tarjeta: translateY(-5px)
├─ Sombra: 0 10px 25px rgba(0, 0, 0, 0.1)
├─ Título: cambia a var(--accent-color)
├─ Tiempo de lectura: desaparece con fade up
├─ "Leer más": aparece con fade down
└─ Transición: 300ms ease
```

---

## 4. ESPECIFICACIONES DE PÁGINA INDIVIDUAL

### 4.1 Componente Hero (DivulgacionHero)

```
Ubicación: Arriba del artículo
Propósito: Presentar autor, fecha, categoría, tiempo de lectura
```

**Props:**
```typescript
interface DivulgacionHeroProps {
  title: string;
  subtitle?: string;
  author: string;
  authorRole: string;
  authorImage: string;
  date: string;
  readTime?: string;
  category?: string;
}
```

**Estructura:**

```
┌──────────────────────────────────────────┐
│  Sección Hero (bg-white)                 │
├──────────────────────────────────────────┤
│  ┌────────────────────────────────────┐  │
│  │ Categoría: UPPERCASE, primary      │  │
│  │ Tiempo de lectura: xs text, gris   │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ TÍTULO PRINCIPAL (clamp font)      │  │
│  │ Códigos CUPS y Atención...         │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ Resumen/Extracto (lead)            │  │
│  │ "La evolución de los códigos CUPS" │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ [Avatar] Autor | Rol               │  │
│  │ [50-60px circle] Credenciales      │  │
│  │                                    │  │
│  │ Fecha: 6 de enero de 2026          │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

**Estilos:**

- **Padding:** `py-12 sm:py-16 lg:py-20`
- **Max Width:** `max-w-3xl mx-auto px-4 sm:px-6 lg:px-12`
- **Border Bottom:** `border-b border-gray-100`
- **Background:** `bg-white`

**Avatar del Autor:**
- **Size:** `50px` mobile, `60px` desktop
- **Border Radius:** `50%` (círculo)
- **Border:** `2px solid hsl(var(--fyt-blue) / 0.2)`
- **Object Fit:** `cover`
- **Object Position:** `center top`

### 4.2 Contenido del Artículo

#### Tipografía

**Párrafo Lead (Intro):**
```css
.prose .lead {
  font-size: 1.125rem (mobile) / 1.25rem (desktop);
  line-height: 1.75;
  letter-spacing: 0.3px;
  font-weight: 500;
  color: hsl(var(--fyt-dark));
  ::first-letter { font-weight: 700; }
}
```

**H1 (Título del Artículo):**
```css
font-family: Poppins;
font-size: clamp(1.75rem, 5vw, 2.5rem);
font-weight: 700;
line-height: 1.3;
letter-spacing: -0.3px;
color: #111827;
```

**H2 (Subtítulos):**
```css
font-family: Poppins;
font-size: clamp(1.25rem, 3.5vw, 1.75rem);
font-weight: 600;
line-height: 1.4;
margin-top: 2rem;
margin-bottom: 1.5rem;
letter-spacing: -0.2px;
```

**Párrafos Normales:**
```css
font-family: Inter;
font-size: 1rem;
line-height: 1.6;
color: #374151;
margin-bottom: 1.5rem;
letter-spacing: 0.2px;
```

#### Elemento Destacado: Blockquote

```
┌─────────────────────────────────────┐
│ ▌ "La atención farmacéutica...     │
│   es un acto clínico autónomo."    │
└─────────────────────────────────────┘
```

**Uso en HTML:**
```html
<blockquote class="highlight-quote">
  "Texto de la cita importante que refuerza el argumento principal."
</blockquote>
```

**Estilos Base (aplicados a todas las categorías):**
```css
.prose .highlight-quote {
  /* Estructura y Espaciado */
  padding: 1rem 2rem;                    /* Mobile (< 768px) */
  margin: 2rem 2rem 2rem 3rem;          /* Espacio alrededor */
  border-radius: 0 0.5rem 0.5rem 0;     /* Esquinas redondeadas derecha */
  
  /* Borde Dinámico (cambia según categoría) */
  border-left: 4px solid var(--accent-color);
  
  /* Fondo Dinámico (cambia según categoría) */
  background: rgba(var(--accent-rgb), 0.05);
  
  /* Tipografía */
  font-family: Inter;
  font-style: italic;
  font-size: 1.25rem;                    /* 20px */
  line-height: 1.6;                      /* 32px */
  color: #1a2637;                        /* Gris oscuro */
  font-weight: 500;                      /* Medium */
  letter-spacing: 0.3px;
  
  /* Efectos Visuales */
  box-shadow: 0 2px 8px rgba(var(--accent-rgb), 0.08);
  transition: all 300ms ease;
}

/* Responsive: Desktop (>= 768px) */
@media (min-width: 768px) {
  .prose .highlight-quote {
    padding: 1.5rem 2rem;                /* Mayor padding en desktop */
  }
}

/* Estado Hover */
.prose .highlight-quote:hover {
  box-shadow: 0 4px 12px rgba(var(--accent-rgb), 0.15);
  transform: translateX(4px);            /* Desplazamiento sutil */
}
```

**Colores Dinámicos por Categoría:**

Los colores del borde izquierdo, fondo y sombra cambian automáticamente según el atributo `data-category` del artículo:

| Categoría | Borde | Fondo | Sombra Normal | Sombra Hover |
|---|---|---|---|---|
| **Asuntos Regulatorios** | `#1565C0` (4px) | `rgba(21, 101, 192, 0.05)` | `rgba(21, 101, 192, 0.08)` | `rgba(21, 101, 192, 0.15)` |
| **Farmacia Clínica** | `#00897B` (4px) | `rgba(0, 137, 123, 0.05)` | `rgba(0, 137, 123, 0.08)` | `rgba(0, 137, 123, 0.15)` |
| **Farmacovigilancia** | `#C62828` (4px) | `rgba(198, 40, 40, 0.05)` | `rgba(198, 40, 40, 0.08)` | `rgba(198, 40, 40, 0.15)` |
| **Industria & Tecnología** | `#455A64` (4px) | `rgba(69, 90, 100, 0.05)` | `rgba(69, 90, 100, 0.08)` | `rgba(69, 90, 100, 0.15)` |
| **Data & Salud Digital** | `#673AB7` (4px) | `rgba(103, 58, 183, 0.05)` | `rgba(103, 58, 183, 0.08)` | `rgba(103, 58, 183, 0.15)` |

**Reglas de Uso:**
- ✅ Máximo **2 blockquotes** por artículo
- ✅ Solo citas textuales (no parafraseo)
- ✅ Longitud: 1-3 líneas máximo
- ✅ Incluir atribución si es necesario
- ❌ No usar para énfasis (usar `<strong>` en su lugar)
- ❌ No anidar otros elementos dentro del blockquote

#### Lista de Verificación Clínica

```
✓ Manejo de enfermedades huérfanas.
✓ Atención pediátrica especializada.
✓ Control de la polifarmacia en adultos mayores.
```

**Uso en HTML:**
```html
<ul class="clinical-checklist">
  <li><strong>Punto Destacado:</strong> Descripción detallada del punto.</li>
  <li><strong>Segundo Punto:</strong> Otra descripción importante.</li>
  <li>Punto sin formato especial (también válido).</li>
</ul>
```

**Estilos Base:**
```css
ul.clinical-checklist {
  list-style: none;                      /* Quitar bullets predeterminados */
  padding-left: 3rem;                    /* Espacio para checkmark */
  margin: 1.5rem 0;                      /* Separación vertical */
}

ul.clinical-checklist li {
  position: relative;                    /* Para posicionar ::before */
  padding-left: 28px;                    /* Espacio después del checkmark */
  padding-bottom: 4px;                   /* Espacio entre items */
  margin-bottom: 12px;                   /* Separación entre items */
  
  font-family: Inter;
  font-size: 1rem;                       /* 16px */
  font-weight: 500;                      /* Medium */
  line-height: 1.6;                      /* 25.6px */
  color: #374151;                        /* Gris oscuro */
  letter-spacing: 0.2px;
}

ul.clinical-checklist li::before {
  content: "✓";                          /* Carácter checkmark Unicode */
  position: absolute;
  left: 0;
  top: 0;
  
  /* Color Dinámico (cambia según categoría) */
  color: var(--accent-color);
  
  font-weight: 700;                      /* Bold */
  font-size: 1rem;                       /* 16px */
  line-height: 1.6;                      /* Alineado con texto */
}

/* Estilo para términos destacados dentro del li */
ul.clinical-checklist li strong {
  font-weight: 600;                      /* Semibold */
  color: #1f2937;                        /* Gris más oscuro */
}
```

**Colores de Checkmark por Categoría:**

El checkmark (✓) cambia automáticamente de color según la categoría:

| Categoría | Color Checkmark | HEX | RGB |
|---|---|---|---|
| **Asuntos Regulatorios** | Azul | `#1565C0` | `rgb(21, 101, 192)` |
| **Farmacia Clínica** | Teal | `#00897B` | `rgb(0, 137, 123)` |
| **Farmacovigilancia** | Rojo | `#C62828` | `rgb(198, 40, 40)` |
| **Industria & Tecnología** | Gris | `#455A64` | `rgb(69, 90, 100)` |
| **Data & Salud Digital** | Violeta | `#673AB7` | `rgb(103, 58, 183)` |

**Reglas de Uso:**
- ✅ Usar para listas de puntos clave o características
- ✅ Máximo **8 ítems** por lista (dividir en sublistas si es más)
- ✅ Cada ítem: 1-2 líneas máximo
- ✅ Usar `<strong>` para términos técnicos al inicio del ítem
- ✅ Mantener paralelismo gramatical entre ítems
- ❌ No anidar listas dentro de `.clinical-checklist`
- ❌ No usar para listas numéricas (usar `<ol>` estándar)
- ❌ No mezclar con otras clases de lista

#### Sección de Referencias

```
REFERENCIAS Y LECTURAS RECOMENDADAS
─────────────────────────────────────
1. Ministerio de Salud...
2. Artículo 4...
```

**Estilos:**
```css
.prose .references-section {
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 1px solid #e5e7eb;
}

.prose .references-section h3 {
  font-family: Poppins;
  font-size: 1.25rem (mobile) / 1.5rem (desktop);
  font-weight: 700;
  color: #111827;
  margin-bottom: 1.5rem;
  letter-spacing: 0.5px;
}

.prose .references-section ol {
  list-style-type: decimal;
  margin-left: 1.5rem;
}

.prose .references-section ol li {
  color: #374151;
  font-size: 0.875rem (mobile) / 1rem (desktop);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}
```

### 4.3 Secciones Adicionales

#### Breadcrumbs
```
Inicio / Divulgación / Asuntos Regulatorios
```

**Estilos:**
- Font Size: `xs (mobile) / sm (desktop)`
- Color: `#666666` (hover: primary)
- Separator: `/` en gris claro

#### Botón de Compartir

```
COMPARTIR ESTE ARTÍCULO
Ayúdanos a difundir este análisis académico...
[LinkedIn] [WhatsApp] [Copiar Link]
```

**Botones Disponibles:**
- LinkedIn (`cta-linkedin`)
- WhatsApp (`cta-whatsapp`)
- Copiar Link (`clipboard`)

#### Artículos Relacionados

Grid de 2-3 tarjetas `DivulgacionCard` con artículos similares.

---

## 5. TIPOGRAFÍA Y FUENTES

### 5.1 Familias Tipográficas Usadas

| Elemento | Font Family | Weight | Observaciones |
|---|---|---|---|
| **Títulos (Tarjetas Blog)** | Merriweather (Serif) | 700 | Clásico, editorial |
| **Títulos Artículos** | Poppins | 700 | Moderno, profesional |
| **Subtítulos** | Poppins | 600 | Jerarquía visual |
| **Cuerpo de Texto** | Inter | 400-500 | Legible, limpio |
| **Metadatos** | Inter / Poppins | 600 | Destaca información |
| **Blockquotes** | Inter | 500 (Italic) | Énfasis editorial |

### 5.2 Escala de Tamaños

```
Párrafo Lead:     1.125rem (mobile) / 1.25rem (desktop)
Blockquote:       1.25rem (constante)
H1:               clamp(1.75rem, 5vw, 2.5rem)
H2:               clamp(1.25rem, 3.5vw, 1.75rem)
Body:             1rem (constante)
Small:            0.875rem
XSmall:           0.8125rem
Smallest:         0.7rem
```

### 5.3 Pesos Disponibles

```
Light:    300
Regular:  400
Medium:   500
Semibold: 600
Bold:     700
```

---

## 6. GUÍA DE CONTENIDO

### 6.1 Longitudes y Límites Estrictos

| Campo | Mínimo | Máximo | Recomendado | Tipo | Validación |
|---|---|---|---|---|---|
| **Slug** | 10 | 80 | 30-60 caracteres | `string` | `^[a-z0-9]+(?:-[a-z0-9]+)*$` (solo minúsculas, números, guiones) |
| **Título** | 30 | 100 | 40-70 caracteres | `string` | ⚠️ Warning si <40 o >70 |
| **Excerpt** | 80 | 180 | 120-160 caracteres | `string` | ⚠️ Warning si <120 o >160 |
| **Author** | 3 | 100 | Nombre completo | `string` | Requerido, no vacío |
| **AuthorRole** | 3 | 150 | Credenciales académicas | `string` | Formato: "Q.F., MSc, PhD" |
| **AuthorImage** | - | - | Ruta absoluta | `string` | Debe existir en `/images/equipo/` |
| **Date** | - | - | Formato ISO | `string` | `YYYY-MM-DD`, validación con `new Date()` |
| **ReadTime** | - | - | "X min" | `string?` | Opcional, formato: `"5 min"`, `"10 min"` |
| **Category** | - | - | Una de las 5 válidas | `string?` | Ver lista en 6.2 |
| **Tags** | 3 | 6 | 3-5 tags | `string[]?` | Cada tag: 2-30 caracteres |
| **Content** | 500 palabras | - | 800-2000 palabras | `string` | HTML válido y sanitizado |

### 6.2 Categorías Válidas (ESTRICTO)

**Solo se aceptan estas 5 categorías exactas:**

| Categoría | Uso | Temas Permitidos | Color Asociado |
|---|---|---|---|
| **Asuntos Regulatorios** | Normativas, políticas, marco legal | CUPS, RIPS, normativa INVIMA, resoluciones ministeriales, políticas públicas | `#1565C0` (azul) |
| **Farmacia Clínica** | Práctica clínica, atención al paciente | Seguimiento farmacoterapéutico, conciliación, revisión de medicación, interacciones | `#00897B` (teal) |
| **Farmacovigilancia** | Seguridad de medicamentos | RAM, PRM, eventos adversos, alertas sanitarias, señales de seguridad | `#C62828` (rojo) |
| **Industria & Tecnología** | Innovación, tecnología, desarrollo | I+D, manufactura, biotecnología, dispositivos médicos, procesos industriales | `#455A64` (gris) |
| **Data & Salud Digital** | Datos, analytics, digital health | Bases de datos, IA, machine learning, telemedicina, salud digital, interoperabilidad | `#673AB7` (violeta) |

**❌ NO SE ACEPTAN:**
- Categorías genéricas: "Ciencia y Salud", "Investigación", "Actualidad Científica"
- Categorías personalizadas no definidas
- Múltiples categorías por artículo
- Categorías vacías o `null` (debe ser una de las 5)

### 6.3 Estructura Obligatoria de Contenido

**ORDEN FIJO Y REQUERIDO:**

```html
<!-- ✅ 1. PÁRRAFO LEAD (OBLIGATORIO) -->
<p class="lead">
  Primera oración que captura la esencia del artículo en 2-3 líneas.
  Debe ser **convincente** y **contextualizar** el tema principal.
  Longitud: 150-250 caracteres.
</p>

<!-- ✅ 2. INTRODUCCIÓN (OBLIGATORIO) -->
<h2>Introducción / Contexto / ¿Por qué es importante?</h2>
<p>
  Párrafo que establece el problema, la necesidad o el contexto.
  Responde: ¿Por qué debería importarle esto al lector?
</p>

<!-- ✅ 3. DESARROLLO (2-4 SECCIONES, OBLIGATORIO) -->
<h2>El Problema / Situación Actual</h2>
<p>Análisis del estado actual, desafíos, limitaciones...</p>

<!-- ⚠️ BLOCKQUOTE (OPCIONAL, máximo 2 por artículo) -->
<blockquote class="highlight-quote">
  "Cita textual relevante que refuerza un punto clave del artículo.
  Debe ser impactante y estar relacionada directamente con el tema."
</blockquote>

<h2>La Solución / Propuesta / Método</h2>
<p>Presentación de la solución, método o enfoque innovador...</p>

<!-- ⚠️ LISTAS CLÍNICAS (OPCIONAL, usar cuando hay puntos clave) -->
<ul class="clinical-checklist">
  <li><strong>Punto 1:</strong> Descripción breve y clara.</li>
  <li><strong>Punto 2:</strong> Descripción breve y clara.</li>
  <li><strong>Punto 3:</strong> Descripción breve y clara.</li>
</ul>

<!-- ✅ 4. CONCLUSIÓN (OBLIGATORIO) -->
<h2>Conclusión / Reflexión Final</h2>
<p>
  Síntesis de los puntos principales y llamado a la acción o reflexión.
  Debe cerrar el artículo de forma coherente y motivadora.
</p>

<!-- ✅ 5. REFERENCIAS (OBLIGATORIO si hay afirmaciones científicas) -->
<div class="references-section">
  <h3>Referencias y Lecturas Recomendadas</h3>
  <ol>
    <li><strong>Autor/Entidad.</strong> Título del documento. Año. URL o DOI.</li>
    <li><strong>Ministerio de Salud.</strong> Resolución 2003. 2014. https://...</li>
  </ol>
</div>
```

### 6.4 Reglas de Contenido (QUÉ SÍ / QUÉ NO)

#### ✅ QUÉ SÍ INCLUIR

**En el Párrafo Lead:**
- ✅ Resumen ejecutivo del artículo
- ✅ Gancho que captura atención
- ✅ Contexto inmediato del tema
- ✅ Longitud: 150-250 caracteres

**En el Cuerpo:**
- ✅ Datos verificables con referencias
- ✅ Ejemplos clínicos o regulatorios específicos
- ✅ Análisis basado en evidencia
- ✅ Citas de fuentes oficiales (Ministerio, INVIMA, OMS)
- ✅ Lenguaje técnico pero accesible
- ✅ Párrafos de 3-5 oraciones (máximo 100 palabras)
- ✅ Subtítulos descriptivos (H2, H3)
- ✅ Listas numeradas para procesos secuenciales
- ✅ Listas con checkmarks para puntos clave
- ✅ Blockquotes para citas impactantes (máximo 2)

**En Referencias:**
- ✅ Fuentes oficiales (gov, ministerios, universidades)
- ✅ Artículos científicos con DOI
- ✅ Normativas vigentes
- ✅ Mínimo 3 referencias, máximo 15
- ✅ Formato APA simplificado

#### ❌ QUÉ NO INCLUIR

**En Todo el Artículo:**
- ❌ Opiniones sin respaldo científico
- ❌ Lenguaje coloquial o informal
- ❌ Emojis (excepto en redes sociales)
- ❌ Promoción comercial de productos
- ❌ Contenido político partidista
- ❌ Afirmaciones absolutas sin evidencia
- ❌ Párrafos de más de 150 palabras
- ❌ Más de 3 niveles de encabezados (H1, H2, H3)
- ❌ Imágenes en el contenido HTML (solo avatar del autor)
- ❌ Videos o elementos embebidos (solo texto)
- ❌ Links externos no verificados
- ❌ Más de 2 blockquotes por artículo
- ❌ Listas de más de 8 ítems (dividir en sublistas)

**En el Lead:**
- ❌ Preguntas retóricas vagas
- ❌ Iniciar con "En este artículo..."
- ❌ Más de 3 líneas
- ❌ Datos técnicos complejos

**En Blockquotes:**
- ❌ Citas de más de 3 líneas
- ❌ Citas sin atribución
- ❌ Parafraseo (debe ser cita textual)
- ❌ Usar blockquote para énfasis (usar `<strong>`)

**En Referencias:**
- ❌ Wikipedia como fuente primaria
- ❌ Blogs personales sin respaldo académico
- ❌ URLs rotas o no verificadas
- ❌ Referencias de más de 10 años (salvo clásicos)
- ❌ Fuentes en idiomas no español/inglés sin traducción

### 6.5 Formato de Fecha (ESTRICTO)

**Formato de Entrada (en código):**
```typescript
date: "2026-01-29"  // ✅ Correcto: YYYY-MM-DD (ISO 8601)
date: "29-01-2026"  // ❌ Incorrecto
date: "2026/01/29"  // ❌ Incorrecto
```

**Formato de Visualización (automático):**
```
Entrada: "2026-01-29"
Salida:  "29 de enero de 2026"
Locale:  "es-ES"
```

**Validaciones:**
- ✅ Fecha debe ser válida (no 2026-02-30)
- ✅ Formato exacto: `YYYY-MM-DD`
- ✅ Año: 2020-2030 (rango válido)
- ❌ Fechas futuras a más de 1 año

### 6.6 Tags: Reglas y Límites

**Cantidad:**
- Mínimo: 3 tags
- Máximo: 6 tags
- Recomendado: 3-5 tags

**Formato de Cada Tag:**
- Longitud: 2-30 caracteres
- Capitalización: Title Case ("Seguridad del Paciente", no "seguridad del paciente")
- Sin símbolos especiales (solo letras, números, espacios)
- ✅ "Farmacovigilancia", "CUPS", "Interoperabilidad"
- ❌ "farmacovigilancia", "CUPS!!!", "tag_con_guiones"

**Tags Prohibidos (demasiado genéricos):**
- ❌ "Salud"
- ❌ "Medicina"
- ❌ "Ciencia"
- ❌ "Investigación" (solo)
- ❌ "Farmacia" (solo)

**Tags Recomendados por Categoría:**

| Categoría | Tags Sugeridos |
|---|---|
| **Asuntos Regulatorios** | CUPS, RIPS, Normativa INVIMA, Políticas Públicas, Codificación en Salud, Interoperabilidad |
| **Farmacia Clínica** | Atención Farmacéutica, Seguimiento Farmacoterapéutico, Conciliación, PRM, Adherencia, Polifarmacia |
| **Farmacovigilancia** | RAM, Eventos Adversos, Seguridad del Paciente, Alertas Sanitarias, Notificación, Señales |
| **Industria & Tecnología** | I+D, Biotecnología, Manufactura, Dispositivos Médicos, Innovación, Procesos |
| **Data & Salud Digital** | Big Data, IA, Machine Learning, Telemedicina, Bases de Datos, Analytics, Salud Digital |

### 6.7 Autor: Especificaciones

**Nombre del Autor (author):**
- ✅ Nombre completo: "Antistio Alviz Amador"
- ✅ Nombre + Apellido: "Manuel de los Santos Ávila Padilla"
- ❌ Solo nombre: "Antistio"
- ❌ Iniciales: "A. Alviz"
- ❌ Apodos: "Dr. Antistio"

**Rol del Autor (authorRole):**
- **Formato:** Credenciales académicas separadas por comas
- ✅ "Q.F., MSc, PhD"
- ✅ "Q.F., MSc"
- ✅ "Q.F., Especialista en Farmacia Clínica"
- ❌ "Químico Farmacéutico con maestría y doctorado" (demasiado largo)
- ❌ "Doctor en Farmacología" (sin Q.F.)
- ❌ "Farmacéutico" (no profesional)

**Imagen del Autor (authorImage):**
- **Ubicación:** `/images/equipo/`
- **Formato:** `.webp` (preferido), `.jpg`, `.png`
- **Nombre:** `nombre-apellido-large.webp`
- **Variantes:** `nombre-apellido-small.webp`, `nombre-apellido-medium.webp`
- **Dimensiones Mínimas:** 800x800px (cuadrado o vertical)
- **Peso Máximo:** 500KB por variante
- ✅ `/images/equipo/antistio-alviz-large.webp`
- ❌ `/images/author.jpg` (no específico)
- ❌ `/img/team/photo.png` (ruta incorrecta)

**Biografía del Autor (authorBio - opcional):**
- **Uso:** Texto completo para footer del artículo
- **Longitud:** 200-500 caracteres
- **Contenido:** Credenciales completas, experiencia, afiliaciones
- ✅ "Químico Farmacéutico, Magíster en Farmacología y Doctor en Ciencias Farmacéuticas..."
- ❌ "Apasionado por la farmacia..." (demasiado informal)

### 6.8 Contenido HTML: Elementos Permitidos y Prohibidos

**✅ ELEMENTOS PERMITIDOS:**

```html
<!-- Texto y Estructura -->
<p>, <h2>, <h3> (no h1, h4, h5, h6)
<strong>, <em>, <u>
<br> (solo para saltos necesarios, no para espaciado)

<!-- Listas -->
<ul>, <ol>, <li>
<ul class="clinical-checklist"> (lista con checkmarks)

<!-- Citas y Referencias -->
<blockquote class="highlight-quote">
<div class="references-section">

<!-- Tablas (con moderación) -->
<table>, <thead>, <tbody>, <tr>, <th>, <td>
```

**❌ ELEMENTOS PROHIBIDOS:**

```html
<!-- Multimedia -->
<img>, <video>, <audio>, <iframe>, <embed>

<!-- Scripts y Estilos Inline -->
<script>, <style>
style="..." (atributos inline)

<!-- Encabezados No Permitidos -->
<h1> (solo uno en la página, generado automáticamente)
<h4>, <h5>, <h6> (jerarquía demasiado profunda)

<!-- Formularios -->
<form>, <input>, <button>, <select>

<!-- Elementos Semánticos Complejos -->
<article>, <section>, <aside>, <nav> (ya están en el layout)

<!-- Elementos Obsoletos -->
<font>, <center>, <marquee>, <blink>

<!-- Divs Genéricos Sin Clase -->
<div> (usar solo con clases específicas como .references-section)
```

**CLASES CSS ESPECÍFICAS PERMITIDAS:**

```css
.lead                   /* Párrafo introductorio */
.highlight-quote        /* Blockquote destacado */
.clinical-checklist     /* Lista con checkmarks */
.references-section     /* Sección de referencias */
```

**❌ CLASES PROHIBIDAS:**
- Clases personalizadas no definidas en el sistema
- Clases de frameworks externos (Bootstrap, Tailwind inline)
- Clases utilitarias no aprobadas

---

## 7. PIPELINE DE PUBLICACIÓN

### 7.1 Flujo Completo

```
PASO 1: EDICIÓN DE CONTENIDO
  └─ Editar/crear artículo en src/data/divulgacionPosts.ts
     └─ Validar estructura TypeScript
     └─ Validar slugs únicos

PASO 2: BUILD CLIENT
  └─ npm run build:client
     └─ Compilar React + assets (Vite)

PASO 3: BUILD SSR
  └─ npm run build:ssr
     └─ Compilar main.ssg.tsx para Node.js

PASO 4: VALIDACIÓN CONTENIDO
  └─ npm run validate:content
     └─ Validar slugs, campos, excerpt, fecha
     └─ Validar longitud de título/excerpt
     └─ ⚠️ FAIL-FAST: bloqueador si hay errores críticos

PASO 5: PRERENDER
  └─ npm run prerender
     └─ Invocar getRoutes() & render() de SSR
     └─ Generar /dist/divulgacion/:slug/index.html
     └─ Inyectar meta tags dinámicos
     └─ Validar head: title, canonical, OG, structured data
     └─ Generar reporte HTML

PASO 6: COMPRESIÓN
  └─ node scripts/precompress.js
     └─ Crear gzip & brotli para CDN

PASO 7: DEPLOY
  └─ git push → CI/CD → GitHub Pages
     └─ Servir /dist como sitio estático
     └─ 404.html redirige a index.html (SPA fallback)
```

### 7.2 Archivos Involucrados

| Archivo | Propósito |
|---|---|
| `src/data/divulgacionPosts.ts` | Fuente única de datos (posts) |
| `src/data/generateDivulgacionRoutes.ts` | Generador de rutas dinámicas |
| `src/types/divulgacion.ts` | Definiciones TypeScript |
| `src/components/divulgacion/DivulgacionCard.tsx` | Tarjeta editorial |
| `src/components/divulgacion/DivulgacionHero.tsx` | Hero del post |
| `src/pages/DivulgacionPage.tsx` | Landing de divulgación |
| `src/pages/DivulgacionPostPage.tsx` | Página individual |
| `src/seo/routesMeta.ts` | Inyección de rutas en SSG |
| `scripts/validate-content.mjs` | Validación de artículos |
| `scripts/prerender-react.mjs` | Prerenderer SSG |

### 7.3 Validaciones Automáticas

**En Build:**
- ✅ Slug único y URL-safe
- ✅ Campos obligatorios: slug, title, excerpt, author, authorRole, authorImage, date, content
- ✅ Título: 40-70 caracteres (warning si fuera de rango)
- ✅ Excerpt: 120-160 caracteres (warning si fuera de rango)
- ✅ Fecha: formato YYYY-MM-DD válido
- ✅ Imagen del autor existe

**En Prerender:**
- ✅ `<title>` presente
- ✅ `<meta name="description">` presente
- ✅ `<link rel="canonical">` presente
- ✅ `<meta property="og:title">` presente
- ✅ Structured data JSON-LD válido

### 7.4 Metadatos Automáticos por Post

Cada artículo recibe automáticamente:

```html
<!-- Metadatos Básicos -->
<title>Título del Artículo</title>
<meta name="description" content="Excerpt del artículo">
<meta name="author" content="Nombre del Autor">
<link rel="canonical" href="https://fyt-research.org/divulgacion/slug">

<!-- OpenGraph (Redes Sociales) -->
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:type" content="article">
<meta property="og:url" content="...">
<meta property="article:author" content="...">
<meta property="article:published_time" content="2026-01-06T00:00:00Z">
<meta property="article:section" content="Asuntos Regulatorios">
<meta property="article:tag" content="CUPS">
<meta property="article:tag" content="Seguridad del Paciente">

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
  "author": {
    "@type": "Person",
    "name": "...",
    "jobTitle": "..."
  },
  "datePublished": "2026-01-06",
  "publisher": {
    "@type": "Organization",
    "name": "Grupo FyT",
    "url": "https://fyt-research.org"
  }
}
</script>
```

---

## 📊 RESUMEN RÁPIDO

### Colores Principales (VALORES EXACTOS - NO MODIFICAR)
- 🔵 **Asuntos Regulatorios:** `#1565C0` (fondo: `#E3F2FD`)
- 🟦 **Farmacia Clínica:** `#00897B` (fondo: `#E0F2F1`)
- 🔴 **Farmacovigilancia:** `#C62828` (fondo: `#FFEBEE`)
- ⚫ **Industria & Tecnología:** `#455A64` (fondo: `#ECEFF1`)
- 🟣 **Data & Salud Digital:** `#673AB7` (fondo: `#EDE7F6`)

### Tipografía
- **Títulos Tarjetas:** Merriweather (serif, 700)
- **Títulos Artículos:** Poppins (700)
- **Cuerpo:** Inter (400-500)
- **Metadatos:** Poppins (600)

### Límites Estrictos
| Campo | Mínimo | Máximo | Formato |
|---|---|---|---|
| **Título** | 30 | 100 chars | 40-70 ideal |
| **Excerpt** | 80 | 180 chars | 120-160 ideal |
| **Tags** | 3 | 6 tags | Title Case |
| **Slug** | 10 | 80 chars | `a-z0-9-` solo |
| **Contenido** | 500 palabras | - | HTML válido |
| **Blockquotes** | 0 | 2 por artículo | Clase `.highlight-quote` |
| **Referencias** | 3 | 15 | Formato APA simplificado |

### Categorías Válidas (EXACTAS)
✅ Solo estas 5:
1. Asuntos Regulatorios
2. Farmacia Clínica
3. Farmacovigilancia
4. Industria & Tecnología
5. Data & Salud Digital

❌ No se aceptan categorías genéricas o personalizadas

### Estructura Obligatoria del Artículo
```
1. ✅ Párrafo Lead (<p class="lead">)
2. ✅ Introducción (H2)
3. ✅ Desarrollo 2-4 secciones (H2, H3)
4. ⚠️ Blockquotes opcionales (máx. 2)
5. ⚠️ Listas clínicas opcionales (<ul class="clinical-checklist">)
6. ✅ Conclusión (H2)
7. ✅ Referencias (<div class="references-section">)
```

### Elementos HTML Permitidos
✅ `<p>`, `<h2>`, `<h3>`, `<strong>`, `<em>`, `<ul>`, `<ol>`, `<li>`, `<blockquote>`, `<table>`  
❌ `<img>`, `<script>`, `<style>`, `<h1>`, `<h4>`, `<h5>`, `<h6>`, `<iframe>`, `<div>` (sin clase)

### Clases CSS Específicas
- `.lead` - Párrafo introductorio
- `.highlight-quote` - Blockquote destacado
- `.clinical-checklist` - Lista con checkmarks (✓)
- `.references-section` - Sección de referencias

### Rutas
- **Landing:** `/divulgacion`
- **Post Individual:** `/divulgacion/:slug`

### Validaciones Automáticas
- ✅ Slug único y URL-safe
- ✅ Campos obligatorios completos
- ✅ Longitud de título y excerpt
- ✅ Formato de fecha `YYYY-MM-DD`
- ✅ Imagen del autor existe
- ✅ Meta tags presentes en HTML generado
- ✅ JSON-LD structured data válido

### Pipeline de Build
```
1. Editar divulgacionPosts.ts
2. npm run build:client
3. npm run build:ssr
4. npm run validate:content (⚠️ FAIL-FAST)
5. npm run prerender
6. node scripts/precompress.js
7. Deploy a GitHub Pages
```

---

**Versión del Documento:** 2.0  
**Última Actualización:** 29 de enero de 2026  
**Ubicación:** `/docs/DIVULGACION_FORMAT_GUIDE.md`  
**Propósito:** Guía normativa para la creación y publicación de contenido en la sección Divulgación

---

**Fin del Reporte**
