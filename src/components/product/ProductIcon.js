// 상품 이미지 컴포넌트
import classNames from 'classnames';
import img8 from '../../assets/img8.png';
import styles from './ProductIcon.module.css';

const ICONS = {
  img8: img8,
};

function ProductIcon({ className, photoUrl = 'default' }) {
  return <img className={classNames(styles.courseIcon, className)} src={ICONS[photoUrl]} alt={photoUrl} />;
}

export default ProductIcon;