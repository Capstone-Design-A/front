import React, { useState, useEffect } from "react";
import styles from "./OrderDeliveryStatus.module.css";
import { getUserOrderStatus } from "../../api/api";

function OrderDeliveryStatus() {
  const [orderData, setOrderData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(1);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const orders = await getUserOrderStatus();
        setOrderData(orders);
      } catch (error) {
        console.error("Error fetching order status:", error);
      }
    };
    fetchOrderStatus();
  }, []);

  const getOrderStatusText = (status) => {
    switch (status) {
      case "PENDING":
        return "대기";
      case "SHIPPING":
        return "배송 중";
      case "DELIVERED":
        return "배송 완료";
      case "CANCELED":
        return "취소";
      default:
        return status;
    }
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const lastPage = Math.ceil(orderData.length / ordersPerPage);
    const maxPagesToShow = 10;
    let startPage, endPage;

    if (lastPage <= maxPagesToShow) {
      startPage = 1;
      endPage = lastPage;
    } else {
      const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
      if (currentPage <= halfMaxPagesToShow) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + halfMaxPagesToShow >= lastPage) {
        startPage = lastPage - maxPagesToShow + 1;
        endPage = lastPage;
      } else {
        startPage = currentPage - halfMaxPagesToShow;
        endPage = currentPage + halfMaxPagesToShow;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <>
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>이전</button>
        )}
        {startPage > 1 && <span>...</span>}
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={currentPage === pageNumber ? styles.active : ""}
          >
            {pageNumber}
          </button>
        ))}
        {endPage < lastPage && <span>...</span>}
        {currentPage < lastPage && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>다음</button>
        )}
      </>
    );
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orderData.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className={styles.orderDeliveryStatusContainer}>
      <h2>주문 배송 현황</h2>
      <div className={styles.orderList}>
        {currentOrders.length > 0 ? (
          currentOrders.map((order) => (
            <div key={order.orderId} className={styles.order}>
              <p className={styles.orderId}>
                <strong>주문 ID:</strong> {order.orderId}
              </p>
              {order.itemStatusList.map((item) => {
                const totalPrice =
                  item.itemPrice * item.quantity + item.deliveryCharge;
                return (
                  <div key={item.orderItemId} className={styles.orderItem}>
                    <div className={styles.orderDetails}>
                      <p>
                        <strong>주문 번호</strong> {item.orderItemId}
                      </p>
                      <p>
                        <strong>상품명</strong> {item.itemName}
                      </p>
                      <p>
                        <strong>수량</strong> {item.quantity}
                      </p>
                      <p>
                        <strong>상품 가격</strong> {item.itemPrice}원
                      </p>
                      <p>
                        <strong>총 금액</strong> {totalPrice}원 (배송비{" "}
                        {item.deliveryCharge}원)
                      </p>
                      <p>
                        <strong>주문 상태</strong>{" "}
                        {getOrderStatusText(item.orderStatus)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          <p>주문 정보가 없습니다.</p>
        )}
      </div>
      <div className={styles.pagination}>
        {orderData.length > 0 && (
          <ul className={styles.paginationList}>{renderPagination()}</ul>
        )}
      </div>
    </div>
  );
}

export default OrderDeliveryStatus;
