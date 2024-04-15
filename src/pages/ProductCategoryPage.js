/*
상품 목록을 보여주는 페이지입니다.
과일,채소,... 카테고리 클릭 시 보여주는 화면
*/
import { useSearchParams } from "react-router-dom";
import ListPage from "../components/product/ListPage";
import ProductItem from "../components/product/ProductItem";
import { getProducts, getCategories } from "../api";
import styles from "./ProductListPage.module.css";

function ProductCategoryPage({ category }) {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const initKeyword = searchParams.get("keyword");
  const products = getProducts(initKeyword);
  const categories = getCategories(initKeyword);

  // form 태그가 submit 됐을 때 handleSubmit 함수 실행
  // 기본 동작 대신에 setSearchParams 함수를 통해서 쿼리 파라미터의 값 변경
  return (
    <ListPage key={categories.id} title={categories.title}>
      <p className={styles.count}>총 {products.length}개의 상품</p>
      <div className={styles.productList}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </ListPage>
  );
}

export default ProductCategoryPage;
