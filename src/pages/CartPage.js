/* 장바구니 페이지입니다.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteWishlist, getWishlist } from '../api';
import Button from '../components/button/Button';
import Container from '../components/shared/Container';
import Cart from '../components/header/Cart';
import Warn from '../components/shared/Warn';
import closeButton from '../assets/closeButton.svg';
import styles from './CartPage.module.css';

function WishlistPage() {
  const [products, setProducts] = useState([]);

  const handleDelete = (productSlug) => {
    deleteWishlist(productSlug);
    const nextProducts = getWishlist();
    setProducts(nextProducts);
  };

  useEffect(() => {
    const nextProducts = getWishlist();
    setProducts(nextProducts);
  }, []);

  return (
    <Container className={styles.container}>
      <h1 className={styles.title}>장바구니</h1>
      {products.length === 0 ? (
        <>
          <Warn
            className={styles.emptyList}
            title="담아 상품이 없어요."
            description="~에서 나에게 필요한 상품을 찾아보세요."
          />
          <div className={styles.link}>
            <Link to="/">
              <Button className={styles.button} as="div">상품 둘러보기</Button>
            </Link>
          </div>
        </>
      ) : (
        <ul className={styles.items}>
          {products.map((product) => (
            <li key={product.slug} className={styles.item}>
              <Cart product={product} />
              <img
                className={styles.delete}
                src={closeButton}
                alt="닫기"
                onClick={() => handleDelete(product.slug)}
              />
              <h1>상품 정보</h1>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

export default WishlistPage;
*/

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteWishlist, getWishlist } from "../api";
import Button from "../components/button/Button";
import Container from "../components/shared/Container";
import Cart from "../components/header/Cart";
import Warn from "../components/shared/Warn";
import closeButton from "../assets/closeButton.svg";
import styles from "./CartPage.module.css";

function CartPage() {
  const [products, setProducts] = useState([]);

  const handleDelete = (productId) => {
    deleteWishlist(productId);
    const nextProducts = getWishlist();
    setProducts(nextProducts);
  };

  useEffect(() => {
    const nextProducts = getWishlist();
    setProducts(nextProducts);
  }, []);

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
              <h1>상품 정보</h1>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

export default CartPage;