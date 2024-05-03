// 메인페이지 카테고리 아이템 컴포넌트
// 페이지 사이즈 줄이면 CategoryList가 오른쪽으로 이동함 - 수정 필요
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../shared/Container";
import styles from "./Category.module.css";
import { getCategories } from "../../api/api.js";
import { Navigate } from "react-router-dom";
import CategoryItem from "./CategoryItem";

function Category() {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const initKeyword = searchParams.get("keyword");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("initKeyword:", initKeyword);
        const categoriesData = await getCategories(initKeyword);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [initKeyword]);

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
      </Container>
    </>
  );
}

export default Category;
