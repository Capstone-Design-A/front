// 메인(Home) 페이지입니다.
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Lined from "../components/shared/Lined";
import Container from "../components/shared/Container";
import Banner from "../components/main/Banner";
import GroupPurchase from "../components/main/GroupPurchase";
import DeadlineItems from "../components/product/DeadlineItems";
import RankingItems from "../components/product/RankingItems";
import SubscriptionItems from "../components/product/SubscriptionItems";
import styles from "./HomePage.module.css";
import {
  getDeadlineItems,
  getRankingItems,
  getSubscriptionItems,
} from "../api/api.js";

function getLinkStyle({ isActive }) {
  return {
    textDecoration: isActive ? "underline" : "",
  };
}

function HomePage() {
  const [deadlineProducts, setDeadlineProducts] = useState([]);
  const [rankingProducts, setRankingProducts] = useState([]);
  const [subscriptionProducts, setSubscriptionProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [type, setType] = useState(0); // 0: 로그인한 유저, 1: 비로그인한 유저
  const [fromMember, setFromMember] = useState(2); // 로그인이 구현 전이므로 임의의 값으로 설정

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

    const fetchSubscriptionItems = async () => {
      try {
        let fetchedProducts;
        // (로그인 상태 && fromMember 값이 null이 아닌 경우) API 호출
        if (type === 0 && fromMember !== null) {
          fetchedProducts = await getSubscriptionItems(
            fromMember,
            null,
            page,
            size,
            type,
            "JWT_TOKEN"
          );
          setSubscriptionProducts(fetchedProducts);
        } else {
          console.error("Invalid fromMember value:", fromMember);
        }
      } catch (error) {
        console.error("Error fetching subscription items:", error);
      }
    };

    fetchDeadlineItems();
    fetchRankingItems();
    fetchSubscriptionItems();
  }, [page, size, type, fromMember]);

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
          <NavLink
            style={getLinkStyle}
            to={`/item/subscription?type=${type}&fromMember=${fromMember}&page=${page}&size=${size}`}
          >
            >
          </NavLink>
        </h1>
      </Container>
      <SubscriptionItems
        products={subscriptionProducts}
        type={type}
        fromMember={fromMember}
      />
    </>
  );
}

export default HomePage;
