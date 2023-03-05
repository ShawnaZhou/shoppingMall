import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import SearchList from "./searchList";
import * as Avatar from "@radix-ui/react-avatar";
import { Button } from "../../components/";
import { baseUrl } from "@/assets/constants";
import { RefreshIcon } from "@radix-ui/react-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [list, setList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      let info = JSON.parse(localStorage.getItem("userInfo"));
      setUserInfo(info);
    }
  }, []);

  const handleSearch = (e) => {
    if (e && e.key != "Enter") return;
    if (keyword.length == 0) toast("请输入搜索内容");
    const url = `${baseUrl}/product/search?key=${keyword}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.code == 200) {
          setList(res.msg);
        }
      });
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    router.replace("../");
  };

  return (
    <>
      <div className={styles.container}>
        <ToastContainer position="top-center" theme="dark" />
        <div className={styles.avatar}>
          <h2 className={styles.home} onClick={() => router.replace("/home")}>
            Home
          </h2>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <Avatar.Root className={styles.AvatarRoot}>
                <Avatar.Image
                  className={styles.AvatarImage}
                  src={userInfo?.userHeadUrl}
                  alt={userInfo?.userName}
                />
                <Avatar.Fallback
                  className={styles.AvatarFallback}
                  delayMs={600}
                >
                  {userInfo?.userName}
                </Avatar.Fallback>
              </Avatar.Root>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className={styles.DropdownMenuContent}
                sideOffset={5}
              >
                <DropdownMenu.Item
                  onClick={() => router.push("/car")}
                  className={styles.DropdownMenuItem}
                >
                  购物车
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={() => router.push("/orders")}
                  className={styles.DropdownMenuItem}
                >
                  我的订单
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={() => router.push("/profile")}
                  className={styles.DropdownMenuItem}
                >
                  我的主页
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={logout}
                  className={styles.DropdownMenuItem}
                >
                  退出登陆
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
        <div className={styles.header}>
          <input
            placeholder={"搜索……"}
            onChange={(e) => setKeyword(e.target.value)}
            className={styles.input}
            onKeyDown={(e) => handleSearch(e)}
          />
          <Button onClick={handleSearch} className={styles.button}>
            <MagnifyingGlassIcon />
            <span>搜索</span>
          </Button>
        </div>
        <SearchList keyword={keyword} list={list} />
      </div>
    </>
  );
};

export default Header;

