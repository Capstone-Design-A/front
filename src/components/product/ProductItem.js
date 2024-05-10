// 상품 아이템 컴포넌트
import React from "react";
import { Link } from "react-router-dom";
import Card from "../shared/Card";
import ProductIcon from "./ProductIcon";
import styles from "./ProductItem.module.css";

function ProductItem({ id, name, price, imageUrl, category }) {
  const productData = { id, name, price, imageUrl, category };

  return (
    <Card className={styles.Item}>
      <div className={styles.img}>
        <Link
          to={{
            pathname: `/item/${id}`,
            state: { product: productData },
          }}
        >
          <ProductIcon imageUrl={imageUrl} />
        </Link>
      </div>
      <div className={styles.text}>
        <Link
          to={{
            pathname: `/item/${id}`,
            state: { product: productData },
          }}
        >
          <h2 className={styles.name}>{name}</h2>
          {price && (
            <p className={styles.price}>
              {price.toLocaleString()}
              <span className={styles.won}>원</span>
            </p>
          )}
        </Link>
      </div>
    </Card>
  );
}

export default ProductItem;
