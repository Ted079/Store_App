import React, { useEffect, useState } from "react";

import styles from "./Product.module.scss";
import { ROUTES } from "../../utils/route";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/user/userSlice";

const SIZES = [4.5, 5, 5.5];

const Product = (item) => {
  const {images, description, title, price } = item;
  const dispatch = useDispatch();
  const [currentImage, setCurrentImage] = useState();
  const [currentSize, setCurrentSize] = useState();

  useEffect(() => {
    if (!images.length) return;

    setCurrentImage(images[0]);
  }, [images]);

  const addToCart = () => {
    dispatch(addItemToCart(item))
  };

  return (
    <section className={styles.product}>
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
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>{price}$</div>
        <div className={styles.color}>
          <span>Color: </span> Blanc
        </div>
        <div className={styles.sizes}>
          <span>Sizes: </span>
          {SIZES.map((size) => (
            <div
              onClick={() => {
                setCurrentSize(size);
              }}
              className={`${styles.size} ${
                currentSize === size ? styles.active : ""
              }`}
              key={size}
            >
              {" "}
              {size}
            </div>
          ))}
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <button onClick={addToCart} className={styles.basket} disabled={!currentSize}>
            Add to cart
          </button>
          <button className={styles.favorite}>Add to favorites</button>
        </div>
        <div className={styles.footer}>
          <div className={styles.purchase}>
            {Math.floor(Math.random() * 20 + 1)} people purchase
          </div>
          <Link className={styles.home} to={ROUTES.HOME}>
            Back to store
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
