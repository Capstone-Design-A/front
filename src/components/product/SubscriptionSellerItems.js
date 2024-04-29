// 구독하고 있는 판매자의 새 상품
import ProductItem from "./ProductItem";
import { useSearchParams } from "react-router-dom";
import { getSubscriptionSellerItemsPreview } from "../../api";
import Container from "./../shared/Container";
import styles from "./ProductList.module.css";

function SubscriptionSellerItems() {
  const [searchParam] = useSearchParams();
  const initKeyword = searchParam.get("keyword");
  const subscriptionSellerItemsPreview =
    getSubscriptionSellerItemsPreview(initKeyword);

  return (
    <>
      <Container className={styles.container}>
        <div className={styles.productList}>
          {subscriptionSellerItemsPreview.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </>
  );
}

export default SubscriptionSellerItems;
