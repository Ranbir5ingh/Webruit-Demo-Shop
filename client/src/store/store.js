import { configureStore } from "@reduxjs/toolkit";

import adminPaymentSlice from "./admin/payment-slice";



const store = configureStore({
  reducer: {

    adminPayment: adminPaymentSlice,


  },
});

export default store;