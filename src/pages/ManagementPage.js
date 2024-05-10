// 판매자 관리 페이지입니다.
// Category는 판메자 카테고리로 수정
import { useState } from "react";
import ManagementHeader from "../components/managements/ManagementHeader";
import OrderList from "../components/managements/OrderList";
import ProductList from "../components/managements/ProductList";
import Category from "../components/category/Category";
import styles from "./ManagementPage.module.css";
import MonthlySales from "../components/managements/MonthlySales";

function ManagementPage() {
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  const toggleCategoryVisibility = () => {
    setIsCategoryVisible((prev) => !prev);
  };

  return (
    <>
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
      <div>
        <ManagementHeader />
      </div>
      <div className={styles.orderList}>
        <OrderList />
      </div>
      <div className={styles.productList}>
        <ProductList />
      </div>
      <div className={styles.monthlySales}>
        <MonthlySales />
      </div>
    </>
  );
}

export default ManagementPage;
