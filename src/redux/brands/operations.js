import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBrands = createAsyncThunk(
  "brands/fetchBrands",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/brands");
      return data; // очікуємо масив брендів
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Помилка завантаження брендів"
      );
    }
  }
);
