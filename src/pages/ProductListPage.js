import { useSearchParams } from "react-router-dom";
import styles from "./ProductListPage.module.css";
import LastMinuteItems from "../components/product/LastMinuteItems";
import SubscriptionSellerItems from "../components/product/SubscriptionSellerItems";
import PurchaseRankingItems from "../components/product/PurchaseRankingItems";
import ListPage from "../components/product/ListPage";

function ProductListPage() {
  const [searchParam] = useSearchParams();
  const initKeyword = searchParam.get("keyword");

  let title, description, productListComponent;
  switch (window.location.pathname) {
    case "/last-minute-products":
      title = "마감 임박 상품";
      description = "상품 판매 종료가 얼마 남지 않았어요";
      productListComponent = <LastMinuteItems keyword={initKeyword} />;
      break;
    case "/new-products":
      title = "New! 구독하고 있는 판매자의 새 상품";
      description = "최신 상품을 만나보세요";
      productListComponent = <SubscriptionSellerItems keyword={initKeyword} />;
      break;
    case "/purchase-ranking":
      title = "구매 랭킹";
      description = "가장 많이 팔린 상품을 확인하세요";
      productListComponent = <PurchaseRankingItems keyword={initKeyword} />;
      break;
    default:
      title = "상품 목록";
      description = "다양한 상품을 살펴보세요";
      productListComponent = null;
      break;
  }
  return (
    <>
      <ListPage title={title} description={description}>
        <p className={styles.count}>총 {/*{.length}*/}개의 상품</p>
        <div>{productListComponent}</div>
      </ListPage>
    </>
  );
}

export default ProductListPage;
