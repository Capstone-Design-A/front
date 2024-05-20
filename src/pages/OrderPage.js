// 주문배송 페이지입니다.
// 임시로 페이지 이동 용도로 사용 중
import { Link } from "react-router-dom";
import My from "../components/header/My";
import styles from "./OrderPage.module.css";

function MyPage() {
  return (
    <>
      <My />
      <div className={styles.introduction}>
        <Link to="/seller">
          <button>판매자 관리 페이지 바로가기(임시)</button>
        </Link>
        <Link to="/introduction">
          <button>판매자 소개 페이지 바로가기(임시)</button>
        </Link>
        <Link to="/registration-product">
          <button>상품 등록 페이지 바로가기(임시)</button>
        </Link>
        <Link to="/registration-post">
          <button>게시물 등록 페이지 바로가기(임시)</button>
        </Link>
      </div>
    </>
  );
}

export default MyPage;
