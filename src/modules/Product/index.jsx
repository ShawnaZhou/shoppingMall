import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Button, Dialog } from "@/components";
import { baseUrl } from "@/assets/constants";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

const ProductModule = (props) => {
  const { userId } = props;
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [curImg, setCurImg] = useState("");
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    product_name: "",
    product_description: "",
    product_price: "",
    type: "",
    product_stock_num: "",
    picture_link: "",
  });

  useEffect(() => {
    if (userId) getProductList(userId);
  }, [userId]);
  const getProductList = (userId) => {
    const url = `${baseUrl}/product/userId?userId=${userId}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.code == 200) {
          let temp = res.msg.map((item) => {
            let link = item.pictureLink.replaceAll(
              "http://127.0.0.1:5001",
              baseUrl
            );
            return { ...item, pictureLink: link.split("|")[0] };
          });
          setList(temp);
        }
      });
  };
  const handleImgUpload = (e) => {
    if (!e?.target?.files) return;
    console.log(e.target.files);
    let formData = new FormData();
    formData.append("file1", e.target.files[0]);
    formData.append("cnt", 1);
    const url = `${baseUrl}/file`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.code == 200) {
          let link = res.msg;
          link = res.msg.replaceAll("http://127.0.0.1:5001", baseUrl);
          console.log(link);
          setCurImg(link.split("|")[0]);
          setForm({ ...form, picture_link: res.msg });
        }
      });
  };
  const handleConfirm = () => {
    const url = `${baseUrl}/product/add`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, owner_id: userId }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code == 200) {
          toast("新增成功！");
          setModal(false);
        }
      });
  };
  return (
    <div className={styles.container}>
      <ToastContainer position="top-center" theme="dark" />
      <Dialog height={"50rem"} isOpen={modal}>
        <div className={styles.dialog}>
          <h2>新增商品</h2>
          <div className={styles.dialogContent}>
            <div className={styles.dialogItem}>
              <label className={styles.label} htmlFor="phone">
                商品名称
              </label>
              <input
                className={styles.inputs}
                type="text"
                id="phone"
                value={form.product_name}
                onChange={(e) =>
                  setForm({ ...form, product_name: e.target.value })
                }
              />
            </div>
            <div className={styles.dialogItem}>
              <label className={styles.label} htmlFor="location">
                商品描述
              </label>
              <textarea
                className={styles.inputs}
                type="text"
                rows={5}
                value={form.product_description}
                id="location"
                onChange={(e) =>
                  setForm({ ...form, product_description: e.target.value })
                }
              />
            </div>
            <div className={styles.dialogItem}>
              <label className={styles.label} htmlFor="name">
                商品价格
              </label>
              <input
                className={styles.inputs}
                type="text"
                id="name"
                value={form.product_price}
                onChange={(e) =>
                  setForm({ ...form, product_price: e.target.value })
                }
              />
            </div>
            <div className={styles.dialogItem}>
              <label className={styles.label} htmlFor="job">
                商品类别
              </label>
              <input
                className={styles.inputs}
                type="text"
                id="job"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              />
            </div>
            <div className={styles.dialogItem}>
              <label className={styles.label} htmlFor="birthday">
                商品库存
              </label>
              <input
                className={styles.inputs}
                value={form.product_stock_num}
                onChange={(e) => {
                  setForm({ ...form, product_stock_num: e.target.value });
                }}
                type="text"
                id="birthday"
              />
            </div>
            <div className={styles.dialogItem}>
              <label className={styles.label} htmlFor="birthday">
                商品图片
              </label>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                  className={styles.inputs}
                  accept="image/*"
                  onChange={(e) => handleImgUpload(e)}
                  type="file"
                  id="birthday"
                />
                {curImg?.length > 0 && (
                  <img
                    style={{
                      width: 180,
                      height: 180,
                      objectFit: "contain",
                      marginTop: 10,
                    }}
                    src={curImg}
                    alt="*"
                  />
                )}
              </div>
            </div>
          </div>
          <div className={styles.dialogFooter}>
            <Button
              style={{
                background: "transparent",
                color: "#000",
                marginRight: "1rem",
              }}
              onClick={() => setModal(false)}
            >
              CANCEL
            </Button>
            <Button disabled={!form.picture_link} onClick={handleConfirm}>
              CONFIRM
            </Button>
          </div>
        </div>
      </Dialog>
      <Button onClick={() => setModal(true)}>添加商品</Button>
      {list.length == 0 && (
        <div
          style={{
            height: "5rem",
            width: "100%",
            lineHeight: "5rem",
            textAlign: "center",
          }}
        >
          暂无商品
        </div>
      )}
      <div className={styles.list}>
        {list.length > 0 &&
          list.map((item) => {
            return (
              <div
                key={item.productId}
                className={styles.listItem}
                onClick={() => {
                  router.push(`/detail?productId=${item.productId}`);
                }}
              >
                <img
                  className={styles.image}
                  src={item.pictureLink}
                  alt={item.productName}
                />
                <div className={styles.detail}>
                  <span>{item.productName} </span>
                  <span className={styles.tag}>{item.type}</span>
                  <span> ¥{item.productPrice}</span>
                  <span>COUNT:{item.productStockNumber}</span>
                  <div className={styles.desc}>{item.productDescription}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductModule;

