# FyT Lab Connect

## Español

### ¿Qué es FyT Lab Connect?
FyT Lab Connect es la plataforma front-end del Grupo de Investigación en Farmacología y Terapéutica (FyT). Provee una interfaz web para presentar producción académica (publicaciones, proyectos, eventos, contenidos) y facilitar la interacción entre investigadores, estudiantes e interesados.

### Propósito del proyecto
El proyecto centraliza la presencia digital del grupo, facilita la divulgación académica y sirve como base para funciones futuras (formularios de contacto, portales de colaboración, integración de datos académicos).

### Público objetivo
- Académico: investigadores, estudiantes, colaboradores universitarios.
- Institucional/Comercial (futuro): organizaciones interesadas en servicios de investigación, consultoría y formación.

### Estado actual
Repositorio en `develop`. UI implementada en React + TypeScript con rutas principales y scripts para desarrollo, build y SSG/SSR parcial. Código en fase activa de desarrollo.

### Arquitectura (resumen)
- Aplicación React (Vite) escrita en TypeScript.
- Ruteo con `react-router-dom` y componentes lazy-loaded.
- Estilos con Tailwind CSS y utilidades modernas.
- Soporte para builds con Vite, incluyendo scripts para SSG/SSR y prerendering (ver `package.json`).

### Tecnologías principales
- React, React Router
- TypeScript
- Vite
- Tailwind CSS
- Lucide (iconos), Framer Motion
- Herramientas de testing: Vitest

### Cómo contribuir
1. Crea una rama desde `develop`: `git checkout -b feature/mi-cambio`.
2. Sigue las convenciones de commits (Conventional Commits).
3. Abre un Pull Request hacia `develop` y solicita revisión.

### Roadmap resumido
- Corto plazo: estabilizar UI, tests básicos, arreglar bugs de navegación.
- Mediano plazo: accesibilidad, automatización CI, pre-rendering completo.
- Largo plazo: internacionalización, panel de administración, monetización controlada.

---

## English

### What is FyT Lab Connect?
FyT Lab Connect is the front-end platform for the FyT Research Group. It provides a web interface to showcase academic output (publications, projects, events, multimedia) and to enable interactions among researchers, students and external stakeholders.

### Project purpose
The project centralizes the group's digital presence, streamlines academic dissemination and provides a foundation for future features (contact forms, collaboration portals, academic data integrations).

### Target audience
- Academic: researchers, students, university collaborators.
- Institutional/Commercial (future): organizations seeking research services, consulting and training.

### Current status
Repository on `develop`. UI implemented with React + TypeScript, routing and build scripts present. Active development.

### Architecture (summary)
- React SPA with Vite and TypeScript.
- Routing via `react-router-dom`, components lazy-loaded.
- Styling with Tailwind CSS.
- Build tooling includes SSG/SSR support scripts (see `package.json`).

### Key technologies
- React, React Router
- TypeScript
- Vite
- Tailwind CSS
- Lucide, Framer Motion
- Vitest for tests

### How to contribute
1. Branch from `develop`: `git checkout -b feature/my-change`.
2. Follow Conventional Commits.
3. Open a PR against `develop` and request review.

### Short roadmap
- Short term: stabilize UI, basic tests, fix navigation bugs.
- Mid term: accessibility, CI automation, complete pre-rendering.
- Long term: i18n, admin panel, controlled monetization.

---

Nota: Para detalles técnicos y guías de contribución avanzadas, revisa la carpeta `docs/`.

- Library: `katex` (CSS included via component)
- Where: `CalculatorModal` info modal, using the reusable `src/components/ui/Latex.tsx`

Example:

```ts
// src/lib/calculators/index.ts (excerpt)
{
	id: "ckd-epi",
	label: "CKD-EPI",
	expressionLatex: "eGFR=141\n\times\n\min(\frac{S_{Cr}}{\kappa}, 1)^\alpha\n\times\n\max(\frac{S_{Cr}}{\kappa}, 1)^{-1.209}\n\times\n0.993^{\text{age}}\n\times\n1.018^{[female]}\n\times\n1.159^{[black]}",
}
```

If `expressionLatex` isn't provided, the UI falls back to `expressionText` or `description`.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7e4f4b53-264a-46f7-bccc-4a989f7b0ced) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
