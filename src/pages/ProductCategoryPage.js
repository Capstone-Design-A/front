import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ListPage from "../components/product/ListPage";
import CategoryProducts from "../components/product/CategoryProducts";
import { getCategoryBySlug, getProductsByCategory } from "../api";
import styles from "./ProductCategoryPage.module.css";
import Button from "../components/button/Button";
import Category from "../components/category/Category";

function ProductCategoryPage() {
  const { categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug);
  const filteredProducts = getProductsByCategory(categorySlug);

  const [productCount, setProductCount] = useState(6);

  const handleLoadMore = () => {
    setProductCount((prevCount) => prevCount + 6);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.categoryContainer}>
        <Category />
      </div>
      <div className={styles.contentContainer}>
        <ListPage title={category.title}>
          <div className={styles.content}>
            <p className={styles.count}>
              총 {filteredProducts.length}개의 상품
            </p>
            <div>
              <CategoryProducts
                products={filteredProducts.slice(0, productCount)}
                category={categorySlug}
              />
            </div>
            <div className={styles.loadMore}>
              {filteredProducts.length > productCount && (
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
    </div>
  );
}

export default ProductCategoryPage;
