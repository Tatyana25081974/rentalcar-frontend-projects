import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Завантажити список авто з параметрами фільтрів і пагінації
export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (
    { brand, rentalPrice, minMileage, maxMileage, page = 1, limit = 10 },
    thunkAPI
  ) => {
    try {
      // Формуємо об’єкт params для query-параметрів GET-запиту
      const params = {
        ...(brand && { brand }),
        ...(rentalPrice && { rentalPrice }),
        ...(minMileage && { minMileage }),
        ...(maxMileage && { maxMileage }),
        page,
        limit,
      };

      const response = await axios.get(
        "https://car-rental-api.goit.global/cars",
        { params }
      );
      return response.data; // Очікуємо об'єкт із cars[], totalCars, totalPages, page
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Помилка завантаження авто"
      );
    }
  }
);
export const fetchCarDetails = createAsyncThunk(
  "cars/fetchCarDetails",
  async (carId, thunkAPI) => {
    if (!carId || typeof carId !== "string" || carId.trim() === "") {
      // Якщо id некоректний — відхиляємо запит з повідомленням
      return thunkAPI.rejectWithValue("Невірний ідентифікатор автомобіля");
    }

    try {
      const response = await axios.get(
        `https://car-rental-api.goit.global/cars/${carId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Помилка завантаження деталей авто"
      );
    }
  }
);

export const submitBooking = createAsyncThunk(
  "booking/submitBooking",
  async (bookingData, thunkAPI) => {
    // Базова валідація перед запитом
    if (
      !bookingData ||
      typeof bookingData !== "object" ||
      !bookingData.carId ||
      typeof bookingData.carId !== "string" ||
      !bookingData.userName ||
      typeof bookingData.userName !== "string" ||
      !bookingData.userEmail ||
      typeof bookingData.userEmail !== "string" ||
      !bookingData.rentalStart ||
      !bookingData.rentalEnd
    ) {
      return thunkAPI.rejectWithValue("Некоректні дані для бронювання");
    }

    // Можна додати додаткову валідацію email, дат, якщо потрібно

    try {
      const response = await axios.post(
        "https://car-rental-api.goit.global/bookings",
        bookingData
      );
      return response.data; // Відповідь сервера
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Помилка при відправці бронювання"
      );
    }
  }
);
