import React, { useState } from "react";
import { convertToSeller } from "../../api/api";
import styles from "./ConvertToSeller.module.css";

function ConvertToSeller({ setIsSeller }) {
  const [profileImage, setProfileImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSellerApplication = async () => {
    const introduction = {
      shortDescription: description,
      detailedDescription: description,
    };

    try {
      await convertToSeller(profileImage, introduction);
      setIsSeller(true);
    } catch (error) {
      console.error("Error applying as seller:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formGroup}>
        <label htmlFor="profileImage">프로필 이미지:</label>
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          onChange={handleProfileImageChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">판매자 소개:</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <button className={styles.convert} onClick={handleSellerApplication}>
        판매자 신청하기
      </button>
    </div>
  );
}

export default ConvertToSeller;
