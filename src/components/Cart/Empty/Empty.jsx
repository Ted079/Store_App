import React from "react";
import Products from "../../Products/Products";
import styles from "./Empty.module.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/route";
import { useSelector } from "react-redux";
// import { relatedCartProducts } from "../../../store/user/userSlice";

function Empty() {
  const productsList = useSelector((state) => state.products.list);
  const navigate = useNavigate();

  return (
    <section className={styles.container}>
      <div className={styles.empty}>
        <div className={styles.redirect}>
          <h2>You don't have any items in your cart. Let's get shopping!</h2>
          <button onClick={() => navigate(ROUTES.HOME)}>Start Shopping</button>
        </div>
        <Products products={productsList} amount={10} title="Reconmended You" />
      </div>
    </section>
  );
}

export default Empty;
