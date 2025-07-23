import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронний thunk для завантаження авто з урахуванням фільтрів і пагінації
export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (
    { brand, rentalPrice, minMileage, maxMileage, page = 1, limit = 10 },
    thunkAPI
  ) => {
    try {
      const params = {
        brand,
        rentalPrice,
        minMileage,
        maxMileage,
        page,
        limit,
      };
      const response = await axios.get(
        "https://car-rental-api.goit.global/cars",
        { params }
      );
      return response.data; // Очікуємо об’єкт із cars[], totalCars, totalPages, page
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Помилка завантаження авто"
      );
    }
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [], // Масив авто, які відображаються на сторінці
    status: "idle", // Статус завантаження: idle, loading, succeeded, failed
    error: null, // Повідомлення про помилку
    filters: {
      brand: "",
      rentalPrice: "",
      minMileage: "",
      maxMileage: "",
    },
    page: 1, // Поточна сторінка пагінації
    limit: 10, // Кількість авто на сторінці
    totalPages: 1, // Загальна кількість сторінок (з бекенду)
    totalCars: 0, // Загальна кількість авто (з бекенду)
    favoritesList: JSON.parse(localStorage.getItem("favoritesList")) || [], // Обране авто
  },
  reducers: {
    // Оновлення фільтрів — скидає сторінку і очищує список для нових даних
    setFilters(state, action) {
      state.filters = action.payload;
      state.page = 1;
      state.items = [];
    },
    // Оновлення поточної сторінки (для пагінації)
    setPage(state, action) {
      state.page = action.payload;
    },
    // Додавання авто в обране
    addFavorite(state, action) {
      if (!state.favoritesList.includes(action.payload)) {
        state.favoritesList.push(action.payload);
        localStorage.setItem(
          "favoritesList",
          JSON.stringify(state.favoritesList)
        );
      }
    },
    // Видалення авто з обраного
    removeFavorite(state, action) {
      state.favoritesList = state.favoritesList.filter(
        (id) => id !== action.payload
      );
      localStorage.setItem(
        "favoritesList",
        JSON.stringify(state.favoritesList)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Якщо це перша сторінка, замінюємо список, інакше додаємо для "Load More"
        if (state.page === 1) {
          state.items = action.payload.cars;
        } else {
          state.items = [...state.items, ...action.payload.cars];
        }
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.totalCars = action.payload.totalCars;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Помилка при завантаженні авто";
      });
  },
});

export const { setFilters, setPage, addFavorite, removeFavorite } =
  carsSlice.actions;

export default carsSlice.reducer;
