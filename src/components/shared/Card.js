// 상품의 이미지,판매자,상품명,가격을 하나의 Item으로 만들어주는 컴포넌트
// QnA-답변을 하나의 Item으로 만들어주는 컴포넌트
import classNames from 'classnames';
import styles from './Card.module.css';

function Card({ className, children }) {
  return <div className={classNames(styles.card, className)}>{children}</div>;
}

export default Card;