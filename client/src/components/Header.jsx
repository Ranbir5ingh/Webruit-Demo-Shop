import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { X, Ellipsis, Hamburger, Menu } from "lucide-react";
import gsap from "gsap";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldRenderOverlay, setShouldRenderOverlay] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Contact Us", path: "/contact-us" },
    { label: "Terms & Conditions", path: "/terms-and-conditions" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Refund Policy", path: "/refund-policy" },
    { label: "Disclaimer", path: "/disclaimer" },
  ];

  const isActive = (path) => location.pathname === path;

  function handleOpenMenu() {
    setShouldRenderOverlay(true);
    setIsMenuOpen(true);
  }

  function handleCloseMenu() {
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at 90% 4%)",
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setIsMenuOpen(false);
          setShouldRenderOverlay(false);
        },
      });
    }
  }

  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { clipPath: "circle(0% at 90% 4%)" },
        {
          clipPath: "circle(150% at 90% 4%)",
          duration: 0.6,
          ease: "power2.out",
        }
      );
    }
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/30 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo */}
          <button
            onClick={() => {
              if (location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                navigate("/");
              }
            }}
            className="flex items-center"
          >
            <span className="text-[1.4rem] xs:text-[1.3rem] sm:text-[1.5rem] md:text-[1.6rem] font-bold text-[#0a0a0a] font-toboggan-medium">
              <span className="bg-gradient-to-r from-indigo-500 to-indigo-400 bg-clip-text text-transparent">
                ResumeKit
              </span>{" "}
              Pro
            </span>
          </button>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((item) =>
              item.label === "Home" ? (
                <button
                  key={item.label}
                  onClick={() => {
                    if (location.pathname === "/") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      navigate("/");
                    }
                  }}
                  className={`font-medium text-[0.95rem] sm:text-[0.875rem] md:text-[0.95rem] lg:text-[1rem] font-toboggan-regular transition-all ${
                    isActive(item.path)
                      ? "text-[#0a0a0a]"
                      : "text-black/70 hover:text-[#0a0a0a]"
                  }`}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium text-[0.95rem] sm:text-[0.875rem] md:text-[0.95rem] lg:text-[1rem] font-toboggan-regular transition-all ${
                    isActive(item.path)
                      ? "text-[#0a0a0a]"
                      : "text-black/70 hover:text-[#0a0a0a]"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Hamburger (Mobile) */}
          <div className="lg:hidden">
            <button
              onClick={handleOpenMenu}
              className="text-[#0a0a0a] hover:text-black/70 transition-colors"
            >
              <Ellipsis size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {shouldRenderOverlay && (
        <div
          ref={menuRef}
          className="fixed top-0 left-0 w-full min-h-[100dvh] z-[9999] bg-gray-100 flex flex-col"
          style={{
            clipPath: "circle(0% at 90% 4%)",
            WebkitClipPath: "circle(0% at 90% 4%)",
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 sm:p-8 flex-shrink-0">
            <button
              onClick={() => {
                if (location.pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  navigate("/");
                }
                handleCloseMenu();
              }}
              className="flex items-center"
            >
              <span className="text-[1.4rem] xs:text-[1.3rem] sm:text-[1.5rem] md:text-[1.6rem] font-bold text-[#0a0a0a] font-toboggan-medium">
                <span className="bg-gradient-to-r from-indigo-500 to-indigo-400 bg-clip-text text-transparent">
                  ResumeKit
                </span>{" "}
                Pro
              </span>
            </button>
            <button
              onClick={handleCloseMenu}
              className="text-black/50 hover:text-[#0a0a0a] transition-colors"
            >
              <X size={28} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center px-6 sm:px-8">
            <div className="space-y-6 sm:space-y-8">
              {navLinks.map((item, index) =>
                item.label === "Home" ? (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (location.pathname === "/") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        navigate("/");
                      }
                      handleCloseMenu();
                    }}
                    className="group w-full text-left"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center">
                        <span className="bg-gradient-to-r from-indigo-400 to-indigo-500 bg-clip-text text-transparent font-toboggan-medium text-[1.4rem] sm:text-[1.1rem] md:text-[1.25rem] font-bold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-[2rem] xs:text-[1.8rem] sm:text-[2.2rem] md:text-[2.5rem] lg:text-[2.8rem] font-bold leading-tight text-[#0a0a0a] font-toboggan-medium group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-indigo-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                          {item.label}
                        </h3>
                      </div>
                    </div>
                  </button>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleCloseMenu}
                    className="group w-full block"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center">
                        <span className="bg-gradient-to-r from-indigo-400 to-indigo-500 bg-clip-text text-transparent font-toboggan-medium text-[1.4rem] sm:text-[1.1rem] md:text-[1.25rem] font-bold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-[2rem] xs:text-[1.8rem] sm:text-[2.2rem] md:text-[2.5rem] lg:text-[2.8rem] font-bold leading-tight text-[#0a0a0a] font-toboggan-medium group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-indigo-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                          {item.label}
                        </h3>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
