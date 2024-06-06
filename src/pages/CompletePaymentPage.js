import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./CompletePaymentPage.module.css";

function CompletePaymentPage() {
  const location = useLocation();
  const { products, totalAmount } = location.state;
  const totalPricePerProduct = products.map(
    (product) => product.price * product.quantity
  );
  console.log("products: ", products);
  console.log("totalAmount: ", totalAmount);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>결제가 정상적으로 완료되었습니다.</h2>
        <div className={styles.paymentList}>
          {products.map((product, index) => (
            <div key={product.id} className={styles.product}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
              <div className={styles.productDetails}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productQuantity}>
                  수량: {product.quantity}
                </p>
                <p className={styles.productPrice}>
                  {totalPricePerProduct[index]}원
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.totalPriceContainer}>
          <div className={styles.totalPriceText}>총 주문금액</div>
          <div className={styles.totalPriceValue}>{totalAmount}원</div>
        </div>
      </div>
    </div>
  );
}

export default CompletePaymentPage;
