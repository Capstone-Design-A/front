// 메인 페이지의 메인 배너
import CategoryMain from "../category/CategoryMain";
import styles from "./Banner.module.css";

function Banner() {
  return (
    <>
      <div className={styles.back}>
        <CategoryMain className={styles.banner} />
      </div>
    </>
  );
}

export default Banner;
