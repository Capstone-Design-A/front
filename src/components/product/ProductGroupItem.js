// 공동 구매 상품 아이템 컴포넌트
import React from "react";
import { Link } from "react-router-dom";
import Card from "../shared/Card";
import styles from "./ProductItem.module.css";

function ProductGroupItem({
  id,
  name,
  price,
  imageUrl,
  targetQuantity,
  discountPrice,
  category,
}) {
  const productData = {
    id,
    name,
    price,
    imageUrl,
    targetQuantity,
    discountPrice,
    category,
  };

  return (
    <Card className={styles.groupItem}>
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
          <div className={styles.targetQuantity}>
            <h2>
              남은 수량: <span>{targetQuantity}</span>개
            </h2>
          </div>
        </Link>
      </div>
    </Card>
  );
}

export default ProductGroupItem;
