import React from "react";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import CarsList from "../../components/CarsList/CarsList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import styles from "./CatalogPage.module.css";

const CatalogPage = ({
  cars,
  page,
  setPage,
  selectedBrand,
  setSelectedBrand,
  priceFilter,
  setPriceFilter,
  mileageFilter,
  setMileageFilter,
  onReset,
  brands,
}) => {
  return (
    <div className={styles.catalogWrapper}>
      <div className={styles.filters}>
        <FilterPanel
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          mileageFilter={mileageFilter}
          setMileageFilter={setMileageFilter}
          onReset={onReset}
          brands={brands}
        />
      </div>
      <div className={styles.list}>
        <CarsList cars={cars} />
      </div>

      <div className={styles.loadMoreWrapper}>
        <LoadMoreBtn page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default CatalogPage;
