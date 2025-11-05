import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Info } from "lucide-react";

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
};

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  fields: ReadonlyArray<FieldSpec>;
  formulas?: ReadonlyArray<FormulaSpec>;
  onCalculate?: (values: Record<string, unknown>, selectedFormula?: string) => CalculationResult;
  categoryColor?: string; // hex or tailwind variable
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const defaultOverlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
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
  fields,
  formulas,
  onCalculate,
  categoryColor = "#0ea5e9",
  open,
  onOpenChange,
}) => {
  const isControlled = typeof open === "boolean" && !!onOpenChange;
  const [internalOpen, setInternalOpen] = React.useState<boolean>(false);
  const actuallyOpen = isControlled ? (open as boolean) : internalOpen;

  const [values, setValues] = React.useState<Record<string, unknown>>(() => ({}));
  const [selectedFormula, setSelectedFormula] = React.useState<string | undefined>(() => formulas?.[0]?.id);
  const [result, setResult] = React.useState<CalculationResult | null>(null);
  const [flipped, setFlipped] = React.useState(false);
  const [error, setError] = React.useState<string>("");
  const [infoOpen, setInfoOpen] = React.useState(false);
  const firstInputRef = React.useRef<HTMLInputElement | HTMLSelectElement | null>(null);

  React.useEffect(() => {
    // reset on open
    if (!actuallyOpen) return;
    setValues({});
    setResult(null);
    setFlipped(false);
    setError("");
  }, [actuallyOpen]);

  const close = () => {
    if (isControlled) onOpenChange?.(false);
    else setInternalOpen(false);
  };

  const openSelf = () => {
    if (!isControlled) setInternalOpen(true);
  };

  const handleInput = (name: string, v: unknown) => {
    setValues((prev) => ({ ...prev, [name]: v }));
  };

  const handleClear = () => {
    setValues({});
    setResult(null);
    setFlipped(false);
    setError("");
  };

  const handleCalculate = () => {
    setError("");
    // basic required validation
    for (const f of fields) {
      const req = f.validation?.required;
      if (req && (values[f.name] === undefined || values[f.name] === "")) {
        setError(`Complete el campo: ${f.label}`);
        return;
      }
      if (f.type === "number") {
        const num = Number(values[f.name]);
        if (!Number.isFinite(num)) continue;
        if (f.validation?.min !== undefined && num < f.validation.min) {
          setError(`${f.label}: valor mínimo ${f.validation.min}`);
          return;
        }
        if (f.validation?.max !== undefined && num > f.validation.max) {
          setError(`${f.label}: valor máximo ${f.validation.max}`);
          return;
        }
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
      res = f.compute(values);
    } else if (onCalculate) {
      res = onCalculate(values, sel);
    } else {
      setError("No hay lógica de cálculo definida");
      return;
    }
    setResult(res);
    setFlipped(true);
  };

  const handleReturn = () => {
    setResult(null);
    setFlipped(false);
    // restore focus to first input after flip back
    setTimeout(() => {
      firstInputRef.current?.focus?.();
    }, 50);
  };

  // Derive effective fields per formula (if provided)
  const effectiveFields = React.useMemo(() => {
    if (!formulas || !selectedFormula) return fields;
    const f = formulas.find((x) => x.id === selectedFormula);
    return f?.fields && f.fields.length > 0 ? f.fields : fields;
  }, [fields, formulas, selectedFormula]);

  // When selected formula changes, trim values to visible fields and clear errors/result to prevent stale UI
  React.useEffect(() => {
    const allowed = new Set(effectiveFields.map((f) => f.name));
    setValues((prev) => {
      const next: Record<string, unknown> = {};
      for (const k of Object.keys(prev)) {
        if (allowed.has(k)) next[k] = prev[k];
      }
      return next;
    });
    setError("");
    setResult(null);
    setFlipped(false);
    // focus first input on formula change
    setTimeout(() => {
      firstInputRef.current?.focus?.();
    }, 50);
  }, [effectiveFields]);

  // Public trigger button if used uncontrolled
  if (!isControlled) {
    return (
      <div>
        <button onClick={openSelf} className="px-4 py-2 rounded-md bg-sky-600 text-white font-semibold hover:bg-sky-700">Abrir calculadora</button>
        <CalculatorModalContent
          id={id}
          open={internalOpen}
          onClose={close}
          title={title}
          subtitle={subtitle}
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
        />
      </div>
    );
  }

  // Controlled usage
  return (
    <CalculatorModalContent
      id={id}
      open={actuallyOpen}
      onClose={close}
      title={title}
      subtitle={subtitle}
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
}> = ({ id, open, onClose, title, subtitle, fields, values, onInput, formulas, selectedFormula, onSelectFormula, onCalculate, onClear, onReturn, result, flipped, error, categoryColor, infoOpen, setInfoOpen, firstInputRef }) => {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} aria-describedby={`${id}-subtitle`}>
          {/* Overlay */}
          <motion.div className="absolute inset-0 bg-black/50 touch-manipulation" variants={defaultOverlay} initial="hidden" animate="visible" exit="exit" onClick={onClose} />

          {/* Card */}
          <motion.div className="relative mx-auto mt-8 md:mt-16 w-[94vw] sm:w-[85vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] max-h-[90vh]" variants={defaultCard} initial="hidden" animate="visible" exit="exit" onClick={(e)=>e.stopPropagation()}>
            <div className="relative rounded-2xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden flex flex-col max-h-[90vh]">
              <div className="sticky top-0 z-10 px-5 py-4 border-b flex items-start justify-between bg-white/95 backdrop-blur" style={{ background: `linear-gradient(to right, ${categoryColor}15, #ffffffEE)` }}>
                <div>
                  <h2 id={`${id}-title`} className="text-xl sm:text-2xl font-raleway font-bold text-slate-900">{title}</h2>
                  {subtitle ? (
                    <p id={`${id}-subtitle`} className="text-sm text-slate-600">{subtitle}</p>
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
                  {/* Info button opens a responsive modal */}
                  {!!formulas?.length && (
                    <button
                      type="button"
                      aria-label="Ver fórmulas"
                      className="p-1 rounded-md hover:bg-slate-100 touch-manipulation"
                      onClick={() => setInfoOpen(true)}
                      title="Ver fórmulas"
                    >
                      <Info className="w-5 h-5 text-slate-600" />
                    </button>
                  )}
                  <button onClick={onClose} aria-label="Cerrar" className="p-1 rounded-md hover:bg-slate-100 touch-manipulation">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Body with 3D flip container */}
              <div className="relative p-5 min-h-[220px]">
                <div className={`relative transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
                  {/* Front: form */}
                  <div className={`[backface-visibility:hidden] absolute inset-0 ${flipped ? "pointer-events-none" : ""}`} aria-hidden={flipped}>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e)=>{ e.preventDefault(); onCalculate(); }}>
                      {fields.map((f, idx) => (
                        <div key={f.name} className="flex flex-col gap-1">
                          <label htmlFor={`${id}-${f.name}`} className="text-sm font-medium">{f.label}</label>
                          {f.type === "number" && (
                            <div className="flex items-center gap-2">
                              <input
                                id={`${id}-${f.name}`}
                                name={f.name}
                                type="number"
                                inputMode="decimal"
                                className="w-full rounded-md border px-3 py-2"
                                placeholder={f.placeholder}
                                value={(typeof values[f.name] === 'number' || typeof values[f.name] === 'string') ? (values[f.name] as string | number) : ""}
                                onChange={(e) => onInput(f.name, e.target.value === "" ? "" : Number(e.target.value))}
                                aria-invalid={!!error && ((values[f.name] === undefined || values[f.name] === "") && f.validation?.required) ? true : undefined}
                                min={f.validation?.min}
                                max={f.validation?.max}
                                ref={idx === 0 ? firstInputRef as any : undefined}
                              />
                              {f.unit ? <span className="text-sm text-slate-500">{f.unit}</span> : null}
                            </div>
                          )}
                          {f.type === "text" && (
                            <input id={`${id}-${f.name}`} name={f.name} type="text" className="w-full rounded-md border px-3 py-2" placeholder={f.placeholder} value={(typeof values[f.name] === 'string') ? (values[f.name] as string) : ""} onChange={(e)=>onInput(f.name, e.target.value)} ref={idx === 0 ? firstInputRef as any : undefined} />
                          )}
                          {f.type === "select" && (
                            <select id={`${id}-${f.name}`} name={f.name} className="w-full rounded-md border px-3 py-2" value={(typeof values[f.name] === 'string') ? (values[f.name] as string) : ""} onChange={(e)=>onInput(f.name, e.target.value)} ref={idx === 0 ? firstInputRef as any : undefined}>
                              <option value="" disabled>{f.placeholder || "Seleccione..."}</option>
                              {(f.options || []).map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                          )}
                          {f.type === "toggle" && (
                            <div className="flex items-center gap-2 mt-1">
                              <input id={`${id}-${f.name}`} name={f.name} type="checkbox" checked={!!values[f.name]} onChange={(e)=>onInput(f.name, e.target.checked)} />
                              <label htmlFor={`${id}-${f.name}`} className="text-sm">{f.placeholder || f.label}</label>
                            </div>
                          )}
                        </div>
                      ))}

                      {error && <div className="md:col-span-2 text-sm text-rose-600">{error}</div>}

                      <div className="md:col-span-2 mt-2 flex items-center gap-3">
                        <button type="submit" className="px-4 py-2 rounded-md text-white font-semibold" style={{ backgroundColor: categoryColor }}>Calcular</button>
                        <button type="button" onClick={onClear} className="px-4 py-2 rounded-md border">Limpiar</button>
                      </div>
                    </form>
                  </div>

                  {/* Back: result */}
                  <div className="[backface-visibility:hidden] [transform:rotateY(180deg)] absolute inset-0" aria-hidden={!flipped}>
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
                      <button type="button" onClick={onReturn} className="px-4 py-2 rounded-md border">Volver</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info modal for formulas */}
          {infoOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/50" onClick={() => setInfoOpen(false)} />
              <div className="relative z-10 w-[90vw] max-w-[600px] max-h-[85vh] overflow-y-auto rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 p-5">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-lg font-semibold text-slate-900">Fórmulas</h4>
                  <button onClick={() => setInfoOpen(false)} aria-label="Cerrar" className="p-1 rounded-md hover:bg-slate-100">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {formulas && formulas.length > 0 ? (
                    formulas.map((f, idx) => {
                      const exprLatex = f.expressionLatex || f.formulaLatex;
                      const exprText = f.expressionText || f.description;
                      return (
                        <div key={f.id} className="rounded-xl bg-slate-50 p-3">
                          <div className="text-sm font-semibold text-slate-800">{idx + 1}. {f.label}</div>
                          {exprLatex ? (
                            <div className="mt-1 text-sky-700 font-mono text-sm overflow-x-auto">{exprLatex}</div>
                          ) : null}
                          {exprText ? (
                            <div className="mt-1 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">{exprText}</div>
                          ) : (
                            <div className="mt-1 text-xs text-slate-500 italic">TODO: añadir fórmula</div>
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
  );
};
