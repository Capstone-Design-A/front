import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../api/api";
import Button from "../button/Button";
import OrderButton from "../button/OrderButton";
import Container from "../shared/Container";
import HorizontalRule from "../shared/HorizontalRule";
import styles from "./ProductDetail.module.css";

function ProductDetail({ item }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCartClick = async () => {
    try {
      const result = await addToCart(item.id, quantity);
      console.log("Item added to cart:", {
        itemId: item.id,
        quantity: quantity,
      });
      console.log(result.message);
      setShowModal(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleConfirm = () => {
    navigate("/auth/cart/item");
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = quantity * item.price;
  const mainImageUrl =
    item && item.imageUrls && item.imageUrls.length > 0
      ? item.imageUrls[0]
      : "";

  return (
    <>
      <div className={styles.layout}>
        <Container className={styles.content}>
          <div className={styles.image}>
            <img className={styles.img} src={mainImageUrl} alt={item.name} />
            <Link to={`/intro/${item.memberId}`}>
              <button className={styles.button}>판매자 소개 바로가기</button>
            </Link>
          </div>
          <h1 className={styles.title}>{item.name}</h1>
          <div className={styles.quantityControls}>
            <Button onClick={decreaseQuantity}>-</Button>
            <span className={styles.quantity}>{quantity}</span>
            <Button onClick={increaseQuantity}>+</Button>
          </div>
          <HorizontalRule />
          <p className={styles.price}>
            총 상품 금액<span>{totalPrice.toLocaleString()}</span>원
          </p>
        </Container>
        <HorizontalRule />
        <Container className={styles.order}>
          <OrderButton
            className={styles.orderbutton}
            variant="round"
            onClick={handleAddToCartClick}
          >
            바로구매
          </OrderButton>
          <Button
            className={styles.cartbutton}
            variant="round"
            onClick={handleAddToCartClick}
          >
            장바구니 담기
          </Button>
        </Container>
      </div>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>장바구니로 이동하시겠습니까?</h2>
            <div>
              <Button onClick={handleCancel}>취소</Button>
              <Button onClick={handleConfirm}>확인</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
