# Sistema unificado de calculadoras

Este proyecto incorpora un componente reutilizable `CalculatorModal` y un registro `CalculatorsRegistry` para definir calculadoras de forma declarativa.

## Cómo añadir una nueva calculadora

1. Define los campos y, opcionalmente, las fórmulas en `src/lib/calculators/index.ts`:

```ts
import { CalculatorsRegistry } from '@/lib/calculators';

export const CalculatorsRegistry = {
  ejemplo: {
    id: 'ejemplo',
    title: 'Mi calculadora',
    subtitle: 'Descripción breve',
    category: 'clinico',
    color: '#3B82F6',
    fields: [
      { name: 'a', label: 'Variable A', type: 'number', validation: { required: true } },
      { name: 'b', label: 'Variable B', type: 'number' },
    ],
    formulas: [
      {
        id: 'default', label: 'Fórmula por defecto',
        description: 'x = a + b',
        compute: (values) => ({ value: Number(values.a) + Number(values.b) })
      }
    ]
  }
}
```

2. Desde una tarjeta/botón, abre el modal unificado:

```tsx
import CalculatorModal from '@/components/calculators/CalculatorModal';
import { CalculatorsRegistry } from '@/lib/calculators';

<CalculatorModal
  id="calc-ejemplo"
  open={open}
  onOpenChange={setOpen}
  title={CalculatorsRegistry.ejemplo.title}
  subtitle={CalculatorsRegistry.ejemplo.subtitle}
  fields={CalculatorsRegistry.ejemplo.fields}
  formulas={CalculatorsRegistry.ejemplo.formulas}
  categoryColor={CalculatorsRegistry.ejemplo.color}
/>
```

## Convenciones para FormulaSpec

- `id`: identificador estable.
- `label`: nombre visible en el selector del modal.
- `description` o `formulaLatex`: breve explicación o fórmula a mostrar en el icono de información.
- `compute(values)`: recibe los valores del formulario (clave según `name`) y retorna `{ value, unit?, interpretation?, detailsHtml?, severity? }`.

## Accesibilidad

`CalculatorModal` es accesible: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` y `aria-describedby`.

## Temas y colores

Pasa `categoryColor` (hex/variable) para acentuar el encabezado y los botones. Recomendado utilizar la paleta del proyecto: `--brand-blue`, `--brand-gold`, `--brand-purple`.

## Tests

Se incluyen pruebas mínimas con Vitest y React Testing Library. Ejecuta:

```
npm run test
```
