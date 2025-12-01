// Minimal, dependency-free sanitization utilities for frontend inputs and UI text.
// Keep fast and predictable; do not change UI or layout.

const INVISIBLE_UNICODE_REGEX = /[\u200B-\u200D\uFEFF\u00AD\u2060\u2028\u2029\u202A-\u202E\u061C\u200E\u200F]/g; // zero-width + bidi controls
const MULTISPACE_REGEX = /\s{2,}/g;
const DANGEROUS_PROTOCOL_REGEX = /^(javascript:|data:text\/html|vbscript:)/i;

export function stripInvisible(input: string): string {
  if (!input) return "";
  return input.replace(INVISIBLE_UNICODE_REGEX, "");
}

export function normalizeWhitespace(input: string): string {
  if (!input) return "";
  return input.replace(/\r\n|\r/g, "\n").replace(MULTISPACE_REGEX, " ").trim();
}

export function escapeHTML(input: string): string {
  if (!input) return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function safeText(input: string, { preserveNewlines = true }: { preserveNewlines?: boolean } = {}): string {
  const stripped = stripInvisible(String(input || ""));
  const normalized = preserveNewlines
    ? stripped.replace(/\r\n|\r/g, "\n").replace(/[\t\v\f]/g, " ")
    : normalizeWhitespace(stripped);
  // Escape HTML entities to avoid accidental injection in interpolations
  return escapeHTML(normalized);
}

export function sanitizeURL(url: string): string {
  const u = String(url || "").trim();
  if (!u) return "";
  try {
    // Allow only http(s), mailto, tel
    if (/^(https?:|mailto:|tel:)/i.test(u) && !DANGEROUS_PROTOCOL_REGEX.test(u)) return u;
    return "";
  } catch {
    return "";
  }
}

// Very conservative HTML sanitizer: strips scripts, event handlers, style and unsafe URLs.
// For this project, avoid rendering arbitrary HTML; use only when strictly necessary.
export function sanitizeHTML(html: string): string {
  const input = String(html || "");
  if (!input) return "";
  const doc = new DOMParser().parseFromString(input, "text/html");

  const ALLOWED_TAGS = new Set([
    "b","i","em","strong","u","s","span","p","br","ul","ol","li","small","sub","sup","code","pre","a"
  ]);
  const ALLOWED_ATTRS = new Set(["href","title","target","rel","class"]);

  const walker = (node: Element | ChildNode) => {
    // Remove script/style tags outright
    if ((node as Element).tagName) {
      const el = node as Element;
      const tag = el.tagName.toLowerCase();
      if (tag === "script" || tag === "style" || tag === "iframe" || tag === "object") {
        el.remove();
        return;
      }
      if (!ALLOWED_TAGS.has(tag)) {
        // Replace disallowed elements by their text content
        const text = document.createTextNode(el.textContent || "");
        el.replaceWith(text);
        return;
      }
      // Strip event handlers and style attributes
      [...el.attributes].forEach((attr) => {
        const name = attr.name.toLowerCase();
        if (!ALLOWED_ATTRS.has(name) || name.startsWith("on")) {
          el.removeAttribute(attr.name);
          return;
        }
        if (name === "href") {
          const safe = sanitizeURL(attr.value);
          if (!safe) el.removeAttribute(attr.name);
          else el.setAttribute("href", safe);
        }
        if (name === "target") {
          // Enforce rel noopener for target _blank
          if (attr.value === "_blank") {
            el.setAttribute("rel", "noopener noreferrer");
          } else {
            el.removeAttribute("target");
          }
        }
      });
    }
    // Recurse
    node.childNodes.forEach(walker);
  };

  doc.body.childNodes.forEach(walker);
  return doc.body.innerHTML;
}

export function assertNonEmpty(value: string, field: string): string {
  const v = safeText(value);
  if (!v) throw new Error(`${field} es obligatorio.`);
  return v;
}

export function isLikelyEmail(value: string): boolean {
  const v = String(value || "").trim();
  // Reasonable email check without catastrophic backtracking
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}
