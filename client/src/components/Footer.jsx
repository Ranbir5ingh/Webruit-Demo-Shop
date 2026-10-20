import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  const footerLinks = [
    { label: "Support & Contact Us", path: "/contact-us", highlight: true },
    { label: "Terms & Conditions", path: "/terms-and-conditions" },
    { label: "Privacy Policy", path: "/privacy-policy" },
  ];

  return (
    <footer className="text-[#0a0a0a] pt-16 sm:pt-20 mx-auto">
      <div
        className={`bg-gray-100 rounded-t-3xl p-8 sm:p-10 ${
          location.pathname === "/" && isMobile ? "pb-28" : "pb-12 sm:pb-10"
        } md:p-12 lg:p-16`}
      >
        {/* Main Brand Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h3 className="text-[1.9rem] xs:text-[1.8rem] sm:text-[2.2rem] md:text-[2.5rem] lg:text-[2.8rem] font-bold leading-tight mb-3 sm:mb-4 font-toboggan-medium">
            <span className="bg-gradient-to-r from-indigo-500 to-indigo-400 bg-clip-text text-transparent">
              ResumeKit Pro
            </span>
          </h3>
          <p className="font-medium text-[0.95rem] sm:text-[0.875rem] md:text-[0.95rem] lg:text-[1rem] text-black/70 leading-relaxed max-w-2xl mx-auto">
            Helping professionals create outstanding resumes that get noticed
            and land dream jobs. Join thousands who've transformed their
            careers.
          </p>

          {/* Prominent Support Assistance Link */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[0.95rem] sm:text-[0.9rem] text-black/75 font-medium">
              Need help or have questions?
            </span>
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-1.5 font-semibold text-[0.95rem] sm:text-[0.9rem] text-indigo-600 hover:text-indigo-800 underline underline-offset-4 transition-colors"
            >
              Contact Support &rarr;
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-black/10 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            {/* Links */}
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 sm:gap-6 text-center sm:text-left">
              {footerLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={
                    item.highlight
                      ? "font-semibold text-[0.95rem] sm:text-[0.875rem] md:text-[0.95rem] lg:text-[1rem] text-indigo-600 hover:text-indigo-800 transition-colors leading-relaxed px-2.5 py-1 bg-indigo-50 border border-indigo-200/60 rounded-md hover:bg-indigo-100"
                      : "font-medium text-[0.95rem] sm:text-[0.875rem] md:text-[0.95rem] lg:text-[1rem] text-black/70 hover:text-[#0a0a0a] transition-colors leading-relaxed"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <p className="font-medium text-[0.95rem] sm:text-[0.875rem] md:text-[0.95rem] lg:text-[1rem] text-black/70 leading-relaxed">
              © 2024 ResumeKit Pro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
