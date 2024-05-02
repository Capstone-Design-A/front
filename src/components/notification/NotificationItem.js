import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotificationItem.module.css";

function NotificationItem({
  postId,
  profileImage,
  content,
  time,
  postImage,
  /* onDelete, */
}) {
  return (
    <Link to={`/post/${postId}`} className={styles.notificationLink}>
      <div className={styles.notificationItem}>
        <img
          src={profileImage}
          alt="프로필 이미지"
          className={styles.profileImage}
        />
        <div className={styles.info}>
          <div className={styles.content}>{content}</div>
          <div className={styles.time}>{time}</div>
        </div>
        <img src={postImage} alt="게시물 이미지" className={styles.postImage} />
        {/* <button className={styles.deleteButton} onClick={onDelete}>
          삭제
        </button>*/}
      </div>
    </Link>
  );
}

export default NotificationItem;
