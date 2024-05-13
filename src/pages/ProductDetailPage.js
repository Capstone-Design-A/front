import React, { useState, useEffect, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import ProductDetail from "../components/detail/ProductDetail";
import Container from "../components/shared/Container";
import styles from "./ProductDetailPage.module.css";
import { getItemDetail, getInquiryList } from "../api/api";
import QuestionList from "../components/question/QuestionList";
import Description from "../components/detail/Description";

function ProductDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;

        const token = "YOUR_JWT_TOKEN_HERE";

        // 상품 정보 가져오기
        const itemData = await getItemDetail(id, token);
        setItem(itemData);

        // 문의 목록 가져오기
        const inquiryList = await getInquiryList(id, 1, 10, token);
        setQuestions(inquiryList);

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
        <div className={styles.content}>
          <div>
            <ProductDetail item={item} />
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
                상품 리뷰
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
            <Description item={item} />
          </div>
          <div ref={reviewRef} className={styles.review}>
            <h2>상품 리뷰</h2>
          </div>
          <div ref={questionRef}>
            <QuestionList questions={questions} />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ProductDetailPage;
