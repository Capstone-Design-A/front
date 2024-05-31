import React from "react";
import { Link } from "react-router-dom";
import Card from "../shared/Card";
import styles from "./ProductItem.module.css";

function ProductItem({ id, name, price, discountPrice, imageUrl, category }) {
  const productData = { id, name, price, discountPrice, imageUrl, category };

  return (
    <Card className={styles.Item}>
      <div className={styles.img}>
        <Link
          to={{
            pathname: `/item/${id}`,
            state: { product: productData },
          }}
        >
          <img src={imageUrl} alt={name} />
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
          <div className={styles.price}>
            {price && (
              <p className={styles.price}>
                {price.toLocaleString()}
                <span className={styles.won}>원</span>
                <span className={styles.origin}>
                  {discountPrice.toLocaleString()}원
                </span>
              </p>
            )}
          </div>
        </Link>
      </div>
    </Card>
  );
}

export default ProductItem;
