import React, { useEffect, useState } from "react";
import LOGO from "../../images/logo.svg";
import styles from "./auth.module.scss";
import { ROUTES } from "../../utils/route";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/user/userSlice";

function Login() {
  const { currentUser, loginErr } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    } else if (loginErr) {
      alert(loginErr);
      const errorAlert = <p>{loginErr}</p>
    }
  }, [currentUser, navigate, loginErr]);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const validateValues = (name, value) => {
    switch (name) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Please enter a valid email adress";

      case "password":
        return value.length < 6 ? "Must be more than 6 letters" : "";

      default:
        return;
    }
  };

  const handleBlur = ({ target: { name, value } }) => {
    const errMessage = validateValues(name, value);
    setError((prev) => ({ ...prev, [name]: errMessage }));
  };

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newError = {};

    Object.keys(values).forEach((key) => {
      newError[key] = validateValues(key, values[key]);
    });

    setError(newError);

    if (Object.values(newError).some((err) => err)) {
      return;
    }

    dispatch(loginUser(values));
    // if (currentUser) {
    //   navigate("/");
    // } else {
    //   alert("invalid password");
    // }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={LOGO} alt="Stuff" />
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.group}>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              autoComplete="off"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {error && <p className={styles.err}>{error.email}</p>}
            <input
              type="password"
              name="password"
              placeholder="Your password"
              autoComplete="off"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {error && <p className={styles.err}>{error.password}</p>}

            <button>Log in</button>
            <div className={styles.msg}>
              <Link className={styles.link} to={ROUTES.SIGNUP}>
                Sign up
              </Link>{" "}
              if you don't have an account yet.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
