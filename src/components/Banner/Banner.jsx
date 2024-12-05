import React, { useState, useEffect } from "react";
import styles from "./Banner.module.scss";
import bannerImg from "../../images/banner.png";

const Banner = ({ imageList = [], amount }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const list = [];
  for (let i = 0; i < imageList.length && i < amount; i++) {
    list.push(imageList[i]);
  }

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % list.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [list.length]);

  if(!list.length) return <div>ooops!</div>;

  return (
    <section className={styles.banner}>
      <div className={styles.left}>
        <p className={styles.content}>
          NEW YEAR
          <span>SALE</span>
        </p>
        <button className={styles.more}>See more</button>
      </div>

        <div
          className={styles.right}
          style={{ backgroundImage: `url(${list[currentImage].images[0]})` }}
        >
          <p className={styles.discount}>
            save up to <span>50%</span> off
          </p>
        </div>
    </section>
  );
};

export default Banner;
