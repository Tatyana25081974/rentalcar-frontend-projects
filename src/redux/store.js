import { configureStore } from "@reduxjs/toolkit";

// Імпортуємо необхідні утиліти для збереження стану в localStorage
import {
  persistStore, // Функція, що створює "персистор" для керування збереженням стану
  persistReducer, // Функція, що обгортає reducer, щоб додати підтримку збереження
  FLUSH, // Спеціальні дії redux-persist, які потрібно ігнорувати в middleware
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Імпортуємо сховище localStorage браузера (де зберігатимуться дані)
import storage from "redux-persist/lib/storage";

// Імпортуємо редюсери з наших slice-ів
import carsReducer from "./cars/slice";
import brandsReducer from "./brands/slice";

// Налаштовуємо конфіг для збереження тільки списку обраних авто з carsSlice
const favoritesPersistConfig = {
  key: "favorites",
  storage,
  whitelist: ["favoritesList"],
};

// Обгортаємо carsReducer, щоб підтримувати збереження обраних авто
const persistedCarsReducer = persistReducer(
  favoritesPersistConfig,
  carsReducer
);
// Створюємо store, який тримає весь глобальний стан програми
export const store = configureStore({
  reducer: {
    cars: persistedCarsReducer,
    brands: brandsReducer,
  },
  // Налаштування middleware — потрібні для коректної роботи redux-persist з Redux Toolkit
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ігноруємо спеціальні дії redux-persist, щоб не було помилок серіалізації
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Створюємо персистор — він керуватиме збереженням і відновленням стану
export const persistor = persistStore(store);
