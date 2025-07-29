import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CatalogPage.module.css";

import FilterPanel from "../../components/FilterPanel/FilterPanel";
import CarsList from "../../components/CarsList/CarsList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import { resetFilters } from "../../redux/cars/slice";

const CatalogPage = ({ cars, page, setPage }) => {
  const dispatch = useDispatch();

  // ✅ Отримуємо totalPages і loading з Redux
  const totalPages = useSelector((state) => state.cars.totalPages);
  const loading = useSelector((state) => state.cars.loading);

  const handleReset = () => {
    dispatch(resetFilters());
    setPage(1);
  };

  return (
    <div className={styles.catalogWrapper}>
      <div className={styles.filters}>
        <FilterPanel onReset={handleReset} />
      </div>

      <div className={styles.list}>
        <CarsList cars={cars} />
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
