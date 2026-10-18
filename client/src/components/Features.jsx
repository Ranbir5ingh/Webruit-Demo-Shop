import React from "react";

const features = [
  {
    icon: "📄",
    title: "Templates & Samples",
    desc: "Professional DOCX template compatible with Word & Google Docs, plus pre-filled examples to guide your writing and PDF preview to see exactly how it looks.",
  },
  {
    icon: "💌",
    title: "Complete Application Suite",
    desc: "Matching cover letter template and professional references page to complete your entire job application package.",
  },
  {
    icon: "🎯",
    title: "ATS Optimization Guide",
    desc: "Complete guide with tips and strategies to pass applicant tracking systems and get your resume seen by recruiters.",
  },
  {
    icon: "✨",
    title: "Professional Design System",
    desc: "Clean, modern templates that don't feel overdesigned yet still make a strong impact and help you present yourself confidently.",
  },
  {
    icon: "🚀",
    title: "Career Advancement Tools",
    desc: "Everything you need to stand out from other candidates and get interview calls within days of updating your resume.",
  },
];

const Features = () => {
  return (
    <section className="text-[#0a0a0a] py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-7xl mx-auto">
        {/* Main Heading - Highly responsive */}
        <h2 className="text-[#0a0a0a] text-[1.9rem] xs:text-[1.3rem] sm:text-[1.6rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] font-bold leading-tight text-center mb-3 px-2 sm:px-4 font-toboggan-medium">
          Everything You Need to{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-indigo-400 bg-clip-text text-transparent">
            Get Hired
          </span>
        </h2>

        {/* Subtitle - Responsive text and spacing */}
        <p className="font-medium text-gray-500 text-[0.95rem] sm:text-[0.875rem] md:text-[0.95rem] lg:text-[1rem] mx-auto mb-20 sm:mb-12 md:mb-16 lg:mb-24 max-w-3xl px-4 sm:px-0 leading-relaxed">
          Professional resume templates, cover letters, and ATS optimization guides to help you land your dream job faster.
        </p>

        {/* First row - 3 cards with responsive grid */}
        <div className="grid gap-10 sm:gap-10 md:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-8 sm:mb-12 md:mb-14 lg:mb-16">
          {features.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="border border-black/10 bg-gray-100 rounded-xl p-4 sm:p-5 md:p-6 lg:p-7 relative"
            >
              {/* Icon container - responsive sizing */}
              <div className="w-14 h-14 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-200 rounded-full flex items-center justify-center absolute -top-6 sm:-top-7 md:-top-8 left-1/2 -translate-x-1/2 shadow-lg">
                <div className="text-blue-400 scale-75 sm:scale-100 md:scale-110 text-2xl">
                  {item.icon}
                </div>
              </div>
              
              {/* Card content - responsive spacing and text */}
              <h3 className="mt-8 sm:mt-8 md:mt-8 lg:mt-10 mb-2 sm:mb-3 md:mb-4 text-[1.3rem] sm:text-[1.25rem] md:text-[1.5rem] lg:text-[1.5rem] leading-tight font-toboggan-regular">
                {item.title}
              </h3>
              <p className="font-medium text-[0.95rem] sm:text-[0.875rem] md:text-[0.95rem] lg:text-[1rem] text-black/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Second row - 2 cards with responsive grid */}
        <div className="grid gap-10 sm:gap-10 md:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 mt-4 sm:mt-6 max-w-5xl mx-auto">
          {features.slice(3).map((item, index) => (
            <div
              key={index}
              className="border border-black/10 bg-gray-100 rounded-xl p-4 sm:p-5 md:p-6 lg:p-7 relative"
            >
              {/* Icon container - responsive sizing */}
              <div className="w-14 h-14 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-200 rounded-full flex items-center justify-center absolute -top-6 sm:-top-7 md:-top-8 left-1/2 -translate-x-1/2 shadow-lg">
                <div className="text-blue-400 scale-75 sm:scale-100 md:scale-110 text-2xl">
                  {item.icon}
                </div>
              </div>
              
              {/* Card content - responsive spacing and text */}
              <h3 className="mt-8 sm:mt-8 md:mt-8 lg:mt-10 mb-2 sm:mb-3 md:mb-4 text-[1.3rem] sm:text-[1.25rem] md:text-[1.5rem] lg:text-[1.5rem] leading-tight font-toboggan-regular">
                {item.title}
              </h3>
              <p className="font-medium text-[0.95rem] sm:text-[0.875rem] md:text-[0.95rem] lg:text-[1rem] text-black/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;