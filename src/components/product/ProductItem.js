// 상품 아이템 컴포넌트
// 이미지,판매자,상품명,가격을 Card 컴포넌트로 감싸서 구현 - 페이지 전체에서 재사용 가능
import { Link } from 'react-router-dom';
import Card from '../shared/Card';
import ProductIcon from './ProductIcon';
import getProductColor from '../../utils/getProductColor';
import styles from './ProductItem.module.css';

function ProductItem({ product }) {
  const showSummary = product.summary && product.title !== product.summary;
  const showPrice = product.price && product.title !== product.price;
  const productColor = getProductColor(product.code);

  const thumbStyle = {
    borderColor: productColor,
  };

  return (
    <Card className={styles.courseItem}>
      <div className={styles.thumb} style={thumbStyle}>
        <Link to={`/products/${product.slug}`}><ProductIcon photoUrl={product.photoUrl} /></Link>
      </div>
      <div className={styles.content}>
        <Link to={`/prducts/${product.slug}`}>
          <h2 className={styles.title}>{product.title}</h2>
          <p className={styles.description}>{showSummary && product.summary}</p>
        </Link>
        <p className={styles.price}>{showPrice && product.price}원</p>
      </div>
    </Card>
  );
}

export default ProductItem;