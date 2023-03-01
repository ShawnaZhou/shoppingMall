import React, { useState } from "react";
import styles from "./index.module.css";
import SearchList from "./searchList";
import * as Avatar from "@radix-ui/react-avatar";
import { Button } from "../../components/";
const Header = () => {
  const [keyword, setKeyword] = useState("");
  const handleSearch = () => {
    const url = ``;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ keyword: keyword }),
    });
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.avatar}>
          <h2>医疗商城</h2>
          <Avatar.Root className={styles.AvatarRoot}>
            <Avatar.Image
              className={styles.AvatarImage}
              src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
              alt="*"
            />
            <Avatar.Fallback className={styles.AvatarFallback} delayMs={600}>
              CT
            </Avatar.Fallback>
          </Avatar.Root>
        </div>
        <div className={styles.header}>
          <input
            placeholder={"搜索..."}
            onChange={(e) => setKeyword(e.target.value)}
            className={styles.input}
          />
          <Button onClick={() => handleSearch} style={{ marginLeft: "1rem" }}>
            搜索
          </Button>
        </div>
      </div>
      <SearchList />
    </>
  );
};

export default Header;

