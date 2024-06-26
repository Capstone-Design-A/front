import Button from "../button/Button";
import Container from "../shared/Container";
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
            <Link to={`/groupItem/${item.id}`}>
              <Button className={styles.button}>공동구매 바로가기</Button>
            </Link>
          </div>
        </div>
        <div className={styles.image}>
          <img src={item.imageUrl} alt={item.name} />
        </div>
      </div>
    </Container>
  );
}

export default GroupPurchaseItem;
