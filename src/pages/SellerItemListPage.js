import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSellerItemList } from "../api/api";
import SellerCategory from "../components/category/SellerCategory";
import styles from "./SellerItemListPage.module.css";

function SellerItemListPage() {
  const [products, setProducts] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const size = 20;
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sellerItemList = await getSellerItemList(currentPage, size);
        console.log("Fetched data:", sellerItemList);
        const slicedProducts = sellerItemList.salesItemList;
        setProducts(slicedProducts);
        setTotalElements(sellerItemList.totalElement);
      } catch (error) {
        console.error("Error fetching seller item list: ", error);
      }
    };
    fetchData();
  }, [currentPage, size]);

  const toggleCategoryVisibility = () => {
    setIsCategoryVisible((prev) => !prev);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const indexOfLastItem = currentPage * size;
  const indexOfFirstItem = indexOfLastItem - size;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  console.log("currentProducts: ", currentProducts);
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
          <h1>판매 상품 관리</h1>
          <Link to="/auth/item">
            <button className={styles.addButton}>상품 등록하기</button>
          </Link>
        </div>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>상품명</th>
                <th>카테고리</th>
                <th>재고</th>
                <th>가격</th>
                <th>마감일</th>
                <th>
                  <div className={styles.productStatus}>공동구매</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProducts && currentProducts.length > 0 ? (
                currentProducts.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <div className={styles.name}>
                        <img
                          src={product.itemPreviewImageUrl}
                          alt={product.itemName}
                        />
                        <div>{product.itemName}</div>
                      </div>
                    </td>
                    <td>{product.categoryName}</td>
                    <td>{product.stock}</td>
                    <td>{product.price.toLocaleString()}</td>
                    <td>{new Date(product.deadLine).toLocaleString()}</td>
                    <td>
                      <div
                        className={`${styles.productStatus} ${
                          product.itemType === "group_purchase"
                            ? styles.true
                            : styles.false
                        }`}
                      >
                        {product.itemType}
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
      </div>
    </>
  );
}

export default SellerItemListPage;
