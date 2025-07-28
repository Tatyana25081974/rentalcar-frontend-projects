import React from "react";
import { useDispatch, useSelector } from "react-redux";
// Імпортуємо екшен toggleFavorite, щоб додавати/видаляти авто з обраних
import { toggleFavorite } from "../../redux/cars/slice";
import { useNavigate } from "react-router-dom"; // Імпорт хуку для навігації
// Імпортуємо іконки серця з бібліотеки react-icons (заповнене і порожнє)
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// Імпортуємо стилі для картки
import styles from "./CarCard.module.css";

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Викликаємо хук useNavigate

  // Отримуємо з Redux масив улюблених авто (їхні id)
  const favorites = useSelector((state) => state.cars.favorites);

  // Перевіряємо, чи є це авто в обраному (якщо id є в favorites)
  const isFavorite = favorites.includes(car.id);

  // Обробник кліку на кнопку "обране" — переключаємо статус фаворита
  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(car.id));
  };

  // Функція для парсингу міста і країни з адреси
  const parseCityCountry = (address) => {
    const parts = address.split(",").map((part) => part.trim());
    const city = parts.length >= 2 ? parts[parts.length - 2] : "";
    const country = parts.length >= 1 ? parts[parts.length - 1] : "";
    return { city, country };
  };

  const { city, country } = parseCityCountry(car.address);

  // Обробник переходу на сторінку деталей авто
  const handleReadMoreClick = () => {
    navigate(`/catalog/${car.id}`); // Переходимо на /catalog/:id
  };

  return (
    <div className={styles.card}>
      <div className={styles.photoDetailsWrapper}>
        <div className={styles.photoWrapper}>
          <img
            src={car.img}
            alt={`${car.model} ${car.year}`}
            className={styles.photo}
          />
          <button
            className={styles.favoriteBtn}
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite ? "Видалити з улюблених" : "Додати в улюблені"
            }
          >
            {isFavorite ? (
              <AiFillHeart color="#3470FF" size={16} />
            ) : (
              <AiOutlineHeart color="rgba(128, 128, 128, 0.3)" size={16} />
            )}
          </button>
        </div>

        <div className={styles.details}>
          <div className={styles.modelYearPrice}>
            <div className={styles.brandWrapper}>
              <span className={styles.brand}>{car.brand}</span>{" "}
              <span className={styles.model}>{car.model}</span>
              <span className={styles.year}>, {car.year}</span>
            </div>
            <div className={styles.priceWrapper}>
              <span className={styles.price}>${car.rentalPrice}</span>
            </div>
          </div>
          <div className={styles.locationMileage}>
            <span>
              {city} | {country} | {car.rentalCompany}
            </span>
            <span>
              {car.type} | {car.mileage.toLocaleString("fr-FR")} km
            </span>
          </div>
        </div>
      </div>

      <div className={styles.readMoreWrapper}>
        <button onClick={handleReadMoreClick} className={styles.readMoreBtn}>
          Read more
        </button>
      </div>
    </div>
  );
};

export default CarCard;
