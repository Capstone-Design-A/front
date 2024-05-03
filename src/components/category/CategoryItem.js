import React from "react";
import { Link } from "react-router-dom";
import styles from "./CategoryItem.module.css";
import Container from "../shared/Container";

function CategoryItem({ category, color, page = 1, size = 10 }) {
  return (
    <Container className={styles.containerMain}>
      <Link
        to={`/item/${category.id}?page=${page}&size=${size}`}
        className={styles.link}
      >
        <h2 className={styles.title} style={{ color: color }}>
          {category.name}
        </h2>
      </Link>
    </Container>
  );
}

export default CategoryItem;
