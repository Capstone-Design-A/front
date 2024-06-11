import React, { useState, useEffect } from "react";
import styles from "./ProductPage.module.css";
import SubscriptionItems from "../components/product/SubscriptionItems";
import { getSubscriptionItems } from "../api/api.js";
import ListPage from "../components/product/ListPage";
import Category from "../components/category/Category";

function ProductSubscriptionPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  const token = localStorage.getItem("accessToken");
  const isLoggedIn = !!token;
  const id = localStorage.getItem("memberId");
  const memberId = isLoggedIn ? id : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const size = 10;
        const type = isLoggedIn ? 0 : 1;
        const { itemList, totalElement } = await getSubscriptionItems(
          page,
          size,
          type,
          memberId
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
  }, [page, isLoggedIn, memberId, products.length]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
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
          <ListPage title="New! 구독하고 있는 판매자의 새 상품">
            <div className={styles.content}>
              <p className={styles.count}>총 {totalProducts}개의 상품</p>
              <div>
                <SubscriptionItems products={products} />
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

export default ProductSubscriptionPage;
