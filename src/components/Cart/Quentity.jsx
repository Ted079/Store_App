import React from "react";
import styles from "./Cart.module.scss";

function Quentity({quantity, changeQuantity, item}) {
  return (
    <div className={styles.quentity}>
      <div
        className={styles.minus}
        onClick={() => changeQuantity(item, Math.max(1, quantity - 1))}
      >
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`} />
        </svg>
      </div>
      <span>{quantity}</span>
      <div
        className={styles.plus}
        onClick={() => changeQuantity(item, Math.max(1, quantity + 1))}
      >
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`} />
        </svg>
      </div>
    </div>
  );
}

export default Quentity;
