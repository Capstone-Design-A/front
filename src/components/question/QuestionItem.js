import React, { useState } from "react";
import DateText from "../../components/shared/DateText";
import Card from "../../components/shared/Card";
import Container from "../../components/shared/Container";
import styles from "./QuestionItem.module.css";

function QuestionItem({ question }) {
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const handleTitleClick = () => {
    setIsDetailVisible(!isDetailVisible);
  };

  return (
    <>
      <Card className={styles.questionItem} key={question.id}>
        <div className={styles.info}>
          <p className={styles.state}>
            답변 {question.status === "COMPLETE" ? "완료" : "대기"}
          </p>
          <p className={styles.title} onClick={handleTitleClick}>
            {question.content}
            {question.answer && <span className={styles.count}>[1]</span>}
          </p>
        </div>
        <p className={styles.writer}>{question.fromMemberNickname}</p>
        <p className={styles.date}>
          <DateText value={question.createdAt} />
        </p>
      </Card>
      {isDetailVisible && question.answer && (
        <div className={styles.answerContainer}>
          <Container className={styles.answers}>
            <h2>판매자 답변</h2>
            <p className={styles.answerItem}>{question.answer}</p>
          </Container>
        </div>
      )}
    </>
  );
}

export default QuestionItem;
