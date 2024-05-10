import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/button/Button";
import Container from "../components/shared/Container";
import Cart from "../components/header/Cart";
import Warn from "../components/shared/Warn";
import closeButton from "../assets/closeButton.svg";
import styles from "./CartPage.module.css";

function CartPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "item1",
      price: 20000,
      quantity: 1,
      image: "imageURL1",
    },
    {
      id: 2,
      name: "item2",
      price: 18000,
      quantity: 2,
      image: "imageUrl2",
    },
    {
      id: 3,
      name: "item 3",
      price: 18000,
      quantity: 2,
      image: "imageUrl3",
    },
  ]);

  const handleDelete = (productId) => {
    const nextProducts = products.filter((product) => product.id !== productId);
    setProducts(nextProducts);
  };

  return (
    <Container className={styles.container}>
      <h1 className={styles.title}>장바구니</h1>
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
              <Cart product={product} />
              <img
                className={styles.delete}
                src={closeButton}
                alt="닫기"
                onClick={() => handleDelete(product.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

export default CartPage;
