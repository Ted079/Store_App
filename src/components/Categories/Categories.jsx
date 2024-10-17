import React from "react";
import styles from "./Categories.module.scss";
import { Link } from "react-router-dom";

const Categories = ({ title, amount, categories = [] }) => {
  const list = [];
  for (let i = 0; i < amount && i < categories.length; i++) {
    list.push(categories[i]);
  }
  console.log(list);

  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <div className={styles.list}>
        {list.map(({ name, id, image }) => (
          <Link to={`/categories/${id}`} key={id} className={styles.item}>
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${image})` }}
            />
            <h3>{name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
