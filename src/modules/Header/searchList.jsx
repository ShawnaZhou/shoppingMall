import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useRouter } from "next/router";

const SearchList = (props) => {
  const [searchResult, setSearchList] = useState([]);
  const router = useRouter()
  const updateList = () => {
    setSearchList(props.list);
    console.log("list: ", props.list);
  };

  const handleMove = (data) => {
    router.push(`/detail?productId=${data.productId}`);
  };

  useEffect(() => {
    if (props?.list.length > 0) updateList();
  }, [props.list]);

  return (
    <div className={styles.searchList}>
      {searchResult &&
        searchResult.map((item) => {
          return (
            <div
              className={styles.product}
              key={item.productId}
              onClick={() => handleMove(item)}
            >
              <div className={styles.productImg}>
                <img className={styles.img} src={item.pictureLink} alt={"*"} />
              </div>
              <div className={styles.productDetail}>
                <span
                  style={{
                    margin: ".3rem 0",
                    fontWeight: "bolder",
                    fontSize: "1.2rem",
                  }}
                >
                  {item.productName}
                </span>
                <span className={styles.productDesc}>{item.type}</span>
                <span className={styles.productPrice}>
                  ¥{item.productPrice}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SearchList;

