import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/user/userSlice";
import { ROUTES } from "../../utils/route";
import LOGO from "../../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { validateValues } from "../../utils/common";


function UserForm({ updateUserHandler, buttonText, redirectLink, styles, logo }) {
  const { currentUser } = useSelector(({ user }) => user);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "https://picsum.photos/800",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]); // ---


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

    if (Object.values(newError).some((err) => err)) return;

    updateUserHandler(values);
  };

  return (
    <section className={styles.container}>
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

            <button>{buttonText}</button>
            {redirectLink && (
              <div className={styles.msg}>
                <Link className={styles.link} to={redirectLink.path}>
                  Sign in
                </Link>{" "}
                {redirectLink.text}
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default UserForm;
