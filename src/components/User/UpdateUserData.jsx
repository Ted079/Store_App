import React, { useEffect, useState } from "react";
import styles from "./profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/user/userSlice";

function UpdateUserData() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);
  const [values, setValuse] = useState({
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
    setValuse(currentUser);
  }, [currentUser]);

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

  const handleChange = ({ target: { name, value } }) => {
    setValuse({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newError = {};

    Object.keys(values).forEach((key) => {
      newError[key] = validateValues(key, values[key]);
    });

    setError(newError);

    if (Object.values(newError).some((err) => err)) return;

    dispatch(updateUser(values));
  };
  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.group}>
          <input
            type="name"
            name="name"
            placeholder="Your name"
            value={values.name}
            autoComplete="off"
            onChange={handleChange}
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
            required
          />
          {error && <p className={styles.err}>{error.password}</p>}

          <button>Update Data</button>
        </div>
      </form>
    </section>
  );
}

export default UpdateUserData;
