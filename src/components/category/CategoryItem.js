// 메인페이지 카테고리 아이템 컴포넌트
import { Link } from "react-router-dom";
import styles from "./CategoryItem.module.css";
import Container from "../shared/Container";

function CategoryItem({ category }) {
  return (
    <Container className={styles.container}>
      <Link to={`/${category.slug}`}>
        <h2 className={styles.title}>{category.title}</h2>
      </Link>
    </Container>
  );
}

export default CategoryItem;
