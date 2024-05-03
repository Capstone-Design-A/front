import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Container from "../components/shared/Container";
import styles from "./ProductCategoryPage.module.css";
import CategoryProducts from "../components/product/CategoryProducts";
import { getCategories, getItemsByCategory } from "../api/api.js";
import ListPage from "../components/product/ListPage";
import Category from "../components/category/Category";

function ProductCategoryPage() {
  const { categoryId } = useParams();
  const location = useLocation();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const size = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 카테고리 정보 가져오기
        const categories = await getCategories();
        const parsedCategoryId = parseInt(categoryId);
        const categoryData = categories.find(
          (cat) => cat.id === parsedCategoryId
        );
        setCategory(categoryData);

        // 상품 목록 가져오기
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
  }, [categoryId, page, size]);

  const handleLoadMore = () => {
    const nextPage = page !== undefined ? page + 1 : 1;
    setPage(nextPage);
  };

  return (
    <>
      <div>
        <Container>
          <h1>{category ? "" : "Loading..."}</h1>
        </Container>
      </div>
      <div className={styles.pageContainer}>
        <div className={styles.categoryContainer}>
          {/* <Category /> Category 컴포넌트를 추가하면 페이지 이동이 이루어지지 않는 문제 발생 */}
        </div>
        <div className={styles.pageContainer}>
          <ListPage title={category ? category.name : ""}>
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
