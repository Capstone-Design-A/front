import React from "react";
import styles from "./Description.module.css";

function Description({ item }) {
  const mainImageUrl =
    item && item.imageUrls && item.imageUrls.length > 0
      ? item.imageUrls[0]
      : "";

  console.log("item: ", item);
  console.log("imageUrl: ", mainImageUrl);
  return (
    <div className={styles.img}>
      <img src={mainImageUrl} alt="imageUrl" />
    </div>
  );
}

export default Description;
