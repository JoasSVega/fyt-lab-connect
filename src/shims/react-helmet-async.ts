// ESM shim para react-helmet-async en ambientes SSR (Node ESM)
// Evita errores de "Named export 'Helmet' not found" cuando se bundlean módulos CJS.
// Provee exports nombrados desde el default export del paquete.

// Shim ligero para SSR/client que evita depender del paquete CJS real.
// Implementa componentes no operativos que simplemente renderizan children.
import type { ReactNode } from 'react';

export function HelmetProvider({ children }: { children?: ReactNode }): ReactNode {
	return children ?? null;
}

export function Helmet({ children }: { children?: ReactNode }): ReactNode {
	return children ?? null;
}
