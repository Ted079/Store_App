import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../utils/route";
import LOGO from "../../images/logo.svg";
import AVATAR from "../../images/monkey.svg";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductWithFilterQuery } from "../../store/api/apiSlice";
import { logOutUser, toggleForm } from "../../store/user/userSlice";
import { UseEscapeKey } from "../../hooks/UseEscapeKey";

const Header = () => {
  const { currentUser, showSearchForm, cart, favorite } = useSelector(({ user }) => user);
  const [values, setValues] = useState({ name: "quest", avatar: `${AVATAR}` });
  const [searchValue, setSearchValue] = useState("");
  const [profileMenu, setProfileMenu] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const noLayoutRoutes = [ROUTES.PROFILE, ROUTES.SETTINGS];
  const hideLayouts = noLayoutRoutes.includes(location.pathname);

  const { data, isLoading } = useGetProductWithFilterQuery({
    title: searchValue,
  });

  const handleSeacrh = (e) => {
    setSearchValue(e.target.value);
  };

  const toggleClick = () => {
    setProfileMenu((previous) => !previous);
  };

  const openModal = () => {
    dispatch(toggleForm(true));
  };

  const closeModal = () => {
    setSearchValue("");
    dispatch(toggleForm(false));
  };

  UseEscapeKey(() => {
    dispatch(toggleForm(false));
    // dispatch(setProfileMenu(false));
  });

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
        <div className={styles.user} onClick={toggleClick}>
          {!hideLayouts && (
            <Link
              // to={!currentUser ? ROUTES.LOGIN : ROUTES.PROFILE}
              to={!currentUser ? ROUTES.LOGIN : "#"}
              className={styles.userLink}
            >
              <div
                className={styles.avatar}
                style={{ backgroundImage: `url(${values.avatar})` }}
              />
              <div className={styles.username}>{values.name}</div>
            </Link>
          )}
          {profileMenu && currentUser && (
            <div className={styles.userMenu}>
              <ul>
                {[
                  { to: ROUTES.PROFILE, label: "Profile" },
                  { to: ROUTES.SETTINGS, label: "Settings" },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to}>{label}</Link>
                  </li>
                ))}
                <li
                  onClick={() => {
                    dispatch(logOutUser());
                    navigate(0);
                  }}
                >
                  log Out
                </li>
              </ul>
            </div>
          )}
        </div>

        <form className={styles.form}>
          <div className={styles.icon}>
            <svg className="icon">
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
            </svg>
          </div>

          <div className={styles.input} onClick={openModal}>
            <input
              type="search"
              autoComplete="off"
              placeholder="Search.."
              name="search"
              onChange={handleSeacrh}
              value={searchValue}
            />
          </div>

          {showSearchForm ? (
            <>
              <div
                className={styles.backdrop}
                onClick={() => {
                  dispatch(toggleForm(false));
                }}
              />
              <div className={styles.box}>
                {isLoading
                  ? "..Loading"
                  : !data.length
                  ? "No results"
                  : data.map(({ images, id, title }) => (
                      <Link
                        className={styles.item}
                        onClick={closeModal}
                        to={`/products/${id}`}
                        key={id}
                      >
                        <div
                          className={styles.image}
                          style={{ backgroundImage: `url(${images[0]})` }}
                        />
                        <div className={styles.title}>{title}</div>
                      </Link>
                    ))}
              </div>
            </>
          ) : (
            <></> // вынести в отдельный компонент
          )}
        </form>

        <div className={styles.account}>
          <Link to={ROUTES.HOME} className={styles.favourites}>
            <svg className={styles["icon-fav"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
            {!!favorite.length && (
              <span className={styles.count}>{favorite.length}</span>
            )}
          </Link>
          <Link to={ROUTES.CART} className={styles.cart}>
            <svg className={styles["icon-cart"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            {!!cart.length && (
              <span className={styles.count}>{cart.length}</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
