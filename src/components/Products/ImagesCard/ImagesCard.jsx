import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./ImagesCard.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

function Images({ images }) {
  const [currentImage, setCurrentImage] = useState();

  const isTablet = useMediaQuery({ maxWidth: 1024 });

  useEffect(() => {
    if (!images.length) return;

    setCurrentImage(images[0]);
  }, [images]);

  return (
    <>
      {!isTablet && (
        <div className={styles.images}>
          <div
            className={styles.currentImg}
            style={{ backgroundImage: `url(${currentImage})` }}
          />
          <div className={styles["image-list"]}>
            {images.map((image, i) => (
              <div
                onClick={() => setCurrentImage(image)}
                key={i}
                className={`${styles.image} ${
                  currentImage === image ? styles.active : ""
                }`}
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
          </div>
        </div>
      )}

      {isTablet && (
        <div className={styles.images}>
          <Swiper
            spaceBetween={5}
            slidesPerView={2}
            className={styles.swiper}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 5,
              },

              550: {
                slidesPerView: 1.4,
                spaceBetween: 5,
              },

              768: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
            }}
          >
            {images.map((image, i) => (
              <SwiperSlide key={i}>
                <div
                  className={styles.currentImg}
                  style={{ backgroundImage: `url(${image})` }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}

export default Images;
