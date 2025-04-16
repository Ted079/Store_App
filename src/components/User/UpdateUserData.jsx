import React, { useEffect, useState } from "react";
import styles from "./updateUser.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/user/userSlice";
import UserForm from "./UserForm";
import Banner from "../Banner/Banner";
import { ROUTES } from "../../utils/route";
import { Link } from "react-router-dom";

function UpdateUserData() {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(updateUser(values));
  };

  const back = (
    <Link to={ROUTES.PROFILE}>
      <svg id="icon-back" viewBox="0 0 1024 1024">
        <path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z" />
      </svg>
    </Link>
  );

  return (
    <>
      <section className={styles.container}>
        <UserForm
          back={back}
          title="Edit Profile"
          styles={styles}
          updateUserHandler={handleSubmit}
          buttonText="Update Data"
        />
      </section>
    </>
  );
}

export default UpdateUserData;
