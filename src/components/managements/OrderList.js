import React from "react";
import styles from "./OrderList.module.css";

function OrderList() {
  const orders = [
    {
      id: 302012,
      product: "사과",
      date: "1분 전",
      buyer: "구매자이름1",
      price: 20000,
      quantity: 1,
      status: "주문 대기",
    },
    {
      id: 302011,
      product: "양상추",
      date: "5시간 전",
      buyer: "구매자이름2",
      price: 18000,
      quantity: 3,
      status: "처리 완료",
    },
    {
      id: 302002,
      product: "방울토마토",
      date: "2024-05-09",
      buyer: "구매자이름3",
      price: 9500,
      quantity: 2,
      status: "처리 완료",
    },
    {
      id: 302002,
      product: "방울토마토",
      date: "2024-05-09",
      buyer: "구매자이름3",
      price: 9500,
      quantity: 2,
      status: "처리 완료",
    },
    {
      id: 302002,
      product: "방울토마토",
      date: "2024-05-09",
      buyer: "구매자이름3",
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
              <tr key={order.id}>
                <td>
                  <div className={styles.orderId}>#{order.id}</div>
                </td>
                <td>{order.product}</td>
                <td>{order.date}</td>
                <td>{order.buyer}</td>
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
