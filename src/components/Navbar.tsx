import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePrefetch } from "@/hooks/usePrefetch";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [fm, setFm] = useState<{ motion: typeof import("framer-motion").motion; AnimatePresence: typeof import("framer-motion").AnimatePresence } | null>(null);
  const { prefetch } = usePrefetch();

  // No hack de fetchpriority: se establece directamente en el JSX del <img>

  // Toggle glassmorphism on scroll, batched via rAF to avoid forced reflow
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY || 0;
      const next = y > 8;
      // Only update if value actually changes to avoid style recalculation
      setIsScrolled(prev => (prev !== next ? next : prev));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    // Initial state
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuItems = [
    { name: "Inicio", href: "/", isDropdown: false, prefetchImporter: undefined },
    { name: "Sobre Nosotros", href: "/sobre-nosotros", isDropdown: false, prefetchImporter: () => import("@/pages/SobreNosotros") },
    { name: "Investigación", href: "/investigacion", isDropdown: false, prefetchImporter: () => import("@/pages/InvestigacionPage") },
    { name: "Divulgación", href: "/divulgacion", isDropdown: false, prefetchImporter: () => import("@/pages/DivulgacionPage") },
    { name: "Herramientas", href: "/herramientas", isDropdown: false, prefetchImporter: () => import("@/pages/Herramientas") },
    { name: "Noticias", href: "/noticias", isDropdown: false, prefetchImporter: () => import("@/pages/Noticias") },
    { name: "Contacto", href: "/contactos", isDropdown: false, prefetchImporter: () => import("@/pages/Contactos") }
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

  // Lazy-load framer-motion only when the mobile menu is opened (avoids loading motion on first paint).
  useEffect(() => {
    if (!isMenuOpen || fm) return;
    let cancelled = false;
    import("framer-motion").then((mod) => {
      if (cancelled) return;
      setFm({ motion: mod.motion, AnimatePresence: (mod as unknown as typeof mod).AnimatePresence ?? mod.AnimatePresence });
    });
    return () => {
      cancelled = true;
    };
  }, [isMenuOpen, fm]);

  const MotionDiv = fm?.motion?.div || "div";
  const MotionAnimatePresence = fm?.AnimatePresence || React.Fragment;

  return (
    <nav role="navigation" aria-label="Principal" className={`nav-root fixed top-0 left-0 right-0 z-50 ${isScrolled ? "is-scrolled" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre */}
          <Link to="/" className="flex items-center space-x-3 group focus:outline-none">
              <div className="flex-shrink-0">
                <img
                  src="/images/logo-fyt-small.webp"
                  srcSet="/images/logo-fyt-small.webp 1x, /images/logo-fyt-medium.webp 2x"
                  alt="Logo Grupo FyT"
                  sizes="120px"
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain"
                  loading="eager"
                  fetchPriority="high"
                />
            </div>
              <div className="text-lg font-poppins font-bold text-slate-900 group-hover:text-fyt-blue transition-colors duration-250">
                Grupo FyT
                <span className="block text-xs font-raleway font-semibold text-slate-700 group-hover:text-fyt-blue/80">
                  Farmacología y Terapéutica
                </span>
            </div>
          </Link>

          {/* Menú principal centrado - Desktop */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center" aria-label="Menú principal">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => {
                  if (item.isDropdown) {
                    handleMouseEnter(item.name);
                  }
                  // Prefetch cuando se hace hover
                  if (item.prefetchImporter) {
                    prefetch(item.prefetchImporter);
                  }
                }}
                onMouseLeave={() => item.isDropdown && handleMouseLeave()}
              >
                {item.isDropdown ? (
                  <button
                    onClick={() => handleDropdownToggle(item.name)}
                      className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-all duration-150 ease-out font-inter px-3 py-2 rounded-md"
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
                    onMouseEnter={() => {
                      // Asegurar prefetch al hacer hover en NavLink
                      if (item.prefetchImporter) {
                        prefetch(item.prefetchImporter);
                      }
                    }}
                    className={({ isActive }) =>
                      `nav-link text-slate-900 transition-all duration-200 ease-out font-semibold px-3 py-2 rounded-md ${
                        isActive ? 'nav-link--active' : ''
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
              className="text-slate-900 hover:text-fyt-blue focus:outline-none focus:ring-2 focus:ring-fyt-blue/30 p-2 rounded-md transition-colors duration-200"
              aria-label="Abrir menú"
              aria-controls="nav-mobile"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Menú móvil y tablet */}
        <MotionAnimatePresence mode="wait">
          {isMenuOpen && (
            <MotionDiv
              initial={fm ? { height: 0, opacity: 0 } : undefined}
              animate={fm ? { height: "auto", opacity: 1 } : undefined}
              exit={fm ? { height: 0, opacity: 0 } : undefined}
              transition={fm ? { duration: 0.35, ease: [0.4, 0, 0.2, 1] } : undefined}
              className="lg:hidden border-t border-slate-200 overflow-hidden bg-white shadow-soft"
              id="nav-mobile"
              aria-label="Menú móvil"
            >
              <div className="py-4 space-y-1">
                {menuItems.map((item) => (
                  <div key={item.name}>
                    <NavLink
                      to={item.href}
                      onMouseEnter={() => {
                        // Prefetch en hover (mobile puede no tener hover, pero por compatibilidad)
                        if (item.prefetchImporter) {
                          prefetch(item.prefetchImporter);
                        }
                      }}
                      className={({ isActive }) =>
                        `nav-link block px-4 py-2.5 text-slate-900 transition-all duration-200 ease-out font-semibold ${
                          isActive ? 'nav-link--active bg-fyt-blue/5' : 'hover:bg-slate-50'
                        }`
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  </div>
                ))}
              </div>
            </MotionDiv>
          )}
        </MotionAnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;