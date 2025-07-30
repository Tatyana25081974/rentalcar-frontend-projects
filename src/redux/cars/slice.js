import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchCarDetails } from "./operations";
const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};
const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    page: 1,
    totalPages: 1,
    totalCars: 0,
    loading: false,
    error: null,

    filters: {
      brand: "",
      rentalPrice: "",
      minMileage: "",
      maxMileage: "",
    },

    append: false, // чи довантажуємо додаткові сторінки

    carDetails: null, // деталі конкретного авто
    carDetailsLoading: false,
    carDetailsError: null,

    favorites: [], // список обраних авто (id або об’єкти)
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;

      state.append = false;
    },
    resetFilters(state) {
      state.filters = {
        brand: "",
        rentalPrice: "",
        minMileage: "",
        maxMileage: "",
      };

      state.append = false;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    // addFavorite(state, action) {
    // if (!state.favorites.includes(action.payload)) {
    //  state.favorites.push(action.payload);
    // }
    //},
    // removeFavorite(state, action) {
    //  state.favorites = state.favorites.filter((id) => id !== action.payload);
    // },
    //clearFavorites(state) {
    // state.favorites = [];
    //},
    toggleFavorite(state, action) {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        // Видаляємо авто з обраних, якщо вже є
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        // Додаємо авто в обране, якщо немає
        state.favorites.push(id);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, handlePending)
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;

        const { cars, totalPages, totalCars, page, append } = action.payload;

        state.cars = append ? [...state.cars, ...cars] : cars;
        state.totalPages = totalPages;
        state.totalCars = totalCars;
        state.page = page;
        state.append = append;
      })
      .addCase(fetchCars.rejected, handleRejected)

      .addCase(fetchCarDetails.pending, (state) => {
        state.carDetailsLoading = true;
        state.carDetailsError = null;
        state.carDetails = null;
      })
      .addCase(fetchCarDetails.fulfilled, (state, action) => {
        state.carDetailsLoading = false;
        state.carDetails = action.payload;
      })
      .addCase(fetchCarDetails.rejected, (state, action) => {
        state.carDetailsLoading = false;
        state.carDetailsError = action.payload;
      });
  },
});

export const {
  setFilters,
  resetFilters,
  setPage,
  //addFavorite,
  //removeFavorite,
  //clearFavorites,
  toggleFavorite,
} = carsSlice.actions;

export default carsSlice.reducer;
