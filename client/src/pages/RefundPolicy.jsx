import React from "react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="text-[#0a0a0a] py-16 pt-24 sm:py-20 sm:pt-28 lg:pt-32 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-[#0a0a0a] text-[2.5rem] xs:text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.8rem] font-bold leading-tight font-toboggan-medium">
            Refund Policy
          </h1>
          <p className="text-black/70 text-[1.05rem] sm:text-[1.1rem] md:text-[1.125rem] mt-4 leading-relaxed max-w-2xl mx-auto">
            We strive for customer satisfaction and want to ensure you're happy with your purchase.
          </p>
          <div className="text-black/50 text-[0.95rem] mt-3">
            Last updated: January 2025
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="text-[#0a0a0a] px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="space-y-8 sm:space-y-10">
          
          {/* General Policy */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
              General Refund Policy
            </h2>
            <div className="text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed space-y-4">
              <p>
                Due to the digital nature of our products and our manual payment verification system, <strong className="text-black/90">all sales are generally final</strong> once payment is verified and products are delivered via email.
              </p>
              <p>
                Since we manually verify each payment within 24 hours before delivery, customers have this verification period to resolve any payment-related issues before product delivery occurs.
              </p>
              <p>
                However, we understand that exceptional circumstances may arise, and we're committed to finding fair solutions for our customers.
              </p>
            </div>
          </div>

          {/* Eligible Refund Scenarios */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
              When Refunds May Be Considered
            </h2>
            <div className="space-y-4 text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed">
              <p>We may consider refund requests in the following situations:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-black/90">Payment Verification Issues:</strong> If there are problems during our manual payment verification process</li>
                <li><strong className="text-black/90">Technical Issues:</strong> If you're unable to download or access your purchased files due to technical problems on our end</li>
                <li><strong className="text-black/90">File Corruption:</strong> If the downloaded files are corrupted and cannot be opened or used</li>
                <li><strong className="text-black/90">Significant Misrepresentation:</strong> If the product received significantly differs from what was advertised</li>
                <li><strong className="text-black/90">Duplicate Purchase:</strong> If you accidentally purchased the same product multiple times</li>
                <li><strong className="text-black/90">UPI Payment Errors:</strong> If there was an error in UPI payment processing that resulted in incorrect charges</li>
              </ul>
            </div>
          </div>

          {/* Non-Refundable Situations */}
          <div className="bg-red-50 rounded-2xl p-6 sm:p-8 border border-red-100">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium text-red-900">
              Non-Refundable Situations
            </h2>
            <div className="space-y-4 text-red-800/80 text-[1rem] sm:text-[1.05rem] leading-relaxed">
              <p>Refunds will <strong>NOT</strong> be provided in these situations:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Change of mind after successful download</li>
                <li>Dissatisfaction with design style or color preferences</li>
                <li>Compatibility issues with outdated software versions</li>
                <li>User error in software operation or template customization</li>
                <li>Lack of job search success (outcomes are not guaranteed)</li>
                <li>Failure to read product descriptions before purchase</li>
                <li>Requests made more than 7 days after purchase</li>
              </ul>
            </div>
          </div>

          {/* How to Request */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
              How to Request a Refund
            </h2>
            <div className="space-y-4 text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed">
              <p>If you believe your situation qualifies for a refund, please follow these steps:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Contact our support team within <strong className="text-black/90">7 days of purchase</strong></li>
                <li>Include your order number, email used for purchase, and UPI transaction ID</li>
                <li>Provide a detailed explanation of the issue</li>
                <li>Include screenshots or evidence if applicable</li>
                <li>Allow up to 24 hours for initial payment verification before requesting a refund</li>
                <li>Allow up to 48 hours for our team to review your request</li>
              </ol>
            </div>
          </div>

          {/* Processing Time */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
              Refund Processing
            </h2>
            <div className="space-y-4 text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed">
              <p>
                <strong className="text-black/90">Payment Verification:</strong> We manually verify all payments within 24 hours of submission before product delivery.
              </p>
              <p>
                <strong className="text-black/90">Review Time:</strong> We typically review refund requests within 48 hours of submission.
              </p>
              <p>
                <strong className="text-black/90">Processing Time:</strong> If approved, refunds are processed within 5-7 business days back to your original UPI account/payment method.
              </p>
              <p>
                <strong className="text-black/90">Bank Processing:</strong> Depending on your bank or UPI provider, it may take an additional 3-5 business days for the refund to appear in your account.
              </p>
            </div>
          </div>

          {/* Partial Refunds */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
              Partial Refunds & Alternatives
            </h2>
            <div className="text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed">
              <p>
                In some cases, we may offer partial refunds or alternative solutions such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Store credit for future purchases</li>
                <li>Free additional templates or resources</li>
                <li>Extended customer support</li>
                <li>Replacement files if there were technical issues</li>
              </ul>
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8 border border-green-100">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium text-green-900">
              Our Commitment to You
            </h2>
            <div className="text-green-800/80 text-[1rem] sm:text-[1.05rem] leading-relaxed">
              <p>
                While our refund policy is strict due to the nature of digital products, we're always willing to work with customers who experience genuine issues. Our goal is your satisfaction, and we'll do our best to find a solution that works for everyone.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 sm:p-8 border border-indigo-100">
            <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
              Contact Support
            </h2>
            <div className="text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed">
              <p className="mb-4">
                For refund requests or any questions about this policy, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> webruit@gmail.com</p>
                <p><strong>Response Time:</strong> Within 48 hours</p>
                <p><strong>Business Hours:</strong> Monday - Friday, 9 AM - 6 PM IST</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default RefundPolicy;