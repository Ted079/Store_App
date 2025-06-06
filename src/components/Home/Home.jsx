import React, { useEffect } from "react";
import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import Categoires from "../Categories/Categories";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../Banner/Banner";
import { filteredByPrice } from "../../store/products/productsSlice";
import Sidebar from "../Sidebar/Sidebar";

const Home = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products.list);
  const categoriesList = useSelector((state) => state.categories.list);
  const filteredProducts = useSelector((state) => state.products.filtered);

  useEffect(() => {
    if (!categoriesList.length) return;

    dispatch(filteredByPrice(30));
  }, [dispatch, categoriesList.length]);

  return (
    <>
      <Sidebar list={categoriesList} title="CATEGORIES"/>
      <Poster />
      <Products products={productsList} amount={10} title="Trending" />
      <Categoires categories={categoriesList} amount={5} title="Worth seeing" />
      <Banner imageList={productsList} amount={5} />
      <Products products={filteredProducts} amount={5} title="Less than 30$" />
    </>
  );
};

export default Home;
