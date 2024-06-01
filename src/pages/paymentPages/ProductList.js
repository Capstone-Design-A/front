import React from "react";
import styles from "./ProductList.module.css"; // 필요한 경우 스타일링 추가

function ProductList() {
  return (
    <div>
      <h2 className={styles.header}>주문상품</h2>
      <div className={styles.ordered_porductList}></div>
    </div>
  );
}

export default ProductList;
