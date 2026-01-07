import { createRoot } from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import App from "./App.tsx";
import "./index.css";

declare global {
  interface Window {
    markReactReady?: () => void;
  }
}

const restoreInitialPath = () => {
  if (typeof window === 'undefined') return;
  const search = new URLSearchParams(window.location.search);
  const redirectParam = search.get('redirect');
  const storedRedirect = window.sessionStorage.getItem('redirect');
  const target = redirectParam || storedRedirect;
  if (!target) return;

  const normalized = target.startsWith('/') ? target : `/${target}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (normalized !== current) {
    window.history.replaceState(null, '', normalized);
  }

  if (storedRedirect) {
    window.sessionStorage.removeItem('redirect');
  }
};

restoreInitialPath();

const root = createRoot(document.getElementById("root")!);

// Signal to HTML loader that React is mounted and ready
if (typeof window !== 'undefined' && window.markReactReady) {
  // Small delay to ensure React DOM is fully rendered
  requestAnimationFrame(() => {
    window.markReactReady();
  });
}

root.render(
  <HelmetProvider>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

// Register a lightweight service worker to add runtime caching for static assets.
// Safe and reversible; it won't interfere with Lovable deployments.
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		// Registrar con ruta relativa para funcionar con base './' y subrutas
		const swUrl = './sw.js';
		navigator.serviceWorker.register(swUrl).catch(() => {
			// Ignorar fallos; la app funciona igual
		});
	});
}
