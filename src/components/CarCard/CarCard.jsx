import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/cars/slice";
import styles from "./CarCard.module.css";
import { FaHeart } from "react-icons/fa";

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const favoritesList = useSelector((state) => state.cars.favoritesList);
  const isFavorite = favoritesList.includes(car.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(car.id));
    } else {
      dispatch(addFavorite(car.id));
    }
  };

  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={car.image}
        alt={`${car.brand} ${car.model}`}
      />

      <FaHeart
        className={`${styles.heartIcon} ${isFavorite ? styles.active : ""}`}
        size={16}
        onClick={toggleFavorite}
        title={isFavorite ? "Видалити з обраних" : "Додати в обране"}
      />
      <div className={styles.info}>
        <div className={styles.header}>
          <h3>
            {car.brand} <span className={styles.model}>{car.model}</span>,{" "}
            {car.year}
          </h3>
          <p>${car.rentalPrice}</p>
        </div>
        <div className={styles.description}>
          <p>
            {car.city} | {car.country} | {car.category}
          </p>
          <p>
            {car.type} | {car.mileage.toLocaleString()} km
          </p>
        </div>
      </div>
      <button className={styles.readMore}>Read more</button>
    </div>
  );
};

export default CarCard;
