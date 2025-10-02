import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../store/products/productsSlice";
import styles from "./CreateProduct.module.scss";
import { useNavigate } from "react-router-dom";

const CreareProduct = () => {
  const { currentUser, isLoading } = useSelector(({ user }) => user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    title: "",
    price: 0,
    description: "",
    categoryId: 0,
    images: [],
  });

  useEffect(() => {
    if (!currentUser && !isLoading) navigate("/login");
  }, [currentUser, isLoading, navigate]);

  const handleChange = ({ target: { name, value } }) => {
    let newValues = value;
    if (name === "price" || name === "categoryId") {
      newValues = Number(value);
    } else if (name === "images") {
      newValues = [value];
    }

    setValues((prev) => ({ ...prev, [name]: newValues }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createProduct(values));
    setValues({
      title: "",
      price: 0,
      description: "",
      categoryId: 0,
      images: [],
    });
  };
  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Product name"
          value={values.title}
          onChange={handleChange}
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={values.price}
          onChange={handleChange}
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          placeholder="Add description"
          value={values.description}
          onChange={handleChange}
        />

        <label htmlFor="categoryId">Category Id</label>
        <input
          type="number"
          name="categoryId"
          placeholder="Category Id"
          value={values.categoryId}
          onChange={handleChange}
        />

        <label htmlFor="images">Image URL</label>
        <input
          type="text"
          name="images"
          placeholder="Add image URL"
          value={values.images[0] || ""}
          onChange={handleChange}
        />
        <button>Create</button>
      </form>
    </section>
  );
};

export default CreareProduct;
