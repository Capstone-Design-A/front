import React from "react";
import styles from "./UserProfile.module.css";

const UserProfile = ({ user }) => {
  return (
    <div className={styles.userProfileContainer}>
      <img
        className={styles.profilePicture}
        src={user.profilePicture}
        alt="Profile"
      />
      <div className={styles.userInfo}>
        <div className={styles.userHeader}>
          <h1 className={styles.username}>{user.username}</h1>
          <button className={styles.subscribeButton}>구독하기</button>
        </div>
        <p className={styles.subscriptionInfo}>
          <span>{user.subscriptionInfo}</span> 명이 구독하고 있어요
        </p>
        <p className={styles.introduction}>{user.introduction}</p>
        <p className={styles.content}>{user.content}</p>
        <button className={styles.productButton}>
          <p className={styles.product}>{user.product}</p>
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
