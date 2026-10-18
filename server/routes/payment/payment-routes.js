const express = require("express");
const {
  createPayment,
  updatePaymentStatus,
  fetchAllPayments,
  getPaymentByTransactionId,
  deletePayment,
} = require("../../controllers/payment/payment-controller");

const router = express.Router();

// Create payment record after UPI transaction initiated
router.post("/create", createPayment);

// Update payment status (sends email with resume kit when completed)
router.post("/update-status", updatePaymentStatus);

// Admin route to view all payments
router.get("/all", fetchAllPayments);

// Get specific payment by transaction ID
router.get("/transaction/:transactionId", getPaymentByTransactionId);

// Admin route to delete payment
router.delete("/:id", deletePayment);

module.exports = router;