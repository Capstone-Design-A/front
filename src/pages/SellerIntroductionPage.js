import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "../components/userIntro/UserProfile";
import PostList from "../components/userIntro/PostList";
import PostModal from "../components/userIntro/PostModal";
import styles from "./SellerIntroductionPage.module.css";
import SellerIntroCategory from "../components/category/SellerIntroCategory";
import Container from "../components/shared/Container";
import { getSellerInfo, getPostList } from "../api/api";

function SellerIntroductionPage() {
  const { memberId } = useParams();
  console.log("memberId:", memberId);
  const [userData, setUserData] = useState(null);
  const [postList, setPostList] = useState([]);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sellerInfo = await getSellerInfo(memberId);
        setUserData(sellerInfo);

        const posts = await getPostList(memberId);
        setPostList(posts.postPreviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [memberId]);

  const toggleCategoryVisibility = () => {
    setIsCategoryVisible((prev) => !prev);
  };

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
  };

  const handlePostDelete = (deletedPostId) => {
    setPostList((prevPosts) =>
      prevPosts.filter((post) => post.postId !== deletedPostId)
    );
    setSelectedPostId(null);
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <div
          className={styles.toggleCategory}
          onClick={toggleCategoryVisibility}
        >
          <span className={styles.icon}>☰</span>
        </div>
        <div
          className={`${styles.categoryContainer} ${
            isCategoryVisible ? styles.visible : ""
          }`}
        >
          <div className={styles.categoryContent}>
            <SellerIntroCategory />
          </div>
        </div>
        <Container>
          <div className={styles.mainContainer}>
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                {userData && <UserProfile user={userData} />}
              </div>
            </div>
            <div className={styles.count}>
              <h1>게시물 {userData && userData.numberPosts}개</h1>
            </div>
            <div className={styles.postListTitle}>
              <PostList postList={postList} onPostClick={handlePostClick} />
            </div>
          </div>
        </Container>
      </div>
      {selectedPostId && (
        <div
          className={styles.backdrop}
          onClick={() => setSelectedPostId(null)}
        >
          <PostModal
            postId={selectedPostId}
            token={localStorage.getItem("accessToken")}
            onClose={() => setSelectedPostId(null)}
            onDelete={handlePostDelete}
          />
        </div>
      )}
    </>
  );
}

export default SellerIntroductionPage;
