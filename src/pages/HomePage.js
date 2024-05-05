// 메인(Home) 페이지입니다.
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Lined from "../components/shared/Lined";
import Container from "../components/shared/Container";
import Banner from "../components/main/Banner";
import GroupPurchase from "../components/main/GroupPurchase";
import DeadlineItems from "../components/product/DeadlineItems"; // 수정 필요
import PurchaseRankingItems from "../components/product/PurchaseRankingItems";
import SubscriptionSellerItems from "../components/product/SubscriptionSellerItems";
import styles from "./HomePage.module.css";
import { getDeadlineItems } from "../api/api";

function getLinkStyle({ isActive }) {
  return {
    textDecoration: isActive ? "underline" : "",
  };
}

function HomePage() {
  const [products, setProducts] = useState([]); // 추가된 상태
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await getDeadlineItems(
          page,
          size,
          null,
          "JWT_TOKEN"
        );
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching deadline items:", error);
      }
    };

    fetchData();
  }, [page, size]);

  return (
    <>
      <Banner />
      <GroupPurchase className={styles.margin} />
      <Container>
        <h1 className={styles.title}>
          <Lined>마감 임박 상품</Lined>
          <NavLink
            style={getLinkStyle}
            to={`/item/deadline?page=${page}&size=${size}`}
          >
            >
          </NavLink>
        </h1>
      </Container>
      <DeadlineItems products={products} />
      <Container>
        <h1 className={styles.title}>
          <Lined>New! 구독하고 있는 판매자의 새 상품</Lined>
          <NavLink style={getLinkStyle} to="/new-products">
            >
          </NavLink>
        </h1>
      </Container>
      <SubscriptionSellerItems />
      <Container>
        <h1 className={styles.title}>
          <Lined>구매 랭킹</Lined>
          <NavLink style={getLinkStyle} to="/purchase-ranking">
            >
          </NavLink>
        </h1>
      </Container>
      <PurchaseRankingItems />
    </>
  );
}

export default HomePage;
