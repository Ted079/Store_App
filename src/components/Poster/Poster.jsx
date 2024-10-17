import React from "react";

import BG from "../../images/computer.png";

import styles from "./Poster.module.scss";

const Poster = () => {
  return (
    <section className={styles.poster}>
      <div className={styles.title}>BIG SALE 20%</div>
      <div className={styles.product}>
        <div className={styles.text}>
          <div className={styles.subtitle}>the bestseller of 2024</div>
          <h1 className={styles.head}>LENNON r2d2 with NVIDIA 5090 TI</h1>
          <button className={styles.button}>Shop Now</button>
        </div>
        <div className={styles.image}>
            <img src={BG} alt="poster" />
        </div>
      </div>
    </section>
  );
};

export default Poster;
