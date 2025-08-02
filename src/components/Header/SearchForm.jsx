import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./SearchForm.module.scss";
import { UseEscapeKey } from "../../hooks/UseEscapeKey";
import { useGetProductWithFilterQuery } from "../../store/api/apiSlice";
import { Link } from "react-router-dom";
import UseClickOutside from "../../hooks/UseClickOutside";

function SearchForm() {
  const [searchValue, setSearchValue] = useState("");

  const [searchForm, setSearchForm] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);

  const formRef = useRef(null);

  const { data = [], isLoading } = useGetProductWithFilterQuery({
    title: searchValue,
  });

  const handleSeacrh = (e) => {
    setSearchValue(e.target.value);
  };

  const openSearchModal = useCallback(() => {
    setSearchForm(true);
  }, []);

  const closeSearchModal = useCallback(() => {
    setSearchValue("");
    setSearchForm(false);
  }, []);

  const notActiveHandler = useCallback(() => {
    setIsFormActive(false);
  }, []);

  UseEscapeKey(closeSearchModal);

  UseClickOutside(
    formRef,
    () => {
      closeSearchModal();
      notActiveHandler();
    },
    []
  );

  return (
    <form
      className={`${styles.form} ${isFormActive ? styles.active : ""}`}
      ref={formRef}
      onClick={() => setIsFormActive(true)}
    >
      <div className={styles.icon}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
        </svg>
      </div>

      <div className={styles.input} onClick={openSearchModal}>
        <input
          type="search"
          autoComplete="off"
          placeholder="Search for anything"
          name="search"
          onChange={handleSeacrh}
          value={searchValue}
        />
      </div>

      <div
        className={`${styles.box} ${
          searchForm && searchValue ? styles.active : ""
        }`}
      >
        {isLoading
          ? "..Loading"
          : !data.length
          ? "No results"
          : data.map(({ images, id, title }) => (
              <Link
                className={styles.item}
                onClick={closeSearchModal}
                to={`/products/${id}`}
                key={id}
              >
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url(${images[0]})` }}
                />
                <div className={styles.title}>{title}</div>
              </Link>
            ))}
      </div>
    </form>
  );
}

export default SearchForm;
