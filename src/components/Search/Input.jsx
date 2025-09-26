import styles from "./SearchForm.module.scss";

const Input = ({ onClick, onChange, value }) => {
  return (
    <>
      <div className={styles.icon}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
        </svg>
      </div>

      <div className={styles.input} onClick={onClick}>
        <input
          type="search"
          autoComplete="off"
          placeholder="Search for anything"
          name="search"
          onChange={onChange}
          value={value}
        />
      </div>
    </>
  );
};

export default Input;
