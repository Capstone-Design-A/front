import React from "react";
import styles from "./PostItem.module.css";

const PostItem = ({ post }) => {
  const { id, imageUrl, title, content, createdAt } = post;

  return (
    <div className={styles.postItem}>
      <img className={styles.postImage} src={imageUrl} alt={`Post ${id}`} />
      <div className={styles.postContent}>
        <h2 className={styles.postTitle}>{title}</h2>
        <p className={styles.postDescription}>{content}</p>
        <p className={styles.postDescription}>{createdAt}</p>
      </div>
    </div>
  );
};

export default PostItem;
