import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Si hay una transición global en curso, el propio sistema de rutas
    // gestionará el scroll al finalizar el loader de transición.
    if ((window as any).__routeTransitionActive) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null as React.ReactElement | null;
};

export default ScrollToTop;