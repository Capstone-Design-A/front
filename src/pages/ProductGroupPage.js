import React, { useState, useEffect } from "react";
import styles from "./ProductPage.module.css";
import GroupItems from "../components/product/GroupItems";
import { getGroupItems } from "../api/api.js";
import ListPage from "../components/product/ListPage";
import Category from "../components/category/Category";

function ProductGroupPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const size = 10;
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentPage = page || 1;
        const fetchedProducts = await getGroupItems(
          currentPage,
          size,
          null,
          "JWT_TOKEN"
        );
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [page, size]);

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
          <ListPage title="공동 구매 진행 상품">
            <div className={styles.content}>
              <p className={styles.count}>총 {products.length}개의 상품</p>
              <div>
                <GroupItems products={products} />
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

export default ProductGroupPage;
