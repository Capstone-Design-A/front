import React, { useState, useEffect } from "react";
import styles from "./ProductPage.module.css";
import RankingItems from "../components/product/RankingItems";
import { getRankingItems } from "../api/api.js";
import ListPage from "../components/product/ListPage";
import Category from "../components/category/Category";

function ProductRankingPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const size = 10;
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const size = 10;
        const { itemList, totalElement } = await getRankingItems(
          page,
          size,
          null,
          "JWT_TOKEN"
        );
        if (itemList.length === 0) {
          setHasMore(false);
          return;
        }
        setProducts((prevProducts) => [...prevProducts, ...itemList]);
        setTotalProducts(totalElement);
        setHasMore(itemList.length === size && totalElement > products.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [page, size]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
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
          <ListPage title="구매 랭킹">
            <div className={styles.content}>
              <p className={styles.count}>총 {totalProducts}개의 상품</p>
              <div>
                <RankingItems products={products} />
              </div>
              {hasMore && (
                <div className={styles.loadMore}>
                  <button
                    className={styles.button}
                    onClick={handleLoadMore}
                    disabled={isLoading}
                  >
                    {isLoading ? "로딩 중..." : "더보기"}
                  </button>
                </div>
              )}
            </div>
          </ListPage>
        </div>
      </div>
    </>
  );
}

export default ProductRankingPage;
