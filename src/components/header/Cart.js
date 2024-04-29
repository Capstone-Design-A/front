// 장바구니 컴포넌트
import { Link } from "react-router-dom";
import ProductIcon from "../product/ProductIcon";
import styles from "./Cart.module.css";
import Container from "../shared/Container";

function Cart({ product }) {
  const showSummary = product.summary && product.title !== product.summary;
  const showPrice = product.price && product.title !== product.price;

  return (
    <Container>
      <div className={styles.all}>
        <div className={styles.img}>
          <Link to={`/products/${product.slug}`}>
            <ProductIcon photoUrl={product.photoUrl} />
          </Link>
        </div>
        <Link to={`/products/${product.slug}`}>
          <h2 className={styles.title}>{product.title}</h2>
          <p className={styles.description}>{showSummary && product.summary}</p>
        </Link>
        <p className={styles.price}>{showPrice && product.price}원</p>
      </div>
    </Container>
  );
}

export default Cart;
