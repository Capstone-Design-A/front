// 판매자 카테고리 컴포넌트
import React from "react";
import { Link } from "react-router-dom";
import Container from "../shared/Container";
import HorizontalRule from "../shared/HorizontalRule";
import styles from "./SellerCategory.module.css";

function SellerCategory({ page = 1, size = 1 }) {
  const memberId = localStorage.getItem("memberId");

  return (
    <>
      <Container>
        <div className={styles.menu}>
          <h1 className={styles.category}>카테고리</h1>
          <div className={styles.categoryList}>
            <Link to={`/my`} className={styles.link}>
              <h2 className={styles.title}>회원 정보</h2>
            </Link>
            <Link
              to={`/seller/member-id=${memberId}&page=${page}&size=${size}`}
              className={styles.link}
            >
              <h2 className={styles.title}>구독 관리</h2>
            </Link>
            <Link
              to={`/seller/member-id=${memberId}&page=${page}&size=${size}`}
              className={styles.link}
            >
              <h2 className={styles.title}>주문 조회</h2>
            </Link>
            <div className={styles.line}>
              <HorizontalRule />
            </div>
            <Link
              to={`/auth/seller?member-id=${memberId}`}
              className={styles.link}
            >
              <h2 className={styles.title}>대시보드</h2>
            </Link>
            <Link
              to={`/auth/seller/order-status?page=${page}&size=${size}`}
              className={styles.link}
            >
              <h2 className={styles.title}>주문 현황</h2>
            </Link>
            <Link
              to={`/auth/seller/items?page=${page}&size=${size}`}
              className={styles.link}
            >
              <h2 className={styles.title}>판매 상품 관리</h2>
            </Link>
            <div className={styles.line}>
              <HorizontalRule />
            </div>
            <Link to={`/intro/${memberId}`} className={styles.link}>
              <h2 className={styles.title}>소개 페이지</h2>
            </Link>
          </div>
        </div>
        <div>
          <Link to="/">
            <h1 className={styles.home}>홈으로</h1>
          </Link>
        </div>
      </Container>
    </>
  );
}

export default SellerCategory;
