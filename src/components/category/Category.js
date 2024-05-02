import React, { useState, useEffect } from "react";
import { useSearchParams, Link, Navigate } from "react-router-dom";
import Container from "../shared/Container";
import styles from "./Category.module.css";
import { getCategories } from "../../api/api.js";
import CategoryItem from "./CategoryItem";

function Category() {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const initKeyword = searchParams.get("keyword");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        <div className={styles.categories}>
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
        <div className={styles.home}>
          <Link to="/">
            <button>홈으로</button>
          </Link>
        </div>
      </Container>
    </>
  );
}

export default Category;
