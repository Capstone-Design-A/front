import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import ProductDetail from "../components/detail/ProductDetail";
import DetailNav from "../components/detail/DetailNav";
import Container from "../components/shared/Container";
import styles from "./ProductDetailPage.module.css";

function ProductDetailPage() {
  const location = useLocation();
  const { id, name, price, imageUrl, content } = location.state || {};
  const product = { id, name, price, imageUrl, content };

  if (!product.id) {
    return <div>상품 데이터가 없습니다.</div>;
  }

  return (
    <Container>
      <div className={styles.container}>
        <ProductDetail product={product} />
        <div className={styles.detailNav}>
          <DetailNav />
          <div className={styles.content}>
            {/* 메뉴 바 밑에 보여줄 페이지 - 상품 상세 정보, 상품 후기, 상품 문의 */}
            <Outlet />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ProductDetailPage;
