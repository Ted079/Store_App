import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../store/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/route";
import styles from "./profile.module.scss";
import Sidebar from "../Sidebar/Sidebar";
import Products from "../Products/Products";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const filteredProducts = useSelector((state) => state.products.filtered);
  const favorite = useSelector((state) => state.user.favorite);

  const listForProfile = [
    { id: 1, to: ROUTES.HOME, label: "Back to Store" },
    { id: 2, to: ROUTES.HOME, label: "Cards" },
    { id: 3, to: ROUTES.HOME, label: "Messages" },
    { id: 4, to: ROUTES.HOME, label: "E-Check" },
    { id: 5, to: ROUTES.HOME, label: "Bonuses" },
  ];

  const { currentUser, isLoading } = useSelector(({ user }) => user);

  useEffect(() => {
    if (!isLoading && !currentUser) navigate("/login");
  }, [currentUser, isLoading]);

  if (isLoading) {
    return <section className="preloader">...Loading</section>;
  }

  return !currentUser ? (
    <section className="preloader">...Loading</section>
  ) : (
    <>
      <Sidebar title="PROFILE" list={listForProfile} />
      <section className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.user}>
            <div className={styles.info}>
              <p className={styles.name}>{currentUser.name}</p>
              <p className={styles.email}>{currentUser.email}</p>
              <p>{currentUser.role}</p>
            </div>
            <div
              className={styles.avatar}
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
            ></div>
          </div>

          <Link to={ROUTES.SETTINGS} className={styles.edit}>
            <svg className={styles.icon}>
              <use
                xlinkHref={`${process.env.PUBLIC_URL}/newSprite.svg#edits`}
              />
            </svg>

            <span>Edit profile</span>
          </Link>

          <Link to={ROUTES.HOME} className={styles.edit}>
            <svg className={styles.icon}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/newSprite.svg#card`} />
            </svg>
            Update card
          </Link>

          <Link to={ROUTES.CART} className={styles.cart}>
            <svg className={styles["cart-icon"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            Cart
          </Link>
          <Link to={ROUTES.FAVORITE} className={styles.cart}>
            <svg className={styles["fav-icon"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
            Favorites
          </Link>
          <button
            onClick={() => {
              dispatch(logOutUser());
              navigate("/login");
            }}
          >
            Log Out
          </button>
        </div>
      </section>
      {favorite.length ? (
        <Products products={favorite} amount={6} title="Favorite goods" />
      ) : (
        <div> Your cart is empty</div>
      )}
    </>
  );
}

export default Profile;
