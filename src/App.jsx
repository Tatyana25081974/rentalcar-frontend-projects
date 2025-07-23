import React, { useEffect, useState, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import SyncLoader from "react-spinners/SyncLoader";

// Імпорти операцій та селекторів redux
import { fetchCars } from "./redux/cars/operations.js";
import { selectCarsLoading, selectCarsError } from "./redux/cars/selectors.js";
import { fetchBrands } from "./redux/brands/operations.js";

// Заглушки на компоненти, які пізніше потрібно буде створити
import Layout from "./components/Layout/Layout.jsx";

const NetworkError = () => (
  <div>Network Error Component (потрібно реалізувати)</div>
);
const ScrollToTop = () => null; // Заглушка, можна прибрати поки

// Ліниве завантаження сторінок (зараз коментар, поки їх нема)
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const CatalogPage = lazy(() =>
  Promise.resolve({
    default: () => <div>CatalogPage (потрібно реалізувати)</div>,
  })
);
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

  // Локальний стан для пагінації та фільтрів
  const [page, setPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [mileageFilter, setMileageFilter] = useState({ from: "", to: "" });

  useEffect(() => {
    setPage(1);
  }, [selectedBrand, priceFilter, mileageFilter]);

  // Селектори для завантаження та помилок
  const isLoading = useSelector(selectCarsLoading);
  const isError = useSelector(selectCarsError);

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

  const resetFilters = () => {
    setSelectedBrand("");
    setPriceFilter("");
    setMileageFilter({ from: "", to: "" });
    setPage(1);
  };

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
    return <NetworkError />;
  }

  return (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
          <Route path="/catalog/:id" element={<CarDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
}
