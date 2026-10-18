const path = require("path");
const Payment = require("../../models/Payment");
const sendEmail = require("../../helpers/sendEmail");

// Create Payment: stores basic payment info
const createPayment = async (req, res) => {
  const {
    email,
    transactionId,
    amount,
  } = req.body;

  try {
    const newPayment = await Payment.create({
      email,
      transactionId,
      amount,
    });

    console.log("Payment created:", newPayment);

    res.status(200).json({ 
      success: true, 
      payment: newPayment,
      message: "Payment record created successfully"
    });
  } catch (err) {
    console.error("Create Payment Error:", err);
    
    if (err.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: "Transaction ID already exists" 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Failed to create payment record" 
    });
  }
};

// Update Payment Status and send email with resume kit when completed
const updatePaymentStatus = async (req, res) => {
  const { transactionId, status } = req.body;

  try {
    const payment = await Payment.findOne({ transactionId });
    if (!payment) {
      return res.status(404).json({ 
        success: false, 
        message: "Payment not found" 
      });
    }

    const previousStatus = payment.status;
    payment.status = status;
    await payment.save();

    if (previousStatus === "pending" && status === "completed") {
      await sendResumeKitEmail(payment);
    }

    if (status === "failed") {
      // optionally delete failed payment
    }

    let responseMessage;
    switch (status) {
      case "completed":
        responseMessage = "Payment completed and resume kit sent via email";
        break;
      case "failed":
        responseMessage = "Payment marked as failed";
        break;
      case "pending":
        responseMessage = "Payment status updated to pending";
        break;
      default:
        responseMessage = "Payment status updated";
    }

    res.status(200).json({ 
      success: true, 
      message: responseMessage,
      payment 
    });
  } catch (err) {
    console.error("Update Payment Status Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update payment status" 
    });
  }
};

// Function to send resume kit email with attachment
const sendResumeKitEmail = async (payment) => {
  try {
    const subject = "✨ Your Resume Kit Pro is Ready for Download!";
    
    const messageBody = `
      Thank you for your purchase! Your premium resume templates are now ready.
      <br/>
      <br/>
      <strong>Transaction ID:</strong> ${payment.transactionId}<br/>
      <strong>Amount Paid:</strong> ₹${payment.amount}<br/>
      <br/>
      The resume kit is attached to this email as a ZIP file. Simply download and extract it to access all templates.
    `;

    const html = `
<div style="max-width: 640px; margin: auto; font-family: 'Helvetica Neue', Arial, sans-serif; color: #1f2937; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 6px 24px rgba(0,0,0,0.08);">
  <!-- Header -->
  <div style="padding: 40px 24px; text-align: center; background: linear-gradient(135deg, #625fff, #7d86ff); color: #ffffff;">
    <h1 style="margin: 0; font-size: 30px; font-weight: 700;">Resume Kit Pro</h1>
    <p style="margin: 12px 0 0; font-size: 16px; opacity: 0.9;">Your Premium Templates Are Ready 🚀</p>
  </div>

  <!-- Main Content -->
  <div style="padding: 32px 24px;">
    <div style="text-align: center; margin-bottom: 32px;">
      <h2 style="margin: 0; font-size: 24px; font-weight: 700; color: #111827;">Payment Successful!</h2>
    </div>

    <p style="font-size: 16px; line-height: 1.7; margin-bottom: 24px; color: #374151;">
      Hi there 👋, <br/>
      ${messageBody}
    </p>

    <!-- Steps -->
    <div style="background-color: #f9fafb; border-left: 4px solid #625fff; padding: 20px; margin: 32px 0; border-radius: 8px;">
      <h3 style="margin: 0 0 12px; font-size: 17px; font-weight: 600; color: #111827;">📥 How to Use Your Templates</h3>
      <p style="margin: 0; font-size: 15px; color: #4b5563; line-height: 1.6;">
        1️⃣ Download the attached ZIP file<br/>
        2️⃣ Extract/Unzip the file<br/>
        3️⃣ Open templates in Microsoft Word or Google Docs<br/>
        4️⃣ Customize and make them yours 🎯
      </p>
    </div>

    <!-- Support -->
    <div style="text-align: center; margin-top: 32px; padding: 24px; background: #f3f4f6; border-radius: 12px;">
      <h3 style="margin: 0 0 10px; font-size: 18px; font-weight: 600; color: #111827;">Need Help?</h3>
      <p style="margin: 0; font-size: 15px; color: #4b5563; line-height: 1.6;">
        Reach us anytime:<br/>
        📧 <a href="mailto:webruit@gmail.com" style="color: #625fff; text-decoration: none;">webruit@gmail.com</a><br/>
        📱 <a href="tel:+919682339255" style="color: #625fff; text-decoration: none;">+91 9682339255</a>
      </p>
    </div>

    <p style="font-size: 16px; color: #111827; margin-top: 32px; text-align: center; font-weight: 500;">
      Wishing you success in your career journey 💼✨
    </p>

    <p style="font-size: 14px; color: #6b7280; text-align: center; margin-top: 8px;">
      — The Resume Kit Pro Team
    </p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; padding: 20px; background: #f9fafb; border-top: 1px solid #e5e7eb;">
    <p style="margin: 0; font-size: 12px; color: #9ca3af;">
      &copy; ${new Date().getFullYear()} Resume Kit Pro. All rights reserved.
    </p>
    <p style="margin: 6px 0 0; font-size: 12px; color: #9ca3af;">
      Transaction ID: ${payment.transactionId}
    </p>
  </div>
</div>`;

    const resumeKitPath = path.join(__dirname, "../../assets/Resume-Kit-Pro.zip");

    await sendEmail(
      payment.email, 
      subject, 
      html, 
      [{
        filename: "Resume-Kit-Pro.zip",
        path: resumeKitPath,
        contentType: "application/zip"
      }]
    );

    console.log(`Resume kit sent to: ${payment.email}`);
  } catch (error) {
    console.error("Error sending resume kit email:", error);
    throw error;
  }
};

// Get All Payments (Admin Use)
const fetchAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      payments,
      count: payments.length 
    });
  } catch (err) {
    console.error("Fetch Payments Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch payments" 
    });
  }
};

// Get Payment by Transaction ID
const getPaymentByTransactionId = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const payment = await Payment.findOne({ transactionId });
    if (!payment) {
      return res.status(404).json({ 
        success: false, 
        message: "Payment not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      payment 
    });
  } catch (err) {
    console.error("Get Payment Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch payment" 
    });
  }
};

// Delete Payment (Admin Use)
const deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ 
        success: false, 
        message: "Payment not found" 
      });
    }

    await Payment.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Payment deleted successfully",
      deletedPayment: payment,
    });
  } catch (err) {
    console.error("Delete Payment Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to delete payment" 
    });
  }
};

module.exports = {
  createPayment,
  updatePaymentStatus,
  fetchAllPayments,
  getPaymentByTransactionId,
  deletePayment,
};