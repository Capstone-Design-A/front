// 장바구니 컴포넌트
import { Link } from "react-router-dom";
import Card from "../shared/Card";
import ProductIcon from "../product/ProductIcon";
import getProductColor from "../../utils/getProductColor";
import styles from "../../components/product/ProductItem.module.css";

function Cart({ product }) {
  const showSummary = product.summary && product.title !== product.summary;
  const showPrice = product.price && product.title !== product.price;
  const productColor = getProductColor(product.code);

  const thumbStyle = {
    borderColor: productColor,
  };

  return (
    <Card>
      <div className={styles.thumb} style={thumbStyle}>
        <Link to={`/products/${product.slug}`}>
          <ProductIcon photoUrl={product.photoUrl} />
        </Link>
      </div>
      <div className={styles.content}>
        <Link to={`/products/${product.slug}`}>
          <h2 className={styles.title}>{product.title}</h2>
          <p className={styles.description}>{showSummary && product.summary}</p>
        </Link>
        <p className={styles.price}>{showPrice && product.price}원</p>
      </div>
    </Card>
  );
}

export default Cart;
