import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Reusable Calculator Card with flip animation, adaptive sizing, and responsive layout.
 *
 * Goals implemented:
 * - Dynamic height adjusts to content (front/back) without cropping
 * - Flip animation (front: inputs; back: result) with isolated states
 * - Working "Volver" button fully resets result and returns to front
 * - Information panel (modal) with adaptive width (<=600px desktop, 90% mobile)
 *   showing multiple formulas (title, expression, description)
 * - Responsive layout using Tailwind (no fixed heights)
 * - Clean, modern, pharmaceutical style with soft tones and subtle transitions
 * - Minimal dependencies (React + Tailwind + framer-motion)
 */

/**
 * JSDoc contract for props (keeps .jsx, no TS types required).
 *
 * @param {Object} props
 * @param {string} props.title - Card title (calculator name)
 * @param {Array<{ id: string, label: string, type?: 'number'|'text'|'select', placeholder?: string, min?: number, max?: number, step?: number, unit?: string, options?: Array<{label:string, value:string|number}> }>} props.variables
 * @param {Array<{ name: string, expression: string, description?: string }>} props.formulaInfo - List of formulas to display in the info panel
 * @param {(values: Record<string, string|number>) => { value: number|string, unit?: string, interpretation?: string }} props.onCalculate - Calculation handler
 * @param {Record<string, string|number>} [props.initialValues] - Optional initial values
 * @param {string} [props.className] - Optional extra classes for the outer card wrapper
 */
export default function CalculatorCard({
  title,
  variables,
  formulaInfo,
  onCalculate,
  initialValues,
  className = "",
}) {
  // Local state: input values, result, flip state, info modal
  const [formValues, setFormValues] = useState(() => ({ ...(initialValues || {}) }));
  const [result, setResult] = useState(null); // { value, unit, interpretation }
  const [isFlipped, setIsFlipped] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  // Refs for measuring height of front/back to adapt container height smoothly
  const containerRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);

  const measureHeights = useCallback(() => {
    const frontH = frontRef.current ? frontRef.current.scrollHeight : 0;
    const backH = backRef.current ? backRef.current.scrollHeight : 0;
    const target = isFlipped ? backH : frontH;
    // Fallback min height to keep visual stability
    const minH = 220;
    setContainerHeight(Math.max(target, minH));
  }, [isFlipped]);

  useLayoutEffect(() => {
    measureHeights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFlipped, formValues, result]);

  useEffect(() => {
    function onResize() {
      measureHeights();
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measureHeights]);

  // Derived: pretty header style
  const headerClasses = "text-slate-800 dark:text-slate-100";

  // Handlers
  const handleChange = (id, value) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleClear = () => {
    setFormValues({});
  };

  const handleCalculate = () => {
    try {
      const out = onCalculate ? onCalculate(formValues) : null;
      setResult(out);
      setIsFlipped(true);
    } catch (e) {
      // In production, consider a toast or error boundary
      console.error("Calculation error", e);
    }
  };

  const handleReturn = () => {
    // Reset result and return to front
    setResult(null);
    setIsFlipped(false);
  };

  // Info modal content (always render formulas if provided)
  const hasFormulas = Array.isArray(formulaInfo) && formulaInfo.length > 0;

  // Subtle appear animation variants
  const appearVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: "easeOut" } },
  };

  // Button shared classes
  const btnPrimary =
    "inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white px-4 py-2 text-sm font-medium shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transition";
  const btnGhost =
    "inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 transition";

  // Accessibility: close modal with Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setInfoOpen(false);
    };
    if (infoOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [infoOpen]);

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`} style={{ perspective: "1200px" }}>
      {/* Card outer with adaptive height */}
      <div
        ref={containerRef}
        className="relative w-full transition-[height] duration-300 ease-in-out"
        style={{ height: containerHeight ? `${containerHeight}px` : "auto" }}
      >
        {/* 3D scene container */}
        <div
          className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ease-in-out`}
          style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* FRONT: Inputs */}
          <motion.div
            ref={frontRef}
            variants={appearVariants}
            initial="hidden"
            animate="visible"
            className="absolute inset-0 [backface-visibility:hidden] rounded-2xl bg-white/90 dark:bg-slate-900/90 shadow-lg ring-1 ring-slate-200/70 dark:ring-slate-700 p-4 sm:p-6 flex flex-col gap-4"
          >
            {/* Header with title and info button */}
            <div className="flex items-start justify-between">
              <h3 className={`text-lg sm:text-xl font-semibold ${headerClasses}`}>{title}</h3>
              <button
                type="button"
                aria-label="Información de fórmulas"
                onClick={() => setInfoOpen(true)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sky-700 shadow hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-300"
                title="Ver fórmulas"
              >
                i
              </button>
            </div>

            {/* Inputs grid (responsive) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {variables.map((v) => (
                <div key={v.id} className="flex flex-col">
                  <label htmlFor={v.id} className="text-sm font-medium text-slate-700 mb-1">
                    {v.label}
                  </label>
                  {v.type === "select" ? (
                    <select
                      id={v.id}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
                      value={String(formValues[v.id] ?? "")}
                      onChange={(e) => handleChange(v.id, e.target.value)}
                    >
                      <option value="" disabled>
                        {v.placeholder || "Seleccione"}
                      </option>
                      {(v.options || []).map((opt) => (
                        <option key={String(opt.value)} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        id={v.id}
                        type={v.type || "number"}
                        inputMode={v.type === "text" ? "text" : "decimal"}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
                        placeholder={v.placeholder}
                        value={String(formValues[v.id] ?? "")}
                        onChange={(e) => handleChange(v.id, v.type === "number" ? (e.target.value === "" ? "" : Number(e.target.value)) : e.target.value)}
                        min={v.min}
                        max={v.max}
                        step={v.step}
                      />
                      {v.unit && (
                        <span className="text-xs text-slate-500 whitespace-nowrap">{v.unit}</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Sticky action bar to keep buttons visible */}
            <div className="sticky bottom-0 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 bg-gradient-to-t from-white/95 dark:from-slate-900/95 via-white/70 dark:via-slate-900/70 to-transparent pt-3 px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="flex flex-wrap items-center justify-end gap-3">
                <button type="button" onClick={handleClear} className={btnGhost}>
                  Limpiar
                </button>
                <button type="button" onClick={handleCalculate} className={btnPrimary}>
                  Calcular
                </button>
              </div>
            </div>
          </motion.div>

          {/* BACK: Result */}
          <motion.div
            ref={backRef}
            variants={appearVariants}
            initial="hidden"
            animate="visible"
            className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl bg-white/90 dark:bg-slate-900/90 shadow-lg ring-1 ring-slate-200/70 dark:ring-slate-700 p-4 sm:p-6 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <h3 className={`text-lg sm:text-xl font-semibold ${headerClasses}`}>{title}: Resultado</h3>
            </div>

            {/* Result content */}
            <div className="space-y-2">
              {result ? (
                <>
                  <div className="text-3xl font-bold text-emerald-700">
                    {typeof result.value === "number" ? result.value : String(result.value)}
                    {result.unit ? <span className="text-lg ml-2 text-emerald-600">{result.unit}</span> : null}
                  </div>
                  {result.interpretation && (
                    <p className="text-sm text-slate-700 leading-relaxed">{result.interpretation}</p>
                  )}
                </>
              ) : (
                <p className="text-sm text-slate-600">No hay resultados aún.</p>
              )}
            </div>

            <div className="mt-auto flex justify-end">
              <button type="button" onClick={handleReturn} className={btnGhost}>
                Volver
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* INFO MODAL */}
      {infoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Información de fórmulas"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setInfoOpen(false)} />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, scale: 0.98, y: 6 }}
            className="relative z-10 w-[90vw] max-w-[600px] rounded-2xl bg-white dark:bg-slate-900 shadow-lg ring-1 ring-slate-200/70 dark:ring-slate-700 p-5"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Fórmulas</h4>
              <button
                type="button"
                aria-label="Cerrar"
                onClick={() => setInfoOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
                title="Cerrar"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {hasFormulas ? (
                formulaInfo.map((f, idx) => (
                  <div key={idx} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{f.name}</div>
                    <div className="mt-1 text-sky-700 dark:text-sky-400 font-mono text-sm overflow-x-auto">
                      {f.expression}
                    </div>
                    {f.description && (
                      <div className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{f.description}</div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-600">No hay fórmulas disponibles.</div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
