// 마감 임박 상품 목록
import React from "react";
import Container from "../shared/Container";
import ProductItem from "./ProductItem";
import styles from "./ProductList.module.css";

function DeadlineItems({ products }) {
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
              discountPrice={product.discountPrice}
              imageUrl={product.imageUrl}
              content={product.contnet}
            />
          ))}
      </div>
    </Container>
  );
}

export default DeadlineItems;
