import * as React from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

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
  const html = React.useMemo(() => {
    try {
      return katex.renderToString(expression, {
        displayMode: display,
        throwOnError,
        strict: "warn",
        output: "html",
      });
    } catch (err) {
      if (throwOnError) throw err;
      return null;
    }
  }, [expression, display, throwOnError]);

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
