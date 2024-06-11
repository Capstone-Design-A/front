import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductRegistrationPage.module.css";
import { registerItem } from "../api/api";

function ProductRegistrationPage() {
  const [itemName, setItemName] = useState("");
  const [simpleExplanation, setSimpleExplanation] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [deliveryPrice, setDeliveryPrice] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [isGroupPurchase, setIsGroupPurchase] = useState(false);
  const [targetQuantity, setTargetQuantity] = useState("");
  const [groupPurchasePrice, setGroupPurchasePrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [itemImages, setItemImages] = useState([]);
  const [itemDetailsImage, setItemDetailsImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !itemName ||
      !simpleExplanation ||
      !categoryId ||
      !price ||
      !stock ||
      !deliveryPrice ||
      !deadLine ||
      !itemDetailsImage ||
      itemImages.length === 0 ||
      (isGroupPurchase && (!targetQuantity || !groupPurchasePrice))
    ) {
      setErrorMessage("모든 필수 항목을 입력하세요.");
      return;
    }

    try {
      const result = await registerItem(
        itemName,
        simpleExplanation,
        parseInt(categoryId),
        parseInt(price),
        parseInt(stock),
        parseInt(deliveryPrice),
        deadLine,
        isGroupPurchase,
        parseInt(targetQuantity),
        parseInt(groupPurchasePrice),
        itemDetailsImage,
        itemImages.map((image) => ({
          sequence: image.sequence,
          multipartFile: image.multipartFile,
        }))
      );
      if (result.isSuccess) {
        console.log("상품이 등록되었습니다:", result);
        setErrorMessage("");
        navigate("/auth/seller/items?page=1&size=10");
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("상품 등록에 실패했습니다.");
    }
  };

  const handleDetailImagesChange = (e) => {
    setItemDetailsImage(e.target.files[0]);
  };

  const handleItemImageChange = (e) => {
    const images = Array.from(e.target.files);
    const updatedImages = [
      ...itemImages,
      ...images.map((image, index) => ({
        sequence: itemImages.length + index + 1,
        multipartFile: image,
      })),
    ];

    setItemImages(updatedImages);
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value.replace(/\D/g, "");
    setPrice(newPrice);
  };

  const handleDeliveryPriceChange = (e) => {
    const newDeliveryPrice = e.target.value.replace(/\D/g, "");
    setDeliveryPrice(newDeliveryPrice);
  };

  const handleGroupPurchasePriceChange = (e) => {
    const newGroupPurchasePrice = e.target.value.replace(/\D/g, "");
    setGroupPurchasePrice(newGroupPurchasePrice);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>상품 등록</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="itemDetailsImage">메인 이미지</label>
          <input
            type="file"
            id="itemDetailsImage"
            onChange={handleDetailImagesChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="itemName">
            상품명
          </label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="simpleExplanation">상품 설명</label>
          <textarea
            id="simpleExplanation"
            value={simpleExplanation}
            onChange={(e) => setSimpleExplanation(e.target.value)}
            required
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="categoryId">카테고리</label>
          <select
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">카테고리를 선택하세요</option>
            <option value="1">채소</option>
            <option value="2">과일</option>
            <option value="3">축산</option>
            <option value="4">쌀/잡곡</option>
            <option value="5">가공</option>
            <option value="6">김치</option>
            <option value="7">기타</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="price">가격</label>
          <input
            type="text"
            id="price"
            value={formatPrice(price)}
            onChange={handlePriceChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="stock">재고</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="deliveryPrice">배송비</label>
          <input
            type="text"
            id="deliveryPrice"
            value={formatPrice(deliveryPrice)}
            onChange={handleDeliveryPriceChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="deadLine">마감일</label>
          <input
            type="datetime-local"
            id="deadLine"
            value={deadLine}
            onChange={(e) => setDeadLine(e.target.value)}
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
                required
              />{" "}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="groupPurchasePrice">공동구매 가격</label>
              <input
                type="text"
                id="groupPurchasePrice"
                value={formatPrice(groupPurchasePrice)}
                onChange={handleGroupPurchasePriceChange}
                required
              />
            </div>
          </div>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="itemImages">상품 상세 이미지</label>
          <input
            type="file"
            id="itemImages"
            onChange={handleItemImageChange}
            required
            multiple
          />
        </div>
        <button className={styles.button} type="submit">
          상품 등록
        </button>
      </form>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
}

export default ProductRegistrationPage;
