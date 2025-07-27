import { createSlice } from "@reduxjs/toolkit";
import { submitBooking } from "./bookingOperations";

const initialState = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  successMessage: null,
  lastBookingData: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBookingState(state) {
      state.status = "idle";
      state.error = null;
      state.successMessage = null;
      state.lastBookingData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitBooking.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(submitBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.successMessage = "Бронювання пройшло успішно!";
        state.lastBookingData = action.payload;
      })
      .addCase(submitBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Помилка при бронюванні";
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
