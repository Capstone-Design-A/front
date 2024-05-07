import React from "react";
import styles from "./PostList.module.css";

const PostList = ({ postList }) => {
  return (
    <div className={styles.postListContainer}>
      {postList.map((post) => (
        <div key={post.id} className={styles.postItem}>
          <img src={post.imageUrl} alt="Post" className={styles.postImage} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
