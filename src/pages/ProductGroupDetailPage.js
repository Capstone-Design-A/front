import React, { useState, useEffect, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import ProductGroupDetail from "../components/detail/ProductGroupDetail";
import Container from "../components/shared/Container";
import Category from "../components/category/Category";
import { getGroupItemDetail } from "../api/api";
import Description from "../components/detail/Description";
import ReviewListPage from "./ReviewListPage";
import InquiryListPage from "./InquiryListPage";
import styles from "./ProductDetailPage.module.css";

function ProductGroupDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;

        const token = "JWT_TOKEN";

        const itemData = await getGroupItemDetail(id, token);
        setItem(itemData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const descriptionRef = useRef(null);
  const reviewRef = useRef(null);
  const questionRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const toggleCategoryVisibility = () => {
    setIsCategoryVisible((prev) => !prev);
  };

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
    <>
      <div className={styles.pageContainer}>
        <div
          className={styles.toggleCategory}
          onClick={toggleCategoryVisibility}
        >
          <span className={styles.icon}>☰</span>
        </div>
        <div
          className={`${styles.categoryContainer} ${
            isCategoryVisible ? styles.visible : ""
          }`}
        >
          <div className={styles.categoryContent}>
            <Category />
          </div>
        </div>
      </div>
      <Container>
        <div className={styles.container}>
          <div className={styles.content}>
            <div>
              <ProductGroupDetail
                item={item.item}
                orderSum={item.orderSum}
                targetQuantity={item.targetQuantity}
                discountPrice={item.discountPrice}
              />
            </div>
            <ul className={styles.menu}>
              <li className={styles.line}>
                <button
                  onClick={() => scrollToSection(descriptionRef)}
                  className={styles.button}
                >
                  상품 상세 정보
                </button>
              </li>
              <li className={styles.line}>
                <button
                  onClick={() => scrollToSection(reviewRef)}
                  className={styles.button}
                >
                  상품 후기
                </button>
              </li>
              <li className={styles.line}>
                <button
                  onClick={() => scrollToSection(questionRef)}
                  className={styles.button}
                >
                  상품 문의
                </button>
              </li>
            </ul>
            <div ref={descriptionRef} className={styles.description}>
              <Description item={item.item} className={styles.description} />
            </div>
            <div ref={reviewRef} className={styles.review}>
              <ReviewListPage itemId={id} />
            </div>
            <div ref={questionRef} className={styles.inquiry}>
              <InquiryListPage itemId={id} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ProductGroupDetailPage;
