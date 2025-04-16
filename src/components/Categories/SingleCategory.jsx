import React from "react";
import Poster from "../Poster/Poster";
import Category from "./Category";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";

function SingleCategory() {
  const categoriesList = useSelector((state) => state.categories.list);

  return (
    <>
      <Sidebar title="CATEGORIES" list={categoriesList} />
      <Poster />
      <Category />
    </>
  );
}

export default SingleCategory;
