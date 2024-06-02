import { useState, useEffect } from "react";
import styles from "./OrderDeliveryStatus.module.css";
import { getUserOrderStatus } from "../../api/api";

function OrderDeliveryStatus() {
  const [orderId, setOrderId] = useState(null);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const { orderId, itemStatusList } = await getUserOrderStatus(1652);
        setOrderId(orderId);
        setOrderData(itemStatusList);
      } catch (error) {
        console.error("Error fetching order status:", error);
      }
    };
    fetchOrderStatus();
  }, []);

  return (
    <div className={styles.orderDeliveryStatusContainer}>
      <h2>주문 배송 현황</h2>
      {orderId && (
        <p>
          <strong>주문 ID:</strong> {orderId}
        </p>
      )}
      <div className={styles.orderList}>
        {orderData.length > 0 ? (
          orderData.map((order) => (
            <div key={order.orderItemId} className={styles.orderItem}>
              <div className={styles.orderDetails}>
                <p>
                  <strong>주문 번호:</strong> {order.orderItemId}
                </p>
                <p>
                  <strong>상품명:</strong> {order.itemName}
                </p>
                <p>
                  <strong>상품 가격:</strong> {order.itemPrice}원
                </p>
                <p>
                  <strong>수량:</strong> {order.quantity}
                </p>
                <p>
                  <strong>배송비:</strong> {order.deliveryCharge}원
                </p>
                <p>
                  <strong>총 가격:</strong> {order.totalPrice}원
                </p>
                <p>
                  <strong>주문 상태:</strong> {order.orderStatus}
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
