// 상품 문의 게시판
import { Link, useSearchParams } from 'react-router-dom';
import { getQuestions } from '../../api';
import DateText from '../shared/DateText';
import ListPage from '../product/ListPage';
import Card from '../shared/Card';
import Avatar from '../shared/Avatar';
import styles from './QuestionList.module.css';

function QuestionItem({ question }) {
  return (
    <Card className={styles.questionItem} key={question.title}>
      <div className={styles.info}>
        <p className={styles.title}>
          <Link to={`/questions/${question.id}`}>{question.title}</Link>
          {question.answers.length > 0 && (
            <span className={styles.count}>[{question.answers.length}]</span>
          )}
        </p>
        <p className={styles.date}>
          <DateText value={question.createdAt} />
        </p>
      </div>
      <div className={styles.writer}>
        <Avatar
          name={question.writer.name}
        />
      </div>
    </Card>
  );
}

function QuestionList() {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const initKeyword = searchParams.get('keyword');
  const questions = getQuestions(initKeyword);

  return (
    <ListPage
      variant="community"
      title="QnA 페이지입니다"
      description="페이지 없애고 컴포넌트만 남기기 (5개씩 보여주기)"
    >
      <p className={styles.count}>총 {questions.length}개 질문</p>
        <div className={styles.questionList}>
          {questions.map((question) => (
            <QuestionItem key={question.id} question={question} />
          ))}
        </div>
    </ListPage>
  );
}

export default QuestionList;