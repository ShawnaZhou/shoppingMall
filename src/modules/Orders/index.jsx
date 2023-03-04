import React, { useState, useEffect } from "react";
import Header from "../Header";
import styles from "./styles.module.css";
import { baseUrl } from "@/assets/constants";
import dayjs from "dayjs";

const OrdersModule = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    getOrderList();
  }, []);
  const getOrderList = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const url = `${baseUrl}/order/userId?userId=${userInfo.userId}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.code == 200) {
          setList(res.msg);
        }
      });
  };
  return (
    <>
      <Header />
      <div className={styles.orderContainer}>
        {list.length > 0 &&
          list.map((item, index) => {
            return (
              <div className={styles.orderItem} key={item.order.orderId}>
                <div className={styles.orderItemPic}>
                  <img
                    className={styles.orderItemImg}
                    src={item.product.pictureLink}
                    alt={item.product.productName}
                  />
                </div>
                <div className={styles.orderItemDetail}>
                  <span>ORDERID: {item.order.orderId}</span>
                  <h3 style={{ textTransform: "uppercase" }}>
                    {item.product.productName}
                  </h3>
                  <span className={styles.tag}> {item.product.type}</span>
                  <div className={styles.price}>¥ {item.order.orderPrice}</div>
                  <div className={styles.count}>x {item.order.saleNum}</div>
                  <div style={{ marginTop: "1rem" }}>
                    {dayjs(item.order.CreateDate).format("YYYY-MM-DD HH:mm")}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default OrdersModule;

