import React, { useEffect, useState } from "react";
import { baseUrl } from "@/assets/constants";
import styles from "./index.module.css";
import pubsub from "pubsub.js";
import Header from "../Header/";
import { Button } from "../../components/";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CarModule = () => {
  const [carList, setCarList] = useState([]);
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    pubsub.subscribe("updateCar", getCarList());
  }, []);

  const getCarList = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const url = `${baseUrl}/shopcar?userId=${userInfo.userId}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCarList(res.msg);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const handlePay = (row) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const data = {
      userId: userInfo.userId,
      productId: row.product.productId,
      orderPrice: Number(row.product.productPrice) * Number(row.shopCar.size),
      saleNum: row.shopCar.size,
      shopCarId: row.shopCar.shopCarId,
    };
    const url = `${baseUrl}/order`;
    fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code == 200) {
          toast("生成订单成功！");
          getCarList();
        }
      });
  };

  const handleChoose = (id) => {
    console.log(id, selected.includes(id));
    let tempData = [...selected];
    if (selected.includes(id)) {
      let index = selected.indexOf(id);
      tempData.splice(index, 1);
    } else tempData.push(id);
    console.log(tempData);
    setSelected(tempData);
  };

  const handleDelete = (item) => {
    console.log(item)
    let data = {
      shopCarId: item.shopCar.shopCarId,
    };
    let url = `${baseUrl}/shopcar`;
    fetch(url, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code == 200) {
          toast("删除成功");
        }
        getCarList();
      });
  };

  return (
    <>
      <Header />
      <ToastContainer position="top-center" theme="dark" />
      <div className={styles.car}>
        <div className={styles.carHeader}>
          <div>购物车</div>
          <div>
            {/* <Button
              disabled={selected.length == 0}
              style={{ marginRight: "1rem", backgroundColor: "red" }}
            >
              删除
            </Button> */}
            <Button disabled={selected.length == 0} className={styles.payBtn}>
              结算
            </Button>
          </div>
        </div>
        <div className={styles.carList}>
          {carList.length > 0 &&
            carList.map((item, index) => {
              return (
                <div className={styles.carItem} key={item.shopCar.shopCarId}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    style={{ cursor: "pointer" }}
                    value={selected.includes(item.shopCar.shopCarId)}
                    onClick={() => handleChoose(item.shopCar.shopCarId)}
                  />
                  <div className={styles.carItemPic}>
                    <img
                      className={styles.carItemImg}
                      src={item.product.pictureLink}
                      alt={item.product.productName}
                    />
                  </div>
                  <div className={styles.carItemDetail}>
                    <h3 style={{ textTransform: "uppercase" }}>
                      {" "}
                      {item.product.productName}
                    </h3>
                    <div className={styles.tag}> {item.product.type}</div>
                    <div className={styles.price}>
                      ¥ {item.product.productPrice}
                    </div>
                    <div className={styles.count}>x {item.shopCar.size}</div>
                    <Button
                      className={styles.patBtns}
                      onClick={() => handlePay(item)}
                    >
                      结算
                    </Button>
                  </div>
                  <Button
                    style={{
                      backgroundColor: "red",
                    }}
                    onClick={() => handleDelete(item)}
                  >
                    删除
                  </Button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default CarModule;

