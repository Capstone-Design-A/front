import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOrderStatus } from "../api/api";
import SellerCategory from "../components/category/SellerCategory";
import styles from "./SellerOrderListPage.module.css";

function SellerOrderList() {
  const [products, setProducts] = useState([]);
  const page = 1;
  const size = 10;
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderStatus = await getOrderStatus(page, size);
        setProducts(orderStatus);
      } catch (error) {
        console.error("Error fetching order status list: ", error);
      }
    };

    fetchData();
  }, []);

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
          <SellerCategory page={page} size={size} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>주문 현황</h1>
          <Link to="/auth/seller/order-status?page=1&size=10">
            <h1> > </h1>
          </Link>
        </div>
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
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index}>
                  <td>
                    <div className={styles.orderId}>#{product.orderNumber}</div>
                  </td>
                  <td>
                    <div className={styles.name}>
                      <img
                        src={product.itemPreviewImageUrl}
                        alt={product.itemName}
                      />
                      <div>{product.itemName}</div>
                    </div>
                  </td>
                  <td>{new Date(product.orderedDate).toLocaleString()}</td>
                  <td>{product.consumerName}</td>
                  <td>{product.price.toLocaleString()}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <div
                      className={`${styles.orderStatus} ${
                        product.status === "주문 대기"
                          ? styles.waiting
                          : styles.completed
                      }`}
                    >
                      {product.status}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <div className={styles.noItem}>등록된 상품이 없습니다.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default SellerOrderList;
