import React, { useState, useEffect } from "react";
import UserProfile from "../components/userIntro/UserProfile";
import PostList from "../components/userIntro/PostList";
import PostModal from "../components/userIntro/PostModal";
import styles from "./SellerIntroductionPage.module.css";
import SellerCategory from "../components/category/SellerCategory";
import Container from "../components/shared/Container";

function SellerIntroductionPage() {
  const [userData, setUserData] = useState(null);
  const [postList, setPostList] = useState([]);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // mock 데이터
        const userData = {
          id: 2,
          username: "user123",
          subscriptionInfo: "2.4천",
          introduction: "한 줄 소개란입니다.",
          content: "상세 소개란입니다.",
          profilePicture: null,
          product: "판매 중인 상품 보러가기",
          isSubscribed: true,
        };
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchPostData = async () => {
      try {
        // mock 데이터
        const postList = [
          {
            id: 1,
            imageUrl: null,
            content:
              "첫 번째 게시물입니다.첫 번째 게시물입니다.첫 번째 게시물입니다.첫 번째 게시물입니다.첫 번째 게시물입니다.첫 번째 게시물입니다.첫 번째 게시물입니다.첫 번째 게시물입니다.첫 번째 게시물입니다.첫 번째 게시물입니다.첫 번째 게시물입니다.첫 번째 게시물입니다.첫 번째 게시물입니다.첫 번째 게시물입니다.첫 번째 게시물입니다.첫 번째 게시물입니다.첫 번째 게시물입니다.첫 번째 게시물입니다.첫 번째 게시물입니다.첫 번째 게시물입니다.",
            createdAt: "2024.03.14",
          },
          {
            id: 2,
            imageUrl: null,
            content: "두 번째 게시물입니다.",
            createdAt: "2024.03.14",
          },
          {
            id: 3,
            imageUrl: null,
            content: "세 번째 게시물입니다.",
            createdAt: "2024.03.14",
          },
          {
            id: 4,
            imageUrl: null,
            content: "네 번째 게시물입니다.",
            createdAt: "2024.03.14",
          },
          {
            id: 5,
            imageUrl: null,
            content: "다섯 번째 게시물입니다.",
            createdAt: "2024.03.14",
          },
          {
            id: 6,
            imageUrl: null,
            content: "여섯 번째 게시물입니다.",
            createdAt: "2024.03.14",
          },
        ];
        setPostList(postList);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchUserData();
    fetchPostData();
  }, []);

  const toggleCategoryVisibility = () => {
    setIsCategoryVisible((prev) => !prev);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
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
            <SellerCategory />
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
              <h1>게시물 {postList.length}개</h1>
            </div>
            <div className={styles.postListTitle}>
              <PostList postList={postList} onPostClick={handlePostClick} />
            </div>
          </div>
        </Container>
      </div>
      {selectedPost && (
        <div className={styles.backdrop} onClick={() => setSelectedPost(null)}>
          <PostModal
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        </div>
      )}
    </>
  );
}

export default SellerIntroductionPage;
