import React, { useState } from "react";
import DateText from "../../components/shared/DateText";
import Card from "../../components/shared/Card";
import Rating from "./Rating";
// import Container from "../../components/shared/Container";
import styles from "./ReviewItem.module.css";

function ReviewItem({ review }) {
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const handleTitleClick = () => {
    setIsDetailVisible(!isDetailVisible);
  };

  return (
    <>
      <Card className={styles.reviewListItem} key={review.id}>
        <div className={styles.info}>
          <Rating className={styles.rating} value={review.score} />
          <p className={styles.title} onClick={handleTitleClick}>
            {review.content}
            {/* review.answer && <span className={styles.count}>[1]</span> */}
          </p>
        </div>
        <p className={styles.fromMemberNickname}>
          {/* inquiry.fromMemberNickname */} 작성자
        </p>
        <p className={styles.date}>
          <DateText value={review.createAt} />
        </p>
      </Card>
      {/* 리뷰 상세 구현 예정
      <Card
        className={`${styles.answerListItem} ${
          isDetailVisible ? styles.visible : ""
        }`}
      >
        {isDetailVisible && inquiry.answer && (
          <div className={styles.answerContainer}>
            <Container className={styles.answers}>
              <h2 className={styles.answerTitle}>리뷰 상세</h2>
              <p className={styles.answerContent}>{inquiry.answer}</p>
            </Container>
          </div>
        )}
      </Card>
        */}
    </>
  );
}

export default ReviewItem;
