// 판매자 소개 페이지 카테고리
import React from "react";
import { Link } from "react-router-dom";
import Container from "../shared/Container";
import HorizontalRule from "../shared/HorizontalRule";
import styles from "./SellerCategory.module.css";

function SellerIntroCategory({ page = 1, size = 1 }) {
  const memberId = localStorage.getItem("memberId");

  return (
    <>
      <Container>
        <div className={styles.menu}>
          <h1 className={styles.category}>카테고리</h1>
          <div className={styles.categoryList}>
            <Link to={`/my`} className={styles.link}>
              <h2 className={styles.titleIntro}>회원 정보</h2>
            </Link>
            <Link
              to={`/seller/seller-id=${memberId}&page=${page}&size=${size}`}
              className={styles.link}
            >
              <h2 className={styles.titleIntro}>구독 관리</h2>
            </Link>
            <Link
              to={`/seller/seller-id=${memberId}&page=${page}&size=${size}`}
              className={styles.link}
            >
              <h2 className={styles.titleIntro}>주문 조회</h2>
            </Link>
            <div className={styles.line}>
              <HorizontalRule />
            </div>
            <Link
              to={`/auth/seller?seller-id=${memberId}`}
              className={styles.link}
            >
              <h2 className={styles.titleIntro}>대시보드</h2>
            </Link>
            <Link
              to={`/auth/seller/order-status?page=${page}&size=${size}`}
              className={styles.link}
            >
              <h2 className={styles.titleIntro}>주문 현황</h2>
            </Link>
            <Link
              to={`/auth/seller/items?page=${page}&size=${size}`}
              className={styles.link}
            >
              <h2 className={styles.titleIntro}>판매 상품 관리</h2>
            </Link>
            <div className={styles.line}>
              <HorizontalRule />
            </div>
            <Link to={`/intro/${memberId}`} className={styles.link}>
              <h2 className={styles.titleIntro}>소개 페이지</h2>
            </Link>
          </div>
        </div>
        <div>
          <Link to="/">
            <h1 className={styles.homeIntro}>홈으로</h1>
          </Link>
        </div>
      </Container>
    </>
  );
}

export default SellerIntroCategory;
