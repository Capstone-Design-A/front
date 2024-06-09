import React from "react";
import styles from "./Description.module.css";

function Description({ item }) {
  return (
    <div className={styles.img}>
      <img src={item.itemDetailsImageUrl} alt="imageUrl" />
    </div>
  );
}

export default Description;
