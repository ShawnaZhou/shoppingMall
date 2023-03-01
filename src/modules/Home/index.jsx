import React, { useState, useEffect } from "react";
import Header from "../Header/index.jsx";
import styles from "./style.module.css";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import Image from "next/image";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    const url = `http://100.125.109.30:5001/product/list`;
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
        <img className={styles.productImg} src={item.pictureLink} alt={"*"} />
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
          {/* <div className={styles.productAction}> */}
          {/* <a>查看</a> */}
          {/* </div> */}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.Main}>
      <Header />
      <h3>商品列表: </h3>
      <div className={styles.hotContainer}>
        {productList.length > 0 &&
          productList.map((item) => {
            return renderProduct(item);
          })}
      </div>
    </div>
  );
};

export default Home;

