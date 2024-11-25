import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import SingleProduct from '../Products/SingleProduct'
import {ROUTES} from "../../utils/route";
import NotFound from '../NotFound/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
        <Route index element={<Home/>}/>
        <Route path={ROUTES.PRODUCT} element={<SingleProduct/>}/>
        <Route index element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes;