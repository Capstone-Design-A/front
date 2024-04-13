// 판매자 이름과 이미지(는 생략상태)
import styles from './Avatar.module.css';

function Avatar({ name }) {
  return <img className={styles.avatar}alt={name} title={name} />;
}

export default Avatar;