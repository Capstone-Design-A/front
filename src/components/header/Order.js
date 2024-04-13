// 주문배송 컴포넌트
import styles from './Login.module.css';
import Container from '../shared/Container';

function Order () {
  return (
    <Container>
      <div className={styles.total}>
        <h1>주문배송 페이지입니다</h1>
      </div>
    </Container>
  );
}

export default Order;