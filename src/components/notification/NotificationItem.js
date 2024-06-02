import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotificationItem.module.css";

function NotificationItem({
  id,
  title,
  content,
  isConfirmed,
  /* onDelete, */
}) {
  return (
    <Link to={`/post/${id}`} className={styles.notificationLink}>
      <div
        className={`${styles.notificationItem} ${
          isConfirmed ? styles.read : styles.unread
        }`}
      >
        <div className={styles.info}>
          <div className={styles.title}>{title}</div>
          <div className={styles.content}>{content}</div>
        </div>
        {/* <button className={styles.deleteButton} onClick={onDelete}>
          삭제
        </button>*/}
      </div>
    </Link>
  );
}

export default NotificationItem;
