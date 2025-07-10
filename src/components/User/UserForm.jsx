import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { validateValues } from "../../utils/common";

function UserForm({
  updateUserHandler,
  buttonText,
  redirectLink,
  styles,
  logo,
  title,
  back,
  initialState,
  initialErrorState,
  showExtraFields = false,
}) {
  const { currentUser } = useSelector(({ user }) => user);
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(initialErrorState);
  const hasName = "name" in values;

  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

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

    const { phone, birthday, ...dataToSubmit } = values;
    updateUserHandler(dataToSubmit);

    const extraFields = { phone, birthday };
    localStorage.setItem("extraUserData", JSON.stringify(extraFields));
  };

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.back}>{back}</span>
        <h1>{title}</h1>

        <div className={styles.logo}>
          <img src={logo} alt="Stuff" />
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.group}>
            {hasName && (
              <>
                <label htmlFor="email">Username</label>
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
              </>
            )}

            <label htmlFor="email">Email</label>
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

            <label htmlFor="email">Password</label>
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

            {showExtraFields && (
              <>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your phone number"
                  value={values.number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {error && <p className={styles.err}>{error.phone}</p>}

                <label htmlFor="birthday">Birthday</label>
                <input
                  type="date"
                  lang="en"
                  name="birthday"
                  value={values.birthday}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {error && <p className={styles.err}>{error.birthday}</p>}
              </>
            )}

            <button>{buttonText}</button>
            {redirectLink && (
              <div className={styles.msg}>
                <Link className={styles.link} to={redirectLink.path}>
                  {redirectLink.title}
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
