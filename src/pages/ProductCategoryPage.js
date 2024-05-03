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
  console.log("Received categoryId:", categoryId);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [size, setSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching categories...");

        const categories = await getCategories();
        console.log("Categories:", categories);

        const parsedCategoryId = parseInt(categoryId);
        if (isNaN(parsedCategoryId)) {
          throw new Error("Invalid categoryId: NaN");
        }

        const categoryData = categories.find(
          (cat) => cat.id === parsedCategoryId
        );
        console.log("Selected category data:", categoryData);
        setCategory(categoryData);

        console.log("Fetching products...");

        const currentPage = page || 1;
        const pageSize = size || 10;

        const productsData = await getItemsByCategory(
          parsedCategoryId,
          currentPage,
          pageSize,
          "JWT_TOKEN"
        );
        console.log("Products:", productsData);
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
      <div className={styles.categoryContainer}>
        <Category />
      </div>
      <div className={styles.contentContainer}>
        <ListPage title={category ? category.name : ""}>
          <div className={styles.content}>
            <p className={styles.count}>총 {products.length}개의 상품</p>
            <div>
              <CategoryProducts products={products} />
            </div>
            <div className={styles.loadMore}>
              <Button
                className={styles.button}
                variant="round"
                onClick={handleLoadMore}
              >
                더보기
              </Button>
            </div>
          </div>
        </ListPage>
      </div>
    </>
  );
}

export default ProductCategoryPage;
