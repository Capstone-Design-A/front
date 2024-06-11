import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ProductPage.module.css";
import CategoryProducts from "../components/product/CategoryProducts";
import { getItemsByCategory } from "../api/api.js";
import ListPage from "../components/product/ListPage";
import Category from "../components/category/Category";

function ProductCategoryPage() {
  const location = useLocation();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const size = 10;
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

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

        const { itemList, totalElement } = await getItemsByCategory(
          parsedCategoryId,
          1,
          size,
          "JWT_TOKEN"
        );
        setProducts(itemList);
        setTotalProducts(totalElement);
        setHasMore(itemList.length === size);
      } catch (error) {
        console.error("Error fetching category and products:", error);
      }
    };

    fetchData();
  }, [location.search]);

  useEffect(() => {
    const loadMore = async () => {
      try {
        setIsLoading(true);
        if (page === 1) return;
        const { itemList, totalElement } = await getItemsByCategory(
          category.id,
          page,
          size,
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
        console.error("Error loading more products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMore();
    // eslint-disable-next-line
  }, [page, category, size]);

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
          <ListPage title={categoryName}>
            <div className={styles.content}>
              <p className={styles.count}>총 {totalProducts}개의 상품</p>
              <div>
                <CategoryProducts products={products} />
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

export default ProductCategoryPage;
