import Container from "../shared/Container";
import ProductItem from "./ProductItem";
import styles from "./ProductList.module.css";

function CategoryProducts({ products, category }) {
  const categoryProducts = products.filter(
    (product) => product.category === category
  );

  return (
    <>
      <Container className={styles.container}>
        <div className={styles.productList}>
          {categoryProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </>
  );
}

export default CategoryProducts;
