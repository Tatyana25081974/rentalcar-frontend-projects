import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

// GET @ /cars - завантажити список машин з фільтрами та пагінацією
export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (params = {}, thunkAPI) => {
    try {
      const {
        page = 1,
        brand = "",
        rentalPrice = "",
        minMileage = "",
        maxMileage = "",
      } = params;

      const queryParams = new URLSearchParams();
      queryParams.append("page", page);
      queryParams.append("limit", 10);

      if (brand) queryParams.append("brand", brand);
      if (rentalPrice) queryParams.append("rentalPrice", rentalPrice);
      if (minMileage !== "" && minMileage !== null)
        queryParams.append("minMileage", minMileage);
      if (maxMileage !== "" && maxMileage !== null)
        queryParams.append("maxMileage", maxMileage);

      const url = `/cars?${queryParams.toString()}`;

      const { data } = await axiosInstance.get(url);

      return {
        ...data, // data має містити: cars[], totalPages, totalCars, page
        append: page > 1, // додатковий прапорець для пагінації
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Помилка завантаження авто"
      );
    }
  }
);

// 2. Завантажити деталі авто за id
export const fetchCarDetails = createAsyncThunk(
  "cars/fetchCarDetails",
  async (carId, thunkAPI) => {
    if (!carId || typeof carId !== "string" || carId.trim() === "") {
      return thunkAPI.rejectWithValue("Невірний ідентифікатор авто");
    }
    try {
      const { data } = await axiosInstance.get(`/cars/${carId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Помилка завантаження деталей авто"
      );
    }
  }
);
