import Button from "../button/Button";
import OrderButton from "../button/OrderButton";
import { Navigate } from "react-router-dom";
import { addWishlist } from "../../api";
import Container from "../shared/Container";
import ProductIcon from "../product/ProductIcon";
import styles from "./ProductDetail.module.css";
import { useNavigate } from "react-router-dom";
import HorizontalRule from "../shared/HorizontalRule";
import Amount from "./Amount";

function ProductDetail({ item }) {
  const navigate = useNavigate();

  if (!item) {
    return <Navigate to="/product" />;
  }

  // 판매자 소개 바로가기 버튼도 만들기
  const handleAddWishlistClick = () => {
    addWishlist(item?.id);
    navigate("/cart");
  };

  return (
    <>
      <div className={styles.header}>
        <Container className={styles.content}>
          <ProductIcon className={styles.img} imageUrl={item.imageUrl} />
          <button className={styles.button}>판매자 소개 바로가기</button>
          <h1 className={styles.title}>{item.name}</h1>
          <p className={styles.summary}>{item.content}</p>
          <Amount className={styles.amount} />
          <HorizontalRule />
          <p className={styles.price}>
            총 상품 금액<span>{item.price.toLocaleString()}</span>원
          </p>
        </Container>
        <HorizontalRule />
        <Container className={styles.order}>
          <OrderButton
            className={styles.orderbutton}
            variant="round"
            onClick={handleAddWishlistClick}
          >
            바로구매
          </OrderButton>
          <Button
            className={styles.cartbutton}
            variant="round"
            onClick={handleAddWishlistClick}
          >
            장바구니 담기
          </Button>
        </Container>
      </div>
    </>
  );
}

export default ProductDetail;
