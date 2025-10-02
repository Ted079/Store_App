import styles from "./auth.module.scss";
import { useNavigate } from "react-router-dom";
import LOGO from "../../images/logo.svg";
import { ROUTES } from "../../utils/route";
import { useDispatch } from "react-redux";
import { createUser } from "../../store/user/userSlice";
import UserForm from "./UserForm";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValue = {
    name: "",
    email: "",
    password: "",
    avatar: "https://picsum.photos/800",
  };

  const initiaErrorlValue = {
    name: "",
    email: "",
    password: "",
  };

  const handleSignup = (values) => {
    dispatch(createUser(values));
    navigate("/");
  };

  return (
    <>
      <UserForm
        initialState={initialValue}
        initialErrorState={initiaErrorlValue}
        logo={LOGO}
        styles={styles}
        title="Sign up to create an account"
        updateUserHandler={handleSignup}
        buttonText="Create an account"
        redirectLink={{
          path: ROUTES.LOGIN,
          text: "if you already have an account",
          title: "Log in",
        }}
      />
    </>
  );
}

export default Signup;
