// 판매자 카테고리 컴포넌트
import React from "react";
import { Link } from "react-router-dom";
import Container from "../shared/Container";
import HorizontalRule from "../shared/HorizontalRule";
import styles from "./SellerCategory.module.css";

function SellerCategory({ sellerId, page = 1, size = 10 }) {
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
              to={`/seller/seller-id=${sellerId}&page=${page}&size=${size}`}
              className={styles.link}
            >
              <h2 className={styles.title}>구독 관리</h2>
            </Link>
            <Link
              to={`/seller/seller-id=${sellerId}&page=${page}&size=${size}`}
              className={styles.link}
            >
              <h2 className={styles.title}>주문 조회</h2>
            </Link>
            <div className={styles.line}>
              <HorizontalRule />
            </div>
            <Link to={`/management`} className={styles.link}>
              <h2 className={styles.title}>대시보드</h2>
            </Link>
            <Link
              to={`/seller/order-status?seller-id=${sellerId}&page=${page}&size=${size}`}
              className={styles.link}
            >
              <h2 className={styles.title}>주문 현황</h2>
            </Link>
            <Link
              to={`/seller/seller-id=${sellerId}&page=${page}&size=${size}`}
              className={styles.link}
            >
              <h2 className={styles.title}>판매 상품 관리</h2>
            </Link>
            <div className={styles.line}>
              <HorizontalRule />
            </div>
            <Link to={`/introduction`} className={styles.link}>
              <h2 className={styles.title}>소개 페이지</h2>
            </Link>
          </div>
        </div>
        <div className={styles.home}>
          <Link to="/">홈으로</Link>
        </div>
      </Container>
    </>
  );
}

export default SellerCategory;
