import React, { useState, useEffect } from "react";
import UserProfile from "../components/userIntro/UserProfile";
import PostList from "../components/userIntro/PostList";
import styles from "./UserIntroductionPage.module.css";
import Category from "../components/category/Category";
import Container from "../components/shared/Container";

function UserIntroductionPage() {
  const [userData, setUserData] = useState(null);
  const [postList, setPostList] = useState([]);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // mock 데이터
        const userData = {
          username: "user123",
          subscriptionInfo: "2.4천",
          introduction: "맛있고 싱싱한 사과를 팝니다~^^",
          content:
            "우리 사과의 자랑은 친환경이라는 것입니다. 맛있는 우리 사과를 먹고 일상에 비타민을 충전해보아요 ^0^",
          profilePicture: "https://example.com/profile.jpg",
          product: "판매 중인 상품 보러가기",
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
            imageUrl: "https://example.com/post1.jpg",
            content: "첫 번째 게시물입니다.",
            createdDate: "작성일 2024.03.14",
          },
          {
            id: 2,
            imageUrl: "https://example.com/post2.jpg",
            content: "두 번째 게시물입니다.",
            createdDate: "작성일 2024.03.14",
          },
          {
            id: 3,
            imageUrl: "https://example.com/post3.jpg",
            contnet: "세 번째 게시물입니다.",
            createdDate: "작성일 2024.03.14",
          },
          {
            id: 4,
            imageUrl: "https://example.com/post4.jpg",
            content: "네 번째 게시물입니다.",
            createdDate: "작성일 2024.03.14",
          },
          {
            id: 5,
            imageUrl: "https://example.com/post5.jpg",
            content: "다섯 번째 게시물입니다.",
            createdDate: "작성일 2024.03.14",
          },
          {
            id: 6,
            imageUrl: "https://example.com/post6.jpg",
            content: "여섯 번째 게시물입니다.",
            createdDate: "작성일 2024.03.14",
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
            <Category />
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
              <PostList postList={postList} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default UserIntroductionPage;
