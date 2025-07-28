import React from "react";
import CarCard from "../CarCard/CarCard";
import styles from "./CarsList.module.css";

const CarsList = ({ cars }) => {
  if (!cars.length) {
    return <p>Автомобілі не знайдені.</p>;
  }

  return (
    <div className={styles.list}>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarsList;
