import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductWithFilterQuery } from "../../store/api/apiSlice";
import styles from "./Category.module.scss";
import Products from "../Products/Products";
import { useSelector } from "react-redux";

function Category() {
  const { id } = useParams();
  const { list } = useSelector(({ categories }) => categories);

  const defaultValues = {
    title: "",
    price_min: 0,
    price_max: 0,
  };

  const defaultParams = {
    categoryId: id,
    limit: 5,
    offset: 0,
    ...defaultValues,
  };

  const [items, setItems] = useState([]);
  const [categories, setCatories] = useState(null);
  const [params, setParams] = useState(defaultParams);
  const [values, setValue] = useState(defaultValues);
  const [end, setEnd] = useState(true);

  const {
    data = [],
    isLoading,
    isSuccess,
  } = useGetProductWithFilterQuery(params);

  useEffect(() => {
    if (!id) return;

    setValue(defaultValues);
    setItems([]);
    setEnd(true);
    setParams({ ...defaultParams, categoryId: id });
  }, [id]);

  useEffect(() => {
    if (!id || !list.length) return;
    const category = list.find((item) => item.id === Number(id)); //+, id * 1, Number(id)

    // const upperedName = "",
    // for(let i = 0; i < name.length; i++) {
    //   upperedName += name[i];
    // }
    // console.log(upperedName);

    setCatories(category);
  }, [id, list]);

  useEffect(() => {
    if (isLoading) return;
    if (!data.length) setEnd(false);

    setItems((prevItems) => [...prevItems, ...data]); // добавляем к загруженный данным, а не меняем их
  }, [isLoading, data]);

  const handleChange = ({ target: { name, value } }) => {
    setValue({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([]);
    setParams({ ...defaultParams, ...values }); // ...values будет обновлять значения, так как в params значения только defaultValues у которого значения дефолт, a values будет обновлять его за счет setValues
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{categories?.name}</h2>
      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Product name"
            value={values.title}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            onChange={handleChange}
            placeholder="0"
            value={values.price_min}
          />
          <span>Price from</span>
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            onChange={handleChange}
            placeholder="0"
            value={values.price_max}
          />
          <span>Price to</span>
        </div>

        <button type="submit" hidden />
      </form>

      {isLoading ? (
        <section className="preloader">...Loading</section> // add preloader component
      ) : !items.length || !isSuccess ? (
        <div className={styles.back}>
          <span>No results</span>
          <button
            onClick={() => {
              setValue(defaultValues);
            }}
          >
            Reset
          </button>
        </div>
      ) : (
        <Products
          products={items}
          style={{ padding: 0 }}
          title=""
          amount={items.length}
        />
      )}

      {end && (
        <div className={styles.more}>
          <button
            onScroll={() => {}}
            onClick={() => {
              setParams({ ...params, offset: params.offset + params.limit });
            }}
            // hidden
          >
            See more
          </button>
        </div>
      )}
    </div>
  );
}

export default Category;
