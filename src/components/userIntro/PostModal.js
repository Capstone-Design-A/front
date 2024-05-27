import React, { useEffect, useState } from "react";
import HorizontalRule from "../../components/shared/HorizontalRule";
import styles from "./PostModal.module.css";
import { getPostItems, deletePost } from "../../api/api";

function PostModal({ postId, token, onClose, onDelete }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeletePost = async () => {
    setIsDeleting(true);
    try {
      const result = await deletePost(postId, token);
      console.log("게시물이 삭제되었습니다.", result);
      onDelete(postId);
      onClose();
    } catch (error) {
      console.error("Error deleting post:", error);
      setIsDeleting(false);
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
          <div className={styles.header}>
            <p className={styles.postCreatedAt}>작성일 {createdAt}</p>
            <button
              className={styles.deleteButton}
              onClick={handleDeletePost}
              disabled={isDeleting}
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </button>
          </div>
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
