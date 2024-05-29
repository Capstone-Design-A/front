import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./UserProfile.module.css";
import {
  subscribe,
  unsubscribe,
  getSubscriptionStatus,
} from "../../api/api.js";

const UserProfile = ({ user }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const result = await getSubscriptionStatus(user.memberId);
        if (result.isSuccess) {
          setIsSubscribed(result.result.isSubscribe);
        } else {
          setErrorMessage(result.message);
        }
      } catch (error) {
        console.error("Error checking subscription status:", error);
        setErrorMessage("Failed to check subscription status");
      }
    };
    checkSubscriptionStatus();
  }, [user.memberId]);

  const handleSubscribeClick = async () => {
    try {
      if (isSubscribed) {
        const result = await unsubscribe(user.memberId);
        if (result.isSuccess) {
          setIsSubscribed(false);
        } else {
          setErrorMessage(result.message);
        }
      } else {
        const result = await subscribe(user.memberId);
        if (result.isSuccess) {
          setIsSubscribed(true);
        } else {
          setErrorMessage(result.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to perform subscription action");
    }
  };

  return (
    <>
      <div className={styles.userProfileContainer}>
        <img
          className={styles.profilePicture}
          src={user.profilePicture}
          alt="Profile"
        />
        <div className={styles.userInfo}>
          <div className={styles.userHeader}>
            <h1 className={styles.username}>{user.memberName}</h1>
            <button
              className={styles.subscribeButton}
              onClick={handleSubscribeClick}
            >
              {isSubscribed ? "구독 취소" : "구독하기"}
            </button>
          </div>
          <p className={styles.subscriptionInfo}>
            <span>{user.subscriptionInfo}</span> 명이 구독하고 있어요
          </p>
          <p className={styles.introduction}>{user.simpleIntro}</p>
          <p className={styles.content}>{user.detailIntro}</p>
          <button className={styles.productButton}>
            <p className={styles.product}>{user.memberImageUrl}</p>
          </button>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </div>
      </div>
      <Link to="/auth/posts">
        <button className={styles.subscribeButton}>게시물 작성하기</button>
      </Link>
    </>
  );
};

export default UserProfile;
