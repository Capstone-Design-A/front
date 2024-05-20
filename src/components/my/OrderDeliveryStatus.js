import { useState } from "react";
import styles from "./OrderDeliveryStatus.module.css";

function OrderDeliveryStatus() {
  // 임의의 주문 배송 현황 데이터
  const dummyData = [
    {
      id: 1,
      orderNumber: "A1234",
      productName: "사과",
      orderDate: "2024-05-25",
      deliveryStatus: "배송중",
    },
    {
      id: 2,
      orderNumber: "AB234",
      productName: "참외",
      orderDate: "2024-05-20",
      deliveryStatus: "배송완료",
    },
    {
      id: 3,
      orderNumber: "ADD23",
      productName: "당근",
      orderDate: "2024-05-15",
      deliveryStatus: "배송준비중",
    },
  ];

  return (
    <div className={styles.orderDeliveryStatusContainer}>
      <h2>주문 배송 현황</h2>
      <div className={styles.orderList}>
        {dummyData.length > 0 ? (
          dummyData.map((order) => (
            <div key={order.id} className={styles.orderItem}>
              <div className={styles.orderDetails}>
                <p>
                  <strong>주문 번호</strong> {order.orderNumber}
                </p>
                <p>
                  <strong>상품명</strong> {order.productName}
                </p>
                <p>
                  <strong>주문 일자</strong> {order.orderDate}
                </p>
                <p>
                  <strong>배송 상태</strong> {order.deliveryStatus}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>주문 정보가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default OrderDeliveryStatus;
