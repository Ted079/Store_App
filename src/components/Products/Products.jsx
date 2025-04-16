import React from "react";
import styles from "./Products.module.scss";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/user/userSlice";

const Products = ({ title, style = {}, products = [], amount }) => {
  // const list = products.filter((_, i) => i < amount);
  const list = [];
  for (let i = 0; i < amount && i < products.length; i++) {
    list.push(products[i]);
  }

  return (
    <section className={styles.products} style={style}>
      {title && <h2>{title}</h2>}
      {/* <div className={styles.list}> */}
      <Swiper
        spaceBetween={10}
        slidesPerView={5}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        navigation={true}
        modules={[Navigation, Pagination]}
        className={styles.list}
      >
        {list.map(
          ({ title, price, id, category: { name: categoryName }, images }) => (
            <SwiperSlide className={styles.product} key={id}>
              <Link
                to={`/products/${id}`}
                key={id}
                /*className={styles.product}*/
              >
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url(${images[0]})` }}
                />

                <div className={styles.wrapper}>
                  <h3 className={styles.title}>{title}</h3>
                  <div className={styles.categoriesName}>{categoryName}</div>
                  <div className={styles.info}>
                    <div className={styles.prices}>
                      <div className={styles.price}>{price}$</div>
                      <div className={styles.oldPrice}>
                        {Math.floor(price * 0.7)}$
                      </div>
                    </div>

                    <div className={styles.purchases}>
                      {Math.floor(Math.random() * 20 + 1)} people purchased
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          )
        )}
      </Swiper>
      {/* </div> */}
    </section>
  );
};

export default Products;
