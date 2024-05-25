import React, { useEffect, useState } from "react";
import HorizontalRule from "../../components/shared/HorizontalRule";
import styles from "./PostModal.module.css";
import { getPostItems } from "../../api/api";

function PostModal({ token, onClose }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const postId = 253;

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postData = await getPostItems(postId, token);
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId, token]);

  const handleNextImage = () => {
    if (post && post.imageUrlList) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % post.imageUrlList.length
      );
    }
  };

  const handlePreviousImage = () => {
    if (post && post.imageUrlList) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + post.imageUrlList.length) % post.imageUrlList.length
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Error loading post</div>;
  }

  const { postId: id, imageUrlList, content, createdAt } = post;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.postImageContainer}>
          <button
            className={`${styles.navButton} ${styles.left}`}
            onClick={handlePreviousImage}
          >
            &lt;
          </button>
          <img
            src={imageUrlList[currentImageIndex]}
            alt={`Post ${id} - ${currentImageIndex}`}
            className={styles.postImage}
          />
          <button
            className={`${styles.navButton} ${styles.right}`}
            onClick={handleNextImage}
          >
            &gt;
          </button>
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
