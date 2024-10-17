import React from "react";
import styles from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const list = useSelector((state) => state.categories.list);

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
        <a href={"/help"} target="a_blank" className={styles.link}>
          Help
        </a>
        <a
          href={"/terms"}
          target="a_blank"
          className={styles.link}
          style={{ textDecoration: "underline" }}
        >
          Terms and Condition
        </a>
      </div>
    </section>
  );
};

export default Sidebar;
