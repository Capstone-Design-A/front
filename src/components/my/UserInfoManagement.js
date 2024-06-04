import React, { useState, useEffect } from "react";
import styles from "./UserInfoManagement.module.css";
import { fetchUserInfo, updateUserInfo, checkDuplicate } from "../../api/api";

function UserInfoManagement() {
  const [address, setAddress] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [nickName, setNickName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // eslint-disable-next-line
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState(false);
  const [duplicateMessage, setDuplicateMessage] = useState("");

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
  const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);

  const handleCheckDuplicate = async () => {
    setIsCheckingDuplicate(true);
    try {
      const isAvailable = await checkDuplicate(null, "nickName", nickName);
      setIsNicknameAvailable(isAvailable);
      setDuplicateMessage(
        isAvailable
          ? "사용 가능한 닉네임입니다."
          : "이미 사용 중인 닉네임입니다."
      );
    } catch (error) {
      console.error("Error checking nickname availability:", error);
      setIsNicknameAvailable(false);
      setDuplicateMessage("닉네임 중복 확인 중 오류가 발생했습니다.");
    } finally {
      setIsCheckingDuplicate(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      address,
      details: detailedAddress,
      phone: contactNumber,
      password: newPassword || currentPassword,
    };

    try {
      const data = await updateUserInfo(updatedData);
      if (data) {
        setAddress(data.address);
        setDetailedAddress(data.details);
        setContactNumber(data.phone);
        alert("회원 정보가 성공적으로 수정되었습니다.");
      } else {
        alert("회원 정보 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.editProfileForm}>
      <h2>회원 정보 수정</h2>
      <div className={styles.formGroup}>
        <label>닉네임 변경</label>
        <div className={styles.nicknameInputGroup}>
          <input
            type="text"
            value={nickName}
            onChange={handleNickNameChange}
            className={styles.nicknameInput}
            placeholder="닉네임"
          />
          <button
            type="button"
            onClick={handleCheckDuplicate}
            disabled={isCheckingDuplicate}
            className={styles.checkDuplicateButton}
          >
            중복 체크
          </button>
        </div>
        {!isCheckingDuplicate && (
          <p className={styles.duplicateMessage}>{duplicateMessage}</p>
        )}
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
        <label>비밀번호 변경</label>
        <input
          type="password"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          placeholder="현재 비밀번호"
        />
        <input
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          placeholder="새 비밀번호"
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        변경 내용 저장
      </button>
    </form>
  );
}

export default UserInfoManagement;
