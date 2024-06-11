import React from "react";
import styles from "./Description.module.css";

function Description({ item }) {
  return (
    <div className={styles.container}>
      {item &&
        item.imageUrls &&
        item.imageUrls.map((imageUrl, index) => (
          <div key={index} className={styles.img}>
            <img src={imageUrl} alt={`imageUrl-${index}`} />
          </div>
        ))}
    </div>
  );
}

export default Description;
