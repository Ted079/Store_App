import styles from "./SidebarForm.module.scss";
import { NavLink, useLocation } from "react-router-dom";

const SidebarForm = ({ list = [], title }) => {
  const location = useLocation();

  return (
    <section className={styles.sidebar}>
      <span className={styles.title}>{title}</span>

      <nav>
        <ul className={styles.menu}>
          {list.slice(0, 9).map(({ id, name }) => (
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

export default SidebarForm;
