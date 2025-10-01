import styles from "./Banner.module.scss";
import { useNavigate } from "react-router-dom";

const Banner = ({ imageList = [], amount = 0 }) => {
  const navigate = useNavigate();

  const list = [];
  for (let i = 0; i < imageList.length && i < amount; i++) {
    list.push(imageList[i]);
  }

  if (!list.length) return <div>ooops!</div>;

  return (
    <section className={styles.banner}>
      <div className={styles.wrapper}>
        {list.map(({ images, id }) => (
          <div key={id}>
            <div
              className={styles.right}
              key={id}
              style={{ backgroundImage: `url(${images[0]})` }}
              onClick={() => navigate(`/products/${id}`)}
            >
              <div className={styles.discount}>
                save up to <span>50%</span> off
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;
