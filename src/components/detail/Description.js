import React from "react";
import styles from "./Description.module.css";

function Description({ itemDetailsImageUrl }) {
  return (
    <div className={styles.img}>
      <img src={itemDetailsImageUrl} alt="itemDetailsImageUrl" />
    </div>
  );
}

export default Description;
