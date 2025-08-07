import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import SidebarForm from "../Sidebar/SidebarForm";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.scss";
import { toggleForm } from "../../store/user/userSlice";

const Layout = () => {
  const { showSidebar } = useSelector((state) => state.user);
  const categoriesList = useSelector((state) => state.categories.list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showSidebar]);

  return (
    <>
      <Header />
      <div className={`${styles.form} ${showSidebar ? styles.open : ""}`}>
        <SidebarForm list={categoriesList} title="CATEGORIES" />
      </div>

      <div onClick={() => {
        dispatch(toggleForm(false));
      }}
        className={`${styles.overlay} ${showSidebar ? styles.active : ""}`}
      />

      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
