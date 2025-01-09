import React, { useState } from "react";
import styles from "./auth.module.scss";
import { Link } from "react-router-dom";
import LOGO from "../../images/logo.svg";
import { ROUTES } from "../../utils/route";

function Signup() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={LOGO} alt="Stuff" />
        </div>

        <form  className={styles.form}>
          <div className={styles.group}>
            <input
              type="name"
              name="name"
              placeholder="Your name"
              value=""
              autoComplete="off"
              onChange={() => {}}
              // required
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value=""
              autoComplete="off"
              onChange={() => {}}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Your password"
              value=""
              autoComplete="off"
              onChange={() => {}}
              required
            />
            <button>Create an account</button>
            <div className={styles.link}><Link to={ROUTES.LOGIN}>Sign in</Link> if you have an account yet.</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
