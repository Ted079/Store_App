import React, { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToFavorite,
  removeItemToFavorite,
} from "../../store/user/userSlice";
import { toast } from "react-toastify";

const ProductsCard = (product) => {
  const {
    title,
    price,
    id,
    category: { name: categoryName },
    images,
  } = product;
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state) => state.user.favorite);
  const isFavorite = favoriteItems.some((item) => item.id === product.id);

  const handleToggleFav = () => {
    if (isFavorite) {
      dispatch(removeItemToFavorite(product.id));
      toast("Item removed to your favorites", {
        position: "bottom-left",
        theme: "dark",
      });
    } else {
      dispatch(addItemToFavorite(product));
      toast("Item added to your favorites", {
        position: "bottom-left",
        theme: "dark",
      });
    }
  };

  return (
    <Link to={`/products/${id}`} key={id}>
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
            <div className={styles.oldPrice}>{Math.floor(price * 0.7)}$</div>
          </div>

          <div className={styles.purchases}>
            {Math.floor(Math.random() * 20 + 1)} people purchased
          </div>
        </div>

        <svg
          onClick={(e) => {
            e.preventDefault();
            handleToggleFav();
          }}
          className={isFavorite ? styles.iconFill : styles.icon}
        >
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
        </svg>
      </div>
    </Link>
  );
};

export default ProductsCard;
