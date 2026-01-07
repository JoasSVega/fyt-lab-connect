# Gobierno y Estrategia de Ramas

## Estrategia de Ramas
- **main**: Rama principal y estable. Solo recibe cambios desde `develop` mediante pull request y revisión.
- **develop**: Rama de integración y consolidación. Aquí se integran todas las funcionalidades y la documentación antes de pasar a `main`.
- **feature/***: Ramas para nuevas funcionalidades. Se crean desde `develop` y se fusionan de vuelta a `develop`.
- **fix/***: Ramas para corrección de errores. Se crean desde `develop` y se fusionan de vuelta a `develop`.
- **diagnostic/***: Ramas para diagnósticos o experimentos. No deben recibir ni propagar documentación.

## Política de Documentación Bilingüe
- Toda la documentación relevante debe estar en español (ES) y en inglés (EN), en el mismo archivo, con español primero.
- Los cambios en la documentación solo se consolidan en `develop` y luego en `main`.
- No se propaga documentación a ramas `feature/*`, `fix/*` ni `diagnostic/*`.

## Cambios que Requieren Documentación
- Nuevas funcionalidades, cambios de arquitectura, procesos, flujos de trabajo y decisiones técnicas relevantes.
- Cambios en políticas, gobernanza, seguridad, privacidad o dependencias críticas.
- Todo cambio que afecte a usuarios finales o a la operación del sistema.

## Cambios que NO Requieren Documentación
- Correcciones menores de estilo, formato o errores tipográficos.
- Refactorizaciones internas sin impacto en la interfaz pública ni en procesos documentados.
- Cambios temporales o experimentales en ramas `diagnostic/*`.

---

# Governance and Branching Strategy

## Branching Strategy
- **main**: Main and stable branch. Only receives changes from `develop` via pull request and review.
- **develop**: Integration and consolidation branch. All features and documentation are merged here before going to `main`.
- **feature/***: Branches for new features. Created from `develop` and merged back into `develop`.
- **fix/***: Branches for bug fixes. Created from `develop` and merged back into `develop`.
- **diagnostic/***: Branches for diagnostics or experiments. Must not receive or propagate documentation.

## Bilingual Documentation Policy
- All relevant documentation must be in Spanish (ES) and English (EN) in the same file, with Spanish first.
- Documentation changes are consolidated only in `develop` and then in `main`.
- Documentation is not propagated to `feature/*`, `fix/*`, or `diagnostic/*` branches.

## Changes That Require Documentation
- New features, architecture changes, processes, workflows, and relevant technical decisions.
- Changes in policies, governance, security, privacy, or critical dependencies.
- Any change affecting end users or system operation.

## Changes That Do NOT Require Documentation
- Minor corrections of style, formatting, or typos.
- Internal refactoring with no impact on public interface or documented processes.
- Temporary or experimental changes in `diagnostic/*` branches.
