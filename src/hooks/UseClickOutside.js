import React, { useEffect } from "react";

export const UseClickOutside = (ref, callback) => {
  useEffect(() => {
    const clickOutSideHandler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", clickOutSideHandler);
    return () => document.removeEventListener("mousedown", clickOutSideHandler);
  }, [ref, callback]);
};

export default UseClickOutside;
