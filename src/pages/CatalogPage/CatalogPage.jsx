import React from "react";
import FilterPanel from "../../components/FilterPanel/FilterPanel";

const CatalogPage = ({
  selectedBrand,
  setSelectedBrand,
  priceFilter,
  setPriceFilter,
  mileageFilter,
  setMileageFilter,
  onReset,
}) => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Catalog Page - Фільтри</h1>
      <FilterPanel
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        mileageFilter={mileageFilter}
        setMileageFilter={setMileageFilter}
        onReset={onReset} // <-- передаємо сюди
      />
    </div>
  );
};

export default CatalogPage;
