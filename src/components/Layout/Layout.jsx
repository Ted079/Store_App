import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import BottomNav from "../BottomNav/BottomNav";
import SidebarForm from "../Sidebar/SidebarForm";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.scss";
import { toggleForm } from "../../store/user/userSlice";
import { useMediaQuery } from "react-responsive";

const Layout = () => {
  const { showSidebar } = useSelector((state) => state.user);
  const categoriesList = useSelector((state) => state.categories.list);
  const dispatch = useDispatch();
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 640 });

  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showSidebar]);

  useEffect(() => {
    if (showSidebar) {
      dispatch(toggleForm(false));
    }
  }, [location.pathname]);
  return (
    <>
      <Header />
      <div className={`${styles.form} ${showSidebar ? styles.open : ""}`}>
        <SidebarForm list={categoriesList} title="CATEGORIES" />
      </div>

      <div
        onClick={() => {
          dispatch(toggleForm(false));
        }}
        className={`${styles.overlay} ${showSidebar ? styles.active : ""}`}
      />

      {isMobile && <BottomNav />}
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
