import Button from "../button/Button";
import OrderButton from "../button/OrderButton";
import { Navigate, useParams } from "react-router-dom";
import { addWishlist, getProductBySlug } from "../../api";
import Container from "../shared/Container";
import ProductIcon from "../product/ProductIcon";
import getProductColor from "../../utils/getProductColor";
import styles from "./ProductDetail.module.css";
import { useNavigate } from "react-router-dom";
import HorizontalRule from "../shared/HorizontalRule";
import Amount from "./Amount";

function ProductDetail() {
  const navigate = useNavigate();
  const { productSlug } = useParams();
  const product = getProductBySlug(productSlug);
  const productColor = getProductColor(product?.code);

  if (!product) {
    return <Navigate to="/products" />;
  }

  const headerStyle = {
    borderTopColor: productColor,
  };

  // 판매자 소개 바로가기 버튼도 만들기
  const handleAddWishlistClick = () => {
    addWishlist(product?.slug);
    navigate("/cart");
  };

  return (
    <>
      <div className={styles.header} style={headerStyle}>
        <Container className={styles.content}>
          <ProductIcon className={styles.img} photoUrl={product.photoUrl} />
          <button className={styles.button}>판매자 소개 바로가기</button>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.summary}>{product.summary}</p>
          <Amount className={styles.amount} />
          <HorizontalRule />
          <p className={styles.price}>
            총 상품 금액<span>{product.price}</span>원
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
