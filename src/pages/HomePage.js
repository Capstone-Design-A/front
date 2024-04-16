// 메인(Home) 페이지입니다.
import Banner from "../components/main/Banner";
import GroupPurchase from "../components/main/GroupPurchase";
import ProductList from "../components/product/ProductList";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <>
      <Banner />
      <GroupPurchase className={styles.margin} />
      <ProductList />
    </>
  );
}

export default HomePage;
