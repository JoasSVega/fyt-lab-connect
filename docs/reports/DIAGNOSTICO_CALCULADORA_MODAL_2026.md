# 🔍 Diagnóstico: Problemas en CalculatorModal

**Fecha:** 10 de enero de 2026  
**Reportado por:** Usuario  
**Status:** 🔴 CRÍTICO - Requiere corrección inmediata

---

## 📋 Síntomas Reportados

El usuario reporta los siguientes problemas al abrir calculadoras:

1. **Doble aparición:** La calculadora aparece 2 veces
2. **Parpadeo:** La ventana aparece → desaparece → vuelve a aparecer
3. **Animaciones imperceptibles:** La animación de entrada no se nota mucho

---

## 🔎 Análisis del Código

### 1. **PROBLEMA CRÍTICO: Import de framer-motion**

**Archivo:** `src/components/calculators/CalculatorModal.tsx` (Línea 1-2)

```typescript
import React, { useState, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { X, Info } from "lucide-react";
const Latex = React.lazy(() => import("../ui/Latex"));
import { getEffectiveFields, resetValuesForFields, ensureLatexForFormula } from "@/lib/calculators/utils";
```

❌ **ERROR DETECTADO:**  
El archivo **NO IMPORTA** `framer-motion` estáticamente, pero luego **SÍ LO USA** directamente:

**Líneas 732-756:**
```typescript
<MotionAnimatePresence>
  {open && (
    <MotionDiv
      className="absolute inset-0 flex items-center justify-center"
      initial={fm && !hasAnimatedRef.current ? { opacity: 0 } : undefined}
      animate={fm ? { opacity: 1 } : undefined}
      exit={fm ? { opacity: 0 } : undefined}
      transition={fm ? { duration: 0.25, ease: 'easeInOut' } : undefined}
    >
```

**Componentes usados:**
- `MotionAnimatePresence` (línea 732)
- `MotionDiv` (múltiples líneas)
- `MotionConfigComp` (línea 867)

### 2. **PROBLEMA: Lazy-loading de framer-motion**

**Código Actual (líneas 150-165):**
```typescript
React.useEffect(() => {
  if (!actuallyOpen) return;
  let cancelled = false;
  import("framer-motion")
    .then((mod) => {
      if (cancelled) return;
      setFm({
        motion: mod.motion,
        AnimatePresence: (mod as any).AnimatePresence ?? mod.AnimatePresence,
        MotionConfig: (mod as any).MotionConfig ?? mod.MotionConfig,
      });
    })
    .catch(() => {});
  return () => {
    cancelled = true;
  };
}, [actuallyOpen]);
```

❌ **PROBLEMA DETECTADO:**
1. `framer-motion` se carga **DESPUÉS** de que el modal abre
2. Mientras carga, `fm` es `null`, entonces usa fallbacks (`<div>`)
3. Cuando carga, `fm` cambia a objeto → **RE-RENDER del modal**
4. Esto causa **doble renderizado** y **parpadeo**

**Secuencia de eventos:**
```
1. Usuario click "Abrir Calculadora"
2. open = true → modal se renderiza
3. Modal renderiza con fm=null → usa <div> fallback
4. useEffect detecta open=true → inicia import("framer-motion")
5. framer-motion carga (100-300ms)
6. setFm(...) → CAMBIO DE ESTADO
7. Modal RE-RENDERIZA con fm={motion, AnimatePresence, MotionConfig}
8. Ahora usa MotionDiv en lugar de <div>
9. AnimatePresence ejecuta animación de entrada
10. Resultado: usuario ve parpadeo + doble aparición
```

### 3. **PROBLEMA: hasAnimatedRef no se resetea**

**Línea 518:**
```typescript
const hasAnimatedRef = React.useRef(false);
```

**Línea 668 (useEffect de open):**
```typescript
React.useEffect(() => {
  if (open) {
    prevOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    // habilitar animación inicial solo una vez al abrir
    hasAnimatedRef.current = false;  // ✅ SE RESETEA AQUÍ
    return () => {
      document.body.style.overflow = prevOverflowRef.current || "";
      document.body.classList.remove("modal-open");
    };
  }
}, [open]);
```

**Línea 737 y 746 (condicionales de animación):**
```typescript
initial={fm && !hasAnimatedRef.current ? { opacity: 0 } : undefined}
```

❌ **PROBLEMA DETECTADO:**
- `hasAnimatedRef.current = false` se ejecuta cuando `open=true`
- Pero `fm` aún es `null` en ese momento
- Cuando `fm` carga, `hasAnimatedRef.current` sigue siendo `false`
- La condición `fm && !hasAnimatedRef.current` se evalúa a `true`
- Se ejecuta animación de entrada **de nuevo**
- Esto causa **segunda aparición** del modal

### 4. **PROBLEMA: AnimatePresence sin key**

**Línea 732-756:**
```typescript
<MotionAnimatePresence>
  {open && (
    <MotionDiv ...>
```

❌ **PROBLEMA DETECTADO:**
- `AnimatePresence` maneja animaciones de montaje/desmontaje
- Sin `key` prop, React no puede distinguir si el componente cambió
- Cuando `fm` cambia de `null` a objeto, React puede pensar que es un nuevo componente
- Esto causa **desmontaje + remontaje** en lugar de actualización
- Resultado: parpadeo y doble aparición

---

## 📊 Root Cause Analysis

### Causa Raíz 1: **Lazy-Loading Timing**
El lazy-loading de `framer-motion` ocurre **DESPUÉS** del primer render del modal. Esto causa:
- Primer render: modal sin animaciones (fm=null)
- Segundo render: modal con animaciones (fm cargado)
- Usuario ve ambos renders → parpadeo

### Causa Raíz 2: **State Update Trigger**
El `setFm()` en el useEffect causa un re-render **completo** del componente modal. Esto:
- Desmonta el `<div>` fallback
- Monta el `<MotionDiv>` con animaciones
- AnimatePresence ejecuta animación de entrada
- Usuario ve "segunda aparición"

### Causa Raíz 3: **Conflicto de Refs**
`hasAnimatedRef` se resetea en el primer render (fm=null), pero cuando fm carga:
- `hasAnimatedRef.current` sigue siendo `false`
- La condición `fm && !hasAnimatedRef.current` se cumple
- Se ejecuta animación inicial de nuevo

---

## 🎯 Evidencia Visual del Problema

### Secuencia de Renders (Esperado vs Real):

**ESPERADO:**
```
1. Click → Modal aparece con animación suave (fade + scale)
2. Usuario ve contenido
3. Fin
```

**REAL (con bug):**
```
1. Click → Modal aparece SIN animación (fm=null, usa <div>)
2. 100-300ms después → Modal desaparece brevemente
3. Modal vuelve a aparecer CON animación (fm cargado)
4. Usuario ve parpadeo + doble aparición
```

### Stack Trace de Re-renders:

```
Render 1:
  - actuallyOpen: false → true
  - fm: null
  - MotionAnimatePresence: Fragment fallback
  - MotionDiv: <div> fallback
  - hasAnimatedRef.current: false (reseteado)
  - initial: undefined (porque fm=null)

Render 2 (100-300ms después):
  - actuallyOpen: true (sin cambio)
  - fm: {motion, AnimatePresence, MotionConfig} (CARGADO)
  - MotionAnimatePresence: framer-motion AnimatePresence
  - MotionDiv: framer-motion motion.div
  - hasAnimatedRef.current: false (aún no marcado)
  - initial: {opacity: 0} (porque fm=true && !hasAnimatedRef)
  - AnimatePresence ejecuta animación de entrada
  - onAnimationComplete → hasAnimatedRef.current = true
```

---

## 🔧 Impacto del Bug

### Severidad: **CRÍTICA** 🔴

| Aspecto | Impacto |
|---------|---------|
| UX | Muy pobre - parpadeo confunde al usuario |
| Performance | Moderado - doble render innecesario |
| Accesibilidad | Alto - animaciones abruptas pueden molestar |
| SEO | Sin impacto |
| Funcionalidad | Sin impacto - modal funciona, solo UX malo |

### Afectación:
- ✅ **Todas las calculadoras** que usan `CalculatorModal`
- ✅ Páginas: `/herramientas/clinicos`, `/herramientas/antropometricos`, etc.
- ✅ Desktop y Mobile

---

## 🎯 Soluciones Propuestas

### Opción 1: **Eliminar Lazy-Loading de framer-motion** (RECOMENDADO)
**Ventajas:**
- ✅ Elimina parpadeo por completo
- ✅ Animaciones consistentes desde el inicio
- ✅ Código más simple
- ✅ Fix inmediato

**Desventajas:**
- ❌ framer-motion vuelve al bundle crítico (~105 KB)
- ❌ Revierte optimización de Fase 2

**Implementación:**
```typescript
// Línea 1-2: cambiar
import { motion, AnimatePresence, MotionConfig } from "framer-motion";

// Línea 150-165: eliminar useEffect de lazy-load

// Líneas 465-467: eliminar fallbacks
const MotionDiv = motion.div;
const MotionAnimatePresence = AnimatePresence;
const MotionConfigComp = MotionConfig;

// Línea 737-750: simplificar
initial={!hasAnimatedRef.current ? { opacity: 0 } : undefined}
```

### Opción 2: **Precargar framer-motion antes de abrir modal**
**Ventajas:**
- ✅ Mantiene lazy-loading (bundle crítico reducido)
- ✅ Elimina parpadeo
- ✅ Mejor performance

**Desventajas:**
- ❌ Más complejo
- ❌ Requiere cambios en cada página que usa modal

**Implementación:**
```typescript
// En cada página (ej. Clinicos.tsx)
const [fmPreloaded, setFmPreloaded] = React.useState(false);

React.useEffect(() => {
  // Precargar cuando usuario hace hover en botón
  const btn = document.querySelector('[data-open-calc]');
  const preload = () => {
    import('framer-motion').then(() => setFmPreloaded(true));
  };
  btn?.addEventListener('mouseenter', preload, { once: true });
  return () => btn?.removeEventListener('mouseenter', preload);
}, []);

// Abrir modal solo cuando fm cargado
const handleOpen = () => {
  if (fmPreloaded) setOpen(true);
  else {
    import('framer-motion').then(() => {
      setFmPreloaded(true);
      setOpen(true);
    });
  }
};
```

### Opción 3: **Delay de apertura hasta que fm carga**
**Ventajas:**
- ✅ Mantiene lazy-loading
- ✅ Elimina parpadeo
- ✅ Cambios mínimos en CalculatorModal

**Desventajas:**
- ❌ Retraso percibido al abrir (100-300ms)
- ❌ UX ligeramente peor

**Implementación:**
```typescript
// En CalculatorModal
const [fmReady, setFmReady] = React.useState(false);
const [pendingOpen, setPendingOpen] = React.useState(false);

React.useEffect(() => {
  if (!actuallyOpen && !pendingOpen) return;
  if (fmReady) return; // ya cargado
  
  let cancelled = false;
  import("framer-motion").then((mod) => {
    if (cancelled) return;
    setFm({...});
    setFmReady(true);
  });
  return () => { cancelled = true; };
}, [actuallyOpen, pendingOpen, fmReady]);

// Renderizar solo cuando fm ready
return (
  <ModalPortal>
    {fmReady && open && <MotionDiv>...</MotionDiv>}
  </ModalPortal>
);
```

### Opción 4: **Usar CSS Transitions en lugar de framer-motion**
**Ventajas:**
- ✅ Sin dependencias externas
- ✅ Bundle más ligero
- ✅ Sin lazy-loading necesario
- ✅ Sin parpadeo

**Desventajas:**
- ❌ Requiere reescribir animaciones
- ❌ Menos flexible que framer-motion
- ❌ Cambios significativos

**Implementación:**
```css
.modal-enter {
  opacity: 0;
  transform: scale(0.95);
}
.modal-enter-active {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.3s, transform 0.3s;
}
.modal-exit {
  opacity: 1;
  transform: scale(1);
}
.modal-exit-active {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.3s, transform 0.3s;
}
```

---

## 🎬 Recomendación Final

**OPCIÓN 1 (Eliminar Lazy-Loading)** es la más recomendada por:

1. ✅ **Fix inmediato** - soluciona todos los síntomas
2. ✅ **Simplicidad** - código más mantenible
3. ✅ **Sin trade-offs** - funcionalidad completa
4. ✅ **Performance aceptable** - 105 KB es razonable para SPA moderna

**Trade-off aceptado:**
- ❌ Revierte optimización de Fase 2 (~105 KB vuelve al bundle crítico)
- ✅ Pero elimina bugs críticos de UX

**Alternativa si performance es crítica:**
- Opción 2 (Precargar en hover) + Opción 3 (Delay) combinados
- Requiere más trabajo pero mantiene lazy-loading

---

## 📝 Próximos Pasos

1. **Confirmar con usuario** qué opción prefiere (UX vs Performance)
2. **Implementar fix** según opción elegida
3. **Testing manual** en todas las calculadoras
4. **Validar animaciones** en desktop y mobile
5. **Commit y deploy**

---

## 🔗 Referencias

- [CalculatorModal.tsx](../src/components/calculators/CalculatorModal.tsx) (líneas críticas: 1-2, 150-165, 465-467, 732-756)
- [Clinicos.tsx](../src/pages/tools/Clinicos.tsx) (ejemplo de uso)
- [Framer Motion Docs - AnimatePresence](https://www.framer.com/motion/animate-presence/)
- [React Lazy Loading Best Practices](https://reactjs.org/docs/code-splitting.html)

---

**Fin del Diagnóstico**  
*Generado: 10 de enero de 2026*  
*Requiere acción inmediata*
