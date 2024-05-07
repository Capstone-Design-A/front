// 마이 페이지입니다.
// 임시로 판매자 소개 페이지로 이동하는 버튼 구현
import My from "../components/header/My";
import { Link } from "react-router-dom";
import styles from "./MyPage.module.css";

function MyPage() {
  return (
    <>
      <My />
      <div className={styles.introduction}>
        <Link to="/introduction">
          <button>소개 페이지 바로가기(임시)</button>
        </Link>
      </div>
    </>
  );
}

export default MyPage;
