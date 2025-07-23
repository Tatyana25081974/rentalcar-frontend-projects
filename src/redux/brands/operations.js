import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Операція для завантаження списку брендів
export const fetchBrands = createAsyncThunk(
  "brands/fetchBrands", // тип дії
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://car-rental-api.goit.global/brands"
      );
      return response.data; // масив брендів
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Помилка завантаження брендів"
      );
    }
  }
);
