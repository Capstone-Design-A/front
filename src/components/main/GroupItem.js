/*
import { useState, useEffect } from "react";
import Button from "../button/Button";
import Container from "../shared/Container";
import styles from "./GroupItem.module.css";
import { Link } from "react-router-dom";
import { getGroupPurchaseItemsPreview } from "../../api"; // api 파일의 경로에 따라 수정해주세요

function GroupItem() {
  const [groupItems, setGroupItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getGroupPurchaseItemsPreview(); // API 호출
        setGroupItems(data.items);
      } catch (error) {
        console.error("Error fetching group purchase items:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Container>
      {groupItems.map((item) => (
        <div key={item.id} className={styles.page}>
          <div className={styles.text}>
            <h3 className={styles.count}>
              남은 수량
              <span className={styles.number}>{item.targetQuantity}</span>개
            </h3>
            <h1>[4월 11일 순차출고]</h1>
            <h2>{item.name}</h2>
            <h2>
              공동구매 할인가{" "}
              <span className={styles.price}>
                {item.discountPrice.toLocaleString()}
              </span>
              원
            </h2>
            <Link to={`/products/${item.id}`}>
              <Button className={styles.button}>공동구매 바로가기</Button>
            </Link>
          </div>
        </div>
      ))}
    </Container>
  );
}

export default GroupItem;
*/
import Button from "../button/Button";
import Container from "../shared/Container";
import ProductIcon from "../product/ProductIcon";
import styles from "./GroupItem.module.css";
import { Link } from "react-router-dom";
import HorizontalRule from "../shared/HorizontalRule";

function GroupItem({ item }) {
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
            <Link to={`/products/${item.id}`}>
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

export default GroupItem;
