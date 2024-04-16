// LoginPage2 -> Login으로 이름 변경 (기존 Login, LoginPage 삭제)
// RegisterPage -> SignUp으로 이름 변경 (기존 SignUP 삭제)
// 두 페이지를 pages 폴더로 이동
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Label from "../components/shared/Label";
import Input from "../components/shared/Input";
import Button2 from "../components/button/Button2";
import HorizontalRule from "../components/shared/HorizontalRule";
import { Link } from "react-router-dom";
import GoogleImage from "../assets/google.svg";
import styles from "./LoginPage.module.css";
import { useAuth } from "../contexts/AuthProvider";
import Container from "../components/shared/Container";

function LoginPage() {
  const { user, login } = useAuth();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await login(values);
    navigate("/");
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Container className={styles.container}>
        <h1 className={styles.Heading}>로그인</h1>
        <form className={styles.Form} onSubmit={handleSubmit}>
          <Label className={styles.Label} htmlFor="email">
            이메일
          </Label>
          <Input
            id="email"
            className={styles.Input}
            name="email"
            type="email"
            placeholder="이메일"
            value={values.email}
            onChange={handleChange}
          />
          <Label className={styles.Label} htmlFor="password">
            비밀번호
          </Label>
          <Input
            id="password"
            className={styles.Input}
            name="password"
            type="password"
            placeholder="비밀번호"
            value={values.password}
            onChange={handleChange}
          />
          <Button2 className={styles.Button}>로그인</Button2>
          <div className={styles.register}>
            회원이 아니신가요?{" "}
            <Link to="/register">
              <span>회원가입하기</span>
            </Link>
          </div>
          <HorizontalRule className={styles.HorizontalRule}>
            또는
          </HorizontalRule>
          <Button2
            className={styles.GoogleButton}
            type="button"
            appearance="outline"
            as={Link}
            to="/api/auth/google"
            reloadDocument
          >
            <img src={GoogleImage} alt="Google" />
            구글로 시작하기
          </Button2>
        </form>
      </Container>
    </>
  );
}

export default LoginPage;
