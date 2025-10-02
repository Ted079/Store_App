import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./store/categories/categoriesSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppRoutes from "./components/Routes/Routes";
import { getProducts } from "./store/products/productsSlice";
import { fetchUserProfile } from "./store/user/userSlice";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);



  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="app">
      {/* {!hideLayout && <Header />} */}
      <div className="container">
        <AppRoutes />
        <ToastContainer />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
