import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import dayjs from "dayjs";
import { Button } from "@/components";
import { baseUrl } from "@/assets/constants";
import Header from "../Header/";
import Comment from "@/modules/Comment";

const DetailModule = () => {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(1);
  const { productId } = router.query;

  useEffect(() => {
    if (productId) getProductDetail();
  }, [productId]);

  useEffect(() => {
    if (count > product.productStockNumber)
      setCount(product.productStockNumber);
  }, [count]);

  const getProductDetail = () => {
    const url = `${baseUrl}/product?productId=${productId}`;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setProduct(res.msg);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const handleAddToCar = (id) => {
    const url = `${baseUrl}/shopcar`;
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const data = {
      size: count,
      productId: productId,
      userId: userInfo.userId,
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.code == 200) console.log("success");
      });
  };
  return (
    <div>
      <Header />
      {product && (
        <div className={styles.product}>
          <div className={styles.img}>
            <img
              src={product.pictureLink}
              className={styles.productImg}
              alt="*"
            />
          </div>
          <div className={styles.productDetail}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <h3 style={{ fontSize: "1.5rem", textTransform: "uppercase" }}>
                {product.productName}
              </h3>
              <span className={styles.tag}>{product.type}</span>
            </div>
            <span style={{ color: "gray" }}>{product.productDescription}</span>

            <span style={{ margin: ".3rem" }}>
              {dayjs(product.createDate).format("YYYY-MM-DD HH:mm")}
            </span>
            <span className={styles.price}>¥{product.productPrice}</span>
            <span>COUNT: {product.productStockNumber}</span>
            <div className={styles.nums}>
              <Button
                disabled={count == 1}
                className={styles.btn}
                style={{ marginLeft: 0 }}
                onClick={() => setCount(count - 1)}
              >
                -
              </Button>
              <input
                className={styles.input}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
              />
              <Button
                disabled={count >= product.productStockNumber}
                className={styles.btn}
                onClick={() => setCount(count + 1)}
              >
                +
              </Button>
            </div>
            <Button
              style={{ width: "20rem", marginTop: "1rem" }}
              onClick={() => handleAddToCar(productId)}
            >
              加入购物车
            </Button>
          </div>
        </div>
      )}
      <Comment entityId={productId} />
      <div style={{ height: "5rem" }}></div>
    </div>
  );
};

export default DetailModule;

