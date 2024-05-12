import React from "react";
import { Link } from "react-router-dom";
import styles from "./CategoryItem.module.css";
import Container from "../shared/Container";

function SellerCategoryItem({ category, color, page = 1, size = 10 }) {
  return (
    <Container className={styles.container}>
      <Link
        to={`/item?category-id=${category.id}&page=${page}&size=${size}`}
        className={styles.link}
      >
        <h2 className={styles.title} style={{ color: color }}>
          {category.name}
        </h2>
      </Link>
    </Container>
  );
}

export default SellerCategoryItem;
