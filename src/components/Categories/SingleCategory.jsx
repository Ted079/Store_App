import React from "react";
import Poster from "../Poster/Poster";
import Category from "./Category";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";

function SingleCategory() {
  const categoriesList = useSelector((state) => state.categories.list);

  return (
    <>
      {/* <div className="home-layout">
        <Sidebar list={categoriesList} title="CATEGORIES" />
        <Poster />
      </div> */}
      <Category />
    </>
  );
}

export default SingleCategory;
