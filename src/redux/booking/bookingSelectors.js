export const selectBookingStatus = (state) => state.booking.status;
export const selectBookingError = (state) => state.booking.error;
export const selectBookingSuccessMessage = (state) =>
  state.booking.successMessage;
export const selectLastBookingData = (state) => state.booking.lastBookingData;
