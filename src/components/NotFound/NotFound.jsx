import styles from "./NotFound.module.scss";

function NotFound() {
  return (
    <section className={styles.empty}>
      <div className={styles.redirect}>
        <h2>#404</h2>
        <h3>Page is not found :(</h3>
      </div>
    </section>
  );
}

export default NotFound;
