// 공동구매 Item 컴포넌트
import Button from './../components/button/Button'
import Container from './shared/Container';
import styles from './Group.module.css';
import { Link } from 'react-router-dom';

function Group() {
  return (
    <Container>
        <div className={styles.page}>
          <div className={styles.text}>
            <h1>[4월 11일 순차출고]</h1>
            <h2>성주 꿀 참외 2.5kg 구성</h2>
            <h2>공동구매 할인가 <span className={styles.price}>27,900</span>원</h2>
            <h3>남은 수량 50개</h3>
            <Link to="/products">
              <Button className={styles.button}>공동구매 바로가기</Button>
            </Link>
          </div>
        </div>
    </Container>
  );
}

export default Group;