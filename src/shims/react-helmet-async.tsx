// Shim para SSR: react-helmet-async no se usa en prerender (head estático)
export function Helmet() {
  return null;
}
export function HelmetProvider({ children }) {
  return children;
}
export default { Helmet, HelmetProvider };
