import { useSearchParams, Link, Navigate } from "react-router-dom";
import Container from "../shared/Container";
import styles from "./Category.module.css";
import { getCategories } from "../../api";
import CategoryItem from "./CategoryItem";

function Category() {
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
                color="#000"
              />
            ))}
          </div>
        </div>
        <div className={styles.home}>
          <Link to="/">홈으로</Link>
        </div>
      </Container>
    </>
  );
}

export default Category;
