// Вибираємо весь об'єкт брендів (slice state)
export const selectBrandsState = (state) => state.brands;

// Вибираємо список брендів (масив рядків)
export const selectBrandsList = (state) => state.brands.list;

// Вибираємо статус завантаження (idle, loading, succeeded, failed)
export const selectBrandsStatus = (state) => state.brands.status;

// Вибираємо помилку, якщо вона є
export const selectBrandsError = (state) => state.brands.error;
