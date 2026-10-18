import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { createPaymentRecord } from "@/store/admin/payment-slice";
import { Check } from "lucide-react";

import { QRCodeCanvas } from "qrcode.react";

const PaymentRecordDialog = () => {
  const [open, setOpen] = useState(false); 
  const [course, setCourse] = useState({
    title: "Resume-Kit Pro",
    price: 499,
    _id: "demo123"
  }); // Demo course data
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const qrRef = useRef(null);
  const [qrImg, setQrImg] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const checkPayment = () => {
      const courseData = localStorage.getItem("payment_initiated");
      if (courseData) {
        try {
          const parsed = JSON.parse(courseData);
          setCourse(parsed);
          setOpen(true);
        } catch {
          localStorage.removeItem("payment_initiated");
        }
      }
    };

    checkPayment();
    window.addEventListener("payment-initiated", checkPayment);
    return () => window.removeEventListener("payment-initiated", checkPayment);
  }, []);

  // Generate QR code image
  useEffect(() => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        setQrImg(canvas.toDataURL("image/png"));
      }
    }
  });

  const handlePaymentConfirm = () => {
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      toast.warning("Please enter your email address.");
      return;
    }

    if (!transactionId.trim()) {
      toast.warning("Please enter your transaction ID.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warning("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    const paymentPayload = {
      email: email.trim(),
      transactionId: transactionId.trim(),
      courseTitle: course?.title || "Course Payment",
      courseId: course?._id || null,
      amount: course?.price || 0,
      timestamp: new Date().toISOString(),
    };

    try {
      await dispatch(createPaymentRecord(paymentPayload)).unwrap();
      localStorage.removeItem("payment_initiated");
      setStep(3);
      toast.success("Payment details recorded successfully!");
    } catch (error) {
      toast.error("Failed to record payment details", {
        description: error.message || "Please try again",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setEmail("");
    setTransactionId("");
    setIsSubmitting(false);
    localStorage.removeItem("payment_initiated");
    setOpen(false);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleFinish = () => {
    handleClose();
  };

  return (
    <>
      {/* Hidden QR Code Generator */}
      <div className="hidden" ref={qrRef}>
        <QRCodeCanvas
          value={`upi://pay?pa=ranbirsingh.code@okicici&pn=ResumeKit%20Pro&am=${
            course?.price
          }&cu=INR&tn=Payment for ${encodeURIComponent(course?.title)}`}
          size={128}
        />
      </div>

      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="max-w-md w-[93vw] max-h-[90dvh] mt-4 bg-gray-100 shadow-xl rounded-2xl flex flex-col overflow-hidden border-0">
          <DialogHeader className="flex-shrink-0 p-4 sm:p-5">
            <DialogTitle className="text-[1.4rem] xs:text-[1.3rem] sm:text-[1.5rem] md:text-[1.6rem] text-[#0a0a0a] text-center font-bold tracking-wide font-toboggan-medium">
              {step === 1 ? (
                <>
                  Payment{" "}
                  <span className="bg-gradient-to-r from-indigo-500 to-indigo-400 bg-clip-text text-transparent">
                    Confirmation
                  </span>
                </>
              ) : step === 2 ? (
                <>
                  Payment{" "}
                  <span className="bg-gradient-to-r from-indigo-500 to-indigo-400 bg-clip-text text-transparent">
                    Details
                  </span>
                </>
              ) : (
                <>
                  Payment{" "}
                  <span className="bg-gradient-to-r from-emerald-500 to-emerald-400 bg-clip-text text-transparent">
                    Submitted
                  </span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 flex flex-col px-4 sm:px-5 pb-4 sm:pb-5 overflow-hidden">
            <div className="flex-1 flex flex-col justify-center space-y-4">
              {step === 1 ? (
                // Step 1: Payment with QR Code (REDESIGNED)
                <div className="text-center space-y-4">
                  {course && (
                    <div className="bg-white rounded-xl p-4 border border-black/10 space-y-4">
                      {/* Course Info - Compact */}
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <h3 className="text-[1rem] sm:text-[1.1rem] font-toboggan-regular text-[#0a0a0a]">
                            {course.title}
                          </h3>
                          <p className="text-[1.3rem] sm:text-[1.4rem] font-bold">
                            <span className="bg-gradient-to-r from-indigo-400 to-indigo-500 bg-clip-text text-transparent font-toboggan-medium">
                              ₹{course.price}
                            </span>
                          </p>
                        </div>
                        
                        {/* QR Code - Right Side */}
                        <div className="flex flex-col items-center space-y-1">
                          <div className="w-20 h-20 bg-white border border-gray-200 rounded-lg p-2">
                            <img
                  src={qrImg}
                  alt="Scan to Pay"
                  className=" w-full h-full object-contain border border-white/10"
                />
                          </div>
                          <p className="text-[0.7rem] text-black/60 font-medium">Scan to Pay</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h4 className="text-[1.05rem] sm:text-[1.1rem] text-[#0a0a0a] font-toboggan-regular">
                      Complete your payment
                    </h4>
                    <p className="font-medium text-[0.8rem] sm:text-[0.85rem] text-black/70 leading-relaxed">
                      Scan the QR code or confirm after making payment to proceed
                    </p>
                  </div>
                </div>
              ) : step === 2 ? (
                // Step 2: Collect Payment Details  
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <p className="text-[1.1rem] sm:text-[1.15rem] text-[#0a0a0a] font-toboggan-regular mb-1">
                      Please provide your payment details
                    </p>
                    <p className="font-medium text-[0.85rem] sm:text-[0.9rem] text-black/70 leading-relaxed">
                      We need this information to record your payment
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[0.95rem] sm:text-[1rem] font-toboggan-regular text-[#0a0a0a] mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-5 bg-white border border-black/10 rounded-xl text-[#0a0a0a] placeholder-black/50 focus:border-indigo-400 focus:outline-none font-medium text-[0.85rem] sm:text-[0.9rem]"
                      />
                    </div>

                    <div>
                      <label className="block text-[0.95rem] sm:text-[1rem] font-toboggan-regular text-[#0a0a0a] mb-2">
                        Transaction ID
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter UPI/Payment Transaction ID"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full px-3 py-5 bg-white border border-black/10 rounded-xl text-[#0a0a0a] placeholder-black/50 focus:border-indigo-400 focus:outline-none font-medium text-[0.85rem] sm:text-[0.9rem]"
                      />
                      <p className="font-medium text-[0.75rem] sm:text-[0.8rem] text-black/50 leading-relaxed mt-1">
                        This is the reference number you received after payment
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // Step 3: Success Confirmation
                <div className="text-center space-y-5">
                  <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center mx-auto">
                    <Check className="text-white"/>
                  </div>

                  <div className="text-[0.85rem] text-black/70 border p-4 rounded-3xl leading-relaxed space-y-1">
                    <p>We will review and verify your payment within <strong>24 hours</strong>.</p>
                    <p>You will receive your ResumeKit Pro templates at <strong>{email}</strong>.</p>
                    <p>Please also check your <strong>spam folder</strong>.</p>
                  </div>

                  <p className="text-[0.8rem] text-black/50">
                    Thank you for your purchase!
                  </p>
                </div>
              )}
            </div>

            {/* Fixed Button Section */}
            <div className="flex-shrink-0 mt-6 pt-4 border-t border-black/10">
              {step === 1 ? (
                <div className="flex gap-3">
                  <button
                    onClick={handlePaymentConfirm}
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-400 text-white text-[0.9rem] font-medium px-4 py-3 rounded-xl hover:opacity-90 transition font-toboggan-regular"
                  >
                    Yes, I Paid
                  </button>
                  <button
                    onClick={handleClose}
                    className="flex-1 bg-white text-[#0a0a0a] text-[0.9rem] font-medium px-4 py-3 rounded-xl border border-black/10 hover:bg-gray-50 transition font-toboggan-regular"
                  >
                    Not Yet
                  </button>
                </div>
              ) : step === 2 ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="bg-white text-[#0a0a0a] text-[0.9rem] font-medium px-4 py-3 rounded-xl border border-black/10 hover:bg-gray-50 transition font-toboggan-regular disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`flex-1 text-white text-[0.9rem] font-medium px-4 py-3 rounded-xl transition font-toboggan-regular ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed opacity-60"
                        : "bg-gradient-to-r from-indigo-500 to-indigo-400 hover:opacity-90"
                    }`}
                  >
                    {isSubmitting ? "Recording..." : "Submit Payment Details"}
                  </button>
                </div>
              ) : (
                <div className="flex justify-center">
                  <button
                    onClick={handleFinish}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white text-[0.9rem] font-medium px-4 py-3 rounded-xl hover:opacity-90 transition font-toboggan-regular"
                  >
                    Got it, Thanks!
                  </button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentRecordDialog;