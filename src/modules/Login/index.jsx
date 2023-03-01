import React, { useState } from "react";
import { LoginBack } from "@/assets";
import * as Label from "@radix-ui/react-label";
import Image from "next/image";
import * as Toast from "@radix-ui/react-toast";
import styles from "./styles.module.css";
import { Button } from "../../components/";
import { useRouter } from "next/router";

const LoginModule = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = () => {
    const data = {
      phone: userName,
      password: password,
    };
    const url = `http://100.125.109.30:5001/login`;
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
        if (res) {
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
  return (
    <div className={styles.container}>
      <div className={styles.bgImg}></div>
      {/* <Image className={styles.bgImg} src={LoginBack} alt="*" /> */}
      <div className={styles.mainContent}>
        <h2 className={styles.title}>登陆</h2>
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
            用户名
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
            密码
          </Label.Root>
          <input
            className={styles.Input}
            type="password"
            id="password"
            defaultValue=""
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={handleLogin} style={{ marginTop: "3rem" }}>
          确认
        </Button>
      </div>
    </div>
  );
};

export default LoginModule;

