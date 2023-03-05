import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { baseUrl } from "@/assets/constants";
import { useRouter } from "next/router";

const SearchList = (props) => {
  const [searchResult, setSearchList] = useState([]);
  const { keyword } = props || "";
  const router = useRouter();
  const updateList = () => {
    let list = props.list.map((item) => {
      let link = item.pictureLink.replaceAll("http://127.0.0.1:5001", baseUrl);
      return { ...item, pictureLink: link.split("|")[0] };
    });
    setSearchList(list);
  };

  const handleMove = (data) => {
    router.push(`/detail?productId=${data.productId}`);
  };

  useEffect(() => {
    if (props?.list) updateList();
    console.log(props);
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
      {searchResult.length == 0 && keyword.length > 0 && (
        <div
          style={{
            height: "5rem",
            color: "white",
            textShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          暂无相关商品
        </div>
      )}
    </div>
  );
};

export default SearchList;

