import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PaymentRecordDialog from "@/components/paymentDialog";
import { initiatePayment } from "@/lib/initiatePayment";

const ResumeKitPage = () => {
  const course = {
    title: "Resume-Kit Pro",
    price: 499,
    _id: "123",
  };

  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isStickyBarClosed, setIsStickyBarClosed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth <= 768;
      if (!isMobile || isStickyBarClosed) return;

      const webinarElement = document.getElementById("sellingPage");
      if (!webinarElement) return;

      const rect = webinarElement.getBoundingClientRect();
      const isWebinarAtTop = rect.top <= 100;
      const hasWebinarPassed = rect.bottom <= 0;
      const shouldShowBar = isWebinarAtTop && !hasWebinarPassed;

      setShowStickyBar(shouldShowBar);
    };

    window.addEventListener("scroll", handleScroll);

    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isStickyBarClosed]);

  return (
    <>
      <div id="sellingPage" className="bg-white text-slate-800 min-h-screen">
        <HeroSection />
        <Features />
        <ReviewsSection />
        <CTASection />
        <FAQSection />

        <PaymentRecordDialog />
      </div>

      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-0 md:hidden animate-in slide-in-from-bottom duration-300">
          <div className="bg-white/30 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center justify-between h-16">
            <span className="text-black text-base font-semibold">
              Get Hired
            </span>
            <button
              className="ml-3 px-6 py-2 font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full shadow-md transition hover:scale-105 "
              onClick={() => initiatePayment(course)}
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ResumeKitPage;
