import React, { useState } from "react";
import { login } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/shared/Container";
import Label from "../components/shared/Label";
import Input from "../components/shared/Input";
import Button2 from "../components/button/Button2";
import styles from "./LoginPage.module.css";

const LoginPage = ({ onLogin }) => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { accessToken, refreshToken } = await login(loginId, password);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const tokenPayload = parseJwt(accessToken);
      const memberId = tokenPayload.id;
      localStorage.setItem("memberId", memberId);

      onLogin();
      navigate("/");
      console.log("로그인 성공");
    } catch (error) {
      setError(`로그인 실패: ${error.message}`);
    }
  };

  function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    const tokenPayload = JSON.parse(jsonPayload);
    console.log("Token Payload:", tokenPayload);

    return tokenPayload;
  }

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
          {error && <p className={styles.ErrorMsg}>{error}</p>}
          <div className={styles.register}>
            회원이 아니신가요?{" "}
            <Link to="/member/signUp">
              <span>회원가입하기</span>
            </Link>
          </div>
        </form>
      </Container>
    </>
  );
};

export default LoginPage;
