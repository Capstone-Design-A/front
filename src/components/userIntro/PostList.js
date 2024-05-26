import React from "react";
import styles from "./PostList.module.css";

const PostList = ({ postList, onPostClick }) => {
  return (
    <div className={styles.postListContainer}>
      {postList.map((post) => (
        <div
          key={post.postId}
          className={styles.postItem}
          onClick={() => onPostClick(post.postId)}
        >
          <img src={post.imageUrl} alt="Post" className={styles.postImage} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
