import styles from "./Products.module.scss";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import ProductsCard from "./ProductsCard";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Products = ({
  title,
  style = {},
  products = [],
  amount,
  isSlider = true,
}) => {
  const list = products.filter((_, i) => i < amount);

  return (
    <section className={styles.products} style={style}>
      {title && <h2>{title}</h2>}

      {isSlider ? (
        <Swiper
          spaceBetween={10}
          slidesPerView={5}
          slidesPerGroup={5}
          speed={900}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            420: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
          navigation={true}
          modules={[Navigation]}
          className={styles.list}
        >
          {list.map((item) => (
            <SwiperSlide className={styles.product} key={item.id}>
              <ProductsCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={styles.list} style={{ marginLeft: "7px" }}>
          {list.map((item) => (
            <div
              key={item.id}
              className={styles.product}
              style={{ margin: "5px", width: "238px" }}
            >
              <ProductsCard {...item} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
