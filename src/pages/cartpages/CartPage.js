import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/shared/Container";
import TotalCart from "./TotalCart";
import CartHeader from "./CartHeader";
import ProductList from "./ProductList";
import Button from "../../components/button/Button";
import Warn from "../../components/shared/Warn";
import styles from "./CartPage.module.css";
import meatImg from "../../assets/img-meat-4.png";
import appleImg from "../../assets/img.png";
import pearImg from "../../assets/img5.png";

function CartPage() {
  // 추후 productdetail페이지에서 장바구니 담기 시
  // 새롭게 정보저장을 위한 cart페이지를 만들고 모두 거기서 빼오도록 수정 필요
  // 아니면 여기다 바로 products라는 배열로 저장
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "농수 축산 가공 한우",
      price: 20000,
      quantity: 1,
      image: meatImg,
      isChecked: false,
    },
    {
      id: 2,
      name: "단맛 꿀 배",
      price: 18000,
      quantity: 2,
      image: pearImg,
      isChecked: false,
    },
    {
      id: 3,
      name: "무농약 무가네 사과",
      price: 18000,
      quantity: 2,
      image: appleImg,
      isChecked: false,
    },
  ]);

  const [allChecked, setAllChecked] = useState(false);

  const handleAllChecked = () => {
    const newAllChecked = !allChecked;
    setAllChecked(newAllChecked);
    setProducts(
      products.map((product) => ({ ...product, isChecked: newAllChecked }))
    );
  };

  const handleProductChecked = (productId) => {
    const nextProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setProducts(nextProducts);
    setAllChecked(nextProducts.every((product) => product.isChecked));
  };

  return (
    <Container className={styles.container}>
      <h1 className={styles.title}>장바구니</h1>
      <CartHeader allChecked={allChecked} onAllChecked={handleAllChecked} />
      {products.length === 0 ? (
        <>
          <Warn
            className={styles.emptyList}
            title="장바구니에 담긴 상품이 없어요."
            description="원하는 상품을 찾아 추가해보세요."
          />
          <div className={styles.link}>
            <Link to="/">
              <Button className={styles.button} as="div">
                상품 둘러보기
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <ul className={styles.items}>
          {products.map((product) => (
            <li key={product.id} className={styles.item}>
              <ProductList
                product={product}
                products={products}
                setProducts={setProducts}
                onProductChecked={handleProductChecked}
              />
            </li>
          ))}
        </ul>
      )}
      {products.length === 0 ? "" : <TotalCart products={products} />}
    </Container>
  );
}

export default CartPage;
