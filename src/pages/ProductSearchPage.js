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
  // eslint-disable-next-line
  const [page, setPage] = useState(1);
  const size = 10;
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await getSearchItems(
          page,
          size,
          keyword,
          "JWT_TOKEN"
        );
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [page, size, keyword]);

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
          <ListPage title={`"${keyword}" 에 대한 검색 결과입니다.`}>
            <div className={styles.content}>
              {products.length > 0 ? (
                <>
                  <p className={styles.count}>총 {products.length}개의 상품</p>
                  <div>
                    <SearchItems products={products} />
                  </div>
                </>
              ) : (
                <h1 className={styles.noResult}>
                  <Warn
                    variant="big"
                    title="관련 상품이 없습니다."
                    description="검색어가 정확하게 입력되었는지 확인해 보세요."
                  />
                </h1>
              )}
            </div>
          </ListPage>
        </div>
      </div>
    </>
  );
}

export default ProductSearchPage;
