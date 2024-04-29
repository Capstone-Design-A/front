import { useParams } from "react-router-dom";
import ListPage from "../components/product/ListPage";
import CategoryProducts from "../components/product/CategoryProducts";
import { getProductsByCategory } from "../api";
import styles from "./ProductListPage.module.css";

function ProductCategoryPage() {
  const { categorySlug } = useParams();

  const filteredProducts = getProductsByCategory(categorySlug);

  return (
    <ListPage title={categorySlug}>
      <p className={styles.count}>총 {filteredProducts.length}개의 상품</p>
      <div>
        <CategoryProducts products={filteredProducts} category={categorySlug} />
      </div>
    </ListPage>
  );
}

export default ProductCategoryPage;
