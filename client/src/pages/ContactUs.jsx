import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validate = (name, value) => {
    if (name === "name") return !value.trim() ? "Full name is required." : "";
    if (name === "email") {
      if (!value.trim()) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address.";
    }
    if (name === "message") return !value.trim() ? "Message is required." : "";
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const newErrors = {
      name: validate("name", formData.name),
      email: validate("email", formData.email),
      message: validate("message", formData.message),
    };

    if (newErrors.name || newErrors.email || newErrors.message) {
      setErrors(newErrors);
      setSubmitStatus({ type: "error", message: "Please fill in all required fields." });
      setIsSubmitting(false);
      return;
    }

    try {
      setSubmitStatus({
        type: "success",
        message: "Thank you for your message! We’ll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="text-[#0a0a0a] py-16 pt-24 sm:py-20 sm:pt-28 lg:pt-32 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-[#0a0a0a] text-[2.5rem] xs:text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.8rem] font-bold leading-tight font-toboggan-medium">
          Get in{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-indigo-400 bg-clip-text text-transparent">
            Touch
          </span>
        </h1>
        <p className="mt-4 text-black/70 text-[1.05rem] sm:text-[1.1rem] md:text-[1.125rem] max-w-2xl mx-auto leading-relaxed">
          Have questions about ResumeKit Pro? We’re here to help you land your dream job.
          Reach out to us and we’ll get back to you within 24 hours.
        </p>
      </section>

      {/* Contact Section */}
      <section className="text-[#0a0a0a] px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          {/* Info */}
          <div className="space-y-10">
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
              <h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-bold mb-4 font-toboggan-medium">
                Let’s Start a Conversation
              </h2>
              <p className="text-black/70 text-[1rem] sm:text-[1.05rem] leading-relaxed">
                Whether you need help with your resume templates, billing questions,
                or just want to share feedback, we’d love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Mail, title: "Email Us", value: "webruit@gmail.com", sub: "We reply within 24 hours" },
                { icon: Phone, title: "Call Us", value: "+91 9682339255", sub: "Mon-Fri, 9AM - 6PM IST" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-gray-50 rounded-2xl p-6 sm:p-8">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-400 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a0a0a] text-[1.05rem]">{item.title}</h3>
                    <p className="text-black/70 text-[0.95rem]">{item.value}</p>
                    {item.sub && <p className="text-sm text-black/50 mt-1">{item.sub}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-[1.6rem] sm:text-[1.8rem] font-bold text-[#0a0a0a] font-toboggan-medium">
              Send us a Message
            </h3>

            {submitStatus && (
              <div
                className={`p-4 rounded-xl flex items-start gap-3 ${
                  submitStatus.type === "success"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                {submitStatus.type === "success" ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                )}
                <p
                  className={`text-sm ${
                    submitStatus.type === "success" ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {submitStatus.message}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black/80 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-lg border bg-white focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-[0.95rem] ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-black/80 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-lg border bg-white focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-[0.95rem] ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black/80 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-[0.95rem]"
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black/80 mb-1">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border bg-white focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none text-[0.95rem] ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
                {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all text-white ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-500 to-indigo-400 hover:opacity-90"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
