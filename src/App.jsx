import React, { useState, useEffect, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { Toaster } from "react-hot-toast";

import Layout from "./components/Layout/Layout.jsx";
import FullPageLoader from "./components/FullPageLoader/FullPageLoader.jsx";
import NetworkError from "./components/NetworkError/NetworkError";

import {
  selectCars,
  selectCarsLoading,
  selectCarsError,
  selectFilters,
} from "./redux/cars/selectors";
import { fetchCars } from "./redux/cars/operations";

//  Ліниве завантаження сторінок
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage.jsx"));
const CarDetailsPage = lazy(() =>
  import("./pages/CarDetailsPage/CarDetailsPage.jsx")
);

const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);

// Прив’язка для модалки
Modal.setAppElement("#root");

export default function App() {
  const dispatch = useDispatch();

  // Сторінка (локальний стан)
  const [page, setPage] = useState(1);

  // Дані з Redux
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectCarsLoading);
  const isError = useSelector(selectCarsError);
  const filters = useSelector(selectFilters);

  // Запуск запиту при зміні page або filters
  useEffect(() => {
    dispatch(fetchCars({ page, ...filters }));
  }, [dispatch, page, filters]);

  return (
    <>
      <Layout>
        {/* Повноекранний loader */}
        {isLoading && !isError && <FullPageLoader />}

        {/*  Помилка мережі */}
        {isError && <NetworkError />}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/catalog"
            element={<CatalogPage cars={cars} page={page} setPage={setPage} />}
          />
          <Route path="/catalog/:carId" element={<CarDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>

      {/*  Тостер повідомлень */}
      <Toaster
        position="top-center"
        containerStyle={{
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
