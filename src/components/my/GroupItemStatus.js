import React, { useEffect, useState } from "react";
import { getUserGroupStatus } from "../../api/api";
import styles from "./GroupItemStatus.module.css";

function GroupItemStatus() {
  const [orderGroupItems, setOrderGroupItems] = useState([]);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [size, setSize] = useState(5);

  useEffect(() => {
    const fetchOrderGroupItems = async () => {
      try {
        const items = await getUserGroupStatus(page, size);
        setOrderGroupItems(items);
      } catch (error) {
        console.error("Error fetching order group items:", error);
      }
    };

    fetchOrderGroupItems();
  }, [page, size]);

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>공동구매 신청 내역</h2>
      <div className={styles.orderList}>
        {orderGroupItems.map((item) => (
          <div key={item.id} className={styles.orderItem}>
            <div>상품명: {item.item.name}</div>
            <div>수량: {item.quantity}</div>
            <div>상태: {item.status}</div>
            <div>주문일시: {item.createdAt}</div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          onClick={prevPage}
          disabled={page === 1}
          className={page === 1 ? styles.hide : ""}
        >
          이전
        </button>
        <button onClick={nextPage}>다음</button>
      </div>
    </div>
  );
}

export default GroupItemStatus;
