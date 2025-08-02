import React from "react";

import BG from "../../images/computer.png";

import styles from "./Poster.module.scss";
import { posterData } from "../../utils/posterData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import "swiper/scss";
import "swiper/scss/pagination";

const Poster = () => {
  return (
    <section className={styles.wrapper}>
      <Swiper
        className={styles.posterWrapper}
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        speed={700}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
      >
        {posterData.map(
          ({
            title,
            id,
            subtitle,
            head,
            image,
            button,
            className,
            bgImage,
          }) => (
            <SwiperSlide
              key={id}
              className={`${styles.poster} ${styles[className]}`}
              style={{
                backgroundImage: bgImage ? `url(${bgImage})` : undefined,
                backgroundSize:"cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <div className={styles.title}>{title}</div>
              <div className={styles.product}>
                <div className={styles.text}>
                  <div className={styles.subtitle}>{subtitle}</div>
                  <h1 className={styles.head}>{head}</h1>
                  <button className={styles.button}>{button}</button>
                </div>
                {image && <div className={styles.image}>
                  <img src={image} alt="poster" />
                </div>}
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </section>
  );
};

export default Poster;
