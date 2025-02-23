import React, { useState } from "react";
import styles from "./auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import LOGO from "../../images/logo.svg";
import { ROUTES } from "../../utils/route";
import { useDispatch } from "react-redux";
import { checkEmail, createUser } from "../../store/user/userSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "https://picsum.photos/800",
    // confirmPass: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });


  const validateValues = (name, value) => {

    switch (name) {
      case "name":
        return value.length < 4 ? "Must be 4 or more charecters" : "";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Please enter a valid email adress";
      case "password":
        return value.length < 6 || value[0] !== value[0]?.toUpperCase()
          ? "Must be more than 6 letters"
          : "";
      // and the first letter must be capital
      default:
        return;
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    const errorMessage = validateValues(e.target.name, e.target.value);
    console.log(errorMessage);

    setError((prev) => ({ ...prev, [e.target.name]: errorMessage }));
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

    // const checkUserEmail = dispatch(checkEmail(values.email));
    // if(checkUserEmail === true){
    //   return alert('aaa');
    // };
    // console.log(checkUserEmail);
    
    dispatch(createUser(values));
    navigate("/");
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
              type="name"
              name="name"
              placeholder="Your name"
              value={values.name}
              autoComplete="off"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {error ? <p className={styles.err}>{error.name}</p> : null}
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={values.email}
              autoComplete="off"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {error && <p className={styles.err}>{error.email}</p>}

            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={values.password}
              autoComplete="off"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {error && <p className={styles.err}>{error.password}</p>}

            <button>Create an account</button>
            <div className={styles.msg}>
              <Link className={styles.link} to={ROUTES.LOGIN}>
                Sign in
              </Link>{" "}
              if you have an account yet.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
