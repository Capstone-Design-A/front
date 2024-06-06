import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSellerItemList } from "../api/api";
import SellerCategory from "../components/category/SellerCategory";
import styles from "./SellerItemListPage.module.css";

function SellerItemList() {
  const [products, setProducts] = useState([]);
  const page = 1;
  const size = 10;
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sellerItemList = await getSellerItemList(page, size);
        setProducts(sellerItemList);
      } catch (error) {
        console.error("Error fetching seller item list: ", error);
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
          <h1>판매 상품 관리</h1>
          <Link to="/auth/seller/items?page=1&size=10">
            <h1> > </h1>
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
              {products && products.length > 0 ? (
                products.map((product, index) => (
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
        </div>
      </div>
    </>
  );
}

export default SellerItemList;
