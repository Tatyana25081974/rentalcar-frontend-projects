import React, { useState, useEffect, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import SyncLoader from "react-spinners/SyncLoader";

import Layout from "./components/Layout/Layout.jsx";
import CatalogPage from "./pages/CatalogPage/CatalogPage.jsx";
import { Toaster } from "react-hot-toast";

import {
  selectCars,
  selectCarsLoading,
  selectCarsError,
  selectFilters,
} from "./redux/cars/selectors.js";

import { fetchCars } from "./redux/cars/operations";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const CarDetailsPage = lazy(() =>
  Promise.resolve({
    default: () => <div>CarDetailsPage (потрібно реалізувати)</div>,
  })
);
const NotFoundPage = lazy(() =>
  Promise.resolve({
    default: () => <div>NotFoundPage (потрібно реалізувати)</div>,
  })
);

Modal.setAppElement("#root");

export default function App() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectCarsLoading);
  const isError = useSelector(selectCarsError);
  const filters = useSelector(selectFilters);

  // 🔁 Отримання машин при зміні page або filters
  useEffect(() => {
    dispatch(fetchCars({ page, ...filters }));
  }, [dispatch, page, filters]);

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

  if (isLoading) {
    return (
      <div style={loaderOverlayStyle}>
        <SyncLoader color="#ffffff" />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ color: "red", textAlign: "center" }}>
        Network error occurred
      </div>
    );
  }

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/catalog"
            element={<CatalogPage cars={cars} page={page} setPage={setPage} />}
          />
          <Route path="/catalog/:id" element={<CarDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>

      <Toaster position="top-center" />
    </>
  );
}
