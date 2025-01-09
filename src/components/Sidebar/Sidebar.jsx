import React from "react";
import styles from "./Sidebar.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const list = useSelector((state) => state.categories.list);
  const location = useLocation();

  return (
    <section className={styles.sidebar}>
      <span className={styles.title}>CATEGORIES</span>
      <nav>
        <ul className={styles.menu}>
          {list.slice(0, 7).map(({ id, name }) => (
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
          ))}
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