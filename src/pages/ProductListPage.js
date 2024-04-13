// 상품 목록을 보여주는 페이지입니다.
/*
과일,채소,... 카테고리 클릭 시 보여주는 화면과
마감임박,새상품,랭킹 클릭 시 보여주는 화면을 다르게 처리해야됨
현재는 마감임박 상품을 보여주는 상태
*/
import { useSearchParams } from 'react-router-dom';
import ListPage from '../components/product/ListPage';
import ProductItem from '../components/product/ProductItem';
import { getProducts } from '../api';
import styles from './ProductListPage.module.css';

function ProductListPage() {
  // eslint-disable-next-line
  const [ searchParams, setSearchParams ] = useSearchParams();
  const initKeyword = searchParams.get('keyword');
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
        <div className={styles.courseList}>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
    </ListPage>
  );
}

export default ProductListPage;