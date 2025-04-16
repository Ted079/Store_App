import React, { useState } from "react";
import styles from "./auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import LOGO from "../../images/logo.svg";
import { ROUTES } from "../../utils/route";
import { useDispatch } from "react-redux";
import { checkEmail, createUser } from "../../store/user/userSlice";
import UserForm from "./UserForm";
import { useCreateUserApiMutation } from "../../store/api/auth.api";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mutateNewUser] = useCreateUserApiMutation();

  const handleSignup = (values) => {
    // mutateNewUser(values);
    dispatch(createUser(values));
    navigate("/");
  };

  return (
    <>
      <UserForm
        logo={LOGO}
        styles={styles}
        updateUserHandler={handleSignup}
        buttonText="Create an account"
        redirectLink={{
          path: ROUTES.LOGIN,
          text: "if you already have an account",
        }}
      />
    </>
  );
}

export default Signup;
