import React from "react";
import styles from "./Prices.module.scss";

function Prices({ price, className }) {
  return (
    <div className={styles.prices}>
      <div className={`${styles.price} ${className || ""}`}>
        {Math.floor(price * 0.7)}$
      </div>
      <div className={styles.oldPrice}>{price}$</div>
    </div>
  );
}

export default Prices;
