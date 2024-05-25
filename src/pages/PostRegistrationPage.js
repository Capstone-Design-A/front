/*
import React, { useState } from "react";
import styles from "./PostRegistrationPage.module.css";

function PostRegistrationPage() {
  const [mainImage, setMainImage] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mainImage || !postContent) {
      setModalIsOpen(true);
      return;
    }
    const formData = new FormData();
    formData.append("mainImage", mainImage);
    formData.append("postContent", postContent);

    console.log(
      "게시물이 등록되었습니다.",
      Object.fromEntries(formData.entries())
    );

    fetch("/api/posts", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleMainImageChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>게시물 등록</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="mainImage">사진 업로드</label>
          <input
            type="file"
            id="mainImage"
            onChange={handleMainImageChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="postContent">내용 작성</label>
          <textarea
            className={styles.textarea}
            id="postContent"
            value={postContent}
            onChange={handleContentChange}
            required
          ></textarea>
        </div>
        <button className={styles.button} type="submit">
          게시물 등록
        </button>
      </form>
      {modalIsOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>경고</h2>
            <p>모든 필수 항목을 입력하세요.</p>
            <button
              className={styles.modalButton}
              onClick={() => setModalIsOpen(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostRegistrationPage;
*/

import React, { useState } from "react";
import styles from "./PostRegistrationPage.module.css";
import { createPost } from "../api/api"; // API 호출 함수 임포트

function PostRegistrationPage({ token }) {
  const [mainImage, setMainImage] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mainImage || !postContent) {
      setModalIsOpen(true);
      return;
    }

    try {
      const data = await createPost(token, mainImage, postContent);
      console.log("게시물이 등록되었습니다.", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleMainImageChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>게시물 등록</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="mainImage">사진 업로드</label>
          <input
            type="file"
            id="mainImage"
            onChange={handleMainImageChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="postContent">내용 작성</label>
          <textarea
            className={styles.textarea}
            id="postContent"
            value={postContent}
            onChange={handleContentChange}
            required
          ></textarea>
        </div>
        <button className={styles.button} type="submit">
          게시물 등록
        </button>
      </form>
      {modalIsOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>경고</h2>
            <p>모든 필수 항목을 입력하세요.</p>
            <button
              className={styles.modalButton}
              onClick={() => setModalIsOpen(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostRegistrationPage;
