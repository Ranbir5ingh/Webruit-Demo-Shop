import React, { useState } from "react";
import { ChevronDown } from "lucide-react";


 const faqs = [
    {
      q: "Is this editable in Google Docs?",
      a: "Yes! All templates are fully compatible with Microsoft Word and Google Docs. You can edit them anywhere, anytime.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major payment methods including UPI, Paytm, Google Pay, PhonePe, net banking, and credit/debit cards.",
    },
    {
      q: "Are these resumes ATS friendly?",
      a: "Absolutely! Our templates are specifically designed to pass Applicant Tracking Systems used by 99% of companies.",
    },
    {
      q: "Do I get instant access after payment?",
      a: "Yes! You'll receive the download link immediately after successful payment. No waiting time.",
    },
    {
      q: "Is there any ongoing subscription?",
      a: "No! This is a one-time payment of ₹499. You get lifetime access to all templates and future updates.",
    },
  ];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState();

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="text-[#0a0a0a] pt-16 sm:pt-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-8 sm:mb-12 md:mb-16 max-w-7xl mx-auto">
        {/* Main Heading */}
        <h2 className="text-[#0a0a0a] text-[1.9rem] xs:text-[1.3rem] sm:text-[1.6rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] font-bold leading-tight px-2 sm:px-4 font-toboggan-medium">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-md overflow-hidden transition-all border border-black/10 font-toboggan-medium"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex justify-between items-center px-6 py-6 text-left  text-base md:text-2xl"
            >
              <div className="w-[80%]">{faq.q}</div>

              <ChevronDown
                className={`w-5 h-5 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && faq.a && (
              <div className="px-6 pb-4 text-sm md:text-base  text-gray-500">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
