/*
import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import SellerCategory from "../components/category/SellerCategory";
import { getOrderStatus } from "../api/api.js";
import Pagination from "../components/pagination/Pagination";
import styles from "./SellerOrderListPage.module.css";

function SellerOrderListPage() {
  const location = useLocation();
  const { sellerId } = useParams();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "JWT_TOKEN";
        const page = queryParams.get("page") || currentPage;
        const size = queryParams.get("size") || 1;

        if (!sellerId) {
          console.error("sellerId is not defined");
          return;
        }

        const orderStatusData = await getOrderStatus(
          page,
          size,
          sellerId,
          token
        );
        setOrders(orderStatusData);
        setTotalPages(orderStatusData.totalPages);
      } catch (error) {
        console.error("Error fetching order status:", error);
      }
    };

    fetchData();
  }, [location.search, currentPage, sellerId, queryParams]);

  const toggleCategoryVisibility = () => {
    setIsCategoryVisible((prev) => !prev);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default SellerOrderListPage;
*/

import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import SellerCategory from "../components/category/SellerCategory";
import { getOrderStatus } from "../api/api.js";
import Pagination from "../components/pagination/Pagination";
import styles from "./SellerOrderListPage.module.css";

function SellerOrderListPage() {
  const location = useLocation();
  const sellerId = "1"; // sellerId를 하드코딩하여 1로 설정

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "JWT_TOKEN";
        const page = queryParams.get("page") || currentPage;
        const size = queryParams.get("size") || 1;

        const orderStatusData = await getOrderStatus(
          page,
          size,
          sellerId, // sellerId를 하드코딩하여 1로 설정
          token
        );
        setOrders(orderStatusData);
        setTotalPages(orderStatusData.totalPages);
      } catch (error) {
        console.error("Error fetching order status:", error);
      }
    };

    fetchData();
  }, [location.search, currentPage, queryParams, sellerId]);

  const toggleCategoryVisibility = () => {
    setIsCategoryVisible((prev) => !prev);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default SellerOrderListPage;
