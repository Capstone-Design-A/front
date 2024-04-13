// 마이 페이지 컴포넌트
import styles from './My.module.css';
import Container from '../shared/Container';

function My () {
  return (
    <Container>
      <div className={styles.total}>
        <h1>마이 페이지입니다</h1>
      </div>
    </Container>
  );
}

export default My;