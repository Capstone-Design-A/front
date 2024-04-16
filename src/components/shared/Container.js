// 반응형 구현을 위한 컴포넌트
import classNames from "classnames";
import styles from "./Container.module.css";

function Container({ className, children }) {
  return (
    <div className={classNames(styles.container, className)}>{children}</div>
  );
}

export default Container;
