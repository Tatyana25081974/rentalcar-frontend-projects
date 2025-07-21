import React, { useEffect, useState, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import SyncLoader from "react-spinners/SyncLoader";
import { Toaster } from "react-hot-toast";

import Layout from "../components/Layout/Layout.jsx";

import { fetchCars, fetchBrands } from "../redux/cars/operations.js"; // redux операції
import { selectCarsLoading, selectCarsError } from "../redux/cars/selectors.js"; // селектори redux

import NetworkError from "../components/NetworkError/NetworkError.jsx";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop.jsx";

// Ліниве завантаження сторінок для оптимізації
const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
const CatalogPage = lazy(() => import("../pages/CatalogPage/CatalogPage.jsx"));
const CarDetailsPage = lazy(() =>
  import("../pages/CarDetailsPage/CarDetailsPage.jsx")
);
const NotFoundPage = lazy(() => import("../pages/NotFound/NotFound.jsx"));

// Для доступності модалок
Modal.setAppElement("#root");

const App = () => {
  const dispatch = useDispatch();

  // Локальний стан для пагінації та фільтрів
  const [page, setPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [mileageFilter, setMileageFilter] = useState({ from: "", to: "" });

  // Скидання сторінки при зміні фільтрів (щоб почати з першої сторінки)
  useEffect(() => {
    setPage(1);
  }, [selectedBrand, priceFilter, mileageFilter]);

  // Селектори для завантаження та помилок
  const isLoading = useSelector(selectCarsLoading);
  const isError = useSelector(selectCarsError);

  // Запит на бренди та авто з урахуванням фільтрів і пагінації
  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(
      fetchCars({
        page,
        brand: selectedBrand,
        price: priceFilter,
        mileageFrom: mileageFilter.from,
        mileageTo: mileageFilter.to,
      })
    );
  }, [dispatch, page, selectedBrand, priceFilter, mileageFilter]);

  // Функція для скидання усіх фільтрів
  const resetFilters = () => {
    setSelectedBrand("");
    setPriceFilter("");
    setMileageFilter({ from: "", to: "" });
    setPage(1);
  };

  // Стиль для лоадера поверх всього екрану
  const loaderOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#00000080",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  };

  // Показуємо лоадер, поки дані завантажуються
  if (isLoading) {
    return (
      <div style={loaderOverlayStyle}>
        <SyncLoader color="#ffffff" />
      </div>
    );
  }

  // Показуємо сторінку помилки, якщо щось пішло не так
  if (isError) {
    return <NetworkError />;
  }

  return (
    <>
      {/* Скролл сторінки вгору при переході */}
      <ScrollToTop />

      {/* Загальна обгортка сайту (header, footer) */}
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Сторінка каталогу з усіма фільтрами та пагінацією */}
          <Route
            path="/catalog"
            element={
              <CatalogPage
                page={page}
                setPage={setPage}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                priceFilter={priceFilter}
                setPriceFilter={setPriceFilter}
                mileageFilter={mileageFilter}
                setMileageFilter={setMileageFilter}
                onReset={resetFilters}
              />
            }
          />

          {/* Сторінка деталей одного авто з формою оренди */}
          <Route path="/catalog/:id" element={<CarDetailsPage />} />

          {/* Сторінка 404 при невідповідному маршруті */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>

      {/* Показ повідомлень типу toast */}
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
    </>
  );
};

export default App;
