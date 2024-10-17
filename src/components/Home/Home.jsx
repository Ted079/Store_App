import React from "react";
import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import Categoires from "../Categories/Categories"
import { useSelector } from "react-redux";

const Home = () => {
  const list = useSelector(state => state.products.list);
  const categoriesList = useSelector(state => state.categories.list);
  console.log(categoriesList);
  
  
  return (
    <>
      <Poster />
      <Products products={list} amount={5} title="Trending"/>
      <Categoires categories={categoriesList} amount={5} title="Worth seeing"/>
    </>
  );
};

export default Home;
