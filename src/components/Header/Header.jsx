import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/route";
import LOGO from "../../images/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, toggleForm } from "../../store/user/userSlice";
import SearchForm from "./SearchForm";
import { UseEscapeKey } from "../../hooks/UseEscapeKey";
import UseClickOutside from "../../hooks/UseClickOutside";

const Header = () => {
  const { currentUser, cart, favorite, showSidebar } = useSelector(
    ({ user }) => user
  );

  const [values, setValues] = useState({ name: "Quest" });
  const [profileMenu, setProfileMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);

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
          {/* <img src={LOGO} alt="Stuff" /> */}
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <path
              className="cls-1"
              style={{ fill: "#f19b5f" }}
              d="M18.6,23H5.4a3,3,0,0,1-2.98-3.37l.39-3.13.86-6.87A3.01,3.01,0,0,1,6.65,7h10.7a3.01,3.01,0,0,1,2.98,2.63l.86,6.87.39,3.13A3,3,0,0,1,18.6,23Z"
            ></path>
            <path
              class="cls-2"
              style={{ fill: "#ffce69" }}
              d="M21.19,16.5A2.976,2.976,0,0,1,18.6,18H5.4a2.976,2.976,0,0,1-2.59-1.5l.86-6.87A3.01,3.01,0,0,1,6.65,7h10.7a3.01,3.01,0,0,1,2.98,2.63Z"
            ></path>
            <path
              class="cls-3"
              style={{ fill: "#6c3eb8" }}
              d="M5.4,24H18.6a4,4,0,0,0,3.968-4.5l-1.25-10A4.005,4.005,0,0,0,17.352,6H17V5A5,5,0,0,0,7,5V6H6.648A4.005,4.005,0,0,0,2.68,9.5l-1.25,10A4,4,0,0,0,5.4,24ZM9,5a3,3,0,0,1,6,0V6H9ZM3.414,19.752l1.25-10A2,2,0,0,1,6.648,8H7v2a1,1,0,0,0,2,0V8h6v2a1,1,0,0,0,2,0V8h.352a2,2,0,0,1,1.984,1.752l1.25,10A2,2,0,0,1,18.6,22H5.4a2,2,0,0,1-1.984-2.248Z"
            ></path>
          </svg>
          STUFF
        </Link>
      </div>
      
      <div className={styles.info}>
        <div className={styles.wrapper}>
          <div className={styles.category} onClick={toggleClickSideBar}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
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
                {values.name}
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
