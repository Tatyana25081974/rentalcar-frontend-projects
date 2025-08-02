import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

export const submitBooking = createAsyncThunk(
  "booking/submitBooking",
  async (bookingData, thunkAPI) => {
    if (
      !bookingData ||
      !bookingData.carId ||
      !bookingData.userName ||
      !bookingData.userEmail ||
      !bookingData.rentalStart ||
      !bookingData.rentalEnd
    ) {
      return thunkAPI.rejectWithValue("Некоректні дані для бронювання");
    }

    try {
      const { data } = await axiosInstance.post("/bookings", bookingData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Помилка при відправці бронювання"
      );
    }
  }
);
