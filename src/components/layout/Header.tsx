import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Linkedin, Facebook } from "lucide-react";
import CountrySelector from "../common/CountrySelector";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const infoRef = useRef(null);

  // Scroll effect for sticky header background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        infoRef.current &&
        !(infoRef.current as any).contains(e.target)
      ) {
        setIsInfoOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigate + optional scroll to ID
  const handleNavClick = (path: string, scrollToId?: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === path && scrollToId) {
      const el = document.getElementById(scrollToId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate(path);
      setTimeout(() => {
        if (scrollToId) {
          const el = document.getElementById(scrollToId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }, 500);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white py-2 shadow-md" : "bg-white/95 py-2"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <img
              src="/lovable-uploads/GGL.png"
              alt="GGL Logo"
              onClick={handleLogoClick}
              className="h-16 w-auto cursor-pointer transition-all duration-300 object-fill"
            />
            <div className="h-8 w-px bg-gray-200 hidden md:block" />
            <img
              src="/1GlobalEnterprises.png"
              alt="1 Global Enterprises Logo"
              className="hidden md:block h-10 w-auto object-contain transition-all duration-300"
            />
          </div>

          {/* Hamburger for Mobile */}
          <button
            className="md:hidden text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-gold rounded-md p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 items-center relative">
            <button
              onClick={() => handleNavClick("/")}
              className={`text-gray-800 hover:text-brand-gold font-medium transition-colors py-1 ${
                location.pathname === "/" ? "text-brand-gold" : ""
              }`}
            >
              Home
            </button>

            {/* Info Dropdown */}
            <div className="relative" ref={infoRef}>
              <button
                onClick={() => setIsInfoOpen((prev) => !prev)}
                className={`text-gray-800 hover:text-brand-gold font-medium transition-colors py-1 ${
                  ["/about", "/careers"].includes(location.pathname)
                    ? "text-brand-gold"
                    : ""
                }`}
              >
                Info
              </button>
              {isInfoOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md z-50 min-w-[160px]">
                  <button
                    onClick={() => {
                      handleNavClick("/about");
                      setIsInfoOpen(false);
                    }}
                    className={`block px-4 py-2 w-full text-left text-gray-800 hover:bg-gray-100 ${
                      location.pathname === "/about" ? "text-brand-gold" : ""
                    }`}
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => {
                      handleNavClick("/careers");
                      setIsInfoOpen(false);
                    }}
                    className={`block px-4 py-2 w-full text-left text-gray-800 hover:bg-gray-100 ${
                      location.pathname === "/careers" ? "text-brand-gold" : ""
                    }`}
                  >
                    Careers
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick("/services")}
              className={`text-gray-800 hover:text-brand-gold font-medium transition-colors py-1 ${
                location.pathname.includes("/services") ? "text-brand-gold" : ""
              }`}
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick("/global-presence")}
              className={`text-gray-800 hover:text-brand-gold font-medium transition-colors py-1 ${
                location.pathname === "/global-presence" ? "text-brand-gold" : ""
              }`}
            >
              Global Presence
            </button>

            <CountrySelector />

            <button
              onClick={() => handleNavClick("/contact", "contact-form")}
              className="px-5 py-2 bg-[#F6B100] text-black rounded-full hover:bg-[#FFCC33] transition font-medium"
            >
              Contact / Quote
            </button>
          </nav>
        </div>

        {/* Mobile Nav */}
        <div
          className={`${
            isMobileMenuOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0"
          } md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <nav className="flex flex-col gap-4 border-t mt-4 border-gray-100">
            <button
              onClick={() => handleNavClick("/")}
              className={`text-gray-800 hover:text-brand-gold font-medium ${
                location.pathname === "/" ? "text-brand-gold" : ""
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick("/about")}
              className={`text-gray-800 hover:text-brand-gold font-medium ${
                location.pathname === "/about" ? "text-brand-gold" : ""
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick("/services")}
              className={`text-gray-800 hover:text-brand-gold font-medium ${
                location.pathname.includes("/services") ? "text-brand-gold" : ""
              }`}
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick("/careers")}
              className={`text-gray-800 hover:text-brand-gold font-medium ${
                location.pathname === "/careers" ? "text-brand-gold" : ""
              }`}
            >
              Careers
            </button>
            <button
              onClick={() => handleNavClick("/contact")}
              className={`text-gray-800 hover:text-brand-gold font-medium ${
                location.pathname === "/contact" ? "text-brand-gold" : ""
              }`}
            >
              Contact Us
            </button>

            <div className="flex items-center gap-4 py-2">
              <a
                href="https://www.linkedin.com/company/gglus/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-brand-gold transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.facebook.com/gglusa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-brand-gold transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>

            <CountrySelector />

            <button
              onClick={() => handleNavClick("/contact", "contact-form")}
              className="px-4 py-2 bg-brand-gold text-brand-navy rounded-md hover:bg-amber-500 text-center font-medium w-full"
            >
              Get A Quote
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
