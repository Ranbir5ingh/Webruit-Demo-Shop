import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="text-[#0a0a0a] py-16 pt-24 sm:py-20 sm:pt-28 lg:pt-32 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-[#0a0a0a] text-[2.5rem] xs:text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.8rem] font-bold leading-tight font-toboggan-medium">
            Privacy Policy
          </h1>
          <p className="text-black/70 text-[1.05rem] sm:text-[1.1rem] md:text-[1.125rem] mt-4 leading-relaxed max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <div className="text-black/50 text-[0.95rem] mt-3">
            Last updated: January 2025
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="text-[#0a0a0a] px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="space-y-8 sm:space-y-10">
          
          {/* Information We Collect */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
              Information We Collect
            </h2>
            <div className="space-y-4 text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed">
              <p>
                <strong className="text-black/90">Personal Information:</strong> When you purchase our Resume Kit Pro, we collect your name, email address, and payment information necessary to process your order and deliver your digital products.
              </p>
              <p>
                <strong className="text-black/90">Transaction Information:</strong> We collect transaction IDs and payment confirmation details as part of our manual verification process to ensure secure delivery of digital products through our UPI payment system.
              </p>
              <p>
                <strong className="text-black/90">Usage Data:</strong> We automatically collect information about how you interact with our website, including your IP address, browser type, pages visited, and time spent on our site.
              </p>
              <p>
                <strong className="text-black/90">Communication:</strong> If you contact our support team, we retain your communications to provide better service and resolve any issues.
              </p>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
              How We Use Your Information
            </h2>
            <div className="space-y-4 text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed">
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process your purchases and deliver digital products</li>
                <li>Send order confirmations and download links</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Improve our website and services</li>
                <li>Send occasional updates about new products (with your consent)</li>
                <li>Comply with legal obligations and prevent fraud</li>
              </ul>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
              Data Security
            </h2>
            <div className="text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed">
              <p>
                We implement industry-standard security measures to protect your personal information. All payment processing is handled through secure, PCI-compliant payment processors. We use SSL encryption to protect data transmission and regularly update our security protocols.
              </p>
            </div>
          </div>

          {/* Information Sharing */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
              Information Sharing
            </h2>
            <div className="text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed">
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>With trusted service providers who help us operate our business</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or merger</li>
                <li>With your explicit consent</li>
              </ul>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
              Your Rights
            </h2>
            <div className="text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Access the personal information we have about you</li>
                <li>Request corrections to inaccurate information</li>
                <li>Request deletion of your personal data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 sm:p-8 border border-indigo-100">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
              Contact Us
            </h2>
            <div className="text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed">
              <p className="mb-4">
                If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> webruit@gmail.com</p>
                <p><strong>Response Time:</strong> We typically respond within 48 hours</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;