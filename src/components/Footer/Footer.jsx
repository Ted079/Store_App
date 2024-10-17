import React from "react";
import styles from "./Footer.module.scss";
import LOGO from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/route";

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="Stuff" />
        </Link>
      </div>
      <div className={styles.rights}>
        Developed by{" "}
        <a target="_blank" rel="noreferrer" href="https://github.com/Ted079">
          github.com
        </a>
      </div>
      <div className={styles.socials}>
        <a target="_blank" rel="noreferrer" href="/">
          <svg className={styles["icon-fav"]}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`} />
          </svg>
        </a>
        <a target="_blank" rel="noreferrer" href="">
          <svg className={styles["icon-fav"]}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
          </svg>
        </a>
        <a target="_blank" rel="noreferrer" href="">
          <svg className={styles["icon-fav"]}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Footer;
