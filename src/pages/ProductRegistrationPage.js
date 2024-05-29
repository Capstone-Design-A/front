import React, { useState } from "react";
import styles from "./ProductRegistrationPage.module.css";

function ProductRegistrationPage() {
  const [mainImage, setMainImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [isGroupPurchase, setIsGroupPurchase] = useState(false);
  const [targetQuantity, setTargetQuantity] = useState("");
  const [detailImages, setDetailImages] = useState([]);
  // eslint-disable-next-line
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !mainImage ||
      !productName ||
      !productDescription ||
      !productCategory ||
      !productPrice ||
      !detailImages.length
    ) {
      setModalIsOpen(true);
      return;
    }
    const formData = new FormData();
    formData.append("mainImage", mainImage);
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("productCategory", productCategory);
    formData.append("productPrice", productPrice);
    formData.append("isGroupPurchase", isGroupPurchase);
    formData.append("targetQuantity", targetQuantity);
    detailImages.forEach((image, index) => {
      formData.append(`detailImages[${index}]`, image);
    });

    console.log(
      "상품이 등록되었습니다.",
      Object.fromEntries(formData.entries())
    );

    fetch("/api/products", {
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

  const handleDetailImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setDetailImages((prevImages) => [...prevImages, ...files]);
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value.replace(/\D/g, "");
    setProductPrice(newPrice);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>상품 등록</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="mainImage">메인 이미지</label>
          <input
            type="file"
            id="mainImage"
            onChange={handleMainImageChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="productName">
            상품명
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="productDescription">상품 설명</label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="productCategory">카테고리</label>
          <select
            id="productCategory"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          >
            <option value="">카테고리를 선택하세요</option>
            <option value="vegetable">채소</option>
            <option value="fruit">과일</option>
            <option value="meat">축산</option>
            <option value="grain">쌀/잡곡</option>
            <option value="processed">가공</option>
            <option value="kimchi">김치</option>
            <option value="etc">기타</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="productPrice">가격</label>
          <input
            type="text"
            id="productPrice"
            value={formatPrice(productPrice)}
            onChange={handlePriceChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="isGroupPurchase">공동구매 여부</label>
          <input
            type="checkbox"
            id="isGroupPurchase"
            checked={isGroupPurchase}
            onChange={(e) => setIsGroupPurchase(e.target.checked)}
          />
        </div>
        {isGroupPurchase && (
          <div className={styles.flexRow}>
            <div className={styles.formGroup}>
              <label htmlFor="targetQuantity">목표 인원수</label>
              <input
                type="number"
                id="targetQuantity"
                value={targetQuantity}
                onChange={(e) => setTargetQuantity(e.target.value)}
                required={isGroupPurchase}
              />{" "}
              <span className={styles.member}>명</span>
            </div>
          </div>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="detailImages">상품 상세 이미지</label>
          <input
            type="file"
            id="detailImages"
            multiple
            onChange={handleDetailImagesChange}
          />
        </div>
        <button className={styles.button} type="submit">
          상품 등록
        </button>
      </form>
    </div>
  );
}

export default ProductRegistrationPage;
