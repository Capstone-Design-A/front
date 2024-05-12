import React from "react";
import styles from "./OrderList.module.css";

function OrderList() {
  const orders = [
    {
      orderNumber: 302012,
      itemPreviewImageUrl: null,
      itemName: "사과",
      orderedDate: "1분 전",
      consumerName: "구매자이름1",
      price: 20000,
      quantity: 1,
      status: "주문 대기",
    },
    {
      orderNumber: 302011,
      itemName: "양상추",
      orderedDate: "5시간 전",
      consumerName: "구매자이름2",
      price: 18000,
      quantity: 3,
      status: "처리 완료",
    },
    {
      orderNumber: 302002,
      itemName: "방울토마토",
      orderedDate: "2024-05-09",
      consumerName: "구매자이름3",
      price: 9500,
      quantity: 2,
      status: "처리 완료",
    },
    {
      orderNumber: 302003,
      itemName: "방울토마토",
      orderedDate: "2024-05-09",
      consumerName: "구매자이름3",
      price: 9500,
      quantity: 2,
      status: "처리 완료",
    },
    {
      orderNumber: 302004,
      itemName: "방울토마토",
      orderedDate: "2024-05-09",
      consumerName: "구매자이름3",
      price: 9500,
      quantity: 2,
      status: "처리 완료",
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <h1>주문 현황</h1>
        <table>
          <thead>
            <tr>
              <th>주문 번호</th>
              <th>주문 상품</th>
              <th>주문 날짜</th>
              <th>주문 고객</th>
              <th>총 금액</th>
              <th>수량</th>
              <th>
                <div className={styles.orderStatus}>주문 상태</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderNumber}>
                <td>
                  <div className={styles.orderId}>#{order.orderNumber}</div>
                </td>
                <td>
                  <div className={styles.name}>
                    <img src={order.itemPreviewImageUrl} alt={order.itemName} />
                    <div>{order.itemName}</div>
                  </div>
                </td>
                <td>{order.orderedDate}</td>
                <td>{order.consumerName}</td>
                <td>{order.price.toLocaleString()}</td>
                <td>{order.quantity}</td>
                <td>
                  <div
                    className={`${styles.orderStatus} ${
                      order.status === "주문 대기"
                        ? styles.waiting
                        : styles.completed
                    }`}
                  >
                    {order.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrderList;
