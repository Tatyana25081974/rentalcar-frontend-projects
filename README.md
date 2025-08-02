# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 🚗 RentalCar — Онлайн Сервіс Оренди Авто

**RentalCar** — це сучасний веб-застосунок, що дозволяє користувачам переглядати доступні автомобілі для оренди, фільтрувати їх за різними параметрами, переглядати деталі кожного авто, та здійснювати бронювання. Інтерфейс адаптований для всіх пристроїв — від мобільного до десктопу.

---

## 🔍 Основний функціонал

- ✅ Список автомобілів з кнопкою **Load more** та **пагінацією**
- 🔎 Фільтрація за:
  - брендом
  - ціною оренди
  - пробігом
- 📋 Детальна сторінка кожного авто:
  - велике фото
  - технічні характеристики
  - форма бронювання (Formik + Yup)
- 📱 Адаптивна верстка (мобілка, планшет, десктоп)
- ❌ Сторінка `404 Not Found` для неіснуючих маршрутів
- 🔁 Запити на бекенд з урахуванням фільтрів і сторінки

---

## 🔧 Технології

- ⚛️ React 19
- 🛠️ Redux Toolkit
- 🌐 React Router DOM 7
- ✍️ Formik + Yup
- 🔥 Axios
- 🎨 CSS Modules
- 💬 React Hot Toast
- 🎯 React Select
- 🧹 modern-normalize

---

## 📦 Інсталяція

```bash
git clone https://github.com/Tatyana25081974/rentalcar-frontend-projects.git
cd rentalcar-frontend-projects
npm install
```

Посилання
🌐 Live demo: rentalcar-frontend-projects-y9sl.vercel.app

📘 Swagger документація API: car-rental-api.goit.global/api-docs

💻 GitHub Frontend: github.com/Tatyana25081974/rentalcar-frontend-projects

Автор
Тетяна Корабельнікова
GitHub: @Tatyana25081974

Проєкт реалізовано в навчальних цілях. Дані для авто надходять з відкритого API https://car-rental-api.goit.global/api.
