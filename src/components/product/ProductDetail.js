// 상품 상세 컴포넌트
import Container from "../Container";
import styles from './ProductDetail.module.css';
import img8 from '../../assets/img8.png'

function ProductDetail() {
  return (
    <>
      <Container>
        <div className={styles.prd}>
          <img src={img8} alt="" className={styles.img}></img>
          <button className={styles.button}>판매자 소개 바로가기</button>
          <h1 className={styles.title}>[부여축산업협동조합]</h1>
          <h1 className={styles.title}>굿뜨래 한우 목심 600g</h1>
          <button className={styles.button}>수량 선택 버튼</button>
          <h2 className={styles.m}>이미지</h2>
          <h2 className={styles.m}>옵션</h2>
        </div>
      </Container>
    </>
  );
}

export default ProductDetail;