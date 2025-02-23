import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./store/categories/categoriesSlice";

import Header from "./components/Header/Header";
import AppRoutes from "./components/Routes/Routes";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import { getProducts } from "./store/products/productsSlice";
import { useLocation } from "react-router-dom";
import { ROUTES } from "./utils/route";
import { fetchUserProfile } from "./store/user/userSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = useSelector((state) => state.user.token);

  const noLayoutRoutes = [ROUTES.LOGIN, ROUTES.SIGNUP];

  const isLoginProfile = location.pathname === ROUTES.PROFILE;

  const hideLayout = noLayoutRoutes.includes(location.pathname);
  

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="app">
      {!hideLayout && <Header />}
      <div className="container">
        {!hideLayout && (
          <Sidebar type={isLoginProfile ? "profile" : "categories"} />
        )}
        <AppRoutes />
      </div>

      <Footer />
    </div>
  );
}

export default App;
