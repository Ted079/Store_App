import styles from "./Poster.module.scss";
import { posterData } from "../../utils/posterData";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import "swiper/scss/effect-coverflow";
import { Link, useNavigate } from "react-router-dom";

const Poster = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.wrapper}>
      <Swiper
        spaceBetween={45}
        effect={"coverflow"}
        slidesPerView={1}
        centeredSlides={true}
        breakpoints={{
          360: {
            slidesPerView: 1.01,
            spaceBetween: 22,
          },
          420: {
            slidesPerView: 1.2,
            spaceBetween: 20,
          },

          600: {
            slidesPerView: 1.5,
            spaceBetween: 25,
          },

          769: {
            slidesPerView: 1.2,
            spaceBetween: 35,
          },
          1024: {
            slidesPerView: 1.2,
            spaceBetween: 45,
          },
          1200: {
            slidesPerView: 1,
          },
        }}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 80,
          modifier: 0.8,
          slideShadows: true,
        }}
        speed={700}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, EffectCoverflow]}
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
              }}
              onClick={() => navigate("/products")}
            >
              {bgImage && <div className={styles.overlay}></div>}

              <div className={styles.title}>{title}</div>
              <div className={styles.product}>
                <div className={styles.text}>
                  <div className={styles.subtitle}>{subtitle}</div>
                  <h1 className={styles.head}>{head}</h1>
                  <Link to="/products">
                    <button className={styles.button}>{button}</button>
                  </Link>
                </div>
                {image && (
                  <div className={styles.image}>
                    <img src={image} alt="poster" />
                  </div>
                )}
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </section>
  );
};

export default Poster;
