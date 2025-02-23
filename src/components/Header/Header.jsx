import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/route";
import LOGO from "../../images/logo.svg";
import AVATAR from "../../images/monkey.svg";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector(({ user }) => user);
  const [values, setValues] = useState({ name: "quest", avatar: `${AVATAR}` });
  const dispatch = useDispatch();
  const location = useLocation();

  const noLayoutRoutes = [ROUTES.PROFILE];
  const hideLayouts =  noLayoutRoutes.includes(location.pathname);

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser, dispatch]);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="Stuff" />
        </Link>
      </div>

      <div className={styles.info}>
        {!hideLayouts && (
          <Link
            to={!currentUser ? ROUTES.LOGIN : ROUTES.PROFILE}
            className={styles.user}
          >
            <div
              className={styles.avatar}
              style={{ backgroundImage: `url(${values.avatar})` }}
            ></div>
            <div className={styles.username}>{values.name}</div>
          </Link>
        )}

        <form className={styles.form}>
          <div className={styles.icon}>
            <svg className="icon">
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
            </svg>
          </div>

          <div className={styles.input}>
            <input
              type="search"
              autoComplete="off"
              placeholder="Search.."
              name="search"
              onChange={() => {}}
              value=""
            />
          </div>
          {false && <div className={styles.box}></div>}
        </form>

        <div className={styles.account}>
          <Link to={ROUTES.HOME} className={styles.favourites}>
            <svg className={styles["icon-fav"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
          </Link>
          <Link to={ROUTES.CART} className={styles.cart}>
            <svg className={styles["icon-cart"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            <span className={styles.count}>2</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
