import { createRoot } from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);

// Remove loading overlay when React mounts
if (typeof window !== 'undefined' && window.removeAppLoader) {
  window.removeAppLoader();
}

root.render(
  <HelmetProvider>
    <App />
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
