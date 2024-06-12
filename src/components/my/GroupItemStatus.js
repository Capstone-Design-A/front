import React, { useEffect, useState } from "react";
import { getUserGroupStatus } from "../../api/api";
import styles from "./GroupItemStatus.module.css";

function GroupItemStatus() {
  const [orderGroupItems, setOrderGroupItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [size] = useState(5);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchOrderGroupItems = async () => {
      try {
        const { orderGroupItems, totalElements } = await getUserGroupStatus(
          currentPage,
          size
        );
        setOrderGroupItems(orderGroupItems);
        setTotalElements(totalElements);
      } catch (error) {
        console.error("Error fetching order group items:", error);
      }
    };

    fetchOrderGroupItems();
  }, [currentPage, size]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
      date.getSeconds()
    ).padStart(2, "0")}`;
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(totalElements / size);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>공동구매 신청 내역</h2>
      <div className={styles.orderList}>
        {orderGroupItems.map((item) => (
          <div key={item.id} className={styles.orderItem}>
            <div>상품명: {item.item.name}</div>
            <div>수량: {item.quantity}</div>
            <div>상태: {item.status}</div>
            <div>주문일시: {formatDate(item.createdAt)}</div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        {totalPages > 1 && (
          <ul className={styles.paginationList}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? styles.active : ""}
              >
                {index + 1}
              </button>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default GroupItemStatus;
