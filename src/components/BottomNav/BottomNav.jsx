import React, { useEffect, useState } from "react";
import styles from "./BottomNav.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/route";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, toggleForm } from "../../store/user/userSlice";
import UseClickOutside from "../../hooks/UseClickOutside";

const BottomNav = () => {
  const { currentUser, cart, favorite, showSidebar } = useSelector(
    ({ user }) => user
  );
  const [values, setValues] = useState({ name: "Log in" });

  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

  const [profileMenu, setProfileMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleClickSideBar = () => {
    dispatch(toggleForm(!showSidebar));
  };

  const closeMenuHandler = () => {
    setProfileMenu(false);
  };

  UseClickOutside(() => {
    closeMenuHandler();
  }, []);

  return (
    <div className={styles.BottomNav}>
      <div className={styles.info}>
        <NavLink
          to={ROUTES.HOME}
          className={({ isActive }) =>
            `${styles.home} ${isActive ? styles.active : ""}`
          }
        >
          {/* <svg style={{background:"red", width: "200px" }}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/newSprite.svg#home1`} />
          </svg> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              color="currentColor"
            >
              <path d="m9 22l.002-4.002c0-.931 0-1.396.153-1.763a2 2 0 0 1 1.083-1.083C10.605 15 11.07 15 12 15v0c.93 0 1.396 0 1.764.152a2 2 0 0 1 1.083 1.083C15 16.603 15 17.068 15 18v4" />
              <path d="m7.088 4.762l-1 .781c-1.516 1.184-2.275 1.776-2.681 2.61C3 8.988 3 9.952 3 11.88v2.092c0 3.784 0 5.676 1.172 6.852S7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.176S21 17.756 21 13.971v-2.09c0-1.929 0-2.893-.407-3.728c-.407-.834-1.165-1.426-2.681-2.61l-1-.78C14.552 2.92 13.372 2 12 2s-2.552.92-4.912 2.762" />
            </g>
          </svg>

          <div className={styles.name}>Home</div>
        </NavLink>

        <div className={styles.category} onClick={toggleClickSideBar}>
          <svg>
            <use
              xlinkHref={`${process.env.PUBLIC_URL}/newSprite.svg#category`}
            />
          </svg>
          <div className={styles.name}>Category</div>
        </div>

        <NavLink
          to={ROUTES.CART}
          className={({ isActive }) =>
            `${styles.cart} ${isActive ? styles.active : ""}`
          }
        >
          <svg>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
          </svg>
          <div className={styles.name}>Cart</div>
          {!!cart.length && <span className={styles.count}>{cart.length}</span>}
        </NavLink>

        <NavLink
          to={ROUTES.PROFILE}
          className={({ isActive }) =>
            `${styles.favorites} ${isActive ? styles.active : ""}`
          }
        >
          <svg>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
          </svg>
          <div className={styles.name}>Favorite</div>
          {!!favorite.length && (
            <span className={styles.favCount}>{favorite.length}</span>
          )}
        </NavLink>

        <NavLink
          to={!currentUser ? ROUTES.LOGIN : ROUTES.PROFILE}
          className={({ isActive }) =>
            `${styles.user} ${isActive ? styles.active : ""}`
          }
        >
          <svg>
            <use
              xlinkHref={`${process.env.PUBLIC_URL}/newSprite.svg#account`}
            />
          </svg>
          <div className={styles.name}>{values.name}</div>

          {/* <svg className={!currentUser ? styles.userSvg : styles.userSvgActive}>
            <use
              xlinkHref={`${process.env.PUBLIC_URL}/newSprite.svg#account`}
            />
          </svg>
          <div className={!currentUser ? styles.name : styles.usernameActive}>
            {values.name}
          </div> */}
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNav;
