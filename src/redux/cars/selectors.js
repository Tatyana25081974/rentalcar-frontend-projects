// Вибираємо весь слайс cars
export const selectCarsState = (state) => state.cars;

// Вибираємо масив авто
export const selectCarsItems = (state) => state.cars.items;

// Вибираємо статус завантаження (idle, loading, succeeded, failed)
export const selectCarsStatus = (state) => state.cars.status;

// Вибираємо повідомлення про помилку
export const selectCarsError = (state) => state.cars.error;

// Вибираємо поточну сторінку пагінації
export const selectCarsPage = (state) => state.cars.page;

// Вибираємо загальну кількість сторінок
export const selectCarsTotalPages = (state) => state.cars.totalPages;

// Вибираємо загальну кількість авто
export const selectCarsTotalCars = (state) => state.cars.totalCars;

// Вибираємо фільтри
export const selectCarsFilters = (state) => state.cars.filters;

// Вибираємо список обраних авто
export const selectCarsFavorites = (state) => state.cars.favoritesList;

export const selectCarsLoading = (state) => state.cars.status === "loading";
