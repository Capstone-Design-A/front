// 판매자 관리 페이지입니다.
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SellerCategory from "../components/category/SellerCategory";
import ManagementHeader from "../components/managements/ManagementHeader";
import MonthlySales from "../components/managements/MonthlySales";
import styles from "./ManagementPage.module.css";
import SellerOrderListPage from "./SellerOrderListPage";
import SellerItemListPage from "./SellerItemListPage";

function ManagementPage() {
  const { sellerId } = useParams();
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
          <SellerCategory sellerId={sellerId} page={page} size={size} />
        </div>
      </div>
      <div>
        <ManagementHeader />
      </div>
      <div className={styles.orderList}>
        <SellerOrderListPage />
      </div>
      <div className={styles.productList}>
        <SellerItemListPage />
      </div>
      <div className={styles.monthlySales}>
        <MonthlySales />
      </div>
    </>
  );
}

export default ManagementPage;
