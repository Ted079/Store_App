import { useCallback, useRef, useState } from "react";
import styles from "./SearchForm.module.scss";
import { UseEscapeKey } from "../../hooks/UseEscapeKey";
import { useGetProductWithFilterQuery } from "../../store/api/apiSlice";
import UseClickOutside from "../../hooks/UseClickOutside";
import { useMediaQuery } from "react-responsive";
import Items from "./Items";
import Input from "./Input";

function SearchForm() {
  const [searchValue, setSearchValue] = useState("");

  const [searchForm, setSearchForm] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);

  const formRef = useRef(null);

  const isMobile = useMediaQuery({ maxWidth: 1024 });

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
      <Input
        onClick={openSearchModal}
        onChange={handleSeacrh}
        value={searchValue}
      />

      <div className={`${styles.box} ${searchForm ? styles.active : ""}`}>
        {isMobile && (
          <div className={styles.inputWrapper}>
            <div className={styles.back2} onClick={closeSearchModal}>
              <svg>
                <use
                  xlinkHref={`${process.env.PUBLIC_URL}/newSprite.svg#back2`}
                />
              </svg>
            </div>
            <Input
              onClick={openSearchModal}
              onChange={handleSeacrh}
              value={searchValue}
            />
          </div>
        )}

        {isLoading ? (
          "..Loading"
        ) : !data.length ? (
          "No results"
        ) : searchValue ? (
          data.map(({ images, id, title }) => (
            <Items
              onClick={closeSearchModal}
              images={images}
              id={id}
              title={title}
            />
          ))
        ) : (
          // возможно поменять
          <>
            <p>Worth seeing</p>
            {data.slice(4, 7).map(({ images, id, title }) => (
              <Items
                key={id}
                onClick={closeSearchModal}
                images={images}
                id={id}
                title={title}
              />
            ))}
          </>
        )}
      </div>
    </form>
  );
}

export default SearchForm;
