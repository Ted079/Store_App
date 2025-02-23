import React from "react";
import styles from "./Sidebar.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ type = "categories" }) => {
  const list = useSelector((state) => state.categories.list);
  const { currentUser } = useSelector(({ user }) => user);

  const location = useLocation();

  return (
    <section className={styles.sidebar}>
      <span className={styles.title}>
        {type === "categories" ? "CATEGORIES" : "PROFILE"}
      </span>
      <nav>
        <ul className={styles.menu}>
          {type === "categories" ? (
            list.slice(0, 7).map(({ id, name }) => (
              <li key={id}>
                <NavLink
                  className={({ isActive }) =>
                    `${styles.categories} ${isActive ? styles.active : ""}`
                  }
                  to={`/categories/${id}`}
                >
                  {name}
                </NavLink>
              </li>
            ))
          ) : !currentUser ? (
            <section className="preloader">...Loading</section>
          ) : (
            <>
              <li>{currentUser.avatar}</li>
              <li>{currentUser.name}</li>
              <li>{currentUser.email}</li>
            </>
          )}
        </ul>
      </nav>
      <div className={styles.footer}>
        <a
          href={"/help"}
          target="a_blank"
          className={`${styles.link} ${
            location.pathname === "/help" ? styles.active : ""
          }`}
        >
          Help
        </a>
        <NavLink
          to={"/terms"}
          target="a_blank"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
          style={{ textDecoration: "underline" }}
        >
          Terms and Condition
        </NavLink>
      </div>
    </section>
  );
};

export default Sidebar;
