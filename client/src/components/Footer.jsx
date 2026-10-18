import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const isMobile = window.innerWidth <= 768;

  const footerLinks = [
    { label: "Contact Us", path: "/contact-us" },
    { label: "Terms & Conditions", path: "/terms-and-conditions" },
    { label: "Privacy Policy", path: "/privacy-policy" },
  ];

  return (
    <footer className="text-[#0a0a0a] pt-16 sm:pt-20 mx-auto">
      <div
        className={`bg-gray-100 rounded-t-3xl p-8 sm:p-10 ${
          location.pathname === "/" && isMobile ? "pb-18" : null
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
        </div>

        {/* Stats or Features Quick List */}
        {/* <div className="grid gap-6 sm:gap-8 grid-cols-3 mb-8 sm:mb-10 md:mb-12">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-indigo-400 to-indigo-500 bg-clip-text text-transparent font-toboggan-medium text-[1.4rem] sm:text-[1.1rem] md:text-[1.25rem] font-bold">
                📄
              </span>
            </div>
            <p className="text-[1.05rem] sm:text-[1.05rem] md:text-[1.1rem] lg:text-[1.125rem] font-toboggan-regular">
              Professional Templates
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-indigo-400 to-indigo-500 bg-clip-text text-transparent font-toboggan-medium text-[1.4rem] sm:text-[1.1rem] md:text-[1.25rem] font-bold">
                🎯
              </span>
            </div>
            <p className="text-[1.05rem] sm:text-[1.05rem] md:text-[1.1rem] lg:text-[1.125rem] font-toboggan-regular">
              ATS Optimized
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-indigo-400 to-indigo-500 bg-clip-text text-transparent font-toboggan-medium text-[1.4rem] sm:text-[1.1rem] md:text-[1.25rem] font-bold">
                ⚡
              </span>
            </div>
            <p className="text-[1.05rem] sm:text-[1.05rem] md:text-[1.1rem] lg:text-[1.125rem] font-toboggan-regular">
              Quick Results
            </p>
          </div>
        </div> */}

        {/* Bottom Section */}
        <div className="border-t border-black/10 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            {/* Links */}
            <div className="flex  sm:flex-row gap-4 sm:gap-6 text-center sm:text-left">
              {footerLinks.map((item, index) => (
                <Link
                  to={item.path}
                  className="font-medium text-[0.95rem] sm:text-[0.875rem] md:text-[0.95rem] lg:text-[1rem] text-black/70 hover:text-[#0a0a0a] transition-colors leading-relaxed"
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
