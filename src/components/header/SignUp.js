// 회원가입 컴포넌트
import styles from './SignUp.module.css';
import Container from '../shared/Container';

function SignUp () {
  return (
    <Container>
      <div className={styles.total}>
        <h1>회원가입 페이지입니다</h1>
      </div>
    </Container>
  );
}

export default SignUp;