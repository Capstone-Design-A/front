import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import styles from "./ProductListPage.module.css";
import DeadlineItems from "../components/product/DeadlineItems";
import SubscriptionSellerItems from "../components/product/SubscriptionSellerItems";
import RankingItems from "../components/product/RankingItems";
import ListPage from "../components/product/ListPage";
import { getDeadlineItems } from "../api/api.js";

function ProductListPage() {
  const location = useLocation();
  const [searchParam] = useSearchParams();
  const initKeyword = searchParam.get("keyword");
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  let productListComponent;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let items;
        switch (location.pathname) {
          case "/item/deadline":
            items = await getDeadlineItems(page, 10, initKeyword);
            break;
          case "/item/new-products":
            // 다른 컴포넌트에 대한 API 호출 함수 추가
            break;
          case "/item/-ranking":
            // 다른 컴포넌트에 대한 API 호출 함수 추가
            break;
          default:
            items = [];
            break;
        }
        setTotalItems(items.length);
      } catch (error) {
        console.error("Error fetching product list:", error);
      }
    };

    fetchData();
  }, [location.pathname, initKeyword, page]); // page도 의존성 배열에 추가

  switch (location.pathname) {
    case "/item/deadline":
      productListComponent = <DeadlineItems keyword={initKeyword} />;
      break;
    case "/item/new-products":
      productListComponent = <SubscriptionSellerItems keyword={initKeyword} />;
      break;
    case "/item/-ranking":
      productListComponent = <RankingItems keyword={initKeyword} />;
      break;
    default:
      productListComponent = null;
      break;
  }

  const handleLoadMore = () => {
    const nextPage = page !== undefined ? page + 1 : 1;
    setPage(nextPage);
  };

  return (
    <>
      <ListPage
        title={getTitle(location.pathname)}
        description={getDescription(location.pathname)}
      >
        <p className={styles.count}>총 {totalItems}개의 상품</p>
        <div>{productListComponent}</div>
        <div className={styles.loadMore}>
          <button className={styles.button} onClick={handleLoadMore}>
            더보기
          </button>
        </div>
      </ListPage>
    </>
  );
}

function getTitle(pathname) {
  switch (pathname) {
    case "/item/deadline":
      return "마감 임박 상품";
    case "/item/new-products":
      return "New! 구독하고 있는 판매자의 새 상품";
    case "/item/-ranking":
      return "구매 랭킹";
    default:
      return "상품 목록";
  }
}

function getDescription(pathname) {
  switch (pathname) {
    case "/item/deadline":
      return "상품 판매 종료가 얼마 남지 않았어요";
    case "/item/new-products":
      return "최신 상품을 만나보세요";
    case "/item/-ranking":
      return "가장 많이 팔린 상품을 확인하세요";
    default:
      return "다양한 상품을 살펴보세요";
  }
}

export default ProductListPage;
