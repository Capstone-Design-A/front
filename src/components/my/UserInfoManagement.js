import { useState } from "react";
import styles from "./UserInfoManagement.module.css";

function UserInfoManagement() {
  const [profileImage, setProfileImage] = useState(null);
  const [emailLocal, setEmailLocal] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [address, setAddress] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");
  const [contactCountryCode, setContactCountryCode] = useState("+82");
  const [contactNumber, setContactNumber] = useState("");
  const [notificationSettings, setNotificationSettings] = useState({
    email: false,
    sms: false,
  });

  const handleImageChange = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleEmailLocalChange = (e) => setEmailLocal(e.target.value);
  const handleEmailDomainChange = (e) => setEmailDomain(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleDetailedAddressChange = (e) => setDetailedAddress(e.target.value);
  const handleContactCountryCodeChange = (e) =>
    setContactCountryCode(e.target.value);
  const handleContactNumberChange = (e) => setContactNumber(e.target.value);
  const handleNotificationChange = (e) => {
    setNotificationSettings({
      ...notificationSettings,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    const email = `${emailLocal}@${emailDomain}`;
    // eslint-disable-next-line
    const contact = `${contactCountryCode} ${contactNumber}`;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.editProfileForm}>
      <h2>회원 정보 수정</h2>
      <div className={styles.formGroup}>
        <label>프로필 사진</label>
        <input type="file" onChange={handleImageChange} />
        {profileImage && <img src={profileImage} alt="Profile" />}
      </div>
      <div className={styles.formGroup}>
        <label>이메일 주소 변경</label>
        <div className={styles.emailInputContainer}>
          <input
            type="text"
            value={emailLocal}
            onChange={handleEmailLocalChange}
            placeholder="email"
          />
          <span>@</span>
          <input
            type="text"
            value={emailDomain}
            onChange={handleEmailDomainChange}
            placeholder=".com"
          />
        </div>
      </div>
      <div className={styles.formGroup}>
        <label>배송지 변경</label>
        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder="주소"
        />
        <input
          type="text"
          value={detailedAddress}
          onChange={handleDetailedAddressChange}
          placeholder="상세 주소"
        />
      </div>
      <div className={styles.formGroup}>
        <label>연락처 변경</label>
        <div className={styles.contactInputContainer}>
          <select
            value={contactCountryCode}
            onChange={handleContactCountryCodeChange}
          >
            <option value="+82">+82 (South Korea)</option>
            {/* 어디까지 필요할까?
            <option value="+1">+1 (USA)</option>
            */}
          </select>
          <input
            type="text"
            value={contactNumber}
            onChange={handleContactNumberChange}
            placeholder="전화번호"
          />
        </div>
      </div>
      <div className={styles.formGroup}>
        <label>알림 설정</label>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="email"
              checked={notificationSettings.email}
              onChange={handleNotificationChange}
            />
            이메일 알림 동의
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="sms"
              checked={notificationSettings.sms}
              onChange={handleNotificationChange}
            />
            SMS 알림 동의
          </label>
        </div>
      </div>
      <button type="submit" className={styles.submitButton}>
        변경 내용 저장
      </button>
    </form>
  );
}

export default UserInfoManagement;
