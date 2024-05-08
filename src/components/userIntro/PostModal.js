import React from "react";
import HorizontalRule from "../../components/shared/HorizontalRule";
import styles from "./PostModal.module.css";

function PostModal({ post, onClose }) {
  const { id, imageUrl, content, createdAt } = post;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.postImageContainer}>
          <img src={imageUrl} alt={`Post ${id}`} className={styles.postImage} />
        </div>
        <div className={styles.content}>
          <p className={styles.postCreatedAt}>작성일 {createdAt}</p>
          <div className={styles.line}>
            <HorizontalRule />
          </div>
          <div className={styles.postContent}>
            <p className={styles.postDescription}>{content}</p>
          </div>
        </div>
        <div className={styles.button}>
          <button className={styles.closeButton} onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
