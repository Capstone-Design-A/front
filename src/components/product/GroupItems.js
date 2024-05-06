// 공동 구매 상품 목록
import React from "react";
import Container from "../shared/Container";
import ProductGroupItem from "./ProductGroupItem";
import styles from "./ProductList.module.css";

function GroupItems({ products }) {
  return (
    <Container className={styles.container}>
      <div className={styles.productList}>
        {products &&
          products.map((product) => (
            <ProductGroupItem
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              targetQuantity={product.targetQuantity} // 추가된 부분
              discountPrice={product.discountPrice} // 추가된 부분
            />
          ))}
      </div>
    </Container>
  );
}

export default GroupItems;
