import React, { useEffect, useState } from "react";
import styles from "./Sizes.module.scss";

let CLOTHES = ["XS", "S", "M", "L", "XL", "XXL"];
let SHOES = [39, 40, 41, 42, 43, 44, 45];
let ANOTHER = [4.5, 5, 5.5];

function Sizes({ category, setCurrentSize, currentSize }) {
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    if (category?.name === "Clothes" || category?.slug === "clothes") {
      setSizes(CLOTHES);
    } else if (category?.name === "Shoes" || category?.slug === "shoes") {
      setSizes(SHOES);
    } else {
      setSizes(ANOTHER);
    }
  }, [category]);

  return (
    <div>
      {Array.isArray(sizes) && (
        <div className={styles.sizes}>
          <span>Sizes: </span>
          {sizes.map((size) => (
            <div
              onClick={() => {
                setCurrentSize(size);
              }}
              className={`${styles.size} ${
                currentSize === size ? styles.active : ""
              }`}
              key={size}
            >
              {" "}
              {size}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Sizes;
