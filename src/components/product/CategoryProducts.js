import React from "react";
import Container from "../shared/Container";
import ProductItem from "./ProductItem";
import styles from "./ProductList.module.css";

function CategoryProducts({ products }) {
  return (
    <Container className={styles.container}>
      <div className={styles.productList}>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </Container>
  );
}

export default CategoryProducts;
