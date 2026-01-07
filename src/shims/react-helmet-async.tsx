// Shim para SSR: react-helmet-async no se usa en prerender (head estático)
import type { ReactNode } from 'react';

export function Helmet(): ReactNode {
  return null;
}

export function HelmetProvider({ children }: { children?: ReactNode }): ReactNode {
  return children ?? null;
}

export default { Helmet, HelmetProvider };
