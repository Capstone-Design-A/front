// 메인페이지 카테고리 아이템 컴포넌트
import { Link } from "react-router-dom";
import styles from "./CategoryItem.module.css";
import Container from "../shared/Container";

function CategoryItem({ category, color }) {
  return (
    <Container className={styles.containerMain}>
      <Link to={`/${category.id}`}>
        <h2 className={styles.title} style={{ color: color }}>
          {category.name}
        </h2>
      </Link>
    </Container>
  );
}

export default CategoryItem;
