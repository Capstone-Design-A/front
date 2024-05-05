// 메인(Home) 페이지입니다.
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Lined from "../components/shared/Lined";
import Container from "../components/shared/Container";
import Banner from "../components/main/Banner";
import GroupPurchase from "../components/main/GroupPurchase";
import DeadlineItems from "../components/product/DeadlineItems";
import RankingItems from "../components/product/RankingItems";
import SubscriptionSellerItems from "../components/product/SubscriptionSellerItems";
import styles from "./HomePage.module.css";
import { getDeadlineItems, getRankingItems } from "../api/api.js";

function getLinkStyle({ isActive }) {
  return {
    textDecoration: isActive ? "underline" : "",
  };
}

function HomePage() {
  const [deadlineProducts, setDeadlineProducts] = useState([]);
  const [rankingProducts, setRankingProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  useEffect(() => {
    const fetchDeadlineItems = async () => {
      try {
        const fetchedProducts = await getDeadlineItems(
          page,
          size,
          null,
          "JWT_TOKEN"
        );
        setDeadlineProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching deadline items:", error);
      }
    };

    const fetchRankingItems = async () => {
      try {
        const fetchedProducts = await getRankingItems(
          page,
          size,
          null,
          "JWT_TOKEN"
        );
        setRankingProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching ranking items:", error);
      }
    };

    fetchDeadlineItems();
    fetchRankingItems();
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
      <DeadlineItems products={deadlineProducts} />
      <Container>
        <h1 className={styles.title}>
          <Lined>구매 랭킹</Lined>
          <NavLink
            style={getLinkStyle}
            to={`/item/ranking?page=${page}&size=${size}`}
          >
            >
          </NavLink>
        </h1>
      </Container>
      <RankingItems products={rankingProducts} />
      <Container>
        <h1 className={styles.title}>
          <Lined>New! 구독하고 있는 판매자의 새 상품</Lined>
          <NavLink style={getLinkStyle} to="/new-products">
            >
          </NavLink>
        </h1>
      </Container>
      <SubscriptionSellerItems />
    </>
  );
}

export default HomePage;
