// 구독하고 있는 판매자의 새 상품
import React from "react";
import Container from "../shared/Container";
import ProductItem from "./ProductItem";
import styles from "./ProductList.module.css";

function SubscriptionItems({ products, type, fromMember }) {
  return (
    <Container className={styles.container}>
      <div className={styles.productList}>
        {products &&
          products.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              type={type}
              fromMember={fromMember}
            />
          ))}
      </div>
    </Container>
  );
}

export default SubscriptionItems;
