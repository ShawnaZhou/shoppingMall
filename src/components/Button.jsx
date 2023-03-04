import React from "react";
import styles from "./index.module.css";

const Button = (props) => {
  const classes = [props.className ? props.className : "", styles.button].join(
    " "
  );
  return (
    <>
      {classes && (
        <button className={classes} {...props}>
          {props.children}
        </button>
      )}
    </>
  );
};

export default Button;

