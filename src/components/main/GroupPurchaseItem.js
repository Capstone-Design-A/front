import Button from "../button/Button";
import Container from "../shared/Container";
import ProductIcon from "../product/ProductIcon";
import styles from "./GroupPurchaseItem.module.css";
import { Link } from "react-router-dom";
import HorizontalRule from "../shared/HorizontalRule";

function GroupPurchaseItem({ item }) {
  return (
    <Container>
      <div className={styles.page}>
        <div className={styles.text}>
          <div className={styles.count}>
            남은 수량
            <span>{item.targetQuantity}</span>개
          </div>
          <h1>[4월 11일 순차출고]</h1>
          <h2 className={styles.name}>{item.name}</h2>
          <HorizontalRule />
          <div className={styles.price}>
            공동구매 할인가{" "}
            <span className={styles.discount}>
              {item.discountPrice.toLocaleString()}
            </span>
            원
            <span className={styles.origin}>
              {item.price.toLocaleString()}원
            </span>
          </div>
          <div>
            <Link to={`/product/${item.id}`}>
              <Button className={styles.button}>공동구매 바로가기</Button>
            </Link>
          </div>
        </div>
        <div>
          <ProductIcon
            className={styles.image}
            imageUrl={item.imageUrl}
            alt={item.name}
          />
        </div>
      </div>
    </Container>
  );
}

export default GroupPurchaseItem;
