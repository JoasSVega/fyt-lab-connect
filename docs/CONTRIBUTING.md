# Contributing — FyT Lab Connect

## Flujo de trabajo con Git
1. Sincroniza `develop`: `git checkout develop && git pull origin develop`.
2. Crea una rama descriptiva: `git checkout -b feature/descripcion-corta`.
3. Trabaja y haz commits atómicos.
4. Empuja la rama: `git push origin feature/descripcion-corta`.
5. Abre Pull Request hacia `develop` y asigna revisores.

## Convenciones de commits
Usar Conventional Commits para claridad en historial y automatizaciones:
- `feat:` nueva funcionalidad
- `fix:` corrección de bug
- `docs:` cambios en documentación
- `refactor:` cambios sin añadir features ni fixes
- `chore:` tareas de mantenimiento

Ejemplo: `feat(investigacion): agregar CTA a pagina investigacion`

## Uso de branches
- `main`: rama protegida para releases listos para producción.
- `develop`: rama de integración para trabajo en curso.
- `feature/*`: nuevas funcionalidades.
- `bugfix/*`: correcciones a partir de `develop`.
- `hotfix/*`: correcciones urgentes basadas en `main`.

## Pull Requests y revisiones
- Título claro y descripción del cambio.
- Enlazar issue o ticket si existe.
- Añadir checklist: tests, lint, build local.

## Tests y Quality Gates
- Ejecutar `npm run lint` y `npm test` antes de abrir PR.
- Integrar linters y tests en CI (recomendado).

## Buenas prácticas para nuevos contribuidores
- Empieza por issues etiquetados como `good first issue` o `help wanted`.
- Añade tests cuando corriges un bug o agregas funcionalidad.
- Respeta el estilo de código del repositorio.

> Placeholder: configurar plantillas de PR (`.github/PULL_REQUEST_TEMPLATE.md`) y `ISSUE_TEMPLATE`.
