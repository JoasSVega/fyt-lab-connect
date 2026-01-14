# FyT Lab Connect

## Español

### ¿Qué es FyT Lab Connect?
FyT Lab Connect es la plataforma web del **Grupo de Investigación en Farmacología y Terapéutica (FyT)**. Su objetivo es centralizar y presentar la producción académica del grupo —publicaciones, proyectos, eventos y contenidos— mediante una interfaz moderna, accesible y orientada a la divulgación científica.

### Propósito del proyecto

El proyecto consolida la presencia digital del grupo FyT y sirve como base tecnológica para futuras iniciativas de colaboración académica, interacción institucional y difusión del conocimiento.

### Público objetivo

- **Académico:** investigadores, estudiantes, docentes y colaboradores universitarios.
- **Institucional / Comercial (proyección futura):** organizaciones interesadas en investigación, consultoría científica y formación especializada.

### Estado actual

El repositorio se encuentra en desarrollo activo sobre la rama `develop`.  
La interfaz está implementada con React y TypeScript, con ruteo funcional, componentes principales y scripts de desarrollo, build y prerendering parcial.

### Arquitectura (resumen)

- Aplicación web construida con **React + Vite** y **TypeScript**.
- Ruteo mediante `react-router-dom` con carga diferida de componentes.
- Estilos basados en **Tailwind CSS** y utilidades modernas.
- Soporte para builds optimizados, incluyendo prerendering y exploración de SSG/SSR.

### Tecnologías principales

- React, React Router
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion, Lucide Icons
- Testing con Vitest

### Documentación

La documentación completa del proyecto se encuentra en la carpeta `docs/`:

- **[QUICK_START.md](docs/QUICK_START.md)** ⭐ - Guía rápida de inicio (5 min)
- **[RESUMEN_EJECUTIVO.md](docs/RESUMEN_EJECUTIVO.md)** - Visión general ejecutiva
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Arquitectura del proyecto
- **[ROADMAP.md](docs/ROADMAP.md)** - Hoja de ruta y futuro
- **[CONTRIBUTING.md](docs/CONTRIBUTING.md)** - Guía de contribución

#### Documentación SEO e Indexación

- **[INDEXATION_FIX_SUMMARY.md](docs/INDEXATION_FIX_SUMMARY.md)** - Solución de indexación en Google
- **[GOOGLE_INDEXATION_VERIFICATION.md](docs/GOOGLE_INDEXATION_VERIFICATION.md)** - Verificación en Google Search Console
- **[VALIDATION_CHECKLIST.md](docs/VALIDATION_CHECKLIST.md)** - Checklist de validación

### Scripts de utilidad

Los scripts de utilidad se encuentran en la carpeta `scripts/`:

- **verify-spa-seo.sh** - Verificación automática de SPA routing y SEO

### Cómo contribuir

1. Crea una rama desde `develop`:

```bash
git checkout -b feature/mi-cambio
```

2. Sigue el estándar de Conventional Commits.

3. Abre un Pull Request hacia `develop` para revisión.

Consulta [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) para más detalles.

### Roadmap (resumen)

- **Corto plazo:** estabilización de UI, pruebas básicas, corrección de bugs de navegación.
- **Mediano plazo:** accesibilidad, automatización CI, prerendering completo.
- **Largo plazo:** internacionalización, panel de administración y evaluación de modelos de sostenibilidad.

Ver [docs/ROADMAP.md](docs/ROADMAP.md) para el roadmap completo.

---

## English

### What is FyT Lab Connect?

FyT Lab Connect is the web platform of the Pharmacology and Therapeutics Research Group (FyT). It centralizes and showcases the group’s academic output — publications, projects, events and content — through a modern, accessible and research-oriented interface.

### Project purpose

The project consolidates the FyT group’s digital presence and provides a technological foundation for future academic collaboration, institutional interaction and scientific dissemination initiatives.

### Target audience

- **Academic:** researchers, students, faculty members and university collaborators.
- **Institutional / Commercial (future scope):** organizations seeking research services, scientific consulting and specialized training.

### Current status

The repository is under active development on the `develop` branch.  
The UI is implemented using React and TypeScript, with functional routing, core components and development/build/prerendering scripts.

### Architecture (summary)

- Web application built with **React + Vite** and **TypeScript**.
- Routing handled by `react-router-dom` with lazy-loaded components.
- Styling powered by **Tailwind CSS**.
- Optimized build workflows, including prerendering and exploratory SSG/SSR support.

### Key technologies

- React, React Router
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion, Lucide Icons
- Vitest for testing

### How to contribute

Create a branch from `develop`:

```bash
git checkout -b feature/my-change
```

Follow Conventional Commits.

Open a Pull Request against `develop` for review.

### Roadmap (summary)

- **Short term:** UI stabilization, basic testing, navigation bug fixes.
- **Mid term:** accessibility improvements, CI automation, full prerendering.
- **Long term:** internationalization, admin panel, sustainability models.

📌 **Nota / Note**

Para documentación técnica detallada, guías de arquitectura y reportes, consulta la carpeta `docs/`.

## Modelo de ramas

**Español:**

- `develop`: Rama principal de desarrollo y documentación. Aquí se integran todas las nuevas funcionalidades, correcciones y la documentación bilingüe antes de cualquier publicación.
- `main`: Rama de publicación. Contiene únicamente los artefactos generados (SSG) para despliegue en producción, sin código fuente editable ni documentación raw.

**English:**

- `develop`: Main branch for development and documentation. All new features, fixes, and bilingual documentation are integrated here before any publication.
- `main`: Publication branch. Contains only the generated artifacts (SSG) for production deployment, with no editable source code or raw documentation.

## Gobernanza y documentación

**Español:**

Las reglas de gobierno, estrategia de ramas y política de documentación bilingüe están detalladas en [docs/GOVERNANCE.md](docs/GOVERNANCE.md).

**English:**

Governance rules, branching strategy, and bilingual documentation policy are detailed in [docs/GOVERNANCE.md](docs/GOVERNANCE.md).
