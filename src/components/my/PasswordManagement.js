import { useState } from "react";
import styles from "./UserInfoManagement.module.css";

function PasswordManagement() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmNewPasswordChange = (e) =>
    setConfirmNewPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("새 비밀번호와 확인용 비밀번호가 일치하지 않습니다.");
      return;
    }
    console.log("비밀번호 변경 요청:", currentPassword, newPassword);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.editProfileForm}>
      <h2 className={styles.title}>비밀번호 변경</h2>
      <div className={styles.formGroup}>
        <label>현재 비밀번호</label>
        <input
          type="password"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>새 비밀번호</label>
        <input
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>새 비밀번호 확인</label>
        <input
          type="password"
          value={confirmNewPassword}
          onChange={handleConfirmNewPasswordChange}
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        변경 내용 저장
      </button>
    </form>
  );
}

export default PasswordManagement;
