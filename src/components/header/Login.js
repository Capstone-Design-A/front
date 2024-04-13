// 로그인 컴포넌트
import styles from './Login.module.css';
import Container from '../shared/Container';

function Login () {
  return (
    <Container>
      <div className={styles.total}>
        <h1>로그인 페이지입니다</h1>
      </div>
    </Container>
  );
}

export default Login;