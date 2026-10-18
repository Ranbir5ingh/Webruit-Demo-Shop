import { initiatePayment } from "@/lib/initiatePayment";
import React from "react";
import { toast } from "sonner";

const CTASection = () => {
  const course = {
    title: "Resume-Kit Pro",
    price: 499,
    _id: "123",
  };

  return (
    <section className="text-[#0a0a0a] py-10 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-2xl px-6 py-8 md:py-16 text-center text-white">
        <h2 className="text-[2.2rem] xs:text-[2.25rem] sm:text-[2.75rem] md:text-[3.5rem] lg:text-[4.5rem] leading-tight text-center font-toboggan-medium">
          Get Your Dream Job!
        </h2>
        <p className="text-lg md:text-[1.9rem] mb-8 lg:mb-12">
          Stand out with professional resumes that get results.
        </p>
        <button
          className="bg-white  text-[#0a0a0a] text-[1rem] md:text-[1.25rem] font-medium px-8 py-5 md:px-8 rounded-2xl hover:opacity-90 transition font-toboggan-regular"
          onClick={() => initiatePayment(course)}
        >
          Get Resume Kit Pro!
        </button>
      </div>
    </section>
  );
};

export default CTASection;