import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import BottomNav from "../BottomNav/BottomNav";
import SidebarForm from "../Sidebar/SidebarForm";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.scss";
import { toggleForm } from "../../store/user/userSlice";
import { useMediaQuery } from "react-responsive";
import Preloader from "../Preloader/Preloader";

const Layout = () => {
  const { showSidebar } = useSelector((state) => state.user);
  const { list } = useSelector(({ products }) => products);
  const categoriesList = useSelector((state) => state.categories.list);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showSidebar]);

  useEffect(() => {
    dispatch(toggleForm(false));
  }, [dispatch]);
  return (
    <>
      <Header />
      <div className={`${styles.form} ${showSidebar ? styles.open : ""}`}>
        <SidebarForm list={categoriesList} title="CATEGORIES" />
      </div>

      <>
        {!list.length ? (
          <Preloader />
        ) : (
          <>
            <div
              onClick={() => {
                dispatch(toggleForm(false));
              }}
              className={`${styles.overlay} ${
                showSidebar ? styles.active : ""
              }`}
            />

            <Outlet />
          </>
        )}
      </>
      {isMobile && <BottomNav />}
      <Footer />
    </>
  );
};

export default Layout;
