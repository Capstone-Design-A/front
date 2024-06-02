import React from "react";
import { Link } from "react-router-dom";
import Container from "../shared/Container";
import styles from "./Category.module.css";
import { Navigate } from "react-router-dom";
import CategoryItem from "./CategoryItem";

function Category() {
  const categories = [
    { id: 1, name: "채소" },
    { id: 2, name: "과일" },
    { id: 3, name: "축산" },
    { id: 4, name: "쌀/잡곡" },
    { id: 5, name: "가공" },
    { id: 6, name: "김치" },
    { id: 7, name: "기타" },
  ];

  if (!categories || !categories.length) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Container>
        <div className={styles.menu}>
          <h1 className={styles.category}>카테고리</h1>
          <div className={styles.categoryList}>
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                color="#000"
              />
            ))}
          </div>
        </div>
        <div>
          <Link to="/">
            <h1 className={styles.home}>홈으로</h1>
          </Link>
        </div>
      </Container>
    </>
  );
}

export default Category;
