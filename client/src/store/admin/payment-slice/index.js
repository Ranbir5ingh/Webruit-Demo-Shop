import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  paymentList: [],
  currentPayment: null,
  isLoading: false,
  error: null,
};

// Fetch all payments (admin use)
export const getAllPayments = createAsyncThunk(
  "/payment/getAllPayments",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/payment/all`);
      return res.data.payments;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch payments");
    }
  }
);

// Create a payment record
export const createPaymentRecord = createAsyncThunk(
  "/payment/createPayment",
  async (paymentData, thunkAPI) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/create`, paymentData);
      return res.data.payment;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create payment");
    }
  }
);

// Get payment by transaction ID
export const getPaymentByTransactionId = createAsyncThunk(
  "/payment/getPaymentByTransactionId",
  async (transactionId, thunkAPI) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/payment/transaction/${transactionId}`);
      return res.data.payment;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Payment not found");
    }
  }
);

// Update payment status (simplified - no userId needed)
export const updatePaymentStatus = createAsyncThunk(
  "/payment/updatePaymentStatus",
  async ({ transactionId, status }, thunkAPI) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/update-status`, {
        transactionId,
        status,
      });
      return { transactionId, status, ...res.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update status");
    }
  }
);

// Delete payment record
export const deletePayment = createAsyncThunk(
  "/payment/deletePayment",
  async (paymentId, thunkAPI) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/payment/${paymentId}`);
      return { paymentId, ...res.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete payment");
    }
  }
);

const paymentSlice = createSlice({
  name: "paymentSlice",
  initialState,
  reducers: {
    // Clear current payment
    clearCurrentPayment: (state) => {
      state.currentPayment = null;
    },
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all payments
      .addCase(getAllPayments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentList = action.payload;
      })
      .addCase(getAllPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create payment
      .addCase(createPaymentRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPaymentRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentList.push(action.payload);
        state.currentPayment = action.payload;
      })
      .addCase(createPaymentRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get payment by transaction ID
      .addCase(getPaymentByTransactionId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPaymentByTransactionId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPayment = action.payload;
      })
      .addCase(getPaymentByTransactionId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.currentPayment = null;
      })

      // Update payment status
      .addCase(updatePaymentStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        
        // Update the payment in the list if it exists
        const paymentIndex = state.paymentList.findIndex(
          payment => payment.transactionId === action.payload.transactionId
        );
        if (paymentIndex !== -1) {
          state.paymentList[paymentIndex].status = action.payload.status;
        }
        
        // Update current payment if it matches
        if (state.currentPayment && state.currentPayment.transactionId === action.payload.transactionId) {
          state.currentPayment.status = action.payload.status;
        }
      })
      .addCase(updatePaymentStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete payment
      .addCase(deletePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove the deleted payment from the list
        state.paymentList = state.paymentList.filter(
          (payment) => payment._id !== action.payload.paymentId
        );
        
        // Clear current payment if it was the deleted one
        if (state.currentPayment && state.currentPayment._id === action.payload.paymentId) {
          state.currentPayment = null;
        }
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentPayment, clearError } = paymentSlice.actions;
export default paymentSlice.reducer;