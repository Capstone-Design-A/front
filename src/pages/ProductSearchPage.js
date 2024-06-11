import React, { useState, useEffect } from "react";
import styles from "./ProductPage.module.css";
import SearchItems from "../components/product/SearchItems";
import { getSearchItems } from "../api/api.js";
import ListPage from "../components/product/ListPage";
import Category from "../components/category/Category";
import Warn from "../components/shared/Warn";
import { useLocation } from "react-router-dom";

function ProductSearchPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const size = 10;
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { itemList, totalElement } = await getSearchItems(
          page,
          size,
          keyword,
          "JWT_TOKEN"
        );

        if (page === 1) {
          setProducts(itemList);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...itemList]);
        }

        setTotalProducts(totalElement);
        setHasMore(itemList.length === size);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, keyword]);

  useEffect(() => {
    setPage(1);
    setProducts([]);
  }, [keyword]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const toggleCategoryVisibility = () => {
    setIsCategoryVisible((prev) => !prev);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.toggleCategory} onClick={toggleCategoryVisibility}>
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
        <ListPage title={`"${keyword}" 에 대한 검색 결과입니다.`}>
          <div className={styles.content}>
            {products.length > 0 ? (
              <>
                <p className={styles.count}>총 {totalProducts}개의 상품</p>
                <div>
                  <SearchItems products={products} />
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
              </>
            ) : (
              !isLoading && (
                <h1 className={styles.noResult}>
                  <Warn
                    variant="big"
                    title="관련 상품이 없습니다."
                    description="검색어가 정확하게 입력되었는지 확인해 보세요."
                  />
                </h1>
              )
            )}
          </div>
        </ListPage>
      </div>
    </div>
  );
}

export default ProductSearchPage;
