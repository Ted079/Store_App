import React, { useEffect, useState } from "react";
import styles from "./profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/user/userSlice";
import UserForm from "./UserForm";

function UpdateUserData() {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(updateUser(values));
  };

  return (
    <section className={styles.container}>
      <UserForm styles={styles} updateUserHandler={handleSubmit} buttonText="Update Data"/>
    </section>
  );
}


export default UpdateUserData;
