import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListPage from "../components/product/ListPage";
import CategoryProducts from "../components/product/CategoryProducts";
import { getCategories, getItemsByCategory } from "../api/api.js";
import styles from "./ProductCategoryPage.module.css";
import Button from "../components/button/Button";
import Category from "../components/category/Category";

function ProductCategoryPage() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 카테고리 데이터 가져오기
        const categories = await getCategories();
        const categoryData = categories.find(
          (cat) => cat.id === parseInt(categoryId)
        );
        setCategory(categoryData);

        // 카테고리별 상품 목록 가져오기
        const productsData = await getItemsByCategory(
          parseInt(categoryId),
          1,
          10,
          "JWT_TOKEN"
        );
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching category and products:", error);
      }
    };

    fetchData();
  }, [categoryId]);

  const handleLoadMore = () => {
    setProductCount((prevCount) => prevCount + 6);
  };

  return (
    <>
      <div className={styles.categoryContainer}>
        <Category />
      </div>
      <div className={styles.contentContainer}>
        <ListPage title={category ? category.name : ""}>
          <div className={styles.content}>
            <p className={styles.count}>총 {products.length}개의 상품</p>
            <div>
              <CategoryProducts products={products.slice(0, productCount)} />
            </div>
            <div className={styles.loadMore}>
              {products.length > productCount && (
                <Button
                  className={styles.button}
                  variant="round"
                  onClick={handleLoadMore}
                >
                  더보기
                </Button>
              )}
            </div>
          </div>
        </ListPage>
      </div>
    </>
  );
}

export default ProductCategoryPage;
