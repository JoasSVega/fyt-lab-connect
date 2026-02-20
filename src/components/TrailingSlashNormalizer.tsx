import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * TrailingSlashNormalizer
 * 
 * Elimina trailing slashes de las URLs automáticamente
 * Esto asegura SEO consistente sin depender de redirects del servidor
 * 
 * Ejemplo:
 *   /investigacion/ → /investigacion
 *   /noticias/ → /noticias
 * 
 * Se ejecuta en el cliente, evitando redirect loops en Netlify
 */
export default function TrailingSlashNormalizer() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Si la ruta termina con "/" y NO es la raíz
    if (location.pathname !== '/' && location.pathname.endsWith('/')) {
      // Remover trailing slash preservando query params y hash
      const pathWithoutSlash = location.pathname.slice(0, -1);
      const newUrl = `${pathWithoutSlash}${location.search}${location.hash}`;
      
      // Reemplazar en el historial (no agregar nueva entrada)
      navigate(newUrl, { replace: true });
    }
  }, [location.pathname, location.search, location.hash, navigate]);

  return null; // Este componente no renderiza nada
}
