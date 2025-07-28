import React from "react";
import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ page, setPage, isLoading, totalPages }) {
  const handleClick = () => {
    if (!isLoading) {
      setPage(page + 1);
    }
  };

  if (page >= totalPages) return null;

  return (
    <button
      type="button"
      className={css.button}
      onClick={handleClick}
      disabled={isLoading}
      aria-label="Завантажити більше"
    >
      {isLoading ? "Loading..." : "Load more"}
    </button>
  );
}
