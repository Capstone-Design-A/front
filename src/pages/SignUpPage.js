import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Label from "../components/shared/Label";
import Input from "../components/shared/Input";
import Button2 from "../components/button/Button2";
import { Link } from "react-router-dom";
import styles from "./SignUpPage.module.css";
import { useAuth } from "../contexts/AuthProvider";
import Container from "../components/shared/Container";
import { signUp, checkDuplicate, removeMember } from "../api/api";

function SignUpPage() {
  const [values, setValues] = useState({
    id: "",
    name: "",
    password: "",
    passwordRepeat: "",
    loginId: "",
    nickName: "",
    phone: "",
    address: "",
    details: "",
  });
  const [isLoginIdDuplicate, setIsLoginIdDuplicate] = useState(false);
  const [isNickNameDuplicate, setIsNickNameDuplicate] = useState(false);
  const [isLoginIdChecked, setIsLoginIdChecked] = useState(false);
  const [isNickNameChecked, setIsNickNameChecked] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [loginIdError, setLoginIdError] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");
  const [isLoginIdCheckComplete, setIsLoginIdCheckComplete] = useState(false);
  const [isNickNameCheckComplete, setIsNickNameCheckComplete] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const location = useLocation();

  async function handleCheckDuplicate(type) {
    try {
      const id = values.id;

      const temporaryMemberId = await checkDuplicate(id, type, values[type]);

      if (type === "loginId") {
        setIsLoginIdDuplicate(temporaryMemberId.isDuplicate);
        setIsLoginIdChecked(true);
        setIsLoginIdCheckComplete(true);
        if (!temporaryMemberId.isDuplicate) {
          setValues((prevValues) => ({
            ...prevValues,
            id: temporaryMemberId.id,
          }));
          localStorage.setItem("temporaryMemberId", temporaryMemberId.id);
          setLoginIdError("");
        } else {
          setValues((prevValues) => ({
            ...prevValues,
            id: "",
          }));
          setLoginIdError("이미 사용 중인 아이디입니다.");
        }
      } else if (type === "nickName") {
        setIsNickNameDuplicate(temporaryMemberId.isDuplicate);
        setIsNickNameChecked(true);
        setIsNickNameCheckComplete(true);
        if (!temporaryMemberId.isDuplicate) {
          setValues((prevValues) => ({
            ...prevValues,
            id: temporaryMemberId.id,
          }));
          localStorage.setItem("temporaryMemberId", temporaryMemberId.id);
          setNickNameError("");
        } else {
          setValues((prevValues) => ({
            ...prevValues,
            id: "",
          }));
          setNickNameError("이미 사용 중인 닉네임입니다.");
        }
      }
    } catch (error) {
      if (type === "loginId") {
        setLoginIdError("중복 체크 중 오류가 발생했습니다.");
      } else if (type === "nickName") {
        setNickNameError("중복 체크 중 오류가 발생했습니다.");
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (values.password !== values.passwordRepeat) {
      setGeneralErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!isLoginIdChecked || !isNickNameChecked) {
      setGeneralErrorMessage("아이디와 닉네임 중복 체크를 진행해주세요.");
      return;
    }

    if (isLoginIdDuplicate) {
      setGeneralErrorMessage("이미 사용 중인 아이디입니다.");
      return;
    }

    if (isNickNameDuplicate) {
      setGeneralErrorMessage("이미 사용 중인 닉네임입니다.");
      return;
    }

    if (!validatePhoneNumber(values.phone)) {
      setPhoneError("사용자의 전화번호 형식에 문제가 있습니다.");
      return;
    }

    if (!validateNickName(values.nickName)) {
      setNickNameError("사용자의 닉네임 형식에 문제가 있습니다.");
      return;
    }

    try {
      const { id, name, password, loginId, nickName, phone, address, details } =
        values;
      const data = await signUp(
        id,
        loginId,
        password,
        name,
        nickName,
        phone,
        address,
        details
      );

      if (data) {
        console.log("회원가입 성공:", data);
        localStorage.setItem("memberId", data.result.id);
        await login({ loginId, password });
        navigate("/login");
      } else {
        console.error("회원가입 실패");
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
      setGeneralErrorMessage("회원가입 중 오류가 발생했습니다.");
    }
  }

  useEffect(() => {
    setIsLoginIdChecked(false);
    setIsNickNameChecked(false);
    setGeneralErrorMessage("");
  }, [location.pathname]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const tempMemberId = localStorage.getItem("temporaryMemberId");
      if (tempMemberId) {
        removeMember(tempMemberId);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  function validatePhoneNumber(phoneNumber) {
    const regex = /^\d{3}-\d{4}-\d{4}$/;
    return regex.test(phoneNumber);
  }

  function validateNickName(nickName) {
    const regex = /^[a-zA-Z0-9가-힣]{4,14}$/;
    return regex.test(nickName);
  }

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
          <Label className={styles.Label} htmlFor="loginId">
            로그인 아이디
          </Label>
          <div className={styles.ButtonWrapper}>
            <Input
              id="loginId"
              className={styles.Input}
              name="loginId"
              type="text"
              placeholder="로그인 아이디"
              value={values.loginId}
              onChange={handleChange}
            />
            <Button2
              className={styles.button2}
              type="button"
              onClick={() => handleCheckDuplicate("loginId")}
            >
              {isLoginIdCheckComplete ? "중복 체크 완료" : "중복 체크"}
            </Button2>
          </div>
          {isLoginIdDuplicate && (
            <p className={styles.ErrorMsg}>이미 사용 중인 아이디입니다.</p>
          )}
          {loginIdError && <p className={styles.ErrorMsg}>{loginIdError}</p>}
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
          <Label className={styles.Label} htmlFor="nickName">
            닉네임
          </Label>
          <div className={styles.ButtonWrapper}>
            <Input
              id="nickName"
              className={styles.Input}
              name="nickName"
              type="text"
              placeholder="닉네임"
              value={values.nickName}
              onChange={handleChange}
            />
            <Button2
              className={styles.button2}
              type="button"
              onClick={() => handleCheckDuplicate("nickName")}
            >
              {isNickNameCheckComplete ? "중복 체크 완료" : "중복 체크"}
            </Button2>
          </div>
          {isNickNameDuplicate && (
            <p className={styles.ErrorMsg}>이미 사용 중인 닉네임입니다.</p>
          )}
          {nickNameError && <p className={styles.ErrorMsg}>{nickNameError}</p>}
          <Label className={styles.Label} htmlFor="phone">
            전화번호
          </Label>
          <Input
            id="phone"
            className={styles.Input}
            name="phone"
            type="text"
            placeholder="전화번호 (000-0000-0000)"
            value={values.phone}
            onChange={handleChange}
          />
          {phoneError && <p className={styles.ErrorMsg}>{phoneError}</p>}
          <Label className={styles.Label} htmlFor="address">
            주소
          </Label>
          <Input
            id="address"
            className={styles.Input}
            name="address"
            type="text"
            placeholder="주소"
            value={values.address}
            onChange={handleChange}
          />
          <Label className={styles.Label} htmlFor="details">
            상세주소
          </Label>
          <Input
            id="details"
            className={styles.Input}
            name="details"
            type="text"
            placeholder="상세주소"
            value={values.details}
            onChange={handleChange}
          />
          {generalErrorMessage && (
            <p className={styles.ErrorMsg}>{generalErrorMessage}</p>
          )}
          <Button2 className={styles.Button2} type="submit">
            회원가입
          </Button2>
          <div className={styles.login}>
            이미 회원이신가요?{" "}
            <Link to="/login">
              <span>로그인하기</span>
            </Link>
          </div>
        </form>
      </Container>
    </>
  );
}

export default SignUpPage;
