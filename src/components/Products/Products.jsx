import styles from "./Products.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
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
  if (!list.length) {
    return <></>;
  }

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
              slidesPerView: 2,
              spaceBetween: 5,
              slidesPerGroup: 2,
            },
            420: {
              slidesPerView: 2,
              spaceBetween: 8,
              slidesPerGroup: 2,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 10,
              slidesPerGroup: 3,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
              slidesPerGroup: 3,
            },
            860: {
              slidesPerView: 4,
              spaceBetween: 10,
              slidesPerGroup: 4,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
              slidesPerGroup: 4,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 10,
              slidesPerGroup: 5,
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
        <div className={styles.list_categories}>
          {list.map((item) => (
            <div
              key={item.id}
              className={styles.product}
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
