import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { Button, Dialog } from "@/components";
import { baseUrl } from "@/assets/constants";
import * as Avatar from "@radix-ui/react-avatar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Comment = (props) => {
  const { entityId } = props;
  const [modal, setModal] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (entityId) getComments();
  }, [entityId]);

  useEffect(() => {
    if (!modal) setComment("");
  }, [modal]);

  const getComments = () => {
    fetch(`${baseUrl}/comment?entityType=3&entityId=${entityId}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.code == 200) {
          setComments(res.msg);
        }
      });
  };

  const handleConfirm = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const data = {
      entityId: entityId,
      content: comment,
      userId: userInfo.userId,
      entityType: "3",
    };
    console.log("data", data);
    const url = `${baseUrl}/comment`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code == 200) {
          toast("评论成功！");
          setModal(false);
          getComments();
        } else toast("评论失败！");
      });
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-center" theme="dark" />
      <Dialog height={"20rem"} isOpen={modal}>
        <div className={styles.dialog}>
          <h2>评论</h2>
          <textarea
            rows="8"
            className={styles.input}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="请输入评论……"
          />
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
      <div className={styles.commentHeader}>
        <h3>评论</h3>
        {comments.length > 0 && (
          <Button onClick={() => setModal(true)}>现在评论</Button>
        )}
      </div>
      <div>
        {comments.length == 0 && (
          <div className={styles.empty}>
            <div>暂无评论……</div>
            <Button
              style={{ marginTop: "1.5rem" }}
              onClick={() => setModal(true)}
            >
              现在评论
            </Button>
          </div>
        )}
        {comments.length >= 1 &&
          comments.map((item) => {
            return (
              <div key={item.comment.id} className={styles.commentItem}>
                <div className={styles.Profile}>
                  <Avatar.Root className={styles.AvatarRoot}>
                    <Avatar.Image
                      className={styles.AvatarImage}
                      src={item.profile.userHeadUrl}
                      alt={item.profile.userName}
                    />
                  </Avatar.Root>
                  <span className={styles.userName}>
                    {item.profile.userName}
                  </span>
                </div>
                <div className={styles.detail}>
                  <p className={styles.content}>{item.comment.content}</p>
                </div>
                <div className={styles.date}>{item.comment.createDate}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Comment;

