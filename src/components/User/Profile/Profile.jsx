import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../../store/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Profile.module.scss";
import Sidebar from "../../Sidebar/Sidebar";
import { formatDate } from "../../../utils/common";
import { listForProfile, profileActions } from "../../../utils/constants";
import Preloader from "../../Preloader/Preloader";
import Favorites from "../../Favorites/Favorites";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { currentUser, isLoading } = useSelector(({ user }) => user);

  const extraData = JSON.parse(localStorage.getItem("extraUserData")) || {};

  useEffect(() => {
    if (!isLoading && !currentUser) navigate("/login");
  }, [currentUser, isLoading, navigate]);

  if (isLoading) {
    return <Preloader />;
  }

  return !currentUser ? (
    <Preloader />
  ) : (
    <>
      <div className={styles.container}>
        <Sidebar title="PROFILE" list={listForProfile} />
        <section className={styles.wrapper}>
          <div className={styles.user}>
            <div className={styles.left}>
              <div className={styles.profileInfo}>
                <div
                  className={styles.avatar}
                  style={{ backgroundImage: `url(${currentUser.avatar})` }}
                />
                <div className={styles.details}>
                  <p className={styles.name}>{currentUser.name}</p>
                  <p className={styles.role}>{currentUser.role}</p>
                </div>
              </div>
            </div>

            <div className={styles.rigth}>
              <div className={styles.extraInfo}>
                <span>
                  <p className={styles.label}>Email</p>
                  <p className={styles.value}>{currentUser.email}</p>
                </span>

                <span>
                  <p className={styles.label}>Phone Number</p>
                  <p className={styles.value}>{extraData.phone || "No Set"}</p>
                </span>

                <span>
                  <p className={styles.label}>Date of Birth</p>
                  <p className={styles.value}>
                    {formatDate(extraData.birthday) || "No Set"}
                  </p>
                </span>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            {profileActions.map(({ id, to, label, icon, isHeart }) => (
              <Link key={id} to={to} className={styles.card}>
                <svg
                  className={`${styles.icon} ${isHeart ? styles.heart : ""}`}
                >
                  <use xlinkHref={icon} />
                </svg>
                <span>{label}</span>
              </Link>
            ))}

            <div
              className={styles.logOutBtn}
              onClick={() => {
                dispatch(logOutUser());
                navigate("/login");
                localStorage.removeItem("extraUserData");
              }}
            >
              <svg className={styles.icon}>
                <use
                  xlinkHref={`${process.env.PUBLIC_URL}/newSprite.svg#logout`}
                />
              </svg>

              <span>Log out</span>
            </div>
          </div>
        </section>
      </div>

      <Favorites />
    </>
  );
}

export default Profile;
