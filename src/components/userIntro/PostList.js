import React from "react";
import styles from "./PostList.module.css";

const PostList = ({ postList, onPostClick }) => {
  return (
    <div className={styles.postListContainer}>
      {postList.map((post) => (
        <div
          key={post.id}
          className={styles.postItem}
          onClick={() => onPostClick(post)}
        >
          <img src={post.imageUrl} alt="Post" className={styles.postImage} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
