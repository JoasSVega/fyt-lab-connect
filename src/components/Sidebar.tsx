import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Página principal", end: true },
  { to: "/calculator/dosage", label: "Calculadora de Dosificación" },
  { to: "/calculator/gfr", label: "Calculadora de TFG" },
  { to: "/calculator/bmi", label: "Calculadora de IMC" },
  { to: "/calculator/bsa", label: "Calculadora de Superficie Corporal" },
];

export const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const linkClass =
    "block px-4 py-2 rounded transition-colors duration-150 hover:bg-blue-100";
  const activeClass = "bg-blue-200 font-semibold text-blue-800";

  // Cierra el menú móvil al hacer click en un link
  const handleLinkClick = () => setOpen(false);

  // Cierra el menú móvil si se hace click fuera del sidebar
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-64 bg-gray-100 shadow-md">
        <div className="px-6 py-6 text-2xl font-bold text-blue-700 border-b border-gray-200">
          FyT Lab Connect
        </div>
        <nav className="flex-1 mt-4 flex flex-col space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Topbar Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-12 bg-white shadow-md fixed top-0 left-0 right-0 z-40">
        <span className="text-lg font-bold text-blue-700">FyT Lab Connect</span>
        <button
          aria-label="Abrir menú"
          className="focus:outline-none"
          onClick={() => setOpen(true)}
        >
          <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-30"
          onClick={handleOverlayClick}
        >
          <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-100 shadow-md flex flex-col">
            <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
              <span className="text-2xl font-bold text-blue-700">FyT Lab Connect</span>
              <button
                aria-label="Cerrar menú"
                className="focus:outline-none"
                onClick={() => setOpen(false)}
              >
                <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 mt-4 flex flex-col space-y-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `${linkClass} ${isActive ? activeClass : ""}`
                  }
                  onClick={handleLinkClick}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </aside>
        </div>
      )}
      {/* Espacio para topbar móvil */}
      <div className="md:hidden h-12" />
    </>
  );
};

export default Sidebar;