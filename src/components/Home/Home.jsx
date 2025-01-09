import React, { useEffect } from "react";
import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import Categoires from "../Categories/Categories";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../Banner/Banner";
import { filteredByPrice } from "../../store/products/productsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products.list);
  const categoriesList = useSelector((state) => state.categories.list);
  const filteredProducts = useSelector((state) => state.products.filtered);

  const tasks = () => {
    const reverseArray = (arr) => {
      const reverseArr = [];
      for (let i = arr.length - 1; i >= 0; i--) {
        reverseArr.push(arr[i]);
      }

      return reverseArr;
    };
    console.log(reverseArray(["sense", "make", "all", "will", "this"]));

    const greeatAliens = (arr) => {
      // const message = `Oh powerful ${names}, we humans offer our unconditional surrender!`;

      let message = "";
      for (let name of arr) {
        message += `Oh powerful ${name}, we humans offer our unconditional surrender!`;
      }
      return message;
    };

    console.log(greeatAliens(["Blorgous", "Glamyx", "Wegord", "SpaceKing"]));
  };

  // tasks();

  useEffect(() => {
    if (!categoriesList.length) return;

    dispatch(filteredByPrice(30));
  }, [dispatch, categoriesList.length]);

  return (
    <>
      <Poster />
      <Products products={productsList} amount={5} title="Trending" />
      <Categoires categories={categoriesList} amount={5} title="Worth seeing" />
      <Banner imageList={productsList} amount={5} />
      <Products products={filteredProducts} amount={5} title="Less than 30$" />
    </>
  );
};

export default Home;
