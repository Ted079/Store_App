import styles from "./SearchForm.module.scss";
import { Link } from "react-router-dom";

function Items({ id, images, title, onClick }) {
  return <Link
      className={styles.item}
      onClick={onClick}
      to={`/products/${id}`}
      key={id}
    >
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${images[0]})` }}
      />
      <div className={styles.title}>{title}</div>
    </Link>
}

export default Items;
