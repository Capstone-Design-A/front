/*
상품 목록을 보여주는 페이지입니다.
마감임박,새상품,랭킹 클릭 시 보여주는 화면
공동구매 화면을 따로 만들어야할까?
*/
import { useSearchParams } from "react-router-dom";
import ListPage from "../components/product/ListPage";
import ProductItem from "../components/product/ProductItem";
import { getProducts } from "../api";
import styles from "./ProductListPage.module.css";

function ProductListPage() {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const initKeyword = searchParams.get("keyword");
  const products = getProducts(initKeyword);

  // form 태그가 submit 됐을 때 handleSubmit 함수 실행
  // 기본 동작 대신에 setSearchParams 함수를 통해서 쿼리 파라미터의 값 변경
  // setSearchParams warning 뜨는 거
  return (
    <ListPage
      title="마감 임박 상품"
      description="상품 판매 종료가 얼마 남지 않았어요"
    >
      <p className={styles.count}>총 {products.length}개의 상품</p>
      <div className={styles.productList}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </ListPage>
  );
}

export default ProductListPage;
