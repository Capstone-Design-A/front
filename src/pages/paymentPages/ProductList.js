import React from "react";
import styles from "./ProductList.module.css";

function ProductList({ products, totalAmount }) {
  const totalPricePerProduct = products.map(
    (product) => product.price * product.quantity
  );

  return (
    <div>
      <div className={styles.ordered_productList}>
        <h2 className={styles.header}>주문상품</h2>
        {products.map((product, index) => (
          <div key={product.id} className={styles.product}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.productDetails}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productQuantity}>수량: {product.quantity}</p>
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
  );
}

export default ProductList;
