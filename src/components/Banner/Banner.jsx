import React, { useState, useEffect } from "react";
import styles from "./Banner.module.scss";
import bannerImg from "../../images/banner.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
// import "swiper/scss";
import "swiper/scss/pagination";

const Banner = ({ imageList = [], amount = 0 }) => {
  // const [currentImage, setCurrentImage] = useState(0);

  const list = [];
  for (let i = 0; i < imageList.length && i < amount; i++) {
    list.push(imageList[i]);
  }

  console.log(list);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImage((prevImage) => (prevImage + 1) % list.length);
  //   }, 8000);

  //   return () => clearInterval(interval);
  // }, [list.length]);

  if (!list.length) return <div>ooops!</div>;

  return (
    <section className={styles.banner}>
      <div className={styles.left}>
        <p className={styles.content}>
          NEW YEAR
          <span>SALE</span>
        </p>
        <button className={styles.more}>See more</button>
      </div>

      <Swiper
        className={styles.right}
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        speed={700}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {list.map(({ images, id }) => (
          <Link to={`/products/${id}`} key={id}>
          <SwiperSlide
              key={id}
              className={styles.img}
              style={{ backgroundImage: `url(${images[0]})` }}
            >
              <p className={styles.discount}>
                save up to <span>50%</span> off
              </p>
            </SwiperSlide>
          </Link>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
