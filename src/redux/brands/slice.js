import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchBrands = createAsyncThunk(
  "brands/fetchBrands",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://car-rental-api.goit.global/brands"
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Помилка завантаження брендів"
      );
    }
  }
);

// Створюємо слайс для брендів
const brandsSlice = createSlice({
  name: "brands",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Коли запит починається — ставимо статус "loading" і чистимо помилку
      .addCase(fetchBrands.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // Коли запит успішний — записуємо отриманий список брендів, ставимо статус "succeeded"
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload; // action.payload — це масив брендів з API
      })
      // Якщо помилка — записуємо повідомлення і ставимо статус "failed"
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Експортуємо reducer, щоб підключити в store.js
export default brandsSlice.reducer;
