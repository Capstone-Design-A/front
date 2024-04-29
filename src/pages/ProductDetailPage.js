import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { getProductBySlug } from "../api";
import ProductDetail from "../components/detail/ProductDetail";
import DetailNav from "../components/detail/DetailNav";
import Container from "../components/shared/Container";
import styles from "./ProductDetailPage.module.css";

function ProductDetailPage() {
  const { productSlug } = useParams();
  const product = getProductBySlug(productSlug);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  // /products/:productSlug 경로로 들어오면 ProductDetailPage로 자동 이동
  useEffect(() => {
    if (
      currentPath === `/products/${product}` ||
      currentPath === `/products/${product}/`
    ) {
      navigate(`/products/${product}`);
    }
  }, [product, currentPath, navigate]);

  return (
    <>
      <Container>
        <div className={styles.containerStyle}>
          <ProductDetail />
          <div className={styles.detailNav}>
            <DetailNav />
            <div className={styles.divStyle}>
              {/* 메뉴 바 밑에 보여줄 페이지 */}
              <Outlet />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ProductDetailPage;
