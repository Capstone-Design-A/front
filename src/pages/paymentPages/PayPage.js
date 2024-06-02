import React from "react";
import styles from "./PayPage.module.css"; // 필요한 경우 스타일링 추가
import PayAddress from "./PayAddress";
import ProductList from "./ProductList";
import PayMethod from "./PayMethod";

function PayPage() {
  return (
    <div className={styles.container}>
      <PayAddress></PayAddress>
      <ProductList></ProductList>
      <PayMethod></PayMethod>
      <div className={styles.buttonContainer}>
        <button className={styles.paybutton}>결제</button>
      </div>
    </div>
  );
}

export default PayPage;
