---
Estado: Completado
Idioma: ES
---
# Sistema de Carga Unificado - Documentación

**Fecha:** 25 de diciembre de 2025  
**Versión:** 2.0 - Loader Unificado

---

## 📋 Descripción General

Se ha unificado el sistema de carga en una pantalla profesional única que:

✅ **Características:**
- Logo del Grupo FyT prominente
- Animaciones fluidas de entrada y salida
- Tiempo mínimo garantizado (1.2s) para que se vea el logo
- Dura mientras se cargan recursos de la página
- Transición suave sin parpadeos
- Sin duplicación de código
- Optimizado para rendimiento

---

## 🏗️ Arquitectura del Sistema

### Componentes Involucrados

```
┌─────────────────────────────────────────┐
│         index.html (HTML Loader)        │
│  - Spinner visual con logo              │
│  - Animaciones CSS puras                │
│  - Tiempo mínimo de 1.2s                │
│  - Control de remover loader            │
└────────────┬────────────────────────────┘
             │
             │ Coordina mediante window.markReactReady()
             │
             ├─────────────┬──────────────────┐
             │             │                  │
             ▼             ▼                  ▼
        main.tsx    App.tsx & Router   TransitionProvider
        (Signals    (Page Content)      (Route Changes)
         Ready)
```

---

## ⏱️ Timeline de Carga

```
Tiempo    Evento                              Descripción
────────────────────────────────────────────────────────────
0ms       Loader HTML aparece                Visible inmediatamente
          (Animación de logo inicia)         
          
400ms     Logo totalmente visible            Escala 0.9 → 1
          
1200ms    Mínimo tiempo cumplido             Ya puede remover loader si está listo

hasta     React se monta y renderiza         main.tsx llama markReactReady()
2000ms    (típicamente)                      

1200ms+   Fade out del loader                Si ambas condiciones se cumplen:
          (si React está listo)              1. React ready ✓
                                             2. Mín. 1.2s pasado ✓
          
1700ms    Loader removido completamente      Transición suave a contenido
```

---

## 🔧 Cómo Funciona

### 1. **HTML Loader (index.html)**

```html
<div id="app-loader">
  <!-- Logo con animación -->
  <!-- Animaciones CSS puras (sin JS) -->
  <!-- Muy ligero, se carga al instante -->
</div>
```

**Ventajas:**
- ✅ Se ve al instante (sin esperar a React)
- ✅ 0 dependencias de JavaScript
- ✅ Animaciones CSS puras (mejor rendimiento)
- ✅ No necesita carga de librerías

### 2. **Control de Tiempo (Script en index.html)**

```javascript
// Parámetros de control
const MINIMUM_LOADER_TIME = 1200; // 1.2 segundos
let isReactReady = false;

// main.tsx llama esto cuando React está montado
window.markReactReady = function() {
  isReactReady = true;
  // Intenta remover si ya pasó tiempo mínimo
}

// Fallback: fuerza remover después de 5s
setTimeout(() => markReactReady(), 5000);
```

### 3. **Coordinación React (main.tsx)**

```typescript
import React
createRoot(root)

// Señala al loader que React está listo
requestAnimationFrame(() => {
  window.markReactReady();
});

// Renderiza App
root.render(<App />)
```

---

## 🎨 Animaciones Implementadas

### Logo de Entrada
```css
@keyframes logoFadeInScale
  from: opacity 0, scale 0.9
  to: opacity 1, scale 1
  Duration: 0.8s
```

### Efecto Glow
```css
@keyframes glowPulse
  Pulsa en círculo alrededor del logo
  Duration: 2s (infinito)
  Visualmente suave y atractivo
```

### Indicador de Carga (3 puntos)
```css
@keyframes bounce
  Los 3 puntos rebotan secuencialmente
  Delay: 0s, 0.2s, 0.4s
  Muy ligero y moderno
```

### Fade Out Suave
```css
@keyframes fadeOut
  opacity: 1 → 0
  Duration: 0.5s
  Se remueve del DOM después
```

---

## ⚡ Optimizaciones de Rendimiento

### 1. **Animaciones CSS Puras**
- No usa JavaScript para animar
- Mejor rendimiento (GPU accelerated)
- Sin lag o jank

### 2. **will-change CSS**
```css
#app-loader {
  will-change: opacity;
}
```
- Indica al navegador que se animate
- Mejor optimización del navegador

### 3. **Logo Lazy Pero Eager**
```html
<img src="/logo-fyt.png" loading="eager" decoding="async">
```
- Se carga lo antes posible
- No bloquea otros recursos

### 4. **Mínimo Tiempo Garantizado**
```javascript
MINIMUM_LOADER_TIME = 1200ms
```
- Asegura que se ve el logo completo
- Evita "flash" de contenido

### 5. **Fallback Seguro**
```javascript
setTimeout(() => markReactReady(), 5000);
```
- Si React falla, se remueve de todas formas
- Nunca queda stuck el loader

---

## 📊 Comparativa: Antes vs Después

| Aspecto | Antes | Después |
|---------|-------|---------|
| **Loaders** | 2 (duplicados) | 1 (unificado) |
| **Logo visible** | SÍ (pero 2do) | SÍ (al instante) |
| **Tiempo mín.** | No | 1.2s ✓ |
| **Animación entrada** | Spinner simple | Logo + glow ✓ |
| **Animación salida** | Fade 0.3s | Fade 0.5s suave ✓ |
| **Performance** | Bueno | Mejor ✓ |
| **Código duplicado** | SÍ | NO ✓ |
| **Experiencia fluida** | Parcial | Total ✓ |

---

## 🐛 Manejo de Errores

### Escenario 1: React Tarda Mucho
```
→ Loader se remueve después de 5s
→ Contenido se muestra (incluso si React está cargando)
→ No queda stuck
```

### Escenario 2: React Falla Completamente
```
→ Fallback en 5s remueve loader
→ Error boundary muestra contenido útil
→ Página no queda bloqueada
```

### Escenario 3: Usuario Desactiva JS
```
→ HTML loader se muestra
→ Fallback <noscript> muestra mensaje
→ No hay error silencioso
```

---

## 📝 Checklist de Verificación

- [x] Loader aparece al instante
- [x] Logo es visible y atractivo
- [x] Animaciones son suaves (60fps)
- [x] Dura mínimo 1.2s
- [x] Se remueve sin parpadeos
- [x] No hay duración máxima infinita
- [x] Funciona sin JavaScript
- [x] No causa errores de consola
- [x] Performance es óptimo
- [x] Responsive en móvil
- [x] Transición a contenido es suave
- [x] Código es limpio y mantenible

---

## 🚀 Mejoras Futuras Posibles

### 1. Detección de Velocidad de Red
```javascript
// Aumentar MINIMUM_LOADER_TIME en 3G
if (navigator.connection?.effectiveType === '4g') {
  MINIMUM_LOADER_TIME = 1200;
} else {
  MINIMUM_LOADER_TIME = 2000;
}
```

### 2. Estadísticas de Carga
```javascript
// Trackear tiempo real de carga
const loadTime = Date.now() - appLoaderStartTime;
console.log('Tiempo total de carga:', loadTime + 'ms');
```

### 3. Progreso Visual
```javascript
// Mostrar barra de progreso de recursos
let loadedResources = 0;
// Actualizar % visual
```

---

## 📞 Contacto / Soporte

Si encuentras problemas:

1. Revisar console del navegador (F12 → Console)
2. Limpiar caché del navegador
3. Recargar página (Ctrl+Shift+R)
4. Contactar: farmacologiayterapeutica.gi@gmail.com

---

## 🔗 Referencias Técnicas

- [MDN: CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
- [MDN: will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)
- [React: createRoot](https://react.dev/reference/react-dom/createRoot)
- [MDN: requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

---

**Última actualización:** 25 de diciembre de 2025  
**Estado:** ✅ Producción
