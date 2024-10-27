import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../store/api/apiSlice";
import Product from "./Product";

const SingleProduct = () => {
  const { id } = useParams();
  console.log(id);
  
  const { data, isLoading, isSuccess } = useGetProductQuery({id});
  // console.log(id);
  
  if(!id) {
    return <p>id отсутсвует</p>
  }

  console.log(data);

  return (
    <>
      {!data && <h1>{isSuccess}</h1>}
      <Product />
    </>
  );
};

export default SingleProduct;
