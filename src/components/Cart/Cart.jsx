import React, { useEffect } from "react";
import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Products from "../Products/Products";
import { sumBy } from "../../utils/common";
import {
  addItemToCart,
  relatedCartProducts,
  removeItemToCart,
} from "../../store/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/route";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";
import Quentity from "./Quentity";

function Cart() {
  const { cart } = useSelector(({ user }) => user);
  const productsList = useSelector((state) => state.products.list);
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const changeQuantity = (item, quantity) => {
    dispatch(addItemToCart({ ...item, quantity }));
  };

  const removeItem = (id) => {
    dispatch(removeItemToCart(id));
    toast.warning("Item removed from cart", {
      position: "bottom-left",
      theme: "dark",
    });
  };

  return (
    <>
      {!cart.length ? (
        <>
          <section className={styles.container}>
            <div className={styles.empty}>
              <div className={styles.redirect}>
                <h2>
                  You don't have any items in your cart. Let's get shopping!
                </h2>
                <button onClick={() => navigate(ROUTES.HOME)}>
                  Start Shopping
                </button>
              </div>
              <Products
                products={productsList}
                amount={10}
                title="Reconmended You"
              />
            </div>
          </section>
        </>
      ) : (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.cart}>
              <h2 className={styles.title}>Your Cart</h2>

              <div className={styles.list}>
                {cart.map((item) => {
                  const { id, quantity, images, title, category, price } = item;
                  return (
                    <div className={styles.item} key={id}>
                      <Link to={`/products/${id}`} className={styles.link}>
                        <div>
                          <div
                            className={styles.image}
                            style={{ backgroundImage: `url(${images[0]})` }}
                          />
                        </div>

                        <div className={styles.info}>
                          <h3 className={styles.name}>{title}</h3>
                          <div className={styles.category}>{category.name}</div>
                        </div>
                      </Link>

                      <div className={styles.price}>{price}$</div>

                      {/* <div className={styles.quentity}>
                        <div
                          className={styles.minus}
                          onClick={() =>
                            changeQuantity(item, Math.max(1, quantity - 1))
                          }
                        >
                          <svg className="icon">
                            <use
                              xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
                            />
                          </svg>
                        </div>
                        <span>{quantity}</span>
                        <div
                          className={styles.plus}
                          onClick={() =>
                            changeQuantity(item, Math.max(1, quantity + 1))
                          }
                        >
                          <svg className="icon">
                            <use
                              xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
                            />
                          </svg>
                        </div>
                      </div> */}

                      {!isTablet && (
                        <Quentity
                          changeQuantity={changeQuantity}
                          item={item}
                          quantity={quantity}
                        />
                      )}

                      <div className={styles.total}>{price * quantity}$</div>

                      <div
                        className={styles.close}
                        onClick={() => removeItem(id)}
                      >
                        <svg className={styles.icon}>
                          <use
                            xlinkHref={`${process.env.PUBLIC_URL}/newSprite.svg#close`}
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.totalWindow}>
              <h3>Total</h3>
              <div className={styles.items}>
                Items:{" "}
                <span>{sumBy(cart.map(({ quantity }) => quantity))}</span>
              </div>
              <div className={styles.shipping}>
                Estimate Shipping: <span>0$</span>
              </div>

              <span className={styles.line}></span>

              <div className={styles.subtotal}>
                Subtotal:{" "}
                <span>
                  {" "}
                  {sumBy(cart.map(({ price, quantity }) => price * quantity))}$
                </span>
              </div>
              <button className={styles.proceed}>Go to Checkout</button>
            </div>
          </div>

          <div className={styles.productsWrapper}>
            <Products
              style={{ marginTop: "0px" }}
              products={productsList}
              amount={10}
              title="Reconmended"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
