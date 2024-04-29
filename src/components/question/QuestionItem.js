import { useState } from "react";
import DateText from "../../components/shared/DateText";
import Card from "../../components/shared/Card";
import Container from "../../components/shared/Container";
import styles from "./QuestionItem.module.css";

function Answer({ answer }) {
  return (
    <div key={answer.id}>
      <p>{answer.content}</p>
      <div className={styles.answerInfo}>
        <DateText value={answer.createdAt} />
      </div>
      <Writer writer={answer.writer} />
    </div>
  );
}

function Writer({ writer }) {
  return (
    <div className={styles.writer}>
      <div className={styles.info}>
        <div className={styles.name}>{writer.name}</div>
      </div>
    </div>
  );
}

function QuestionItem({ question }) {
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  // 제목 클릭 시 답변을 펼침
  const handleTitleClick = () => {
    setIsDetailVisible(!isDetailVisible);
  };

  return (
    <>
      <Card className={styles.questionItem} key={question.title}>
        <div className={styles.info}>
          <p className={styles.state}>
            답변 {question.answers.length > 0 ? "완료" : "대기"}
          </p>
          <p className={styles.title} onClick={handleTitleClick}>
            {question.title}
            {question.answers.length > 0 && (
              <span className={styles.count}>[{question.answers.length}]</span>
            )}
          </p>
        </div>
        <p className={styles.writer}>{question.writer.name}</p>
        <p className={styles.date}>
          <DateText value={question.createdAt} />
        </p>
      </Card>
      {/* 답변이 있는 경우에만 답변을 표시하고 클릭 시 펼쳐짐 */}
      <div>
        <Card className={styles.answerContainer} key={question.title}>
          {isDetailVisible &&
            Array.isArray(question.answers) &&
            question.answers.length > 0 && (
              <div className={styles.answerContainer}>
                <Container className={styles.answers}>
                  <h2>
                    <h1 className={styles.answertitle}>판매자 답변</h1>
                  </h2>
                  {question.answers.map((answer) => (
                    <Answer
                      key={answer.id}
                      className={styles.answerItem}
                      answer={answer}
                    />
                  ))}
                </Container>
              </div>
            )}
        </Card>
      </div>
    </>
  );
}

export default QuestionItem;
