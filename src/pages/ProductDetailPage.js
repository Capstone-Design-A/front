import React, { useState, useEffect } from "react";
import { Outlet, useParams, Navigate } from "react-router-dom";
import ProductDetail from "../components/detail/ProductDetail";
import DetailNav from "../components/detail/DetailNav";
import Container from "../components/shared/Container";
import styles from "./ProductDetailPage.module.css";
import { getItemDetail } from "../api/api";

function ProductDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        if (!id) return;

        const token = "YOUR_JWT_TOKEN_HERE";
        const itemData = await getItemDetail(id, token);

        setItem(itemData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product detail:", error);
        setLoading(false);
      }
    };

    fetchItemDetail();
  }, [id]);

  if (loading) {
    return (
      <Container className={styles.loading}>
        <div className={styles.loadingMessage}>로딩 중입니다 ...</div>
      </Container>
    );
  }

  if (!item) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <div className={styles.container}>
        <ProductDetail item={item} />
        <div className={styles.detailNav}>
          <DetailNav item={item} />
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ProductDetailPage;
