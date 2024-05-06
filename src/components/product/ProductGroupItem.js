// 공동 구매 상품 아이템 컴포넌트
import React from "react";
import { Link } from "react-router-dom";
import Card from "../shared/Card";
import ProductIcon from "./ProductIcon";
import styles from "./ProductItem.module.css";

function ProductGroupItem({ id, name, price, imageUrl }) {
  return (
    <Card className={styles.Item}>
      <div className={styles.img}>
        <Link to={`/product/${id}`}>
          <ProductIcon imageUrl={imageUrl} />
        </Link>
      </div>
      <div className={styles.text}>
        <Link to={`/product/${id}`}>
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

export default ProductGroupItem;
