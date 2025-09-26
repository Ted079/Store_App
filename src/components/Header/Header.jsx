import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/route";
import LOGO from "../../images/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, toggleForm } from "../../store/user/userSlice";
import SearchForm from "../Search/SearchForm";
import { UseEscapeKey } from "../../hooks/UseEscapeKey";
import UseClickOutside from "../../hooks/UseClickOutside";
import { useMediaQuery } from "react-responsive";


const Header = () => {
  const { currentUser, cart, favorite, showSidebar } = useSelector(
    ({ user }) => user
  );

  const [values, setValues] = useState({ name: "Quest" });
  const [profileMenu, setProfileMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  const isMobile = useMediaQuery({maxWidth: 768});

  const toggleClickHandler = () => {
    setProfileMenu((previous) => !previous);
  };

  const toggleClickSideBar = () => {
    dispatch(toggleForm(!showSidebar));
  };

  const closeMenuHandler = () => {
    setProfileMenu(false);
  };

  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

  // UseEscapeKey(profileMenu ? closeMenuHandler : null);
  UseEscapeKey(closeMenuHandler);

  UseClickOutside(
    ref,
    () => {
      closeMenuHandler();
    },
    []
  );

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="Stuff" />
        </Link>
      </div>

      <div className={styles.info}>
        <div className={styles.wrapper}>
          <div className={styles.category} onClick={toggleClickSideBar}>
            <svg>
              <use
                xlinkHref={`${process.env.PUBLIC_URL}/newSprite.svg#category`}
              />
            </svg>
          </div>
          <SearchForm />
        </div>

        <div className={styles.account}>
          <Link to={ROUTES.PROFILE} className={styles.favourites}>
            <svg className={styles["icon-fav"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
            <div className={styles.username}>Favorites</div>
            {!!favorite.length && (
              <span className={styles.favCount}>{favorite.length}</span>
            )}
          </Link>
          <Link to={ROUTES.CART} className={styles.cart}>
            <svg className={styles["icon-cart"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            <div className={styles.username}>Cart</div>
            {!!cart.length && (
              <span className={styles.count}>{cart.length}</span>
            )}
          </Link>

          <div className={styles.user} onClick={toggleClickHandler} ref={ref}>
            <Link
              to={!currentUser ? ROUTES.LOGIN : "#"}
              className={styles.userLink}
            >
              <svg
                className={!currentUser ? styles.userSvg : styles.userSvgActive}
              >
                <use
                  xlinkHref={`${process.env.PUBLIC_URL}/newSprite.svg#account`}
                />
              </svg>
              <div
                className={
                  !currentUser ? styles.username : styles.usernameActive
                }
              >
                {!isMobile && values.name}
              </div>
            </Link>
            {profileMenu && currentUser && (
              <div className={styles.userMenu}>
                <ul>
                  {[
                    { id: 1, to: ROUTES.PROFILE, label: "Profile" },
                    { id: 2, to: ROUTES.SETTINGS, label: "Settings" },
                    { id: 3, to: ROUTES.CREATE, label: "Selling" },
                  ].map(({ id, to, label }) => (
                    <li key={id}>
                      <Link className={styles.menu} to={to}>
                        {label}
                      </Link>
                    </li>
                  ))}
                  <li
                    className={styles.menuBtn}
                    onClick={() => {
                      dispatch(logOutUser());
                      navigate(ROUTES.LOGIN);
                    }}
                  >
                    Log out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
