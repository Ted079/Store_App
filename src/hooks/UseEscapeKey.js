import { useEffect } from "react";

export const UseEscapeKey = (callback) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        callback();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [callback]);
};
