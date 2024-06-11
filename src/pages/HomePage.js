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
  getGroupItems,
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
  // eslint-disable-next-line
  const [groupProducts, setGroupProducts] = useState([]);
  // eslint-disable-next-line
  const [page, setPage] = useState(1);
  const size = 10;
  const displayLimit = 6;

  const token = localStorage.getItem("accessToken");
  const isLoggedIn = !!token;
  const id = localStorage.getItem("memberId");
  const memberId = isLoggedIn ? id : null;
  const type = isLoggedIn ? 0 : 1;

  useEffect(() => {
    const fetchDeadlineItems = async () => {
      try {
        const fetchedProducts = await getDeadlineItems(page, size, null, token);
        setDeadlineProducts(fetchedProducts.itemList.slice(0, displayLimit));
      } catch (error) {
        console.error("Error fetching deadline items:", error);
      }
    };

    const fetchRankingItems = async () => {
      try {
        const fetchedProducts = await getRankingItems(page, size, null, token);
        setRankingProducts(fetchedProducts.itemList.slice(0, displayLimit));
      } catch (error) {
        console.error("Error fetching ranking items:", error);
      }
    };

    const fetchSubscriptionItems = async () => {
      try {
        const fetchedProducts = await getSubscriptionItems(
          page,
          size,
          type,
          memberId
        );
        setSubscriptionProducts(
          fetchedProducts.itemList.slice(0, displayLimit)
        );
      } catch (error) {
        console.error("Error fetching subscription items:", error);
      }
    };

    const fetchGroupItems = async () => {
      try {
        const fetchedProducts = await getGroupItems(page, size, null, token);
        setGroupProducts(fetchedProducts.items);
      } catch (error) {
        console.error("Error fetching group items:", error);
      }
    };

    fetchDeadlineItems();
    fetchRankingItems();
    fetchSubscriptionItems();
    fetchGroupItems();
  }, [page, size, type, memberId, displayLimit, token]);

  return (
    <>
      <div className={styles.container}>
        <Banner />
        <Container>
          <h1 className={styles.group}>
            <NavLink
              style={getLinkStyle}
              to={`/groupItem?page=${page}&size=${size}`}
            >
              공동 구매 상품을 둘러보세요 >
            </NavLink>
          </h1>
        </Container>
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
              to={`/item/subscription?type=${type}&fromMember=${memberId}&page=${page}&size=${size}`}
            >
              >
            </NavLink>
          </h1>
        </Container>
        <SubscriptionItems products={subscriptionProducts} />
      </div>
    </>
  );
}

export default HomePage;
