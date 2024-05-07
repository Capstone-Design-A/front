import React from "react";
import styles from "./PostItem.module.css";

const PostItem = ({ post }) => {
  const { id, imageUrl, title, content } = post;

  return (
    <div className={styles.postItem}>
      <img className={styles.postImage} src={imageUrl} alt={`Post ${id}`} />
      <div className={styles.postContent}>
        <h2 className={styles.postTitle}>{title}</h2>
        <p className={styles.postDescription}>{content}</p>
      </div>
    </div>
  );
};

export default PostItem;
