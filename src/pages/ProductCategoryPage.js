import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ProductPage.module.css";
import CategoryProducts from "../components/product/CategoryProducts";
import { getItemsByCategory } from "../api/api.js";
import ListPage from "../components/product/ListPage";
import Category from "../components/category/Category";

function ProductCategoryPage() {
  const location = useLocation();
  // eslint-disable-next-line
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const size = 10;
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const categoryId = searchParams.get("category-id");
        if (!categoryId) {
          return;
        }

        const parsedCategoryId = parseInt(categoryId);
        if (isNaN(parsedCategoryId)) {
          throw new Error(`Invalid categoryId: ${categoryId}`);
        }

        switch (parsedCategoryId) {
          case 1:
            setCategoryName("채소");
            break;
          case 2:
            setCategoryName("과일");
            break;
          case 3:
            setCategoryName("축산");
            break;
          case 4:
            setCategoryName("쌀/잡곡");
            break;
          case 5:
            setCategoryName("가공");
            break;
          case 6:
            setCategoryName("김치");
            break;
          case 7:
            setCategoryName("기타");
            break;
          default:
            setCategoryName("");
            break;
        }

        setCategory({ id: parsedCategoryId });

        const currentPage = page || 1;
        const productsData = await getItemsByCategory(
          parsedCategoryId,
          currentPage,
          size,
          "JWT_TOKEN"
        );
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching category and products:", error);
      }
    };

    fetchData();
  }, [location.search, page, size]);

  const handleLoadMore = () => {
    const nextPage = page !== undefined ? page + 1 : 1;
    setPage(nextPage);
  };

  const toggleCategoryVisibility = () => {
    setIsCategoryVisible((prev) => !prev);
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <div
          className={styles.toggleCategory}
          onClick={toggleCategoryVisibility}
        >
          <span className={styles.icon}>☰</span>
        </div>
        <div
          className={`${styles.categoryContainer} ${
            isCategoryVisible ? styles.visible : ""
          }`}
        >
          <div className={styles.categoryContent}>
            <Category />
          </div>
        </div>
        <div className={styles.pageContainer}>
          <ListPage title={categoryName}>
            <div className={styles.content}>
              <p className={styles.count}>총 {products.length}개의 상품</p>
              <div>
                <CategoryProducts products={products} />
              </div>
              <div className={styles.loadMore}>
                <button className={styles.button} onClick={handleLoadMore}>
                  더보기
                </button>
              </div>
            </div>
          </ListPage>
        </div>
      </div>
    </>
  );
}

export default ProductCategoryPage;
