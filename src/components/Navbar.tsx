
import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
// Using standardized logo from public folder

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const menuItems = [
    {
      name: "Inicio",
      href: "/",
      isDropdown: false
    },
    {
      name: "Nuestro Equipo",
      href: "/equipo",
      isDropdown: false
    },
    {
      name: "Herramientas",
      href: "/herramientas",
      isDropdown: false
    },
    {
      name: "Proyectos",
      href: "/proyectos",
      isDropdown: false
    },
    {
      name: "Noticias",
      href: "/noticias",
      isDropdown: false
    },
    {
      name: "Contactos",
      href: "/contactos",
      isDropdown: false
    }
  ];

  const handleDropdownToggle = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  const handleMouseEnter = (itemName: string) => {
    setOpenDropdown(itemName);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre */}
          <Link to="/" className="flex items-center space-x-3 group focus:outline-none">
            <div className="flex-shrink-0">
              <img src="/logo-fyt.png" alt="Logo Grupo FyT" className="h-12 w-auto transition-all duration-300 group-hover:scale-105" />
            </div>
            <div className="text-lg font-bold text-gray-800 group-hover:text-fyt-blue transition-colors">
              Grupo FyT
              <span className="block text-xs text-gray-600 font-normal group-hover:text-fyt-blue/80">
                Farmacología y Terapéutica
              </span>
            </div>
          </Link>

          {/* Menú principal centrado - Desktop */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.isDropdown && handleMouseEnter(item.name)}
                onMouseLeave={() => item.isDropdown && handleMouseLeave()}
              >
                {item.isDropdown ? (
                  <button
                    onClick={() => handleDropdownToggle(item.name)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium px-3 py-2 rounded-md"
                  >
                    <span>{item.name}</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openDropdown === item.name ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                ) : (
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium px-3 py-2 rounded-md ${
                        isActive ? 'text-blue-600 bg-blue-50' : ''
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                )}

                {/* Dropdown menu eliminado para Herramientas */}
              </div>
            ))}
          </div>

          {/* Botón hamburguesa - Mobile y Tablet */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Menú móvil y tablet */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 bg-white">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <div key={item.name}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200 font-medium ${
                        isActive ? 'text-blue-600 bg-blue-50' : ''
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;