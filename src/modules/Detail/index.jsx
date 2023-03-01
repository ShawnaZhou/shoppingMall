import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import { HeartIcon } from "@radix-ui/react-icons";
import { Button } from "@/components";

const DetailModule = () => {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(1);
  const { productId } = router.query;

  useEffect(() => {
    if (productId) getProductDetail();
  }, [productId]);

  const getProductDetail = () => {
    const url = `http://100.125.109.30:5001/product?productId=${productId}`;
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
    const url = `http://100.125.109.30:5001/shopcar`;
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
      {product && (
        <div className={styles.product}>
          <img
            src={product.pictureLink}
            className={styles.productImg}
            alt="*"
          />
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

            <span>{product.createDate}</span>
            <span className={styles.price}>¥{product.productPrice}</span>
            <span>COUNT: {product.productStockNumber}</span>
            <div className={styles.nums}>
              <button
                disabled={count == 1}
                className={styles.btn}
                style={{ marginLeft: 0 }}
                onClick={() => setCount(count - 1)}
              >
                -
              </button>
              <input
                className={styles.input}
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
              <button
                disabled={count == product.productCount}
                className={styles.btn}
                onClick={() => setCount(count + 1)}
              >
                +
              </button>
            </div>
            <Button
              className={styles.button}
              onClick={() => handleAddToCar(productId)}
            >
              加入购物车
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailModule;

