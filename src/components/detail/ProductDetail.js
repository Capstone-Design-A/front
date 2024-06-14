import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { addToCart } from "../../api/api";
import Button from "../button/Button";
import OrderButton from "../button/OrderButton";
import Container from "../shared/Container";
import HorizontalRule from "../shared/HorizontalRule";
import styles from "./ProductDetail.module.css";
import "slick-carousel/slick/slick.css";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.arrowButton} ${styles.nextArrow}`}
      style={{ ...style }}
      onClick={onClick}
    >
      〉
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.arrowButton} ${styles.prevArrow}`}
      style={{ ...style }}
      onClick={onClick}
    >
      〈
    </div>
  );
};

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

  const handleBuyNowClick = () => {
    const quantityAsNumber = parseInt(quantity);
    console.log("Quantity as number:", quantityAsNumber);

    const totalAmount = quantityAsNumber * item.price;
    console.log("Total amount:", totalAmount);

    navigate("/auth/payment", {
      state: {
        products: [
          {
            id: item.id,
            name: item.name,
            image: item.imageUrls,
            price: item.price,
            quantity: quantity,
          },
        ],
        totalAmount: totalAmount,
      },
    });
  };
  const totalPrice = quantity * item.price;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (!item || !item.imageUrls) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.layout}>
        <Container className={styles.content}>
          <div className={styles.image}>
            {item.imageUrls.length > 0 ? (
              <Slider {...settings}>
                {item.imageUrls.map((url, index) => (
                  <div key={index}>
                    <img
                      className={styles.img}
                      src={url}
                      alt={`${item.name} ${index + 1}`}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <div>상품 이미지가 없습니다.</div>
            )}
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
            총 상품 금액<span>{totalPrice.toLocaleString()}원</span>
          </p>
        </Container>
        <HorizontalRule />
        <Container className={styles.order}>
          <OrderButton
            className={styles.orderbutton}
            variant="round"
            onClick={handleBuyNowClick}
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
