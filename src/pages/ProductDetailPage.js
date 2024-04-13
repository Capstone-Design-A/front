// 상품 상세 페이지입니다.
import Button from '../components/button/Button';
import OrderButton from '../components/button/OrderButton';
import { Navigate, useParams } from 'react-router-dom';
import { addWishlist, getProductBySlug } from '../api';
import Container from '../components/shared/Container';
import Card from '../components/shared/Card';
import CourseIcon from '../components/product/ProductIcon';
import getProductColor from '../utils/getProductColor';
import styles from './ProductDetailPage.module.css';
import { useNavigate } from 'react-router-dom';
import QuestionList from '../components/question/QuestionList';

function CoursePage() {
  const navigate = useNavigate();
  const { productSlug } = useParams();
  const product = getProductBySlug(productSlug);
const productColor = getProductColor(product?.code);

  if (!product) {
    return <Navigate to="/products" />;
  }

  const headerStyle = {
    borderTopColor: productColor,
  };

  // 판매자 소개 바로가기 버튼도 만들기
  const handleAddWishlistClick = () => {
    addWishlist(product?.slug);
    navigate('/cart');
  };

  return (
    <>
      <div className={styles.header} style={headerStyle}>
        <Container className={styles.content}>
          <CourseIcon className={styles.img} photoUrl={product.photoUrl} />
          <button className={styles.button}>판매자 소개 바로가기</button>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.summary}>{product.summary}</p>
          <p className={styles.price}>{product.price}</p>
          <Container className={styles.order}>
            <OrderButton className={styles.orderbutton} variant="round" onClick={handleAddWishlistClick}>
              바로구매
            </OrderButton>
            <Button className={styles.cartbutton} variant="round" onClick={handleAddWishlistClick}>
              장바구니 담기
            </Button>
          </Container>
        </Container>
      </div>
      <Container className={styles.topics}>
        {product.topics.map(({ topic }) => (
          <Card className={styles.topic} key={topic.slug}>
            <h3 className={styles.title}>{topic.title}</h3>
            <p className={styles.summary}>{topic.summary}</p>
          </Card>
        ))}
      </Container>
      <QuestionList />
    </>
  );
}

export default CoursePage;


// 리뷰, QnA 데이터 개수 제한하기