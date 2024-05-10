import Button from "../button/Button";
import OrderButton from "../button/OrderButton";
import { Navigate, Link } from "react-router-dom";
import { addWishlist } from "../../api";
import Container from "../shared/Container";
import styles from "./ProductDetail.module.css";
import { useNavigate } from "react-router-dom";
import HorizontalRule from "../shared/HorizontalRule";
import Amount from "./Amount";

function ProductDetail({ item }) {
  const navigate = useNavigate();

  if (!item) {
    return <Navigate to="/product" />;
  }

  const handleAddWishlistClick = () => {
    addWishlist(item?.id);
    navigate("/cart");
  };

  return (
    <>
      <div className={styles.layout}>
        <Container className={styles.content}>
          <div className={styles.image}>
            <img className={styles.img} src={item.imageUrl} alt={item.name} />
            <Link to="/introduction">
              <button className={styles.button}>판매자 소개 바로가기</button>
            </Link>
          </div>
          <h1 className={styles.title}>{item.name}</h1>
          <div className={styles.amountWrapper}>
            <Amount className={styles.amount} />
          </div>
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
