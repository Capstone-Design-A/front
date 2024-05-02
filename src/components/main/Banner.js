// 메인 페이지의 메인 배너
import CategoryMain from "../category/CategoryMain";
import styles from "./Banner.module.css";

function Banner() {
  return (
    <>
      <div className={styles.banner}>
        <CategoryMain className={styles.category} />
      </div>
    </>
  );
}

export default Banner;
