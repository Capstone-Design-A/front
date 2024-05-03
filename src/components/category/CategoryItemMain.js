import { Link } from "react-router-dom";
import styles from "./CategoryItem.module.css";
import Container from "../shared/Container";
import { getItemsByCategory } from "../../api/api.js";

function CategoryItemMain({ category, color, page, size, token }) {
  const handleLinkClick = async () => {
    try {
      // 페이지와 사이즈를 명시적으로 전달
      const itemList = await getItemsByCategory(category.id, 1, 10, token);
      console.log("Items for category", category.id, ":", itemList);
      // 여기서 아이템 목록을 사용할 수 있어요.
    } catch (error) {
      console.error(
        "Error fetching items for category",
        category.id,
        ":",
        error
      );
    }
  };

  return (
    <Container className={styles.containerMain}>
      {/* Link의 to 속성을 API 호출 함수의 경로로 변경 */}
      <Link
        to={`/item?category-id=${category.id}&page=${page}&size=${size}`}
        onClick={handleLinkClick}
      >
        <h2 className={styles.title} style={{ color: color }}>
          {category.name}
        </h2>
      </Link>
    </Container>
  );
}

export default CategoryItemMain;
