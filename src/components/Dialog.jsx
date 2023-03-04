import React from "react";
import Modal from "react-modal";
import styles from "./index.module.css";

const Dialog = (props) => {
  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      width: props.width ? props.width : "50vw",
      height: props.height ? props.height : "50vh",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: 15,
      transform: "translate(-50%, -50%)",
    },
  };
  Modal.setAppElement("#root");
  return (
    <Modal className={styles.Modal} isOpen={props.isOpen} style={customStyles}>
      {props.children}
    </Modal>
  );
};

export default Dialog;

