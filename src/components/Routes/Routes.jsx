import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../../utils/route";
import { Spinner } from "react-bootstrap";
import Preloader from "../Preloader/Preloader";

const Home = lazy(() => import("../Home/Home"));
const SingleProduct = lazy(() => import("../Products/SingleProduct"));
const NotFound = lazy(() => import("../NotFound/NotFound"));
const Signup = lazy(() => import("../User/Signup"));
const Login = lazy(() => import("../User/Login"));
const Profile = lazy(() => import("../User/Profile"));
const SingleCategory = lazy(() => import("../Categories/SingleCategory"));
const Cart = lazy(() => import("../Cart/Cart"));
const CreareProduct = lazy(() => import("../Products/CreareProduct"));
const UpdateUserData = lazy(() => import("../User/UpdateUserData"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Routes>
        <Route index element={<Home />} />
        <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.SETTINGS} element={<UpdateUserData />} />
        <Route path={ROUTES.CATEGORY} element={<SingleCategory />} />
        <Route path={ROUTES.CART} element={<Cart />} />
        <Route path={ROUTES.CREATE} element={<CreareProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
