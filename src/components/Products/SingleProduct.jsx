import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../store/api/apiSlice";
import Product from "./Product";
import { ROUTES } from "../../utils/route";
import { useDispatch, useSelector } from "react-redux";
import { relatedProducts } from "../../store/products/productsSlice";
import Products from "./Products";
import Sidebar from "../Sidebar/Sidebar";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { list, related } = useSelector(({ products }) => products);
  const categoriesList = useSelector((state) => state.categories.list);

  const { data, isLoading, isSuccess, isFetching } = useGetProductQuery({ id });
  console.log(data?.category?.id);

  useEffect(() => {
    if (!isLoading && !isSuccess && !isFetching) {
      navigate(ROUTES.NOTFOUND);
    }
  }, [isLoading, isSuccess, isFetching, navigate]);

  useEffect(() => {
    if (!data || !list.length) return;
    dispatch(relatedProducts(data.category.id));
  }, [data, dispatch, list.length]);

  return !data ? (
    <section className="preloader">...Loading</section>
  ) : (
    <>
      <Sidebar title="CATEGORIES" list={categoriesList} />
      <Product {...data} />
      <Products products={related} amount={5} title="Related Products" />
    </>
  );
};

export default SingleProduct;
