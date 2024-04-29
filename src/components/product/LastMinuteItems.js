// 마감 임박 상품
import ProductItem from "./ProductItem";
import { useSearchParams } from "react-router-dom";
import { getLastMinuteItemsPreview } from "../../api";
import Container from "./../shared/Container";
import styles from "./ProductList.module.css";

function LastMinuteItems() {
  const [searchParam] = useSearchParams();
  const initKeyword = searchParam.get("keyword");
  const lastMinuteItemsPreview = getLastMinuteItemsPreview(initKeyword);

  return (
    <>
      <Container className={styles.container}>
        <div className={styles.productList}>
          {lastMinuteItemsPreview.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </>
  );
}

export default LastMinuteItems;
