import React, { useState } from "react";
import styles from "./ProductList.module.css";
import meatImg from "../../assets/img-meat-4.png";
import pearImg from "../../assets/img5.png";

function ProductList() {
  const [products] = useState([
    {
      id: 1,
      name: "농수 축산 가공 한우",
      price: 20000,
      quantity: 1,
      image: meatImg,
    },
    {
      id: 2,
      name: "단맛 꿀 배",
      price: 18000,
      quantity: 2,
      image: pearImg,
    },
  ]);

  // 각 제품의 총 가격 계산
  const totalPricePerProduct = products.map(
    (product) => product.price * product.quantity
  );

  // 총 가격 합계 계산
  const totalPrice = totalPricePerProduct.reduce((acc, curr) => acc + curr, 0);

  return (
    <div>
      <h2 className={styles.header}>주문상품</h2>
      <div className={styles.ordered_productList}>
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
        <div className={styles.totalPriceValue}>{totalPrice}원</div>
      </div>
    </div>
  );
}

export default ProductList;
