// 공동구매 Item 컴포넌트입니다.
// 코드 정리 필요 - 데이터 받아오는 형식으로
import Button from "./button/Button";
import Container from "./shared/Container";
import styles from "./GroupItem.module.css";
import { Link } from "react-router-dom";

function Group() {
  return (
    <Container>
      <div className={styles.page}>
        <div className={styles.text}>
          <h3 className={styles.count}>
            남은 수량 <span className={styles.number}>50</span>개
          </h3>
          <h1>[4월 11일 순차출고]</h1>
          <h2>성주 꿀 참외 2.5kg 구성</h2>
          <h2>
            공동구매 할인가 <span className={styles.price}>27,900</span>원
          </h2>
          <Link to="/products">
            <Button className={styles.button}>공동구매 바로가기</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Group;
