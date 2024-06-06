// 판매자 관리 페이지입니다.
import React, { useState } from "react";
import SellerCategory from "../components/category/SellerCategory";
import MonthlySales from "../components/managements/MonthlySales";
import styles from "./ManagementPage.module.css";
import SellerOrderList from "./SellerOrderList";
import SellerImminentItemList from "./SellerImminentItemList";
import DashboardPage from "./DashboardPage";

function ManagementPage() {
  // eslint-disable-next-line
  const sellerId = localStorage.getItem("memberId");
  // eslint-disable-next-line
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [size, setSize] = useState(10);
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
          <SellerCategory page={page} size={size} />
        </div>
      </div>
      <div>
        <DashboardPage />
      </div>
      <div className={styles.orderList}>
        <SellerOrderList />
      </div>
      <div className={styles.productList}>
        <SellerImminentItemList />
      </div>
      <div className={styles.monthlySales}>
        <MonthlySales />
      </div>
    </>
  );
}

export default ManagementPage;
