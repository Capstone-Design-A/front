// 수평 구분선 생성, 선택적으로 텍스트를 포함하여 사용
import styles from "./HorizontalRule.module.css";

function HorizontalRule({ className = "", children }) {
  if (children) {
    return (
      <div className={`${className} ${styles.Container}`}>
        <hr className={styles.HorizontalRule} />
        <span className={styles.Text}>{children}</span>
        <hr className={styles.HorizontalRule} />
      </div>
    );
  }

  return <hr className={`${styles.HorizontalRule} ${className}`} />;
}

export default HorizontalRule;
