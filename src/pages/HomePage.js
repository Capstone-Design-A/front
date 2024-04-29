// 메인(Home) 페이지입니다.
import { NavLink } from "react-router-dom";
import Lined from "../components/shared/Lined";
import Container from "../components/shared/Container";
import Banner from "../components/main/Banner";
import GroupPurchase from "../components/main/GroupPurchase";
import LastMinuteItems from "../components/product/LastMinuteItems";
import PurchaseRankingItems from "../components/product/PurchaseRankingItems";
import SubscriptionSellerItems from "../components/product/SubscriptionSellerItems";
import styles from "./HomePage.module.css";

function getLinkStyle({ isActive }) {
  return {
    textDecoration: isActive ? "underline" : "",
  };
}

function HomePage() {
  return (
    <>
      <Banner />
      <GroupPurchase className={styles.margin} />
      <Container>
        <h1 className={styles.title}>
          <Lined>마감 임박 상품</Lined>
          <NavLink style={getLinkStyle} to="/last-minute-products">
            >
          </NavLink>
        </h1>
      </Container>
      <LastMinuteItems />
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
