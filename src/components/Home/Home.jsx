import React, { useEffect} from "react";
import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import Categoires from "../Categories/Categories";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../Banner/Banner";
import {
  filteredByPrice,
  filteredByCategory,
} from "../../store/products/productsSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { list, filtered, categoryFilter } = useSelector(
    ({ products }) => products
  );
  const categoriesList = useSelector((state) => state.categories.list);

  useEffect(() => {
    if (!list.length) return;

    dispatch(filteredByPrice(30));
    dispatch(filteredByCategory("Furniture"));
  }, [dispatch, categoriesList.length, list.length]);

  return (
    <>
      <Poster />
      <Products products={list} amount={10} title="Trending" />
      <Categoires categories={categoriesList} amount={5} title="Worth seeing" />
      <Products products={categoryFilter} amount={5} title="Furnitures" />

      <Banner imageList={list} amount={3} />

      <Products products={filtered} amount={5} title="Less than 30$" />
    </>
  );
};

export default Home;
