import React, { useState } from "react";
import { LoginBack, B1 } from "@/assets";
import * as Label from "@radix-ui/react-label";
import Image from "next/image";
import * as Toast from "@radix-ui/react-toast";
import styles from "./styles.module.css";
import { Button, Dialog } from "../../components/";
import { useRouter } from "next/router";
import { baseUrl } from "@/assets/constants";

const LoginModule = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [form, setForm] = useState({
    phone: "",
    password: "",
    username: "",
    cardId: "",
  });
  const [modal, setModal] = useState(false);

  const handleLogin = () => {
    const data = {
      phone: userName,
      password: password,
    };
    const url = `${baseUrl}/login`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res.code == 200) {
          localStorage.setItem("userInfo", JSON.stringify(res.msg));
          router.push("/home");
        } else {
          window.alert("登陆失败！");
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const handleConfirm = () => {
    const url = `${baseUrl}/register`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code == 200) {
          console.log(res);
          localStorage.setItem("userInfo", JSON.stringify(res.msg));
          router.push("/home");
        }
      });
  };
  return (
    <div className={styles.container}>
      <Dialog height={"30rem"} isOpen={modal}>
        <div className={styles.dialog}>
          <h2>注册</h2>
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
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className={styles.dialogItem}>
              <label className={styles.label} htmlFor="location">
                密码
              </label>
              <input
                className={styles.inputs}
                type="password"
                value={form.password}
                id="location"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>
            <div className={styles.dialogItem}>
              <label className={styles.label} htmlFor="job">
                身份证号
              </label>
              <input
                className={styles.inputs}
                type="text"
                id="job"
                value={form.cardId}
                onChange={(e) => setForm({ ...form, cardId: e.target.value })}
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
      <Image className={styles.bgImg} src={B1} alt="*" />
      <div className={styles.mainContent}>
        <h2 className={styles.title}>LOGIN</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 20px",
            flexWrap: "wrap",
            gap: 15,
            alignItems: "flex-start",
          }}
        >
          <Label.Root className={styles.LabelRoot} htmlFor="username">
            PHONE
          </Label.Root>
          <input
            className={styles.Input}
            type="text"
            id="username"
            defaultValue=""
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            padding: "0 20px",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: 15,
            alignItems: "flex-start",
            marginTop: "1.5rem",
          }}
        >
          <Label.Root className={styles.LabelRoot} htmlFor="password">
            PASSWORD
          </Label.Root>
          <input
            className={styles.Input}
            type="password"
            id="password"
            defaultValue=""
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button className={styles.button} onClick={handleLogin}>
          CONFIRM
        </Button>
        <h4>or</h4>
        <Button
          style={{
            width: "200px",
            height: "50px",
            letterSpacing: ".3rem",
            fontSize: "1rem",
          }}
          onClick={() => setModal(true)}
        >
          REGISTER
        </Button>
      </div>
    </div>
  );
};

export default LoginModule;

