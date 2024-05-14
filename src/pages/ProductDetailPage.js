import React, { useState, useEffect, useRef } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import ProductDetail from "../components/detail/ProductDetail";
import Container from "../components/shared/Container";
import styles from "./ProductDetailPage.module.css";
import { getItemDetail, getInquiryList } from "../api/api";
import Description from "../components/detail/Description";
import QuestionPage from "./QuestionPage";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQuestionPage, setShowQuestionPage] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;

        const token = "JWT_TOKEN";

        // 상품 정보 가져오기
        const itemData = await getItemDetail(id, token);
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

  const showQuestionPageHandler = async () => {
    try {
      const token = "JWT_TOKEN";
      const page = 1;
      const size = 6;
      const inquiryList = await getInquiryList(id, page, size, token);
      setQuestions(inquiryList);

      navigate(`/inquiry?itemId=${id}&page=${page}&size=${size}`);
      setShowQuestionPage(true);
    } catch (error) {
      console.error("Error fetching inquiry list:", error);
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
              {/* 문의 페이지를 보여주는 버튼 추가 */}
              <button
                onClick={showQuestionPageHandler}
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
          {showQuestionPage && (
            <div ref={questionRef}>
              <QuestionPage questions={questions} />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default ProductDetailPage;
