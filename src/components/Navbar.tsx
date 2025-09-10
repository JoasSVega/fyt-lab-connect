import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";
import ImageUpload from "./ui/image-upload";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoImage, setLogoImage] = useState<string>('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const menuItems = [
    {
      name: "Inicio",
      href: "/",
      isDropdown: false
    },
    {
      name: "Sobre nosotros",
      href: "#sobre",
      isDropdown: false,
      isAnchor: true
    },
    {
      name: "Equipo",
      href: "#equipo", 
      isDropdown: false,
      isAnchor: true
    },
    {
      name: "Herramientas",
      href: "#",
      isDropdown: true,
      dropdownItems: [
  { name: "Calculadoras de función renal (prueba)", href: "/herramientas/funcion-renal" },
  { name: "Calculadoras Antropométricas", href: "/herramientas/antropometricas" },
        { name: "Calculadora de Dosificación", href: "/calculator/dosage" },
        { name: "Calculadora de Superficie Corporal", href: "/calculator/bsa" },
        { name: "Consultor Farmacológico", href: "/consultor" },
        { name: "Comparador de Fármacos", href: "/comparador" }
      ]
    },
    {
      name: "Proyectos",
      href: "#proyectos",
      isDropdown: false,
      isAnchor: true
    },
    {
      name: "Noticias",
      href: "#noticias",
      isDropdown: false,
      isAnchor: true
    },
    {
      name: "Contacto",
      href: "#contacto",
      isDropdown: false,
      isAnchor: true
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
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 relative group">
              {logoImage ? (
                <img 
                  src={logoImage} 
                  alt="Logo FYT"
                  className="w-10 h-10 object-contain rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FYT</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gray-800/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="w-6 h-6">
                  <ImageUpload
                    onImageUpload={setLogoImage}
                    currentImage={logoImage}
                    placeholder=""
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
            <div className="text-lg font-bold text-gray-800">
              Grupo FyT
              <span className="block text-xs text-gray-600 font-normal">
                Farmacología y Terapéutica
              </span>
            </div>
          </div>

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
                ) : item.isAnchor ? (
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium px-3 py-2 rounded-md"
                  >
                    {item.name}
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

                {/* Dropdown menu */}
                {item.isDropdown && openDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <NavLink
                        key={dropdownItem.name}
                        to={dropdownItem.href}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-all duration-200 ${
                            isActive ? 'bg-blue-50 text-blue-600' : ''
                          }`
                        }
                        onClick={() => setOpenDropdown(null)}
                      >
                        {dropdownItem.name}
                      </NavLink>
                    ))}
                  </div>
                )}
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
                  {item.isDropdown ? (
                    <>
                      <button
                        onClick={() => handleDropdownToggle(item.name)}
                        className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200 font-medium"
                      >
                        <span>{item.name}</span>
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            openDropdown === item.name ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      {openDropdown === item.name && (
                        <div className="pl-4 space-y-1 bg-gray-50">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <NavLink
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              className={({ isActive }) =>
                                `block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-white transition-all duration-200 rounded ${
                                  isActive ? 'bg-blue-50 text-blue-600' : ''
                                }`
                              }
                              onClick={() => {
                                setIsMenuOpen(false);
                                setOpenDropdown(null);
                              }}
                            >
                              {dropdownItem.name}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </>
                  ) : item.isAnchor ? (
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200 font-medium"
                    >
                      {item.name}
                    </button>
                  ) : (
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
                  )}
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