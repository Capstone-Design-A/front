import React from "react";
import styles from "./Description.module.css";

function Description({ item }) {
  return (
    <div className={styles.img}>
      <img src={item.itemDetailsImageUrl} alt="itemDetailsImageUrl" />
    </div>
  );
}

export default Description;
