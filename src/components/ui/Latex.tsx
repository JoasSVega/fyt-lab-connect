import * as React from "react";

type LatexProps = {
  expression: string;
  display?: boolean;
  throwOnError?: boolean;
  className?: string;
  errorFallbackClassName?: string;
};

/**
 * Lightweight KaTeX renderer for LaTeX math strings.
 * Safely generates static HTML and injects it with dangerouslySetInnerHTML.
 */
export const Latex: React.FC<LatexProps> = ({
  expression,
  display = true,
  throwOnError = false,
  className,
  errorFallbackClassName,
}) => {
  const [katexModule, setKatexModule] = React.useState<typeof import("katex") | null>(null);
  const [isLoading, setLoading] = React.useState(true);

  // Lazy load KaTeX (JS + CSS) on demand to avoid inflating the initial bundle.
  React.useEffect(() => {
    let cancelled = false;
    const loadKatex = async () => {
      try {
        const [katexDynamic] = await Promise.all([
          import("katex"),
          import("katex/dist/katex.min.css"),
        ]);
        if (!cancelled) {
          // Some bundlers expose default, others return the module itself.
          setKatexModule((katexDynamic as any).default ?? katexDynamic);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    loadKatex();
    return () => {
      cancelled = true;
    };
  }, []);

  const html = React.useMemo(() => {
    if (!katexModule) return null;
    try {
      return katexModule.renderToString(expression, {
        displayMode: display,
        throwOnError,
        strict: "warn",
        output: "html",
      });
    } catch (err) {
      if (throwOnError) throw err;
      return null;
    }
  }, [expression, display, throwOnError, katexModule]);

  if (isLoading) {
    return <span className={errorFallbackClassName || "text-xs italic text-slate-500"}>Cargando fórmula…</span>;
  }

  if (html) {
    return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
  }

  // Minimal fallback placeholder (no plaintext duplication)
  return (
    <span className={errorFallbackClassName || "text-xs italic text-slate-500"}>
      Fórmula no disponible
    </span>
  );
};

export default Latex;
