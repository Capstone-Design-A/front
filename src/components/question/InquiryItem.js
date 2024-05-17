import React, { useState } from "react";
import DateText from "../../components/shared/DateText";
import Card from "../../components/shared/Card";
import Container from "../../components/shared/Container";
import styles from "../question/InquiryItem.module.css";

function InquiryItem({ inquiry }) {
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const handleTitleClick = () => {
    setIsDetailVisible(!isDetailVisible);
  };

  return (
    <>
      <Card className={styles.inquiryListItem} key={inquiry.id}>
        <div className={styles.info}>
          {/* 추후 답변 상태에 따른 css 적용 */}
          <p className={styles.state}>
            답변 {inquiry.status === "COMPLETE" ? "완료" : "대기"}
          </p>
          <p className={styles.title} onClick={handleTitleClick}>
            {inquiry.content}
            {inquiry.answer && <span className={styles.count}>[1]</span>}
          </p>
        </div>
        <p className={styles.fromMemberNickname}>
          {inquiry.fromMemberNickname}
        </p>
        <p className={styles.date}>
          <DateText value={inquiry.createdAt} />
        </p>
      </Card>
      <Card
        className={`${styles.answerListItem} ${
          isDetailVisible ? styles.visible : ""
        }`}
      >
        {isDetailVisible && inquiry.answer && (
          <div className={styles.answerContainer}>
            <Container className={styles.answers}>
              <h2 className={styles.answerTitle}>판매자 답변</h2>
              <p className={styles.answerContent}>{inquiry.answer}</p>
            </Container>
          </div>
        )}
      </Card>
    </>
  );
}

export default InquiryItem;
