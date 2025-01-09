import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "./store/categories/categoriesSlice";

import Header from "./components/Header/Header";
import AppRoutes from "./components/Routes/Routes";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import { getProducts } from "./store/products/productsSlice";
import { useLocation } from "react-router-dom";
import { ROUTES } from "./utils/route";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const noLayoutRoutes = [ROUTES.LOGIN, ROUTES.SIGNUP];

  const hideLayout = noLayoutRoutes.includes(location.pathname);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="app">
      {!hideLayout && <Header />}
      <div className="container">
        {!hideLayout && <Sidebar />}
        <AppRoutes />
      </div>

       <Footer />
    </div>
  );
}

export default App;
