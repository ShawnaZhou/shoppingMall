/* eslint-disable @next/next/no-img-element */
import { baseUrl } from "@/assets/constants";
import { Button, Dialog } from "@/components";
import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "../Header";
import ProductModule from "../Product";
import styles from "./styels.module.css";

const ProfileModule = () => {
  const [userInfo, setUserInfo] = useState({});
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [form, setForm] = useState({
    phone: "",
    location: "",
    name: "",
    job_info: "",
    user_id: "",
    birthday: "",
  });

  const getProfile = (id) => {
    const url = `${baseUrl}/info?userId=${id ? id : userId}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.code == 200) {
          console.log(res);
          setUserInfo(res.msg);
        }
      });
  };
  useEffect(() => {
    let { userId } = JSON.parse(localStorage.getItem("userInfo"));
    getProfile(userId);
    setUserId(userId);
  }, []);

  const handleConfirm = () => {
    const url = `${baseUrl}/update`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code == 200)
          toast("修改成功！", {
            position: "top-center",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        setModal(false);
        getProfile();
      });
  };
  const wakeUpModal = () => {
    setForm({
      phone: userInfo.userPhone == "null" ? "" : userInfo.userPhone,
      location: userInfo.userLocation == "null" ? "" : userInfo.userLocation,
      name: userInfo.userName == "null" ? "" : userInfo.userName,
      job_info: userInfo.userJobInfo == "null" ? "" : userInfo.userJobInfo,
      user_id: userInfo.userId,
      birthday: userInfo.userBirtyday || "",
    });
    setModal(true);
    console.log({
      phone: userInfo.userPhone == "null" ? "" : userInfo.userPhone,
      location: userInfo.userLocation == "null" ? "" : userInfo.userLocation,
      name: userInfo.userName == "null" ? "" : userInfo.userName,
      job_info: userInfo.userJobInfo == "null" ? "" : userInfo.userJobInfo,
      user_id: userInfo.userId,
      birthday: userInfo.userBirthDay,
    });
  };
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={`${styles.profile} ${styles.card}`}>
          <div className={styles.proBack}></div>
          <img
            src={userInfo.userHeadUrl}
            alt={userInfo.userName}
            className={styles.avatar}
          />
          <Dialog height={"40rem"} isOpen={modal}>
            <div className={styles.dialog}>
              <h2>编辑信息</h2>
              <div className={styles.dialogContent}>
                <div className={styles.dialogItem}>
                  <label className={styles.label} htmlFor="phone">
                    手机号
                  </label>
                  <input
                    className={styles.inputs}
                    type="text"
                    id="phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
                <div className={styles.dialogItem}>
                  <label className={styles.label} htmlFor="location">
                    地址
                  </label>
                  <input
                    className={styles.inputs}
                    type="text"
                    value={form.location}
                    id="location"
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                  />
                </div>
                <div className={styles.dialogItem}>
                  <label className={styles.label} htmlFor="name">
                    用户名
                  </label>
                  <input
                    className={styles.inputs}
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className={styles.dialogItem}>
                  <label className={styles.label} htmlFor="job">
                    职业
                  </label>
                  <input
                    className={styles.inputs}
                    type="text"
                    id="job"
                    value={form.job_info}
                    onChange={(e) =>
                      setForm({ ...form, job_info: e.target.value })
                    }
                  />
                </div>
                <div className={styles.dialogItem}>
                  <label className={styles.label} htmlFor="birthday">
                    生日
                  </label>
                  <input
                    className={styles.inputs}
                    value={form.birthday}
                    onChange={(e) => {
                      console.log(e);
                      setForm({ ...form, birthday: e.target.value });
                    }}
                    type="date"
                    id="birthday"
                  />
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
                <Button onClick={handleConfirm}>CONFIRM</Button>
              </div>
            </div>
          </Dialog>

          <div className={styles.profileContainer}>
            <div className={`${styles.Detail}`}>
              <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                {userInfo.userName}
              </span>
              <span style={{ fontSize: ".8rem", color: "gray" }}>
                @{userInfo.userId}
              </span>
            </div>
            <div className={styles.detailContainer}>
              <span>生日: {userInfo.userBirtyday}</span>
              <span>性别: {userInfo.userGender == "1" ? "男" : "女"}</span>
              <span>手机号: {userInfo.userPhone}</span>
              <span>身份证号: {userInfo.userCardId}</span>
              <span>
                地址:
                {userInfo.userLocation == "null"
                  ? " --"
                  : userInfo.userLocation}
              </span>
              <span>
                职业:
                {userInfo.userJobInfo == "null" ? " --" : userInfo.userJobInfo}
              </span>
            </div>
            <Button onClick={wakeUpModal}>修改信息</Button>
          </div>
        </div>
      </div>
      <ProductModule userId={userId} />
    </div>
  );
};

export default ProfileModule;

