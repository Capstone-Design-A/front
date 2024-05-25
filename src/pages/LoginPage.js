import React, { useState } from "react";
import { login } from "../api/api";
import { Link } from "react-router-dom";
import Container from "../components/shared/Container";
import Label from "../components/shared/Label";
import Input from "../components/shared/Input";
import Button2 from "../components/button/Button2";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { accessToken, refreshToken } = await login(loginId, password);
      console.log("accessToken:", accessToken);
      console.log("refreshToken:", refreshToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log("토큰이 로컬 스토리지에 저장되었습니다.");
      console.log("로그인 성공");
    } catch (error) {
      setError(`로그인 실패: ${error.message}`);
      // console.log("로그인 실패", error.message);
    }
  };

  return (
    <>
      <Container className={styles.container}>
        <h1 className={styles.Heading}>로그인</h1>
        <form className={styles.Form} onSubmit={handleLogin}>
          <Label className={styles.Label} htmlFor="email">
            아이디
          </Label>
          <Input
            id="loginId"
            className={styles.Input}
            type="text"
            placeholder="이메일"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <Label className={styles.Label} htmlFor="password">
            비밀번호
          </Label>
          <Input
            id="password"
            className={styles.Input}
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button2 className={styles.Button} type="submit">
            로그인
          </Button2>
          <div className={styles.register}>
            회원이 아니신가요?{" "}
            <Link to="/register">
              <span>회원가입하기</span>
            </Link>
          </div>
        </form>
      </Container>
    </>
  );
};

export default LoginPage;
