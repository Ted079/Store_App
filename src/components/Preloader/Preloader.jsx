import styles from "./Preloader.module.scss";

function Preloader() {
  return <div className={styles.wrapper}>
      <div className={styles.spinner}/>
    </div>
}

export default Preloader;
