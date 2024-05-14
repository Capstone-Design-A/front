// 로그인 구현 후 수정
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import SellerCategory from "../components/category/SellerCategory";
import { getOrderStatus, parseJWTToken } from "../api/api.js";
import styles from "./OrderListPage.module.css";

function OrderListPage() {
  const location = useLocation();
  const { sellerId: paramSellerId } = useParams();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(1);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const token = parseJWTToken();
        const sellerId = paramSellerId || token;
        const currentPage = searchParams.get("page") || page;
        const pageSize = searchParams.get("size") || size;

        if (!sellerId) {
          console.error("sellerId is not defined");
          return;
        }

        // Debugging logs
        console.log("sellerId:", sellerId);
        console.log("currentPage:", currentPage);
        console.log("pageSize:", pageSize);

        const orderStatusData = await getOrderStatus(
          sellerId,
          currentPage,
          pageSize,
          "JWT_TOKEN"
        );
        setOrders(orderStatusData);
      } catch (error) {
        console.error("Error fetching order status:", error);
      }
    };

    fetchData();
  }, [location.search, page, size, paramSellerId]);

  const toggleCategoryVisibility = () => {
    setIsCategoryVisible((prev) => !prev);
  };

  return (
    <>
      <div className={styles.toggleCategory} onClick={toggleCategoryVisibility}>
        <span className={styles.icon}>☰</span>
      </div>
      <div
        className={`${styles.categoryContainer} ${
          isCategoryVisible ? styles.visible : ""
        }`}
      >
        <div className={styles.categoryContent}>
          <SellerCategory />
        </div>
      </div>
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

export default OrderListPage;
