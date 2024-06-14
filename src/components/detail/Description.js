import React from "react";
import { Container } from "react-bootstrap";
import styles from "./Description.module.css";

function Description({ item }) {
  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.img}>
          <img src={item.itemDetailsImageUrl} alt={item.itemDetailsImageUrl} />
        </div>
      </div>
    </Container>
  );
}

export default Description;
