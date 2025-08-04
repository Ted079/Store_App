import React, { useEffect, useState } from "react";
import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import Categoires from "../Categories/Categories";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../Banner/Banner";
import { filteredByPrice, filteredByCategory } from "../../store/products/productsSlice";
import Sidebar from "../Sidebar/Sidebar";
import CategoiresForm from "../Sidebar/CategoriesForm";
import Preloader from "../Preloader/Preloader";

const Home = () => {
  const { showSidebar } = useSelector(({ user }) => user);
  const { list, filtered, categoryFilter } = useSelector(({ products }) => products);

  console.log(list);
  
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products.list);
  const categoriesList = useSelector((state) => state.categories.list);
  const filteredProducts = useSelector((state) => state.products.filtered);

  useEffect(() => {
    if (!list.length) return;
    
    dispatch(filteredByPrice(30));
    dispatch(filteredByCategory("Furniture"));
  }, [dispatch, categoriesList.length, list.length]);

  return (
    <>
      <div className="home-layout">
        {showSidebar && <Sidebar list={categoriesList} title="CATEGORIES" />}

        {/* {showSidebar ? (
          <>
            <div className={`sidebar ${showSidebar ? "active" : ""}`}>
              <CategoiresForm list={categoriesList} title="CATEGORIES" />
            </div>

            <div className={`overlay ${showSidebar ? "active" : ""}`} />
          </>
        ) : (
          <></>
        )} */}
        <Poster />
      </div>
      <Products products={productsList} amount={10} title="Trending" />
      <Categoires categories={categoriesList} amount={6} title="Worth seeing" />
      <Products products={categoryFilter} amount={5} title="Furnitures" />

      <Banner imageList={productsList} amount={5} />

      <Products products={filtered} amount={5} title="Less than 30$" />
    </>
  );
};

export default Home;
