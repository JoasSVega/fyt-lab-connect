import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Register a lightweight service worker to add runtime caching for static assets.
// Safe and reversible; it won't interfere with Lovable deployments.
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		// Use relative path so it works with any base
		navigator.serviceWorker.register('/sw.js').catch(() => {
			// ignore failures; app still works normally
		});
	});
}
