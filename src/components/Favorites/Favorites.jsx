import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Favorites.module.scss";
import Products from "../Products/Products";
import Preloader from "../Preloader/Preloader";

function Favorites() {
  const navigate = useNavigate();

  const favorite = useSelector((state) => state.user.favorite);

  const { currentUser, isLoading } = useSelector(({ user }) => user);

  useEffect(() => {
    if (!isLoading && !currentUser) navigate("/login");
  }, [currentUser, isLoading, navigate]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      {favorite.length ? (
        <Products products={favorite} amount={50} title="Favorite goods" />
      ) : (
        <section className={styles.empty}>
          <div className={styles.redirect}>
            <h2>Your favorites are still empty</h2>
            <h3>
              Add products using the ❤️ icon so you don't lose them and can buy
              them later.
            </h3>
          </div>
        </section>
      )}
    </>
  );
}

export default Favorites;
