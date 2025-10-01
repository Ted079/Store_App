import React, { useState } from "react";
import styles from "./Product.module.scss";
import { ROUTES } from "../../utils/route";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart, addItemToFavorite } from "../../store/user/userSlice";
import { toast } from "react-toastify";
import Prices from "./Prices/Prices";
import Images from "./ImagesCard/ImagesCard";
import Sizes from "./Sizes/Sizes";

const Product = (item) => {
  const navigate = useNavigate();

  const { images, description, title, price, category } = item;

  const [currentSize, setCurrentSize] = useState();

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItemToCart(item));
    toast(`${title} added to cart`, {
      position: "bottom-left",
      theme: "dark",
    });
  };

  const addToFavorite = () => {
    dispatch(addItemToFavorite(item));
    toast(`${title} added to your favorites`, {
      position: "bottom-left",
      theme: "dark",
    });
  };

  return (
    <div className={styles.productWrapper}>
      <section className={styles.product}>
        <Images images={images} />

        <div className={styles.info}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.price}>{price}$</div>
          <div className={styles.color}>
            <span>Color: </span> Blanc
          </div>

          <Sizes
            category={category}
            setCurrentSize={setCurrentSize}
            currentSize={currentSize}
          />

          <p className={styles.description}>{description}</p>

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
      <section className={styles.productSummary}>
        <Prices price={price} className={styles.bigPrices} />
        <div className={styles.warranty}>
          Buy Direct. Save Direct. 2-Year Warranty +FREE Shipping
        </div>

        <div className={styles.actions}>
          <button
            onClick={() => {
              addToCart();
              navigate("/cart");
            }}
            className={styles.buy}
            disabled={!currentSize}
          >
            Buy It Now
          </button>
          <button
            onClick={addToCart}
            className={styles.basket}
            disabled={!currentSize}
          >
            Add to cart
          </button>
          <button className={styles.favorite} onClick={addToFavorite}>
            Add to favorites
          </button>
        </div>
      </section>
    </div>
  );
};

export default Product;
