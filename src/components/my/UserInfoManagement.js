import React, { useState, useEffect } from "react";
import styles from "./UserInfoManagement.module.css";
import {
  fetchUserInfo,
  updateUserInfo,
  updateUserNickname,
} from "../../api/api";

function UserInfoManagement() {
  const [address, setAddress] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [nickName, setNickName] = useState("");
  const [isNicknameUpdating, setIsNicknameUpdating] = useState(false);
  const [nicknameButtonLabel, setNicknameButtonLabel] = useState("닉네임 변경");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [duplicateMessage, setDuplicateMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserInfo();
        if (data.isSuccess) {
          const result = data.result;
          setAddress(result.address);
          setDetailedAddress(result.details);
          setContactNumber(result.phone);
          setNickName(result.nickName);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleDetailedAddressChange = (e) => setDetailedAddress(e.target.value);
  const handleContactNumberChange = (e) => setContactNumber(e.target.value);
  const handleNickNameChange = (e) => setNickName(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);

  const handleNicknameUpdate = async () => {
    setIsNicknameUpdating(true);
    try {
      const data = await updateUserNickname({ nickName });
      if (data.isSuccess) {
        console.log("닉네임이 성공적으로 수정되었습니다.");
        setDuplicateMessage("닉네임이 성공적으로 수정되었습니다.");
        setNicknameButtonLabel("닉네임 변경 완료");
        document.getElementById("nicknameInput").disabled = true;
      } else {
        setDuplicateMessage("닉네임 수정에 실패했습니다.");
        console.error("닉네임 수정에 실패했습니다.");
      }
    } catch (error) {
      setDuplicateMessage("닉네임 수정 중 오류가 발생했습니다.");
      console.error("Error updating nickname:", error);
    } finally {
      setIsNicknameUpdating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!currentPassword) {
      setErrorMessage("현재 비밀번호를 입력하세요.");
      return;
    }

    if (newPassword.trim() && newPassword !== confirmPassword) {
      setErrorMessage("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    const updatedData = {
      address,
      details: detailedAddress,
      phone: contactNumber,
      currentPassword,
    };

    if (newPassword.trim()) {
      updatedData.password = newPassword;
    }

    try {
      const data = await updateUserInfo(updatedData);
      if (data.isSuccess) {
        console.log("회원 정보가 성공적으로 수정되었습니다.");
        setSuccessMessage("회원 정보가 성공적으로 수정되었습니다.");
      } else {
        setErrorMessage("회원 정보 수정에 실패했습니다.");
        console.error("회원 정보 수정에 실패했습니다.");
      }
    } catch (error) {
      setErrorMessage("회원 정보 수정 중 오류가 발생했습니다.");
      console.error("Error updating user data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.editProfileForm}>
      <h2>회원 정보 수정</h2>
      <div className={styles.formGroup}>
        <label>닉네임 변경</label>
        <input
          id="nicknameInput"
          type="text"
          value={nickName}
          onChange={handleNickNameChange}
          className={styles.nicknameInput}
          placeholder="닉네임"
        />
        <p className={styles.errorMessage}>{duplicateMessage}</p>
        <button
          type="button"
          onClick={handleNicknameUpdate}
          className={`${styles.nickNameSubmitButton} ${
            isNicknameUpdating || nicknameButtonLabel === "닉네임 변경 완료"
              ? styles.inactiveButton
              : ""
          }`}
          disabled={!nickName || isNicknameUpdating}
        >
          {nicknameButtonLabel}
        </button>
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
        <input
          type="text"
          value={contactNumber}
          onChange={handleContactNumberChange}
          placeholder="전화번호"
        />
      </div>
      <div className={styles.formGroup}>
        <label>현재 비밀번호</label>
        <input
          type="password"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          placeholder="현재 비밀번호"
        />
      </div>
      <div className={styles.formGroup}>
        <label>새 비밀번호</label>
        <input
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          placeholder="새 비밀번호"
        />
      </div>
      <div className={styles.formGroup}>
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="비밀번호 확인"
        />
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      {successMessage && (
        <p className={styles.errorMessage}>{successMessage}</p>
      )}
      <button type="submit" className={styles.submitButton}>
        변경 내용 저장
      </button>
    </form>
  );
}

export default UserInfoManagement;
