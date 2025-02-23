import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../store/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import UpdateUserData from "./UpdateUserData";
import { ROUTES } from "../../utils/route";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, isLoading } = useSelector(({ user }) => user);
  console.log(currentUser);

  useEffect(() => {
    if (!isLoading && !currentUser) navigate("/login");
  }, [currentUser, isLoading]);

  if (isLoading) {
    return <section className="preloader">...Loading</section>;
  }

  return !currentUser ? (
    <section className="preloader">...Loading</section>
  ) : (
    <>
      <p>{currentUser.name}</p>
      <p>{currentUser.email}</p>
      <p>{currentUser.role}</p>
      {/* <div style={{ backgroundImage: `url(${currentUser.avatar})` }}></div> */}
      <Link to={ROUTES.SETTINGS}>change profile</Link>
      <button
        onClick={() => {
          dispatch(logOutUser());
          navigate("/login");
        }}
      >
        logOut
      </button>
    </>
  );
}

export default Profile;
