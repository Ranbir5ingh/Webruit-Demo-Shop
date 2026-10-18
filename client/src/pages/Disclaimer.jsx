import React from "react";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="text-[#0a0a0a] py-16 pt-24 sm:py-20 sm:pt-28 lg:pt-32 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-[#0a0a0a] text-[2.5rem] xs:text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.8rem] font-bold leading-tight font-toboggan-medium">
            Disclaimer
          </h1>
          <p className="text-black/70 text-[1.05rem] sm:text-[1.1rem] md:text-[1.125rem] mt-4 leading-relaxed max-w-2xl mx-auto">
            Important information about our services, products, and limitations.
          </p>
          <div className="text-black/50 text-[0.95rem] mt-3">
            Last updated: January 2025
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="text-[#0a0a0a] px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="space-y-8 sm:space-y-10">
          
          {/* General Disclaimer */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
              General Disclaimer
            </h2>
            <div className="text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed space-y-4">
              <p>
                The information and materials provided by ResumeKit Pro are for general informational and educational purposes only. While we strive to provide accurate, up-to-date, and useful information, we make no representations or warranties of any kind about the completeness, accuracy, reliability, or suitability of our content.
              </p>
              <p>
                Any reliance you place on our information, templates, or advice is strictly at your own risk.
              </p>
            </div>
          </div>

          {/* No Employment Guarantees */}
          <div className="bg-amber-50 rounded-2xl p-6 sm:p-8 border border-amber-200">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium text-amber-900">
              No Employment Guarantees
            </h2>
            <div className="space-y-4 text-amber-800/80 text-[1rem] sm:text-[1.05rem] leading-relaxed">
              <p>
                <strong>Important:</strong> ResumeKit Pro does not guarantee job interviews, employment opportunities, or career success. Our resume templates and career resources are tools designed to help you present yourself professionally, but your success depends on numerous factors including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your qualifications, skills, and experience</li>
                <li>Market conditions and job availability</li>
                <li>Competition from other candidates</li>
                <li>Employer preferences and requirements</li>
                <li>Interview performance and networking abilities</li>
                <li>Geographic location and industry factors</li>
              </ul>
            </div>
          </div>

          {/* Product Limitations */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
              Product Limitations
            </h2>
            <div className="space-y-4 text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed">
              <p>
                While our resume templates are professionally designed and tested, we cannot guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Compatibility with all software versions or operating systems</li>
                <li>Perfect formatting across all devices or printers</li>
                <li>Acceptance by all Applicant Tracking Systems (ATS)</li>
                <li>Suitability for every industry or career level</li>
                <li>That templates will remain current with changing design trends</li>
              </ul>
              <p className="mt-4">
                We recommend testing templates with your specific software and requirements before important applications.
              </p>
            </div>
          </div>

          {/* Payment Processing & Delivery Timeline */}
          <div className="bg-blue-50 rounded-2xl p-6 sm:p-8 border border-blue-200">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium text-blue-900">
              Payment Processing & Delivery Timeline
            </h2>
            <div className="space-y-4 text-blue-800/80 text-[1rem] sm:text-[1.05rem] leading-relaxed">
              <p>
                We use UPI (Unified Payments Interface) with manual verification to ensure security and prevent fraud. This means:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payments are made through UPI links that redirect to your default UPI app</li>
                <li>You must manually confirm payment and provide transaction ID</li>
                <li>Products are delivered within 24 hours after manual verification, not instantly</li>
                <li>Delivery times may vary based on verification workload</li>
                <li>Weekend and holiday orders may experience slight delays</li>
                <li>Our automated email system delivers products after payment confirmation</li>
              </ul>
            </div>
          </div>

          {/* Third-Party Software */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
              Third-Party Software & Platforms
            </h2>
            <div className="text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed space-y-4">
              <p>
                Our templates are designed to work with popular software like Microsoft Word, Google Docs, and Canva. However:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>We do not control these third-party platforms</li>
                <li>Software updates may affect template functionality</li>
                <li>We are not responsible for changes to third-party services</li>
                <li>Some features may vary between different software versions</li>
              </ul>
            </div>
          </div>

          {/* Career Advice Disclaimer */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
              Career Advice & Information
            </h2>
            <div className="text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed space-y-4">
              <p>
                Any career advice, tips, or information provided on our website, in our products, or through our communications is for educational purposes only. This information:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Should not be considered personalized career counseling</li>
                <li>May not be suitable for your specific situation</li>
                <li>Should be verified with current industry standards</li>
                <li>Does not replace professional career counseling services</li>
                <li>May become outdated as job market conditions change</li>
              </ul>
            </div>
          </div>

          {/* Website Content */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
              Website Content & Links
            </h2>
            <div className="text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed space-y-4">
              <p>
                Our website may contain links to external websites that are not provided or maintained by ResumeKit Pro. We do not guarantee the accuracy, relevance, timeliness, or completeness of information on these external sites.
              </p>
              <p>
                The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
              </p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
              Customer Testimonials
            </h2>
            <div className="text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed">
              <p>
                Customer testimonials and reviews reflect individual experiences and opinions. Results mentioned in testimonials are not typical or guaranteed. Individual results may vary based on numerous factors including effort, qualifications, market conditions, and circumstances beyond our control.
              </p>
            </div>
          </div>

          {/* Professional Advice */}
          <div className="bg-blue-50 rounded-2xl p-6 sm:p-8 border border-blue-200">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium text-blue-900">
              Seek Professional Advice
            </h2>
            <div className="text-blue-800/80 text-[1rem] sm:text-[1.05rem] leading-relaxed">
              <p>
                For personalized career guidance, industry-specific advice, or complex career transitions, we recommend consulting with qualified career counselors, industry professionals, or career coaching services who can provide advice tailored to your specific situation and goals.
              </p>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
              Limitation of Liability
            </h2>
            <div className="text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed">
              <p>
                To the fullest extent permitted by applicable law, ResumeKit Pro shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our products or services.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 sm:p-8 border border-indigo-100">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
              Questions About This Disclaimer
            </h2>
            <div className="text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed">
              <p className="mb-4">
                If you have any questions about this disclaimer or our services, please contact us:
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

export default Disclaimer;