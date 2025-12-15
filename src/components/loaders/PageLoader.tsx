/**
 * PageLoader - Indicador de carga elegante
 * Se muestra cuando una página está cargando (Suspense fallback)
 * Versión minimalista con logo animado
 */

export const PageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-6">
        {/* Logo con pulso elegante */}
        <div className="relative w-20 h-20">
          {/* Outer ring - Rotates */}
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary"
            style={{
              animation: 'spin 2s linear infinite',
            }}
          />

          {/* Inner content - Pulsing */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Logo SVG o Imagen */}
            <svg
              className="w-12 h-12 text-primary"
              style={{
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            Cargando
            <span
              style={{
                animation: 'dots 1.5s steps(4, end) infinite',
              }}
            >
              .
            </span>
          </p>
        </div>
      </div>

      {/* Global animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes dots {
          0%, 20% { content: '.'; }
          40% { content: '..'; }
          60% { content: '...'; }
          80%, 100% { content: ''; }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
