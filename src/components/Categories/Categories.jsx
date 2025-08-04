import React from "react";
import styles from "./Categories.module.scss";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

const Categories = ({ title, amount, categories = [] }) => {
  const list = [];
  for (let i = 0; i < amount && i < categories.length; i++) {
    list.push(categories[i]);
  }

  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <Swiper className={styles.list}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          420: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
      >
        
          {list.map(({ name, id, image }) => (
            <SwiperSlide className={styles.item}>
              <Link to={`/categories/${id}`} key={id}>
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url(${image})` }}
                />
                <h3>{name}</h3>
              </Link>
            </SwiperSlide>
          ))}
       
      </Swiper>
    </section>
  );
};

export default Categories;
