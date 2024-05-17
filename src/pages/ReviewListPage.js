import React, { useState, useEffect } from "react";
import { getReviewList } from "../api/api.js";
import Container from "../components/shared/Container";
import Button from "../components/button/Button";
import InquiryForm from "../components/question/InquiryForm";
import ReviewList from "../components/review/ReviewList";
import styles from "./InquiryListPage.module.css";

const ReviewListPage = ({ itemId }) => {
  const [reviewList, setReviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchReviewList = async () => {
      try {
        const token = "JWT_TOKEN";
        const page = 1;
        const size = 6;

        const result = await getReviewList(itemId, page, size, token);
        setReviewList(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchReviewList();
  }, [itemId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const toggleFormVisibility = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  return (
    <>
      <h1 className={styles.title}>상품 후기</h1>
      <Container className={styles.ReviewList}>
        <div className={styles.create}>
          <Button variant="round" onClick={toggleFormVisibility}>
            후기 작성하기
          </Button>
        </div>
        {isFormVisible && (
          <InquiryForm onCancel={() => setIsFormVisible(false)} />
        )}
        <ReviewList reviewList={reviewList} />
      </Container>
    </>
  );
};

export default ReviewListPage;
