import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ─────────────────────────────────────────────────────────────────────────────
// Dummy data layer — this demo shop has NO backend.
//
// Payment records live in the browser's localStorage, so the whole flow
// (checkout dialog → record → admin view) works exactly like the old
// API-backed version, minus the API. The thunk names, payload shapes and
// slice state are unchanged from the server version, so no component had
// to change. Seeded with sample records so the admin panel is not empty;
// anything a visitor "buys" is added on top, in their browser only.
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = "resumekit_demo_payments";

function seedPayments() {
  const now = Date.now();
  const iso = (msAgo) => new Date(now - msAgo).toISOString();
  return [
    {
      _id: "demo_seed_1",
      email: "aarav.sharma@example.com",
      transactionId: "UTR20261021093412",
      courseTitle: "Resume-Kit Pro",
      courseId: "demo123",
      amount: 499,
      status: "completed",
      createdAt: iso(2 * 24 * 3600 * 1000),
      timestamp: iso(2 * 24 * 3600 * 1000),
    },
    {
      _id: "demo_seed_2",
      email: "priya.nair@example.com",
      transactionId: "UTR20261022151247",
      courseTitle: "Resume-Kit Pro",
      courseId: "demo123",
      amount: 499,
      status: "pending",
      createdAt: iso(26 * 3600 * 1000),
      timestamp: iso(26 * 3600 * 1000),
    },
    {
      _id: "demo_seed_3",
      email: "rahul.verma@example.com",
      transactionId: "UTR20261023084503",
      courseTitle: "Resume-Kit Pro",
      courseId: "demo123",
      amount: 499,
      status: "completed",
      createdAt: iso(5 * 3600 * 1000),
      timestamp: iso(5 * 3600 * 1000),
    },
  ];
}

function loadPayments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* corrupted storage falls through to a fresh seed */
  }
  const seeded = seedPayments();
  savePayments(seeded);
  return seeded;
}

function savePayments(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* storage full/blocked — the demo keeps working in-memory */
  }
}

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

const initialState = {
  paymentList: [],
  currentPayment: null,
  isLoading: false,
  error: null,
};

// Fetch all payments (admin use) — reads the local dummy store.
export const getAllPayments = createAsyncThunk(
  "/payment/getAllPayments",
  async () => {
    await delay(200);
    return loadPayments();
  }
);

// Create a payment record — appends to the local dummy store.
export const createPaymentRecord = createAsyncThunk(
  "/payment/createPayment",
  async (paymentData) => {
    await delay();
    const record = {
      _id: `demo_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
      status: "pending",
      createdAt: new Date().toISOString(),
      ...paymentData,
    };
    const list = loadPayments();
    list.unshift(record);
    savePayments(list);
    return record;
  }
);

// Get payment by transaction ID
export const getPaymentByTransactionId = createAsyncThunk(
  "/payment/getPaymentByTransactionId",
  async (transactionId, thunkAPI) => {
    await delay(200);
    const found = loadPayments().find((p) => p.transactionId === transactionId);
    if (!found) return thunkAPI.rejectWithValue("Payment not found");
    return found;
  }
);

// Update payment status
export const updatePaymentStatus = createAsyncThunk(
  "/payment/updatePaymentStatus",
  async ({ transactionId, status }, thunkAPI) => {
    await delay(250);
    const list = loadPayments();
    const target = list.find((p) => p.transactionId === transactionId);
    if (!target) return thunkAPI.rejectWithValue("Payment not found");
    target.status = status;
    savePayments(list);
    return { transactionId, status, message: "Payment status updated successfully" };
  }
);

// Delete payment record
export const deletePayment = createAsyncThunk(
  "/payment/deletePayment",
  async (paymentId) => {
    await delay(250);
    savePayments(loadPayments().filter((p) => p._id !== paymentId));
    return { paymentId, message: "Payment deleted successfully" };
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
          (payment) => payment.transactionId === action.payload.transactionId
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
