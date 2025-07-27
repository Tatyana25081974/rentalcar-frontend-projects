// cars/selectors.js

// Вибрати всі машини (масив)
export const selectCars = (state) => state.cars.cars || [];

// Вибрати поточну сторінку (номер)
export const selectCurrentPage = (state) => state.cars.page || 1;

// Вибрати загальну кількість сторінок (для пагінації)
export const selectTotalPages = (state) => state.cars.totalPages || 1;

// Вибрати загальну кількість авто (для інформації)
export const selectTotalCars = (state) => state.cars.totalCars || 0;

// Вибрати статус завантаження (loading, error тощо)
export const selectCarsLoading = (state) => state.cars.loading;

// Вибрати помилку, якщо є
export const selectCarsError = (state) => state.cars.error;

// Вибрати чи йде додаткове довантаження (append)
export const selectIsAppending = (state) => state.cars.append;

// Вибрати деталі конкретного авто (наприклад, для сторінки деталей)
export const selectCarDetails = (state) => state.cars.carDetails || null;

// Вибрати фільтри з Redux state
export const selectFilters = (state) =>
  state.cars.filters || {
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  };

// Вибрати список обраних авто (favorites), які зберігаються у state.cars.favorites
export const selectFavoriteCars = (state) => state.cars.favorites || [];
