import React from "react";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ page, setPage, isLoading, totalPages }) {
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (
      typeof totalPages === "number" &&
      page >= totalPages &&
      !hasShownToast.current
    ) {
      toast("Це остання сторінка");
      hasShownToast.current = true;
    }
  }, [page, totalPages]);

  const handleClick = () => {
    if (!isLoading) {
      setPage(page + 1);
    }
  };
  console.log("Page:", page, "Total pages:", totalPages);
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
