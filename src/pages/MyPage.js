import React, { useState } from "react";
import styles from "./MyPage.module.css";

function MyPage() {
  const [isSeller, setIsSeller] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const toggleUserType = () => {
    setIsSeller(!isSeller);
    setActiveSection(null);
  };

  const toggleSection = (section) => {
    setActiveSection((prevSection) =>
      prevSection === section ? null : section
    );
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "editProfile":
        return <div>회원 정보 수정</div>;
      case "changePassword":
        return <div>비밀번호 변경</div>;
      case "orderHistory":
        return <div>주문 배송 현황</div>;
      case "groupPurchase":
        return <div>공동구매 신청 내역</div>;
      case "sellerApplication":
        return <div>판매자 신청하기</div>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>마이 페이지</h1>

      {isSeller ? (
        <div className={styles.sellerContainer}>
          <h2>판매 회원 정보 관리</h2>
          <p>판매 회원 기능은 추후 구현 예정</p>
        </div>
      ) : (
        <div className={styles.memberContainer}>
          <h2>일반 회원 정보 관리</h2>
          <div className={styles.optionContainer}>
            <button
              className={styles.optionButton}
              onClick={() => toggleSection("editProfile")}
            >
              회원 정보 수정
            </button>
            <button
              className={styles.optionButton}
              onClick={() => toggleSection("changePassword")}
            >
              비밀번호 변경
            </button>
            <button
              className={styles.optionButton}
              onClick={() => toggleSection("orderHistory")}
            >
              주문 배송 현황
            </button>
            <button
              className={styles.optionButton}
              onClick={() => toggleSection("groupPurchase")}
            >
              공동구매 신청 내역
            </button>
            <button
              className={styles.optionButton}
              onClick={() => toggleSection("sellerApplication")}
            >
              판매자 신청
            </button>
          </div>
          <div className={styles.sectionContent}>{renderSectionContent()}</div>
        </div>
      )}
      <div className={styles.buttonContainer}>
        <button className={styles.toggleButton} onClick={toggleUserType}>
          {isSeller ? "일반 회원으로 보기" : "판매 회원으로 보기"}
        </button>
      </div>
    </div>
  );
}

export default MyPage;
