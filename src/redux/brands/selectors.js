// Вибрати всі бренди (масив)
export const selectBrandsList = (state) => state.brands.items || [];

// Статус завантаження брендів
export const selectBrandsLoading = (state) => state.brands.loading;

// Помилка завантаження брендів
export const selectBrandsError = (state) => state.brands.error;
