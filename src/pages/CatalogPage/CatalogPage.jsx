import React from "react";

import { useDispatch, useSelector } from "react-redux";
import styles from "./CatalogPage.module.css";

import FilterPanel from "../../components/FilterPanel/FilterPanel";
import CarsList from "../../components/CarsList/CarsList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

import { resetFilters } from "../../redux/cars/slice";
import { fetchCars } from "../../redux/cars/operations";
import EmptyState from "../../components/EmptyState/EmptyState";

const CatalogPage = ({ cars, page, setPage }) => {
  const dispatch = useDispatch();

  const totalPages = useSelector((state) => state.cars.totalPages);
  const loading = useSelector((state) => state.cars.loading);

  const handleReset = () => {
    dispatch(resetFilters());
    setPage(1);
    dispatch(
      fetchCars({
        page: 1,
        brand: "",
        rentalPrice: "",
        minMileage: "",
        maxMileage: "",
      })
    );
  };

  return (
    <div className={styles.catalogWrapper}>
      <div className={styles.filters}>
        <FilterPanel onReset={handleReset} setPage={setPage} />
      </div>

      <div className={styles.list}>
        {cars.length > 0 ? <CarsList cars={cars} /> : <EmptyState />}
      </div>

      <div className={styles.loadMoreWrapper}>
        <LoadMoreBtn
          page={page}
          setPage={setPage}
          isLoading={loading}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default CatalogPage;
