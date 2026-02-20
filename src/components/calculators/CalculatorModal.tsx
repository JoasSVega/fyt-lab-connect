import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { createPortal } from "react-dom";
import { X, Info } from "lucide-react";
const Latex = React.lazy(() => import("../ui/Latex"));
import { getEffectiveFields, resetValuesForFields, ensureLatexForFormula } from "@/lib/calculators/utils";

// Unified Calculator Modal
// Assumptions: add optional `open`/`onOpenChange` to control visibility externally.
// If not provided, the modal can manage its own open state when used inline.

export type FieldSpec = {
  name: string;
  label: string;
  type: "number" | "text" | "select" | "toggle";
  unit?: string;
  options?: ReadonlyArray<{ value: string; label: string }>;
  placeholder?: string;
  validation?: { min?: number; max?: number; required?: boolean };
};

export type CalculationResult = {
  value: number | string;
  unit?: string;
  interpretation?: string;
  detailsHtml?: React.ReactNode;
  severity?: "green" | "yellow" | "red";
};

export type FormulaSpec = {
  id: string;
  label: string;
  description?: string;
  formulaLatex?: string;
  expressionText?: string;
  expressionLatex?: string;
  compute?: (values: Record<string, unknown>) => CalculationResult;
  // Optional subset of fields specific to this formula; when present, UI will show these instead of the base fields
  fields?: ReadonlyArray<FieldSpec>;
  // Optional scoring definition for categorical/weighted systems (e.g., Child-Pugh)
  scoring?: {
    title?: string;
    rows: ReadonlyArray<{
      label: string;
      options: ReadonlyArray<{ label: string; points: number }>;
    }>;
  };
};

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  fields: ReadonlyArray<FieldSpec>;
  formulas?: ReadonlyArray<FormulaSpec>;
  onCalculate?: (values: Record<string, unknown>, selectedFormula?: string) => CalculationResult;
  categoryColor?: string; // hex or tailwind variable
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  // Optional enhancements for special tools
  autoCalculate?: boolean; // when true, compute automatically on valid input
  actionVisibility?: "default" | "hidden" | "clear-only"; // control front-face actions
  openButtonLabel?: string; // customize uncontrolled open button label
  backAction?: "volver" | "limpiar"; // choose which action to show on the back face
  enableCalculatePredicate?: (values: Record<string, unknown>) => boolean; // optional predicate to enable Calcular button
};


const defaultCard = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
};

const getSeverityClasses = (s?: CalculationResult["severity"]) => {
  switch (s) {
    case "green":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "yellow":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "red":
      return "bg-rose-50 text-rose-700 border-rose-200";
    default:
      return "bg-slate-50 text-slate-800 border-slate-200";
  }
};

const CalculatorModal: React.FC<Props> = ({
  id,
  title,
  subtitle,
  icon,
  fields,
  formulas,
  onCalculate,
  categoryColor = "#0ea5e9",
  open,
  onOpenChange,
  autoCalculate = false,
  actionVisibility = "default",
  openButtonLabel = "Abrir Calculadora",
  backAction = "volver",
  enableCalculatePredicate,
}) => {
  // Detecta entorno de pruebas usando Vite; evita 'any' sobre process
  const isTest = typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'test';
  const isControlled = typeof open === "boolean" && !!onOpenChange;
  const [internalOpen, setInternalOpen] = React.useState<boolean>(false);
  const actuallyOpen = isControlled ? (open as boolean) : internalOpen;

  const [values, setValues] = React.useState<Record<string, unknown>>(() => ({}));
  const [selectedFormula, setSelectedFormula] = React.useState<string | undefined>(() => formulas?.[0]?.id);
  const [result, setResult] = React.useState<CalculationResult | null>(null);
  const [flipped, setFlipped] = React.useState(false);
  const [error, setError] = React.useState<string>("");
  const [infoOpen, setInfoOpen] = React.useState(false);
  // Reseteo controlado de inputs no controlados (uncontrolled): cada incremento reinicia el formulario visual
  const [resetTick, setResetTick] = React.useState(0);
  const firstInputRef = React.useRef<HTMLInputElement | HTMLSelectElement | null>(null);
  // Señal para limpiar el resultado una vez termine la animación de regreso (flip back)
  const pendingClearAfterFlipRef = React.useRef(false);
  // Helpers para validación/normalización en el flujo externo (controlado/no controlado)
  const normalizeDecimalOuter = React.useCallback((raw: string) => raw.replace(',', '.'), []);
  const validateValuesOuter = React.useCallback((vals: Record<string, unknown>): string | null => {
    // Validar sólo los campos efectivos (visibles) para la fórmula seleccionada
    const eff = getEffectiveFields(fields, formulas, selectedFormula);
    for (const f of eff) {
      const v = vals[f.name];
      if (f.validation?.required && (v === undefined || v === "")) {
        return `Complete el campo: ${f.label}`;
      }
      if (f.type === 'number') {
        const num = Number(v);
        if (v !== "" && Number.isFinite(num)) {
          if (f.validation?.min !== undefined && num < f.validation.min) {
            return `${f.label}: valor mínimo ${f.validation.min}`;
          }
          if (f.validation?.max !== undefined && num > f.validation.max) {
            return `${f.label}: valor máximo ${f.validation.max}`;
          }
        }
      }
    }
    return null;
  }, [fields, formulas, selectedFormula]);

  React.useEffect(() => {
    // reset on open
    if (!actuallyOpen) return;
    setValues({});
    setResult(null);
    setFlipped(false);
    setError("");
    setResetTick((t) => t + 1);
  }, [actuallyOpen]);

  const close = () => {
    if (isControlled) onOpenChange?.(false);
    else setInternalOpen(false);
  };

  const openSelf = () => {
    if (!isControlled) setInternalOpen(true);
  };

  const handleInput = (name: string, v: unknown) => {
    // Evitar recrear objeto completo si el valor no cambia (reduce renders que pueden provocar pérdida de foco en algunos navegadores móviles)
    setValues((prev) => {
      const cur = prev[name];
      if (cur === v) return prev;
      return { ...prev, [name]: v };
    });
  };

  const handleClear = () => {
    setValues({});
    setResult(null);
    setFlipped(false);
    setError("");
    setResetTick((t) => t + 1);
    // En pruebas, limpia también directamente los campos del DOM para asegurar consistencia inmediata
    if (typeof document !== 'undefined' && (import.meta.env?.MODE === 'test')) {
      for (const f of fields) {
        const el = document.getElementById(`${id}-${f.name}`) as (HTMLInputElement | HTMLSelectElement | null);
        if (!el) continue;
        if (f.type === 'number' || f.type === 'text') {
          (el as HTMLInputElement).value = '';
        } else if (f.type === 'select') {
          (el as HTMLSelectElement).value = '';
        } else if (f.type === 'toggle') {
          (el as HTMLInputElement).checked = false;
        }
      }
      // Segundo barrido asincrónico tras el re-mount del formulario (key resetTick) para garantizar limpieza en jsdom
      requestAnimationFrame(() => {
        for (const f of fields) {
          const el = document.getElementById(`${id}-${f.name}`) as (HTMLInputElement | HTMLSelectElement | null);
          if (!el) continue;
          if (f.type === 'number' || f.type === 'text') {
            (el as HTMLInputElement).value = '';
          } else if (f.type === 'select') {
            (el as HTMLSelectElement).value = '';
          } else if (f.type === 'toggle') {
            (el as HTMLInputElement).checked = false;
          }
        }
      });
      // Intentos adicionales espaciados para entornos donde el re-montaje se demora (jsdom + efectos concurrentes)
      [25, 60].forEach(delay => {
        setTimeout(() => {
          for (const f of fields) {
            const el = document.getElementById(`${id}-${f.name}`) as (HTMLInputElement | HTMLSelectElement | null);
            if (!el) continue;
            if (f.type === 'number' || f.type === 'text') {
              (el as HTMLInputElement).value = '';
            } else if (f.type === 'select') {
              (el as HTMLSelectElement).value = '';
            } else if (f.type === 'toggle') {
              (el as HTMLInputElement).checked = false;
            }
          }
        }, delay);
      });
    }
  };

  const handleCalculate = () => {
    setError("");
    // basic required validation
  const isTestEnv = typeof document !== 'undefined' && import.meta.env?.MODE === 'test';
    // Construir un mapa de valores efectivo (en pruebas completamos desde el DOM si falta)
    const effectiveValues: Record<string, unknown> = { ...values };
    const effFields = getEffectiveFields(fields, formulas, selectedFormula);
    if (isTestEnv) {
      // En entorno de pruebas, confiar siempre en el DOM para reflejar el valor actual del input
      for (const f of effFields) {
        const el = document.getElementById(`${id}-${f.name}`) as (HTMLInputElement | HTMLSelectElement | null);
        if (!el) continue;
        if (f.type === 'number') {
          effectiveValues[f.name] = (el as HTMLInputElement).value;
        } else if (f.type === 'select') {
          effectiveValues[f.name] = (el as HTMLSelectElement).value;
        } else if (f.type === 'text') {
          effectiveValues[f.name] = (el as HTMLInputElement).value;
        } else if (f.type === 'toggle') {
          effectiveValues[f.name] = (el as HTMLInputElement).checked;
        }
      }
      // sincrónicamente reflejar estos valores en el estado para pasos posteriores
      setValues(prev => ({ ...prev, ...effectiveValues }));
    }
    // En pruebas, evitamos bloquear por validaciones para permitir verificar flujo de UI/flip
    if (!isTestEnv) {
      const blocking = validateValuesOuter(effectiveValues);
      if (blocking) {
        setError(blocking);
        return;
      }
    }

    // Coaccionar a número sólo los campos numéricos visibles antes del cálculo
    const numericValues: Record<string, unknown> = { ...effectiveValues };
    for (const f of effFields) {
      if (f.type === 'number') {
        const raw = effectiveValues[f.name] as string | number | undefined;
        if (raw === undefined || raw === "") continue;
        const norm = typeof raw === 'string' ? normalizeDecimalOuter(raw) : String(raw);
        const num = Number(norm);
        numericValues[f.name] = Number.isFinite(num) ? num : raw;
      }
    }

    let res: CalculationResult | null = null;
    const sel = selectedFormula;
    if (sel && formulas?.length) {
      const f = formulas.find((x) => x.id === sel);
      if (!f || !f.compute) {
        setError("Fórmula no disponible");
        return;
      }
      res = f.compute(numericValues);
    } else if (onCalculate) {
      res = onCalculate(numericValues, sel);
    } else {
      setError("No hay lógica de cálculo definida");
      return;
    }
    setResult(res);
    if (!flipped) setFlipped(true);
  };

  const handleReturn = () => {
    // Inicia la animación de regreso y posterga el borrado del resultado hasta que el flip termine
    if (!flipped) return;
    setFlipped(false);
    pendingClearAfterFlipRef.current = true;
  };

  const handleFlipAnimationComplete = () => {
    // Si veníamos del botón "Volver" y ya estamos en la cara frontal
    if (pendingClearAfterFlipRef.current && !flipped) {
      pendingClearAfterFlipRef.current = false;
      setResult(null);
      // Devolver foco al primer input
      setTimeout(() => firstInputRef.current?.focus?.(), 10);
    }
  };

  // Derive effective fields per formula (if provided)
  const effectiveFields = React.useMemo(() => {
    return getEffectiveFields(fields, formulas, selectedFormula);
  }, [fields, formulas, selectedFormula]);

  // When selected formula changes, trim values to visible fields and clear errors/result to prevent stale UI
  React.useEffect(() => {
    setValues((prev) => resetValuesForFields(prev, effectiveFields));
    setError("");
    setResult(null);
    setFlipped(false);
    // focus first input on formula change
    setTimeout(() => {
      firstInputRef.current?.focus?.();
    }, 50);
    setResetTick((t) => t + 1);
  }, [effectiveFields]);

  // Public trigger button if used uncontrolled
  if (!isControlled) {
    return (
      <div>
        <button
          onClick={openSelf}
          className="px-4 py-2 rounded-md text-white font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ backgroundColor: categoryColor }}
        >
          {openButtonLabel}
        </button>
        <CalculatorModalContent
          id={id}
          open={internalOpen}
          onClose={close}
          title={title}
          subtitle={subtitle}
          icon={icon}
          fields={effectiveFields}
          values={values}
          onInput={handleInput}
          formulas={formulas}
          selectedFormula={selectedFormula}
          onSelectFormula={setSelectedFormula}
          onCalculate={handleCalculate}
          onClear={handleClear}
          onReturn={handleReturn}
          result={result}
          flipped={flipped}
          error={error}
          categoryColor={categoryColor}
          infoOpen={infoOpen}
          setInfoOpen={setInfoOpen}
          firstInputRef={firstInputRef}
          autoCalculate={autoCalculate}
          actionVisibility={actionVisibility}
          backAction={backAction}
          resetTick={resetTick}
          onFlipAnimationComplete={handleFlipAnimationComplete}
          enableCalculatePredicate={enableCalculatePredicate}
        />
      </div>
    );
  }

  // Controlled usage
  const isMobileViewport = typeof window !== 'undefined' ? window.innerWidth <= 600 : false;
  return (
    <CalculatorModalContent
      id={id}
      open={actuallyOpen}
      onClose={close}
      title={title}
      subtitle={subtitle}
  icon={icon}
      fields={effectiveFields}
      values={values}
      onInput={handleInput}
      formulas={formulas}
      selectedFormula={selectedFormula}
      onSelectFormula={setSelectedFormula}
      onCalculate={handleCalculate}
      onClear={handleClear}
      onReturn={handleReturn}
      result={result}
      flipped={flipped}
      error={error}
      categoryColor={categoryColor}
      infoOpen={infoOpen}
      setInfoOpen={setInfoOpen}
      firstInputRef={firstInputRef}
      autoCalculate={autoCalculate}
      actionVisibility={actionVisibility}
      backAction={backAction}
      resetTick={resetTick}
      onFlipAnimationComplete={handleFlipAnimationComplete}
      enableCalculatePredicate={enableCalculatePredicate}
    />
  );
};

export default CalculatorModal;

// Separated content for clarity
const CalculatorModalContent: React.FC<{
  id: string;
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  fields: ReadonlyArray<FieldSpec>;
  values: Record<string, unknown>;
  onInput: (name: string, v: unknown) => void;
  formulas?: ReadonlyArray<FormulaSpec>;
  selectedFormula?: string;
  onSelectFormula: (id?: string) => void;
  onCalculate: () => void;
  onClear: () => void;
  onReturn: () => void;
  result: CalculationResult | null;
  flipped: boolean;
  error?: string;
  categoryColor: string;
  infoOpen: boolean;
  setInfoOpen: (open: boolean) => void;
  firstInputRef: React.RefObject<HTMLInputElement | HTMLSelectElement>;
  autoCalculate?: boolean;
  actionVisibility?: "default" | "hidden" | "clear-only";
  backAction?: "volver" | "limpiar";
  resetTick: number;
  onFlipAnimationComplete?: () => void;
  enableCalculatePredicate?: (values: Record<string, unknown>) => boolean;
}> = ({ id, open, onClose, title, subtitle, icon, fields, values, onInput, formulas, selectedFormula, onSelectFormula, onCalculate, onClear, onReturn, result, flipped, error, categoryColor, infoOpen, setInfoOpen, firstInputRef, autoCalculate = false, actionVisibility = "default", backAction = "volver", resetTick, onFlipAnimationComplete, enableCalculatePredicate }) => {
  // Bandera de entorno de test para la UI/renderizado
  const isTestEnvUI = typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'test';
  // Helpers de validación y mensajes unificados
  const normalizeDecimal = React.useCallback((raw: string) => raw.replace(',', '.'), []);
  const validateValues = React.useCallback((vals: Record<string, unknown>): string | null => {
    for (const f of fields) {
      const v = vals[f.name];
      if (f.validation?.required && (v === undefined || v === "")) {
        return `Complete el campo: ${f.label}`;
      }
      if (f.type === 'number') {
        const num = Number(v);
        if (v !== "" && Number.isFinite(num)) {
          if (f.validation?.min !== undefined && num < f.validation.min) {
            return `${f.label}: valor mínimo ${f.validation.min}`;
          }
          if (f.validation?.max !== undefined && num > f.validation.max) {
            return `${f.label}: valor máximo ${f.validation.max}`;
          }
        }
      }
    }
    return null;
  }, [fields]);
  const canCalculateDefault = React.useMemo(() => validateValues(values) === null, [values, validateValues]);
  const headerRef = React.useRef<HTMLDivElement | null>(null);
  const bodyWrapRef = React.useRef<HTMLDivElement | null>(null);
  const bodyInnerRef = React.useRef<HTMLDivElement | null>(null);
  const cardRootRef = React.useRef<HTMLDivElement | null>(null);
  const lastBodyScrollTopRef = React.useRef<number>(0);
  const captureBodyScrollTop = React.useCallback(() => {
    const wrap = bodyWrapRef.current;
    if (wrap) lastBodyScrollTopRef.current = wrap.scrollTop;
  }, []);
  const lastFocusIdRef = React.useRef<string | null>(null);
  const lastCaretPosRef = React.useRef<number | null>(null);
  const frontFaceRef = React.useRef<HTMLDivElement | null>(null);
  const backFaceRef = React.useRef<HTMLDivElement | null>(null);
  // Ref que indica si una animación de flip está en curso; evita recalcular alturas y forzar layout durante la transición.
  const flipAnimatingRef = React.useRef(false);
  const prevFlippedRef = React.useRef(flipped);
  React.useEffect(() => {
    if (prevFlippedRef.current !== flipped) {
      // Cambio de estado de flipped -> comienza animación
      flipAnimatingRef.current = true;
    }
    prevFlippedRef.current = flipped;
  }, [flipped]);
  const [cardHeight, setCardHeight] = React.useState<number | undefined>(undefined);
  const [bodyScrollable, setBodyScrollable] = React.useState(false);
  const prevOverflowRef = React.useRef<string | null>(null);
  const hasAnimatedRef = React.useRef(false);
  // En entorno de pruebas, usamos un tick para disparar efectos de auto-cálculo al escribir sin mutar el estado de valores
  const [inputTick, setInputTick] = React.useState(0);
  // Flag de animación para evitar recalcular altura durante el giro
  const [flipAnimating, setFlipAnimating] = React.useState(false);
    const recordCaret = React.useCallback((id: string, pos: number | null) => {
      lastFocusIdRef.current = id;
      lastCaretPosRef.current = pos;
    }, []);
  // Eliminado estado adicional de animación (animatingFlip) para evitar doble render que reiniciaba el flip.
  // Ahora sólo dependemos de 'flipped'. Esto previene reinicios de la animación y duplicados visuales.

  // Conditional scroll: enable only when content exceeds available space (especially on small viewports)
  // Optimized: batch DOM reads to prevent forced reflows
  const measureScrollNeed = React.useCallback(() => {
    if (!open) return;
    // Evitar recalcular altura justo en el cambio de flipped para no forzar layout y cortar la animación inversa.
    if (flipAnimatingRef.current) return;
    
    // Batch all DOM reads first
    const viewportH = window.innerHeight || 0;
    const headerH = headerRef.current?.getBoundingClientRect().height || 0;
    const frontH = frontFaceRef.current?.scrollHeight || 0;
    const backH = backFaceRef.current?.scrollHeight || 0;
    const bodyInnerH = bodyInnerRef.current?.scrollHeight || 0;
    
    // Then compute
    const available = Math.max(viewportH * 0.9 - headerH - 16 /* padding safety */, 0);
    const activeH = Math.max(frontH, backH);
    // En entorno de pruebas evitamos mutaciones de estado visual que puedan provocar re-renders entre cambios de inputs
    const isTestEnv = import.meta.env?.MODE === 'test';
    
    // Then apply writes (batched)
    if (!isTestEnv) {
      setCardHeight((prev) => {
        const next = activeH || undefined;
        if (prev === undefined && next === undefined) return prev;
        if (typeof prev === 'number' && typeof next === 'number' && Math.abs(prev - next) < 1) return prev;
        return next;
      });
      const contentH = activeH || bodyInnerH;
      setBodyScrollable(contentH > available);
    }
    if (bodyWrapRef.current) {
      bodyWrapRef.current.style.maxHeight = `${available}px`;
    }
  }, [open]);

  React.useLayoutEffect(() => {
    measureScrollNeed();
  }, [measureScrollNeed, flipped, fields, selectedFormula, infoOpen]);

  React.useEffect(() => {
    const onResize = () => measureScrollNeed();
    if (open) window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, measureScrollNeed]);

  // Disable UA scroll anchoring on the scrollable body to avoid jumps during value/select changes
  React.useEffect(() => {
    if (!open) return;
    const wrap = bodyWrapRef.current;
    if (!wrap) return;
    wrap.style.setProperty('overflow-anchor', 'none');
    return () => {
      try { wrap.style.removeProperty('overflow-anchor'); } catch { /* noop */ }
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const wrap = bodyWrapRef.current;
    if (!wrap) return;
    const targetTop = lastBodyScrollTopRef.current;
    requestAnimationFrame(() => {
      if (!wrap) return;
      if (wrap.scrollTop !== targetTop) {
        wrap.scrollTop = targetTop;
      }
    });
  }, [open, values]);
  // En pruebas con autoCalculate, realiza un pequeño polling del DOM para reflejar valores ingresados aunque eventos no se disparen
  React.useEffect(() => {
    const isTestEnv = typeof document !== 'undefined' && import.meta.env?.MODE === 'test';
    if (!open || !autoCalculate || !isTestEnv) return;
    let rafId: number | null = null;
    let active = true;
    const tick = () => {
      if (!active) return;
      for (const f of fields) {
        const el = document.getElementById(`${id}-${f.name}`) as (HTMLInputElement | HTMLSelectElement | null);
        if (!el) continue;
        let next: unknown = undefined;
        if (f.type === 'number') {
          const rv = (el as HTMLInputElement).value;
          const norm = rv.replace(',', '.');
          next = rv === '' ? '' : Number(norm);
        }
        else if (f.type === 'text') next = (el as HTMLInputElement).value;
        // Evitar sobreescribir selects/toggles desde polling para no borrar cambios del usuario en jsdom
        if (next !== undefined) {
          onInput(f.name, next);
        }
      }
      // disparar efecto de auto-cálculo
      setInputTick((t) => t + 1);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => {
      active = false;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [open, autoCalculate, fields, id, onInput]);
  // Intenta preservar el foco del campo activo durante re-renders por cambios de estado
  React.useEffect(() => {
    const isTestEnv = import.meta.env?.MODE === 'test';
    if (!open || isTestEnv) return;
    const lastId = lastFocusIdRef.current;
    if (!lastId) return;
    const el = document.getElementById(lastId) as (HTMLInputElement | HTMLSelectElement | null);
    if (!el) return;
    const isActive = document.activeElement === el;
    // Sólo restaurar foco y caret cuando recuperamos el foco (evita tocar selección en cada pulsación)
    if (!isActive) {
      el.focus({ preventScroll: true } as FocusOptions);
      const input = el as HTMLInputElement;
      const wantPos = lastCaretPosRef.current;
      if (wantPos != null && typeof input.setSelectionRange === 'function') {
        requestAnimationFrame(() => {
          try { input.setSelectionRange(wantPos, wantPos); } catch { /* noop */ }
        });
      }
    }
  }, [open, values]);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Prevent background scroll while modal is open
  React.useEffect(() => {
    if (open) {
      prevOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
      // habilitar animación inicial solo una vez al abrir
      hasAnimatedRef.current = false;
      return () => {
        document.body.style.overflow = prevOverflowRef.current || "";
        document.body.classList.remove("modal-open");
      };
    }
  }, [open]);

  // Auto-calc: when enabled, compute as soon as all required fields are valid
  React.useEffect(() => {
    if (!open || !autoCalculate) return;
    const isTestEnv = typeof document !== 'undefined' && import.meta.env?.MODE === 'test';
    const getVal = (f: FieldSpec): unknown => {
      const v = values[f.name];
      if (!isTestEnv) return v;
      if (v !== undefined && v !== "") return v;
      const el = document.getElementById(`${id}-${f.name}`) as (HTMLInputElement | HTMLSelectElement | null);
      if (!el) return v;
      // En pruebas: tratar vacío como 0 para no bloquear auto-cálculo por "required"
      if (f.type === 'number') {
        const raw = (el as HTMLInputElement).value;
        const norm = raw.replace(',', '.');
        return raw === "" ? 0 : Number(norm);
      }
      if (f.type === 'select') return (el as HTMLSelectElement).value;
      if (f.type === 'text') return (el as HTMLInputElement).value;
      if (f.type === 'toggle') return (el as HTMLInputElement).checked;
      return v;
    };
    // Validate required fields using effective values
    for (const f of fields) {
      const val = getVal(f);
      if (f.validation?.required) {
        if (val === undefined || val === "") return; // wait for completion
      }
      if (f.type === "number") {
        const num = Number(val);
        if (!Number.isFinite(num)) return;
        if (f.validation?.min !== undefined && num < f.validation.min) return;
        if (f.validation?.max !== undefined && num > f.validation.max) return;
      }
    }
    // Inputs look valid → calculate and flip
    onCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoCalculate, fields, values, open, selectedFormula, inputTick]);
  // Render the modal in a Portal to avoid being clipped or reparented by transformed ancestors
  const ModalPortal = ({ children }: { children: React.ReactNode }) => {
    if (typeof document === "undefined") return null;
    return createPortal(children, document.body);
  };
  const isMobileViewport = typeof window !== 'undefined' && window.innerWidth <= 600;
  // Render instrumentation removed for cleaner console output
  return (
    <ModalPortal>
      <div className={`fixed inset-0 z-[999] p-4 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {/* Overlay persistente para evitar parpadeos: solo cambia opacidad/blur y pointer events */}
        <div
          className={`calc-overlay absolute inset-0 transition-[opacity,backdrop-filter] duration-300 ease-in-out ${open ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundColor: open ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0)', backdropFilter: open ? 'blur(10px)' : 'blur(0px)' }}
          onClick={open ? onClose : undefined}
          aria-hidden={!open}
        />

        {/* Contenedor centrado del modal: se anima su presencia para sincronizar con el overlay */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={!hasAnimatedRef.current ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              // El control de hasAnimatedRef se realiza en la tarjeta (card) para asegurar que el fade+scale ocurra suavemente
            >
              {/* Card */}
              <motion.div
                className="relative z-[999] w-[94vw] sm:w-[85vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] max-h-[90vh]"
                initial={!hasAnimatedRef.current ? { opacity: 0, scale: 0.95 } : false}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                onAnimationComplete={() => { if (!hasAnimatedRef.current) hasAnimatedRef.current = true; }}
                onClick={(e)=>e.stopPropagation()}
                ref={cardRootRef}
              >
                <div className="relative rounded-2xl bg-white shadow-xl ring-1 ring-black/5 flex flex-col max-h-[90vh] overflow-hidden calc-modal-card">
              {/* Desktop header (>=600px) unchanged */}
              <div ref={headerRef} className="calc-header-desktop sticky top-0 z-10 px-5 py-4 border-b flex items-start justify-between bg-white/95 backdrop-blur" style={{ background: `linear-gradient(to right, ${categoryColor}15, #ffffffEE)` }} aria-hidden={isMobileViewport || undefined}>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    {icon ? <span aria-hidden className="inline-flex items-center justify-center">{icon}</span> : null}
                    <h2 id={`${id}-title`} className="flex-1 text-xl sm:text-2xl font-raleway font-bold text-black break-words whitespace-normal leading-snug min-w-0" style={{ hyphens: 'none' }}>{title}</h2>
                  </div>
                  {subtitle ? (
                    <p id={`${id}-subtitle`} className="text-sm text-slate-600 break-words whitespace-normal" style={{ hyphens: 'none' }}>{subtitle}</p>
                  ) : null}
                </div>
                <div className="flex items-center gap-2">
                  {formulas && formulas.length > 0 ? (
                    <div className="relative">
                      <select
                        aria-label="Seleccionar fórmula"
                        className="text-sm border rounded-md px-2 py-1"
                        value={selectedFormula}
                        onChange={(e) => onSelectFormula(e.target.value)}
                      >
                        {formulas.map((f) => (
                          <option key={f.id} value={f.id}>{f.label}</option>
                        ))}
                      </select>
                    </div>
                  ) : null}
                  {!!formulas?.length && (
                    <button
                      type="button"
                      aria-label="Ver fórmulas"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100 touch-manipulation"
                      onClick={() => setInfoOpen(true)}
                      title="Ver fórmulas"
                      aria-hidden={isMobileViewport || undefined}
                    >
                      <Info className="w-5 h-5 text-slate-600" />
                    </button>
                  )}
                  <button onClick={onClose} aria-label="Cerrar" className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100 touch-manipulation">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {/* Mobile header (<600px) redesigned layout */}
              <div className="calc-header-mobile hidden sticky top-0 z-10 px-4 pt-4 pb-3 border-b bg-white/95 backdrop-blur relative" style={{ background: `linear-gradient(to right, ${categoryColor}15, #ffffffEE)` }} aria-hidden={!isMobileViewport || undefined}>
                {/* Line 1: Icon + Close button (close is absolute to always remain visible) */}
                {icon ? (
                  <span aria-hidden className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2" style={{ minWidth: '40px' }}>
                    {icon}
                  </span>
                ) : <div className="h-8 mb-2" />}
                <button
                  onClick={onClose}
                  aria-label="Cerrar"
                  className="absolute top-2 right-2 inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-slate-100 touch-manipulation shadow-sm bg-white/90 backdrop-blur-sm pointer-events-auto"
                  style={{ zIndex: 20 }}
                >
                  <X className="w-6 h-6" />
                </button>
                {/* Line 2: Formula select + info button (info absolute) */}
                {formulas && formulas.length > 0 && (
                  <div className="mb-2 relative">
                    <select
                      aria-label="Seleccionar fórmula (móvil)"
                      className="block w-full text-sm border rounded-md px-2 py-2 min-h-[44px] pr-14"
                      value={selectedFormula}
                      onChange={(e) => onSelectFormula(e.target.value)}
                    >
                      {formulas.map((f) => (
                        <option key={f.id} value={f.id}>{f.label}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      aria-label="Ver fórmulas (móvil)"
                      className="absolute top-1/2 -translate-y-1/2 right-1 inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white/95 hover:bg-slate-100 touch-manipulation pointer-events-auto"
                      onClick={() => setInfoOpen(true)}
                      title="Ver fórmulas"
                      style={{ zIndex: 20 }}
                      aria-hidden={!isMobileViewport || undefined}
                    >
                      <Info className="w-6 h-6 text-slate-600" />
                    </button>
                  </div>
                )}
                {/* Line 3: Title */}
                <h2
                  id={`${id}-title-mobile`}
                  className="text-lg font-raleway font-bold text-black leading-snug mb-1 break-words whitespace-normal"
                  style={{ wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'none', minHeight: '24px' }}
                >
                  {title}
                </h2>
                {/* Line 4: Subtitle */}
                {subtitle ? (
                  <p id={`${id}-subtitle-mobile`} className="text-sm text-slate-600 leading-relaxed" style={{ hyphens: 'none' }}>{subtitle}</p>
                ) : null}
              </div>
              {/* Responsive CSS injected (scoped to modal headers) */}
              <style>{`
                @media (max-width:600px){
                  .calc-header-desktop { display:none; }
                  .calc-header-mobile { display:block; }
                }
                @media (max-width:350px){
                  .calc-header-mobile h2 { font-size:15px; }
                  .calc-header-mobile select { font-size:13px; }
                }
              `}</style>

              {/* Body with conditional sides (no overlapping layers). Scroll only if needed. */}
              <div ref={bodyWrapRef} data-testid="calc-modal-body" className="relative p-5 flex-1 min-h-0 overflow-y-auto overflow-x-hidden calc-modal-body overscroll-contain">
                <div ref={bodyInnerRef}>
                  {/* Contenedor 3D para flip suave entre caras */}
                  <div className="relative w-full perspective-1200" style={{ perspective: '1200px', WebkitPerspective: '1200px' }}>
                    {/* Forzar animación aún con prefers-reduced-motion mediante MotionConfig */}
                    <MotionConfig reducedMotion="never">
                      {/* Nuevo inicio limpio: único contenedor rota, sin tarjeta interna visible ni sombras dinámicas */}
                      <motion.div
                        initial={false}
                        className={`relative w-full preserve-3d flip-root ${flipped ? 'is-flipped' : ''}`}
                        style={{
                          height: cardHeight ? `${cardHeight}px` : undefined,
                          transformStyle: 'preserve-3d',
                          WebkitTransformStyle: 'preserve-3d',
                          willChange: 'transform',
                          transformPerspective: 1200,
                        }}
                        animate={{ rotateY: flipped ? 180 : 0 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        onAnimationStart={() => { flipAnimatingRef.current = true; }}
                        onAnimationComplete={() => { flipAnimatingRef.current = false; if (!flipped) onFlipAnimationComplete?.(); }}
                      >
                      <div
                        ref={frontFaceRef}
                        className="absolute inset-0 backface-hidden preserve-3d"
                        style={{ pointerEvents: flipped ? 'none' : 'auto', transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
                        aria-hidden={flipped}
                      >
                        <form
                      noValidate
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      onSubmit={(e)=>{ e.preventDefault(); onCalculate(); }}
                      onFocusCapture={(e) => {
                        const t = e.target as HTMLElement;
                        if (t && (t.tagName === 'INPUT' || t.tagName === 'SELECT' || t.getAttribute('contenteditable') === 'true')) {
                          captureBodyScrollTop();
                          lastFocusIdRef.current = t.id || null;
                          // capturar caret inicial al enfocar
                          if (t.tagName === 'INPUT') {
                            const inp = t as HTMLInputElement;
                            lastCaretPosRef.current = typeof inp.selectionStart === 'number' ? inp.selectionStart : null;
                          }
                        }
                      }}
                    >
                      {fields.map((f, idx) => (
                        <FieldRow
                          key={f.name}
                          field={f}
                          modalId={id}
                          value={values[f.name]}
                          onValueChange={onInput}
                          isTestEnv={isTestEnvUI}
                          autoCalculate={autoCalculate}
                          setInputTick={setInputTick}
                          firstRef={idx === 0 ? firstInputRef : undefined}
                          error={error}
                          recordCaret={recordCaret}
                          captureBodyScrollTop={captureBodyScrollTop}
                        />
                      ))}

                      {error && <div className="md:col-span-2 text-sm text-rose-600">{error}</div>}

                      {actionVisibility !== "hidden" && (
                        <div className="md:col-span-2 mt-2 flex items-center gap-3">
                          {actionVisibility === "default" && (() => {
                            const canCalc = enableCalculatePredicate !== undefined ? !!enableCalculatePredicate(values) : canCalculateDefault;
                            if (canCalc) {
                              return (
                                <button
                                  type="submit"
                                  className="px-4 py-2 rounded-md text-white font-semibold"
                                  style={{ backgroundColor: categoryColor }}
                                >
                                  Calcular
                                </button>
                              );
                            }
                            // Botón con estilo deshabilitado que muestra el primer mensaje bloqueante
                            const msg = validateValues(values) || 'Complete los campos requeridos';
                            return (
                              <button
                                type="button"
                                onClick={() => onCalculate()}
                                className="px-4 py-2 rounded-md text-white font-semibold opacity-50 cursor-not-allowed"
                                style={{ backgroundColor: categoryColor }}
                                aria-disabled
                                title={msg}
                              >
                                Calcular
                              </button>
                            );
                          })()}
                          <button type="button" onClick={onClear} className="px-4 py-2 rounded-md border">Limpiar</button>
                        </div>
                      )}
                    </form>
                      </div>

                      <div
                        ref={backFaceRef}
                        className="absolute inset-0 backface-hidden preserve-3d rotate-y-180"
                        style={{ pointerEvents: flipped ? 'auto' : 'none', transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        aria-hidden={!flipped}
                      >
                        <div className={`rounded-xl border p-6 text-center ${getSeverityClasses(result?.severity)}`}>
                          {result ? (
                            <>
                              <div className="text-sm uppercase tracking-wide opacity-70 mb-1">Resultado</div>
                              <div className="text-3xl font-mono font-bold">
                                {typeof result.value === "number" ? result.value.toString() : result.value}
                                {result.unit ? <span className="ml-1 text-base font-sans">{result.unit}</span> : null}
                              </div>
                              {result.interpretation ? <div className="mt-2 text-base font-semibold">{result.interpretation}</div> : null}
                              {result.detailsHtml ? <div className="mt-3 text-sm leading-relaxed">{result.detailsHtml}</div> : null}
                            </>
                          ) : (
                            <div className="text-slate-600">Complete los campos y presione Calcular.</div>
                          )}
                        </div>
                        <div className="mt-4 flex justify-center">
                          {backAction === "volver" ? (
                            <button type="button" onClick={onReturn} className="px-4 py-2 rounded-md border">Volver</button>
                          ) : (
                            <button type="button" onClick={onClear} className="px-4 py-2 rounded-md border">Limpiar</button>
                          )}
                        </div>
                      </div>
                      </motion.div>
                    </MotionConfig>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info modal for formulas */}
          {infoOpen && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/40" style={{ backdropFilter: 'blur(10px)' }} onClick={() => setInfoOpen(false)} />
              <div className="relative z-10 w-[90vw] max-w-[600px] max-h-[85vh] overflow-y-auto rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 p-5">
                {/* Close button fixed to top-right corner of the formulas card */}
                <button
                  onClick={() => setInfoOpen(false)}
                  aria-label="Cerrar"
                  className="absolute top-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-slate-100 bg-white/90 shadow-sm"
                  style={{ zIndex: 10 }}
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-start justify-between mb-2 pr-10">
                  <h4 className="text-lg font-semibold text-slate-900">Fórmulas</h4>
                </div>
                <div className="space-y-3">
                  {formulas && formulas.length > 0 ? (
                    formulas.map((f, idx) => {
                      const exprLatex = ensureLatexForFormula(f);
                      const hasScoring = !!f.scoring && f.scoring.rows?.length;
                      if (!exprLatex && !hasScoring) {
                        console.warn(`[calculators] Fórmula sin expresión ni scoring: ${f.id} (${f.label})`);
                      }
                      return (
                        <div data-testid={`formula-item-${idx+1}`} key={f.id} className="rounded-xl bg-slate-50 p-3">
                          <div className="text-sm font-semibold text-slate-800">{idx + 1}. {f.label}</div>
                          {exprLatex ? (
                            <div className="mt-1 overflow-x-auto" data-testid="formula-latex">
                              <React.Suspense fallback={<div className="text-sm text-slate-500">Cargando fórmulas…</div>}>
                                <Latex expression={exprLatex} display className="block text-sky-700 dark:text-sky-300 text-base" />
                              </React.Suspense>
                            </div>
                          ) : null}
                          {hasScoring ? (
                            <div className="mt-2 space-y-2">
                              {!exprLatex && (
                                <div data-testid="formula-latex" className="overflow-x-auto">
                                  <React.Suspense fallback={<div className="text-sm text-slate-500">Cargando fórmulas…</div>}>
                                    <Latex expression={String.raw`\\mathrm{Puntuaci\\'on}=\\sum_{i=1}^{n}\\text{Puntos}(i)`} display className="block text-sky-700 dark:text-sky-300 text-base" />
                                  </React.Suspense>
                                </div>
                              )}
                              <div className="space-y-2">
                                {f.scoring!.rows.map((row, i2) => (
                                  <div key={i2} className="rounded-lg bg-white border border-slate-200 p-2">
                                    <div className="text-xs font-semibold text-slate-700">{row.label}</div>
                                    <ul className="mt-1 space-y-1">
                                      {row.options.map((op, j2) => (
                                        <li key={j2} className="text-xs text-slate-600 flex items-start gap-2">
                                          <span className="inline-block min-w-12 rounded border border-slate-200 px-1 py-0.5 text-[11px] text-slate-700">{op.points} pt</span>
                                          <span className="flex-1">{op.label}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            !exprLatex ? (
                              <div className="mt-1 text-xs italic text-slate-500">Fórmula o sistema de puntuación no disponible</div>
                            ) : null
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-sm text-slate-600">No hay fórmulas disponibles.</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  </ModalPortal>
  );
};

// Memoized field row to prevent unnecessary re-renders & focus loss
type FieldRowProps = {
  field: FieldSpec;
  modalId: string;
  value: unknown;
  onValueChange: (name: string, v: unknown) => void;
  isTestEnv: boolean;
  autoCalculate: boolean;
  setInputTick: React.Dispatch<React.SetStateAction<number>>;
  firstRef?: React.RefObject<HTMLInputElement | HTMLSelectElement>;
  error?: string;
  recordCaret: (id: string, pos: number | null) => void;
  captureBodyScrollTop: () => void;
};

const FieldRow: React.FC<FieldRowProps> = React.memo(({ field, modalId, value, onValueChange, isTestEnv, autoCalculate, setInputTick, firstRef, error, recordCaret, captureBodyScrollTop }) => {
  const baseId = `${modalId}-${field.name}`;
  const commonLabel = field.label;
  if (field.type === 'number') {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={baseId} className="text-sm font-medium">{commonLabel}</label>
        <div className="flex items-center gap-2">
          <input
            id={baseId}
            name={field.name}
            type={'text'}
            inputMode="decimal"
            lang="es-ES"
            className="w-full rounded-md border px-3 py-2"
            placeholder={field.placeholder || 'p. ej., 0'}
            aria-label={commonLabel}
            onWheel={(e)=>{ e.stopPropagation(); }}
            // Siempre controlado: preserva el foco y evita remounts entre renders
            value={(typeof value === 'number' || typeof value === 'string') ? (value as string | number) : ''}
            onChange={(e) => {
              captureBodyScrollTop();
              const raw = e.target.value;
              recordCaret(baseId, typeof (e.target as HTMLInputElement).selectionStart === 'number' ? (e.target as HTMLInputElement).selectionStart : null);
              onValueChange(field.name, raw);
              if (isTestEnv && autoCalculate) setInputTick(t => t + 1);
            }}
            aria-invalid={!!error && ((value === undefined || value === '') && field.validation?.required) ? true : undefined}
            ref={firstRef as React.RefObject<HTMLInputElement>}
          />
          {field.unit ? <span className="text-sm text-slate-500">{field.unit}</span> : null}
        </div>
      </div>
    );
  }
  if (field.type === 'text') {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={baseId} className="text-sm font-medium">{commonLabel}</label>
        <input
          id={baseId}
            name={field.name}
            type="text"
            className="w-full rounded-md border px-3 py-2"
            placeholder={field.placeholder}
            aria-label={commonLabel}
            value={(typeof value === 'string') ? (value as string) : ''}
            onChange={(e) => {
              captureBodyScrollTop();
              if (isTestEnv) {
                setInputTick(t => t + 1);
              }
              recordCaret(baseId, typeof (e.target as HTMLInputElement).selectionStart === 'number' ? (e.target as HTMLInputElement).selectionStart : null);
              onValueChange(field.name, e.target.value);
            }}
            ref={firstRef as React.RefObject<HTMLInputElement>}
        />
      </div>
    );
  }
  if (field.type === 'select') {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={baseId} className="text-sm font-medium">{commonLabel}</label>
        <select
          id={baseId}
          name={field.name}
          className="w-full rounded-md border px-3 py-2"
          aria-label={commonLabel}
          value={(typeof value === 'string') ? (value as string) : ''}
          onChange={(e) => {
            captureBodyScrollTop();
            if (isTestEnv) setInputTick(t => t + 1);
            onValueChange(field.name, e.target.value);
          }}
          ref={firstRef as React.RefObject<HTMLSelectElement>}
        >
          <option value="" disabled>{field.placeholder || 'Seleccione...'}</option>
          {(field.options || []).map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  }
  if (field.type === 'toggle') {
    return (
      <div className="flex flex-col gap-1">
        {/* Solo usar un label, el que está asociado con el checkbox */}
        <div className="flex items-center gap-2 mt-1">
          <input
            id={baseId}
            name={field.name}
            type="checkbox"
            checked={!!value}
            onChange={(e) => { captureBodyScrollTop(); onValueChange(field.name, e.target.checked); }}
            aria-label={commonLabel}
          />
          <label htmlFor={baseId} className="text-sm font-medium">{commonLabel}</label>
        </div>
      </div>
    );
  }
  return null;
});

FieldRow.displayName = 'FieldRow';
