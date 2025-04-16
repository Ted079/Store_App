import React from "react";
import styles from "./Sidebar.module.scss";
import { NavLink, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../../utils/route";
import { isAction } from "@reduxjs/toolkit";

const Sidebar = ({ list = [], title }) => {
  const location = useLocation();
  const isCategories = title === "CATEGORIES";

  return (
    <section className={styles.sidebar}>
      <span className={styles.title}>{title}</span>

      <nav>
        <ul className={styles.menu}>
          {isCategories
            ? list.slice(0, 9).map(({ id, name }) => (
                <li key={id}>
                  <NavLink
                    to={`/categories/${id}`}
                    className={({ isActive }) =>
                      `${styles.categories} ${isActive ? styles.active : ""}`
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              ))
            : list.map(({ id, to, label }) => (
                <li key={id}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `${styles.categories} ${isActive ? styles.active : ""} 
                      ${id === 1 ? styles.underline : ""}`
                    }
                  >
                    {label}
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
