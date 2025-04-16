import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import SingleProduct from '../Products/SingleProduct'
import {ROUTES} from "../../utils/route";
import NotFound from '../NotFound/NotFound';
import Signup from '../User/Signup';
import Login from '../User/Login';
import Profile from '../User/Profile';
import UpdateUserData from '../User/UpdateUserData';
import SingleCategory from '../Categories/SingleCategory';
import Cart from '../Cart/Cart';


const AppRoutes = () => {
  return (
    <Routes>
        <Route index element={<Home/>}/>
        <Route path={ROUTES.PRODUCT} element={<SingleProduct/>}/>
        <Route path={ROUTES.SIGNUP} element={<Signup/>}/>
        <Route path={ROUTES.LOGIN} element={<Login/>}/>
        <Route path={ROUTES.PROFILE} element={<Profile/>}/>
        <Route path={ROUTES.SETTINGS} element={<UpdateUserData/>}/>
        <Route path={ROUTES.CATEGORY} element={<SingleCategory/>}/>
        <Route path={ROUTES.CART} element={<Cart/>}/>
        <Route index element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes;
