// 메인 페이지의 메인 배너
import Category from './category/Category';
import styles from './Banner.module.css';

function Banner() {
  return (
    <>
      <div className={styles.back}>
        <Category className={styles.banner} />
      </div>
    </>
  );
}

export default Banner;