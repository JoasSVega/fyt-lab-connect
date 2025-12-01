import { useLocation } from "react-router-dom";
// import ScrollReveal from "@/components/ScrollReveal";
import { useEffect } from "react";
import { usePageReady } from "@/hooks/usePageReady";

const NotFound = () => {
  const location = useLocation();

  usePageReady();

  useEffect(() => {
    if (import.meta.env.DEV) {
      // Log only in development to avoid noisy production consoles
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl sm:text-5xl font-serif font-extrabold text-slate-800 text-center">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        <a href="/" className="text-blue-500 underline hover:text-blue-700">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
