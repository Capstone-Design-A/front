import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Label from "../components/shared/Label";
import Input from "../components/shared/Input";
import Button2 from "../components/button/Button2";
import HorizontalRule from "../components/shared/HorizontalRule";
import { Link } from "react-router-dom";
import GoogleImage from "../assets/google.svg";
import styles from "./SignUpPage.module.css";
// 에러 발생해서 주석처리 해둔 상태.. Toaster 계층구조 문제 or vaule 값이 undefined인 문제인데..
// import { useToaster } from "../contexts/ToasterProvider";
import { useAuth } from "../contexts/AuthProvider";
import Container from "../components/shared/Container";

function SignUpPage() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const navigate = useNavigate();
  // const toast = useToaster();
  const { user, login } = useAuth();

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (values.password !== values.passwordRepeat) {
      <h1>비밀번호가 일치하지 않습니다.</h1>;
      // toast("warn", "비밀번호가 일치하지 않습니다.");
      return;
    }

    // values State 값을 서버로 보내준다
    // axios를 사용해 POST 리퀘스트 보내기
    const { name, email, password } = values;
    await axios.post("/users", {
      name,
      email,
      password,
    });
    await login({ email, password });
    navigate("/");
  }

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <>
      <Container className={styles.container}>
        <h1 className={styles.Heading}>회원가입</h1>
        <form className={styles.Form} onSubmit={handleSubmit}>
          <Label className={styles.Label} htmlFor="name">
            이름
          </Label>
          <Input
            id="name"
            className={styles.Input}
            name="name"
            type="text"
            placeholder="이름"
            value={values.name}
            onChange={handleChange}
          />
          <Label className={styles.Label} htmlFor="email">
            이메일
          </Label>
          <Input
            id="email"
            className={styles.Input}
            name="email"
            type="email"
            placeholder="useremail@email.com"
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
          <Label className={styles.Label} htmlFor="passwordRepeat">
            비밀번호 확인
          </Label>
          <Input
            id="passwordRepeat"
            className={styles.Input}
            name="passwordRepeat"
            type="password"
            placeholder="비밀번호 확인"
            value={values.passwordRepeat}
            onChange={handleChange}
          />
          <Button2 className={styles.Button2}>회원가입</Button2>
          <div className={styles.login}>
            이미 회원이신가요?{" "}
            <Link to="/login">
              <span>로그인하기</span>
            </Link>
          </div>
        </form>
        <HorizontalRule className={styles.HorizontalRule}>또는</HorizontalRule>
        <Button2
          className={styles.GoogleButton2}
          type="Button2"
          appearance="outline"
          as={Link}
          to="/api/auth/google"
          reloadDocument
        >
          <img src={GoogleImage} alt="Google" />
          구글로 시작하기
        </Button2>
      </Container>
    </>
  );
}

export default SignUpPage;
