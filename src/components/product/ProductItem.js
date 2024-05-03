// 상품 아이템 컴포넌트
// 이미지,판매자,상품명,가격을 Card 컴포넌트로 감싸서 구현 - 페이지 전체에서 재사용 가능
import React from "react";
import { Link } from "react-router-dom";
import Card from "../shared/Card";
import ProductIcon from "./ProductIcon";
import styles from "./ProductItem.module.css";

function ProductItem({ id, name, price, imageUrl }) {
  return (
    <Card className={styles.Item}>
      <div className={styles.img}>
        <Link to={`/products/${id}`}>
          <ProductIcon imageUrl={imageUrl} />
        </Link>
      </div>
      <div className={styles.text}>
        <Link to={`/products/${id}`}>
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
