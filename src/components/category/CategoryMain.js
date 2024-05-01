// 메인페이지 카테고리 아이템 컴포넌트
// 페이지 사이즈 줄이면 CategoryList가 오른쪽으로 이동함 - 수정 필요
import { useSearchParams } from "react-router-dom";
import Container from "../shared/Container";
import styles from "./CategoryMain.module.css";
import { getCategories } from "../../api";
import { Navigate } from "react-router-dom";
import CategoryItem from "./CategoryItem";

function CategoryMain() {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const initKeyword = searchParams.get("keyword");
  const categories = getCategories(initKeyword);

  if (!categories) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Container>
        <div className={styles.menu}>
          <h1 className={styles.category}>카테고리</h1>
          <div className={styles.categoryList}>
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                color="#fff"
              />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

export default CategoryMain;
