import { createSlice } from "@reduxjs/toolkit";
import { fetchBrands } from "./operations";

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const brandsSlice = createSlice({
  name: "brands",
  initialState: {
    items: [], // список брендів
    loading: false,
    error: null,
  },
  reducers: {
    // якщо потрібні додаткові редюсери — можна додати
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, handlePending)
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBrands.rejected, handleRejected);
  },
});

export default brandsSlice.reducer;
