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

  // Fallback to plain text when rendering fails
  return (
    <code className={errorFallbackClassName || "text-xs text-rose-700"}>
      {expression}
    </code>
  );
};

export default Latex;
