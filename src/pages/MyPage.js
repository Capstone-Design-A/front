import React, { useState } from "react";
import UserInfoManagement from "../components/my/UserInfoManagement";
import SubscriptionManagement from "../components/my/SubscriptionManagement";
import OrderDeliveryStatus from "../components/my/OrderDeliveryStatus";
import GroupItemStatus from "../components/my/GroupItemStatus";
import ConvertToSeller from "../components/my/ConvertToSeller";
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
        return <UserInfoManagement />;
      case "subscriptionManagement":
        return <SubscriptionManagement />;
      case "orderHistory":
        return <OrderDeliveryStatus />;
      case "groupPurchase":
        return <GroupItemStatus />;
      case "sellerApplication":
        return <ConvertToSeller setIsSeller={setIsSeller} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>마이 페이지</h1>
      {isSeller ? (
        <div className={styles.sellerContainer}>
          <h2 className={styles.memberTitle}>판매 회원 정보 관리</h2>
          <p>판매 회원 기능은 추후 구현 예정</p>
        </div>
      ) : (
        <div className={styles.memberContainer}>
          <h2 className={styles.memberTitle}>일반 회원 정보 관리</h2>
          <div className={styles.optionContainer}>
            {[
              "editProfile",
              "subscriptionManagement",
              "orderHistory",
              "groupPurchase",
              "sellerApplication",
            ].map((section) => (
              <button
                key={section}
                className={`${styles.optionButton} ${
                  activeSection === section ? styles.active : ""
                }`}
                onClick={() => toggleSection(section)}
              >
                {getButtonLabel(section)}
              </button>
            ))}
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

const getButtonLabel = (section) => {
  switch (section) {
    case "editProfile":
      return "회원 정보 수정";
    case "subscriptionManagement":
      return "구독 관리";
    case "orderHistory":
      return "주문 배송 현황";
    case "groupPurchase":
      return "공동구매 신청 내역";
    case "sellerApplication":
      return "판매자 신청";
    default:
      return "";
  }
};

export default MyPage;
