import React, { useState, useEffect } from "react";
import Header from "../Header/index.jsx";
import styles from "./style.module.css";
import { useRouter } from "next/router";
import { baseUrl } from "@/assets/constants";

const Home = () => {
  const router = useRouter();
  const [productList, setProductList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [types, setTypes] = useState([]);
  useEffect(() => {
    getProducts();
    getTypes();
  }, []);

  const getTypes = () => {
    const url = `${baseUrl}/product/product_type`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.code == 200) {
          setTypes(res.msg);
        }
      });
  };

  const getProducts = () => {
    const url = `${baseUrl}/product/list`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setProductList(res.msg);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const handleMove = (data) => {
    router.push(`/detail?productId=${data.productId}`);
  };

  const renderProduct = (item) => {
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
          <span className={styles.productPrice}>¥{item.productPrice}</span>
        </div>
      </div>
    );
  };

  const handleTagChange = (item) => {
    console.log(item);
    let temp = [...selected];
    if (selected.includes(item)) {
      let index = selected.indexOf(item);
      temp.splice(index, 1);
      setSelected(temp);
    } else {
      temp = [...selected, item];
      setSelected(temp);
    }
    let res = productList.filter((item) => {
      return temp.includes(item.type);
    });
    setFilterList([...res]);
  };

  return (
    <div className={styles.Main}>
      <Header />
      <div className={styles.tags}>
        {types.map((item) => {
          const isChecked = selected.indexOf(item) > -1;
          return (
            <span
              className={`${styles.tag} ${isChecked && styles.checkedTag}`}
              key={item}
              onClick={() => handleTagChange(item)}
            >
              {item}
            </span>
          );
        })}
      </div>
      {/* <h2 style={{ marginLeft: "1rem" }}>商品列表 </h2> */}
      <div className={styles.hotContainer}>
        {filterList.length == 0 &&
          productList.length > 0 &&
          productList.map((item) => {
            return renderProduct(item);
          })}
        {filterList &&
          filterList.map((item) => {
            return renderProduct(item);
          })}
      </div>
    </div>
  );
};

export default Home;

