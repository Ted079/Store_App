import React, { useState, useEffect } from "react";
import styles from "./Banner.module.scss";
import bannerImg from "../../images/banner.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
// import "swiper/scss";
import "swiper/scss/pagination";

const Banner = ({ imageList = [], amount = 0 }) => {
  const list = [];
  for (let i = 0; i < imageList.length && i < amount; i++) {
    list.push(imageList[i]);
  }

  if (!list.length) return <div>ooops!</div>;

  return (
    <section className={styles.banner}>
      <div className={styles.left}>
        <p className={styles.content}>
         YOUR AD COULD BE HERE 
          {/* <span>HERE</span> */}
        </p>
        {/* <button className={styles.more}>See more</button> */}
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <path
              className="cls-1"
              style={{ fill: "#f19b5f" }}
              d="M18.6,23H5.4a3,3,0,0,1-2.98-3.37l.39-3.13.86-6.87A3.01,3.01,0,0,1,6.65,7h10.7a3.01,3.01,0,0,1,2.98,2.63l.86,6.87.39,3.13A3,3,0,0,1,18.6,23Z"
            ></path>
            <path
              class="cls-2"
              style={{ fill: "#ffce69" }}
              d="M21.19,16.5A2.976,2.976,0,0,1,18.6,18H5.4a2.976,2.976,0,0,1-2.59-1.5l.86-6.87A3.01,3.01,0,0,1,6.65,7h10.7a3.01,3.01,0,0,1,2.98,2.63Z"
            ></path>
            <path
              class="cls-3"
              style={{ fill: "#8b57c6" }}
              d="M5.4,24H18.6a4,4,0,0,0,3.968-4.5l-1.25-10A4.005,4.005,0,0,0,17.352,6H17V5A5,5,0,0,0,7,5V6H6.648A4.005,4.005,0,0,0,2.68,9.5l-1.25,10A4,4,0,0,0,5.4,24ZM9,5a3,3,0,0,1,6,0V6H9ZM3.414,19.752l1.25-10A2,2,0,0,1,6.648,8H7v2a1,1,0,0,0,2,0V8h6v2a1,1,0,0,0,2,0V8h.352a2,2,0,0,1,1.984,1.752l1.25,10A2,2,0,0,1,18.6,22H5.4a2,2,0,0,1-1.984-2.248Z"
            ></path>
          </svg>
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
        modules={[Autoplay, Pagination]}
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
