import React from "react";
import Container from "../shared/Container";
import ProductItem from "./ProductItem";
import styles from "./ProductList.module.css";

function SubscriptionItems({ products }) {
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
              category={product.category}
              stock={product.stock}
              deadline={product.deadline}
            />
          ))}
      </div>
    </Container>
  );
}

export default SubscriptionItems;
