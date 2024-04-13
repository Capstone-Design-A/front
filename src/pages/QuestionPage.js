/* 상품 QnA 상세 페이지인데.. 페이지로 만들지 말고 클릭 시 열리는 게시판 형태로 하려다가?
나중에 AI 써서 문의기능 구현해 볼 거면 페이지로 만들어 두는 것 나쁘지 않을지도? */
import classNames from 'classnames';
import { Navigate, useParams } from 'react-router-dom';
import { getQuestionById } from '../api';
import Avatar from '../components/shared/Avatar';
import Card from '../components/shared/Card';
import Container from '../components/shared/Container';
import DateText from '../components/shared/DateText';
import Warn from '../components/shared/Warn';
import styles from './QuestionPage.module.css';

function QuestionPage() {
  const { questionId } = useParams();
  const question = getQuestionById(questionId);

  if (!question) return <Navigate to="/questions" />;

  return (
    <>
      <div className={styles.header}>
        <Container>
          <div className={styles.question}>
            <div className={styles.questionInfo}>
              <div className={styles.content}>
                <div className={styles.title}>
                  {question.title}
                  {question.answers > 0 && (
                    <span className={styles.count}>
                      {question.answers.length}
                    </span>
                  )}
                </div>
                <div className={styles.date}>
                  <DateText value={question.createdAt} />
                </div>
              </div>
              <Writer className={styles.author} writer={question.writer} />
            </div>
            <p
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: question.content }}
            />
          </div>
        </Container>
      </div>
      <Container className={styles.answers}>
        <h2>
          <h1 className={styles.title}>판매자 답변</h1>
        </h2>
        {question.answers.length > 0 ? (
          question.answers.map((answer) => (
            <Answer
              key={answer.id}
              className={styles.answerItem}
              answer={answer}
            />
          ))
        ) : (
          <Warn
            title="답변이 등록되지 않았습니다."
          />
        )}
      </Container>
    </>
  );
}

function Writer({ className, writer }) {
  return (
    <div className={classNames(className, styles.writer)}>
      <div className={styles.info}>
        <div className={styles.name}>{writer.name}</div>
        <div className={styles.level}>{writer.level}</div>
      </div>
      <Avatar name={writer.name} />
    </div>
  );
}

function Answer({ className, answer }) {
  return (
    <Card className={classNames(styles.answer, className)} key={answer.id}>
      <p dangerouslySetInnerHTML={{ __html: answer.content }} />
      <div className={styles.answerInfo}>
        <div className={styles.date}>
          <DateText value={answer.createdAt} />
        </div>
        <Writer writer={answer.writer} />
      </div>
    </Card>
  );
}

export default QuestionPage;

// Warn 아이콘 삭제하기 - 컴포넌트를 따로 만들어야하나?