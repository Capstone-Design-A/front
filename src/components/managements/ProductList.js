import React from "react";
import styles from "./ProductList.module.css";

function ProductList() {
  const products = [
    {
      id: 1,
      name: "사과",
      category: "과일",
      stock: "10",
      price: 20000,
      deadline: "2024-01-31",
      group: null,
    },
    {
      id: 2,
      name: "복숭아",
      category: "과일",
      stock: "30",
      price: 25000,
      deadline: "2024-03-31",
      group: "공동구매",
    },
    {
      id: 3,
      name: "삼겹살",
      category: "축산",
      stock: "22",
      price: 22000,
      deadline: "2024-04-30",
      group: null,
    },
    {
      id: 4,
      name: "양상추",
      category: "채소",
      stock: "35",
      price: 18000,
      deadline: "2024-05-31",
      group: "공동구매",
    },
    {
      id: 5,
      name: "딸기잼",
      category: "가공",
      stock: "18",
      price: 12000,
      deadline: "2024-02-28",
      group: null,
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <h1>판매 상품 관리</h1>
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
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className={styles.name}>
                    <img src={null} alt="img" />
                    <div>{product.name}</div>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>{product.price.toLocaleString()}</td>
                <td>{product.deadline}</td>
                <td>
                  <div
                    className={`${styles.productStatus} ${
                      product.group === "공동구매" ? styles.true : styles.false
                    }`}
                  >
                    {product.group}
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

export default ProductList;

/* 정렬 기능 구현
import React, { useState } from "react";
import styles from "./ProductList.module.css";

function ProductList() {
  const initialProducts = [
    {
      id: 1,
      name: "사과",
      category: "과일",
      stock: "10",
      price: 20000,
      deadline: "2024-01-31",
      group: null,
    },
    {
      id: 2,
      name: "복숭아",
      category: "과일",
      stock: "30",
      price: 25000,
      deadline: "2024-03-31",
      group: "공동구매",
    },
    {
      id: 3,
      name: "삼겹살",
      category: "축산",
      stock: "22",
      price: 22000,
      deadline: "2024-04-30",
      group: null,
    },
    {
      id: 4,
      name: "양상추",
      category: "채소",
      stock: "35",
      price: 18000,
      deadline: "2024-05-31",
      group: "공동구매",
    },
    {
      id: 5,
      name: "딸기잼",
      category: "가공",
      stock: "18",
      price: 12000,
      deadline: "2024-02-28",
      group: null,
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [sortByDeadline, setSortByDeadline] = useState(false);

  const toggleSortByDeadline = () => {
    setSortByDeadline(!sortByDeadline);
    if (!sortByDeadline) {
      // 마감 기한으로 정렬
      const sortedProducts = [...products].sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );
      setProducts(sortedProducts);
    } else {
      // 원래 순서대로 되돌리기
      setProducts(initialProducts);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>판매 상품 관리</h1>
          <button onClick={toggleSortByDeadline}>
            {sortByDeadline ? "기본순" : "마감 임박순"}
          </button>
        </div>
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
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className={styles.name}>
                    <img src={null} alt="img" />
                    <div>{product.name}</div>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>{product.price.toLocaleString()}</td>
                <td>{product.deadline}</td>
                <td>
                  <div
                    className={`${styles.productStatus} ${
                      product.group === "공동구매" ? styles.true : styles.false
                    }`}
                  >
                    {product.group}
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

export default ProductList;
*/
