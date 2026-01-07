## PR: fix/calculators-input-flip

Resumen de la raíz del problema:
- Pérdida de foco: los inputs numéricos estaban controlados con `Number()` en cada pulsación. Al teclear estados intermedios como `"12."` o `","`, el valor se normalizaba a número, provocando re-render con valor distinto (y en ciertos navegadores, jitter del cursor). Además, el alto del contenedor se recalculaba en cada tecla por depender de `formValues`, generando renders innecesarios.
- Flip inestable: el 3D flip dependía de clases arbitrarias de Tailwind para `backface-visibility` y del `transform-style` del contenedor. En algunos entornos no se generaban esas clases, causando filtraciones visuales (caras visibles a la vez) o falta de animación. También faltaba guardado contra re-entradas durante la transición.

Cambios aplicados (archivos clave):
- `src/components/calculators/CalculatorCard.jsx`:
	- Inputs numéricos ahora almacenan cadenas crudas; parseo solo en `handleCalculate` (normalizando coma a punto).
	- `type="text"` + `inputMode="decimal"` + `pattern` para admitir estados intermedios y teclado numérico en móvil.
	- Altura del contenedor: actualización condicionada (solo si el cambio > 1px) y sin depender de `formValues`.
	- Flip: escena única con `transformStyle: 'preserve-3d'`, `backfaceVisibility` inline (incluyendo `WebkitBackfaceVisibility`), `willChange: 'transform'` y `data-testid` para pruebas.
	- Guardia de transición: ignora clicks repetidos mientras `flipAnimatingRef.current` es verdadero.
- `src/components/calculators/CalculatorModal.tsx` (previo refactor):
	- Inputs no controlados (`defaultValue`) para evitar jitter de foco.
	- `backfaceVisibility` inline y `perspective`/`preserve-3d` explícitos.
	- Cálculo y validación limitados a campos visibles, parseo diferido.
- Tests: `src/components/calculators/__tests__/CalculatorCard.spec.tsx` verifica foco y flip.
- CHANGELOG: entrada del 2025-11-18 documenta la solución.

Reproducción y verificación manual:
1) `npm ci && npm run dev`.
2) Abrir `/herramientas/clinicos` y `/herramientas/antropometricos`.
3) Abrir una calculadora, escribir `120.5` sin perder foco.
4) Presionar "Calcular": flip a resultados una sola vez (inputs ocultos).
5) Presionar "Volver": flip inverso sin parpadeo.

Pruebas:
```
npm test
```
Incluye test de foco continuo y flip bidireccional en `CalculatorCard`.

Notas:
- Si se detecta interacción de hover debajo del modal, considerar desactivar hover en el contenedor padre mientras el modal esté abierto.

# Push Report

Date: 2025-11-05

## Summary
- Synchronized local changes to `main` safely, preserving environment variables.
- Merged diagnostic and recent feature changes into `main` via a no-ff merge.
- Ensured `.env` is ignored; added `.env.example` for reference.

## Commands executed

1) Validate local state and commit pending changes
```
git status --porcelain --branch
git add .
git commit -m "feat: actualización de herramientas y ajustes visuales para integración de variables"
```

2) Switch to main, update, and merge current branch
```
git checkout main
git pull origin main
git merge diagnostic/git-dev-fix-20251105-1200 --no-ff -m "merge: integración de cambios recientes al main"
```

3) Verify remotes
```
git remote -v
```

4) Push to main
```
git push origin main
```

5) Preserve env variables
```
# No .env files detected; added ignore and example for safety
# Files:
#  - .gitignore (added .env)
#  - .env.example (document placeholders)
```

## Results
- Latest commit on main: 7eef56b (chore/env): add .env.example and ignore .env for safe deployments
- Commit URL: https://github.com/JoasSVega/fyt-lab-connect/commit/7eef56b
- Push status: success (main updated from ecfb58b to 7eef56b)
- Variables of entorno: preserved. `.env` ignored; no secrets committed. `.env.example` added.

## Notes
- Remote `origin` uses HTTPS: https://github.com/JoasSVega/fyt-lab-connect.git
- If your local shell defaults to Node < 18, use nvm to switch to Node 18 before running `npm run dev` for Vite 5.
- Dev server binds at port 8080 (per Vite output). Use `npm run dev -- --host` for LAN testing.
