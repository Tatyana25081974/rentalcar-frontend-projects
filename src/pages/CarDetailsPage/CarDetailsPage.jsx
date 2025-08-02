import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCars } from "../../redux/cars/selectors";
import styles from "./CarDetailsPage.module.css";
import { useNavigate } from "react-router-dom";

import { FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import {
  PiCurrencyDollar,
  PiCalendarBlankFill,
  PiEngineFill,
} from "react-icons/pi";
import { LuCar, LuFuel } from "react-icons/lu";
import CarBookingForm from "../../components/CarBookingForm/CarBookingForm";

const CarDetailsPage = () => {
  const { carId } = useParams();
  const cars = useSelector(selectCars);
  const car = cars.find((car) => car.id === carId);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!car) return <p>Loading car details...</p>;

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.CarDetailsWrapper}>
        <div className={styles.CarContainer}>
          <div className={styles.CarImgContainer}>
            <img
              className={styles.CarImg}
              src={car.img}
              alt={`${car.brand} ${car.model}`}
            />
            <div className={styles.CarForm}>
              <CarBookingForm />
            </div>
          </div>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.detailsCarContainer}>
            <div className={styles.titleGroup}>
              <h1 className={styles.title}>
                {car.brand} {car.model}, {car.yea}
              </h1>
              <p className={styles.carId}>id: {car.id}</p>
            </div>

            <p className={styles.address}>
              <FaMapMarkerAlt /> {car.address}
            </p>

            <p className={styles.price}>
              <PiCurrencyDollar /> {car.rentalPrice}
            </p>

            <p className={styles.description}>{car.description}</p>
          </div>

          <div className={styles.CarInfo}>
            <div className={styles.RentalConditions}>
              <h3>Rental Conditions:</h3>
              <ul className={styles.conditionsList}>
                <li>
                  <FaCheckCircle className={styles.icon} />{" "}
                  {car.rentalConditions[0]}
                </li>
                <li>
                  <FaCheckCircle className={styles.icon} />
                  {car.rentalConditions[1]}
                </li>
                <li>
                  <FaCheckCircle className={styles.icon} />
                  {car.rentalConditions[2]}
                </li>
              </ul>
            </div>

            <div className={styles.CarSpecifications}>
              <h3>Car Specifications:</h3>
              <ul className={styles.specList}>
                <li>
                  <PiCalendarBlankFill /> Year: {car.yea}
                </li>
                <li>
                  <LuCar /> Type: {car.type}
                </li>
                <li>
                  <LuFuel /> Fuel Consumption: {car.fuelConsumption}
                </li>
                <li>
                  <PiEngineFill /> Engine Size: {car.engineSize}
                </li>
                <li>
                  <RxDashboard /> Mileage: {car.mileage.toLocaleString()} km
                </li>
              </ul>
            </div>

            <div className={styles.AccessoriesAndFunctionalities}>
              <h3>Accessories and functionalities:</h3>

              <ul className={styles.accessoriesList}>
                {[...car.accessories, ...car.functionalities].map(
                  (item, index) => (
                    <li key={index}>
                      <FaCheckCircle className={styles.icon} />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleBackClick} className={styles.backButton}>
        ← Go Back
      </button>
    </div>
  );
};

export default CarDetailsPage;
