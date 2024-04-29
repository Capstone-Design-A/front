// 구매 랭킹
import ProductItem from "./ProductItem";
import { useSearchParams } from "react-router-dom";
import { getPurchaseRankingItemsPreview } from "../../api";
import Container from "./../shared/Container";
import styles from "./ProductList.module.css";

function PurchaseRankingItems() {
  const [searchParam] = useSearchParams();
  const initKeyword = searchParam.get("keyword");
  const purchaseRankingItemsPreview =
    getPurchaseRankingItemsPreview(initKeyword);

  return (
    <>
      <Container className={styles.container}>
        <div className={styles.productList}>
          {purchaseRankingItemsPreview.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </>
  );
}

export default PurchaseRankingItems;
