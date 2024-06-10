import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOrderStatus } from "../api/api";
import SellerCategory from "../components/category/SellerCategory";
import styles from "./SellerOrderListPage.module.css";

function SellerOrderList() {
  const [products, setProducts] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const size = 5;
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderStatus = await getOrderStatus(currentPage, size);
        const slicedProducts = orderStatus.orderItemStatusList;
        setProducts(slicedProducts);
        setTotalElements(orderStatus.totalElement);
      } catch (error) {
        console.error("Error fetching order status list: ", error);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const toggleCategoryVisibility = () => {
    setIsCategoryVisible((prev) => !prev);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const indexOfLastItem = currentPage * size;
  const indexOfFirstItem = indexOfLastItem - size;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalElements / size);

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
          <SellerCategory page={currentPage} size={size} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>주문 현황</h1>
          <Link
            to={`/auth/seller/order-status?page=${currentPage}&size=${size}`}
          >
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
            {currentProducts && currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
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
                        product.status === "PENDING"
                          ? styles.waiting
                          : product.status === "COMPLETED"
                          ? styles.completed
                          : ""
                      }`}
                    >
                      {product.status}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">
                  <div className={styles.noItem}>등록된 상품이 없습니다.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className={styles.pagination}>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            이전
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? styles.active : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
}

export default SellerOrderList;
