import { useEffect } from "react";
import LOGO from "../../images/logo.svg";
import styles from "./auth.module.scss";
import { ROUTES } from "../../utils/route";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/user/userSlice";
import UserForm from "./UserForm";
import { toast } from "react-toastify";

function Login() {
  const { currentUser, loginErr } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    } else if (loginErr) {
      toast.error("Incorrect email or password", {
        position: "bottom-left",
        // theme: "dark",
      });
    }
  }, [currentUser, navigate, loginErr]);

  const InitialValues = {
    email: "",
    password: "",
  };

  const errorInitialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    dispatch(loginUser(values));
  };

  return (
    <>
      <UserForm
        initialState={InitialValues}
        initialErrorState={errorInitialValues}
        logo={LOGO}
        styles={styles}
        title="Sign in to your account"
        updateUserHandler={handleSubmit}
        buttonText="Log in"
        redirectLink={{
          path: ROUTES.SIGNUP,
          text: "if you already have an account",
          title: "Sign up",
        }}
      />
    </>
  );
}

export default Login;
