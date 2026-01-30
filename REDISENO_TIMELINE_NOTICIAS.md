# 🎨 REDISEÑO: Timeline Institucional de Noticias

## ✅ COMPLETADO

**Commit:** `4447aee9` — design(noticias): Rediseñar tarjetas a timeline institucional horizontal

---

## 📋 ANTES vs DESPUÉS

### ❌ ANTES (Grid de 2 columnas - Cards cuadradas)
```
┌─────────────────────┐  ┌─────────────────────┐
│  29 de enero 2026   │  │  Otra noticia...   │
│  [COLABORACIÓN]     │  │  [EVENTO]          │
│  Título noticia...  │  │  Título...         │
│  Resumen...         │  │  Resumen...        │
│  [Ver comunicado]   │  │  [Ver comunicado]  │
└─────────────────────┘  └─────────────────────┘
```
**Problemas:**
- ❌ Parecía más blog que institución
- ❌ Fecha mezclada en el contenido
- ❌ Poco espacio horizontal
- ❌ No sentía como "timeline"

---

### ✅ DESPUÉS (Timeline Horizontal - Ancho completo)

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  29      [ COLABORACIÓN ]                                   │
│  ENE     Grupo FyT fortalece colaboración internacional     │
│  2026    con la Universidad de Guadalajara                  │
│          Se consolida una conexión académica internacional. │
│          → Ver comunicado                                    │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  28      [ EVENTO ]                                         │
│  ENE     Próxima noticia...                                 │
│  2026    Resumen institucional...                           │
│          → Ver comunicado                                    │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  15      [ PUBLICACIÓN ]                                    │
│  ENE     Otra noticia importante...                         │
│  2026    Descripción formal y clara...                      │
│          → Ver comunicado                                    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Ventajas:**
- ✅ Fecha prominente (anclaje visual)
- ✅ Usa ancho completo
- ✅ Siente como "historial" / "timeline"
- ✅ Muy fácil de escanear
- ✅ Institucional, serio, limpio

---

## 🏗️ ESTRUCTURA DEL NUEVO DISEÑO

### Columna Izquierda (Timeline Anchor)
```
┌────────┐
│  29    │  ← Día (grande, bold, slate-900)
│ ENE    │  ← Mes (pequeño, mayúsculas, slate-600)
│ 2026   │  ← Año (minimal, slate-500)
└────────┘
```

**Características:**
- Ancho fijo: `w-16 sm:w-20` (se adapta en móvil)
- Tipografía: `font-raleway`, números grandes
- Alineación: centro
- Sin iconos, solo datos

### Columna Derecha (Contenido)
```
┌─────────────────────────────────────────────────────────┐
│ [ COLABORACIÓN ]                                        │
│ Título de la noticia (máximo 2 líneas)                 │
│ Resumen corto (máximo 2 líneas, frase informativa)    │
│ → Ver comunicado                                        │
└─────────────────────────────────────────────────────────┘
```

**Elementos:**

1. **Categoría Badge**
   - Color sobrio (no decorativo): Azul, Verde, Púrpura, etc.
   - Texto: mayúsculas, pequeño (`text-xs`)
   - Border: `border` y fondo pálido
   - Ancho: `w-fit` (ajusta al contenido)

2. **Título**
   - Tamaño: `text-base sm:text-lg`
   - Font: `font-raleway`, bold
   - Límite: `line-clamp-2` (máximo 2 líneas)
   - Color: slate-900 (oscuro, formal)

3. **Resumen**
   - Tamaño: `text-sm`
   - Font: `font-inter`
   - Color: slate-700 (un tono más claro)
   - Límite: `line-clamp-2` (máximo 2 líneas)

4. **CTA Discreto**
   - Tipo: Link (no Button)
   - Texto: "Ver comunicado" o "Consultar noticia"
   - Icono: ChevronRight pequeño
   - Hover: enlace destaca, flecha se desplaza

---

## 🎨 DETALLES DE DISEÑO

### Separadores entre noticias
```css
border-b border-slate-200
last:border-b-0  /* Sin borde en la última */
```

### Espacios verticales
- Entre noticias: `pb-8 py-6` (16px + 24px = 40px total)
- Después del listado: `mt-12` (paginación)
- Entre elementos dentro: `mb-3`, `mb-2`, `mb-4`

### Hover Effects
```css
hover:bg-slate-50/50
transition-colors duration-200
```
Muy sutil, no distrae

### Responsive
```
Desktop: w-20 (fecha), text-4xl (día)
Móvil:   w-16 (fecha), text-3xl (día)
```

---

## 🎯 COLORES POR CATEGORÍA

| Categoría | Color | Código |
|-----------|-------|--------|
| Colaboración | Azul | `bg-blue-50 text-blue-700 border-blue-200` |
| Evento | Verde | `bg-green-50 text-green-700 border-green-200` |
| Publicación | Púrpura | `bg-purple-50 text-purple-700 border-purple-200` |
| Lanzamiento | Naranja | `bg-orange-50 text-orange-700 border-orange-200` |
| Participación | Teal | `bg-teal-50 text-teal-700 border-teal-200` |
| Reconocimiento | Amarillo | `bg-yellow-50 text-yellow-700 border-yellow-200` |
| Comunicado | Gris | `bg-slate-50 text-slate-700 border-slate-200` |

---

## ✨ LO QUE SE LOGRÓ

### ✅ Cumple todos los requisitos
- [x] Timeline horizontal completo
- [x] Fecha grande a la izquierda
- [x] Contenido a la derecha (ancho completo)
- [x] Categoría badge sobrio
- [x] Título 1-2 líneas máximo
- [x] Resumen informativo 1-2 líneas
- [x] CTA discreto "Ver comunicado"
- [x] Sin imágenes
- [x] Sin autor, tiempo de lectura
- [x] Limpio, fácil de escanear

### ✅ Atributos institucionales
- [x] Serio, formal, académico
- [x] Tipo "historial" / "registro"
- [x] Fácil para evaluadores
- [x] Sentido de continuidad
- [x] Responsive (móvil/desktop)

### ✅ Performance
- [x] Sin animaciones pesadas
- [x] Compila sin errores
- [x] Lazy loading de componentes
- [x] Optimizado rendimiento

---

## 🔧 ARCHIVOS MODIFICADOS

```
src/components/noticias/NoticiaCard.tsx
├─ Layout: flex (no grid)
├─ Columna izquierda: flex-shrink-0, ancho fijo
├─ Columna derecha: flex-1, contenido flexible
├─ Fecha: Día (text-4xl), Mes (text-sm), Año (text-xs)
├─ Categoría: badge border + bg pálido
├─ Título: line-clamp-2, font-raleway bold
├─ Resumen: line-clamp-2, font-inter
└─ CTA: Link discreto con ChevronRight

src/components/News.tsx
├─ Grid: div.space-y-0 (no grid-cols-2)
├─ Paginación: mt-12 (mayor separación)
└─ Contenedor: max-w-6xl (ancho completo)
```

---

## 📱 RESPONSIVIDAD

### Desktop (lg+)
```
[Fecha 20px] [Contenido ~ 100%]
  29          Título de noticia...
  ENE         Resumen...
  2026        → Ver comunicado
```

### Móvil (xs-sm)
```
[F 16px] [Contenido ~ 100%]
  29       Título de noticia...
  ENE      Resumen...
  2026     → Ver comunicado
```

Números y espacios se adaptan, pero estructura es idéntica.

---

## 🚀 EJEMPLO EN VIVO

En `/noticias` ahora ves:

```
┌──────────────────────────────────────────────────┐
│ 29       [ COLABORACIÓN ]                         │
│ ENE      Grupo FyT fortalece colaboración        │
│ 2026     internacional con la Universidad de     │
│          Guadalajara                              │
│          Se consolida una conexión académica     │
│          internacional...                        │
│          → Ver comunicado                         │
└──────────────────────────────────────────────────┘
```

Sin:
- ❌ Imágenes
- ❌ Autor
- ❌ "5 min de lectura"
- ❌ Cards tipo blog
- ❌ Animaciones pesadas

**Resultado:** Parece un historial limpio, formal, institucional. Perfecto para evaluadores y pares académicos.

---

## 📊 COMPARATIVA VISUAL

| Aspecto | ANTES | DESPUÉS |
|---------|-------|---------|
| Layout | Grid 2 cols | Timeline horizontal |
| Fecha visible | Media | Prominente |
| Espacio horizontal | Limitado | Completo |
| Sensación | Blog | Historial/Registro |
| Scaneabilidad | Media | Excelente |
| Institucional | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## ✅ STATUS

- Compilación: ✅ Exitosa
- Tests: ✅ Sin errores
- Responsive: ✅ Móvil y desktop
- Commit: ✅ En rama `develop`
- Listo producción: ✅ SÍ

