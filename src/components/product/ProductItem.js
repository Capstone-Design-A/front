// 상품 아이템 컴포넌트
// 이미지,판매자,상품명,가격을 Card 컴포넌트로 감싸서 구현 - 페이지 전체에서 재사용 가능
import { Link } from "react-router-dom";
import Card from "../shared/Card";
import ProductIcon from "./ProductIcon";
import styles from "./ProductItem.module.css";

function ProductItem({ product }) {
  const showSummary = product.content && product.name !== product.content;
  const showPrice = product.price && product.title !== product.price;

  return (
    <Card className={styles.Item}>
      <div className={styles.img}>
        <Link to={`/products/${product.slug}`}>
          {/* 지금은 assets 경로로 이미지를 받아오고 있다 */}
          <ProductIcon imageUrl={product.imageUrl} />
        </Link>
      </div>
      <div className={styles.text}>
        <Link to={`/prducts/${product.slug}`}>
          <h2 className={styles.name}>{product.name}</h2>
          <p className={styles.content}>{showSummary && product.content}</p>
        </Link>
        <p className={styles.price}>
          {showPrice && product.price.toLocaleString()}원
        </p>
      </div>
    </Card>
  );
}

export default ProductItem;
