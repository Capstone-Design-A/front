// 상품 목록 컴포넌트
import { NavLink } from 'react-router-dom';
import Lined from '../../components/shared/Lined';
import styles from './ProductList.module.css';
import ProductItem from './ProductItem';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api';
import Container from './../shared/Container';

function getLinkStyle({ isActive }) {
  return {
    textDecoration: isActive ? 'underline' : '',
  };
}

function ProductList() {
  const [searchParam ] = useSearchParams();
  const initKeyword = searchParam.get('keyword');
  // const [keyword, setKeyword] = useState(initKeyword || '');
  const products = getProducts(initKeyword);

  // const handleKeywordChange = (e) => setKeyword(e.target.value);

  // form 태그가 submit 됐을 때 handleSubmit 함수 실행
  // 기본 동작 대신에 setSearchParams 함수를 통해서 쿼리 파라미터의 값 변경
  /* const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams(keyword ? { keyword } : {});
  }; */

  return(
    <>
      <Container className={styles.container}>
        <div>
          <h1 className={styles.title}>
            <Lined>마감 임박 상품</Lined>
            <NavLink style={getLinkStyle} to="/products">
              >
            </NavLink>
          </h1>
        </div>
        <div className={styles.productList}>
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
        </div>
      </Container>
      <Container className={styles.container}>
        <div>
          <h1 className={styles.title}>
            <Lined>New! 구독하고 있는 판매자의 새 상품</Lined>
            <NavLink style={getLinkStyle} to="/products">
              >
            </NavLink>
          </h1>
        </div>
        <div className={styles.productList}>
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
        </div>
      </Container>
      <Container className={styles.container}>
        <div>
          <h1 className={styles.title}>
            <Lined>구매 랭킹  Top10</Lined>
            <NavLink style={getLinkStyle} to="/products">
              >
            </NavLink>
          </h1>
        </div>
        <div className={styles.productList}>
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
        </div>
      </Container>
    </>
  );
}

export default ProductList;


/* 하드코딩의 흔적
<Container className={styles.container}>
        <div>
          <h1 className={styles.title}>
            <Lined>마감 임박 상품</Lined>
            <button className={styles.button}>></button>
          </h1>
        </div>
        <div>
          <ul className={styles.product}>
            <li>
              <NavLink to="/product-detail">
                <img src={img5} alt="" className={styles.images}></img>
                <h1 className={styles.font1}>[영인산한우]</h1>
                <h2 className={styles.font1}>부채살(냉장)*300g</h2>
                <h2 className={styles.font2}><span className={styles.font3}>10% </span><span className={styles.font4}>19,800</span>원</h2>
                <h3 className={styles.font5}>22,000원</h3>
              </NavLink>
            </li>
            <li>
              <NavLink to="/product-detail">
                <img src={img5} alt="" className={styles.images}></img>
                <h1 className={styles.font1}>[영인산한우]</h1>
                <h2 className={styles.font1}>부채살(냉장)*300g</h2>
                <h2 className={styles.font2}><span className={styles.font3}>10% </span><span className={styles.font4}>19,800</span>원</h2>
                <h3 className={styles.font5}>22,000원</h3>
              </NavLink>
            </li>
            <li>
              <NavLink to="/courses">
                <img src={img5} alt="" className={styles.images}></img>
                <h1 className={styles.font1}>[영인산한우]</h1>
                <h2 className={styles.font1}>부채살(냉장)*300g</h2>
                <h2 className={styles.font2}><span className={styles.font3}>10% </span><span className={styles.font4}>19,800</span>원</h2>
                <h3 className={styles.font5}>22,000원</h3>
              </NavLink>
            </li>
          </ul>
        </div>
      </Container>
      <Container className={styles.container}>
        <div>
          <h1 className={styles.title}>
            <Lined>New! 구독하고 있는 판매자의 새 상품</Lined>
          </h1>
        </div>
        <div>
          <ul className={styles.product}>
            <li>
              <NavLink to="/courses">
                <img src={img5} alt="" className={styles.images}></img>
                <h1 className={styles.font1}>[영인산한우]</h1>
                <h2 className={styles.font1}>부채살(냉장)*300g</h2>
                <h2 className={styles.font2}><span className={styles.font3}>10% </span><span className={styles.font4}>19,800</span>원</h2>
                <h3 className={styles.font5}>22,000원</h3>
              </NavLink>
            </li>
            <li>
              <NavLink to="/courses">
                <img src={img5} alt="" className={styles.images}></img>
                <h1 className={styles.font1}>[영인산한우]</h1>
                <h2 className={styles.font1}>부채살(냉장)*300g</h2>
                <h2 className={styles.font2}><span className={styles.font3}>10% </span><span className={styles.font4}>19,800</span>원</h2>
                <h3 className={styles.font5}>22,000원</h3>
              </NavLink>
            </li>
            <li>
              <NavLink to="/courses">
                <img src={img5} alt="" className={styles.images}></img>
                <h1 className={styles.font1}>[영인산한우]</h1>
                <h2 className={styles.font1}>부채살(냉장)*300g</h2>
                <h2 className={styles.font2}><span className={styles.font3}>10% </span><span className={styles.font4}>19,800</span>원</h2>
                <h3 className={styles.font5}>22,000원</h3>
              </NavLink>
            </li>
          </ul>
        </div>
      </Container>
      <Container className={styles.container}>
        <div>
          <h1 className={styles.title}>
            <Lined>실시간 구매 랭킹 Top 10</Lined>
          </h1>
        </div>
        <div>
          <ul className={styles.product}>
            <li>
              <NavLink to="/courses">
                <img src={img5} alt="" className={styles.images}></img>
                <h1 className={styles.font1}>[영인산한우]</h1>
                <h2 className={styles.font1}>부채살(냉장)*300g</h2>
                <h2 className={styles.font2}><span className={styles.font3}>10% </span><span className={styles.font4}>19,800</span>원</h2>
                <h3 className={styles.font5}>22,000원</h3>
              </NavLink>
            </li>
            <li>
              <NavLink to="/courses">
                <img src={img5} alt="" className={styles.images}></img>
                <h1 className={styles.font1}>[영인산한우]</h1>
                <h2 className={styles.font1}>부채살(냉장)*300g</h2>
                <h2 className={styles.font2}><span className={styles.font3}>10% </span><span className={styles.font4}>19,800</span>원</h2>
                <h3 className={styles.font5}>22,000원</h3>
              </NavLink>
            </li>
            <li>
              <NavLink to="/courses">
                <img src={img5} alt="" className={styles.images}></img>
                <h1 className={styles.font1}>[영인산한우]</h1>
                <h2 className={styles.font1}>부채살(냉장)*300g</h2>
                <h2 className={styles.font2}><span className={styles.font3}>10% </span><span className={styles.font4}>19,800</span>원</h2>
                <h3 className={styles.font5}>22,000원</h3>
              </NavLink>
            </li>
          </ul>
        </div>
      </Container>
*/