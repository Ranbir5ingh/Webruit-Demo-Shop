import React, { useEffect, useRef, useState } from "react";
import p1 from "@/assets/1.png";
import p2 from "@/assets/2.png";
import p3 from "@/assets/3.png";
import p4 from "@/assets/4.png";
import p5 from "@/assets/5.png";
import p6 from "@/assets/6.png";
import { initiatePayment } from "@/lib/initiatePayment";

const HeroSection = () => {
  const course = {
    title: "Resume-Kit Pro",
    price: 499,
    _id: "123",
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  const fadeInRefs = useRef([]);
  fadeInRefs.current = [];

  const addToFadeInRefs = (el) => {
    if (el && !fadeInRefs.current.includes(el)) {
      fadeInRefs.current.push(el);
    }
  };

  const images = [p1, p2, p3, p4, p5, p6];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Content */}
        <div
          className="space-y-6 sm:space-y-8 order-2 lg:order-1"
          ref={addToFadeInRefs}
        >
          {/* Badge */}
          <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium font-Inter">
            ⭐ #1 Resume Kit for Developers
          </div>

          {/* Main Headline - Using Toboggan Bold for impact */}
          <h1 className="text-4xl sm:text-4xl lg:text-5xl xl:text-6xl font-toboggan-bold leading-[1.1] text-slate-900 tracking-tight">
            Land Your Dream Job with Our
            <span className="text-indigo-600"> Premium Resume Kit</span>
          </h1>

          {/* Subheading - Using Inter for readability */}
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-Inter font-normal max-w-lg">
            Professionally designed, ATS-optimized resume templates that have
            helped
            <span className="font-semibold text-emerald-600 font-Inter">
              {" "}500+ developers{" "}
            </span>
            get hired at top companies like Google, Microsoft, and startups.
          </p>

          {/* CTA Button - Using Toboggan for brand consistency */}
          <div className="flex flex-col gap-4">
            <div
              className="bg-gradient-to-r from-indigo-500 to-indigo-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-toboggan-medium text-base sm:text-lg hover:scale-105 transition-all duration-300 text-center cursor-pointer"
              onClick={() => initiatePayment(course)}
            >
              Get ResumeKit Pro - ₹499
            </div>
            {/* Secondary CTA - Demoted to ghost/text variant */}
            <div
              className="text-indigo-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-toboggan-medium text-base sm:text-lg text-center cursor-pointer border-2 border-transparent hover:underline"
              onClick={() => initiatePayment(course)}
            >
              Learn More
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center sm:justify-start gap-6 sm:gap-8 pt-4">
            {/* Badge 1 */}
            <div className="inline-flex items-center border  border-indigo-100 text-indigo-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium font-Inter">
              500+ Customers
            </div>

            {/* Badge 2 */}
            <div className="inline-flex items-center border  border-indigo-100 text-indigo-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium font-Inter">
              4.9★ Rating
            </div>

            {/* Badge 3 */}
            <div className="inline-flex items-center border  border-indigo-100 text-indigo-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium font-Inter">
              24hr Support
            </div>
          </div>
        </div>

        {/* Right Content - Custom Slider */}
        <div
          className="relative order-1 lg:order-2 mt-8 lg:-mt-8"
          ref={addToFadeInRefs}
        >
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white p-2 sm:p-4 border border-indigo-100">
            <div className="relative w-full aspect-square overflow-hidden rounded-xl sm:rounded-2xl">
              {images.map((src, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentSlide
                    ? "translate-x-0 scale-100"
                    : index < currentSlide
                    ? "-translate-x-full scale-95"
                    : "translate-x-full scale-95"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Resume Template ${index + 1}`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 text-sm sm:text-base border border-indigo-200 font-Inter"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 text-sm sm:text-base border border-indigo-200 font-Inter"
            >
              →
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 border ${index === currentSlide
                    ? "bg-indigo-600 w-4 sm:w-8 border-indigo-600"
                    : "bg-white/60 border-white"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Floating Elements - Using Inter for small labels */}
          <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-emerald-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium font-Inter">
            ATS Optimized ✓
          </div>
          <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-indigo-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium font-Inter">
            Modern Layout ✓
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
