import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "../shared/Container";
import Notifications from "./Notifications";
import logoImg from "../../assets/logoVer2.png";
import styles from "./Nav.module.css";
import SearchBar from "./SearchBar";
import { countCartItems } from "../../api/api";

function Nav({ isLoggedIn, onLogout }) {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const memberId = 1;

  useEffect(() => {
    fetchCartItemsCount();
  }, []);

  const fetchCartItemsCount = async () => {
    try {
      const cartCount = await countCartItems(memberId);
      setCartItemsCount(cartCount);
    } catch (error) {
      console.error("Error fetching cart items count:", error);
    }
  };

  return (
    <div className={styles.nav}>
      <Container className={styles.container_top}>
        <ul className={styles.nav_top}>
          {isLoggedIn ? (
            <>
              <li>
                <NavLink className={styles.font} to="/" onClick={onLogout}>
                  로그아웃
                </NavLink>
              </li>
              <li> | </li>
              <li>
                <NavLink to="/auth/seller">판매자관리</NavLink>
              </li>
              <li> | </li>
              <li>
                <NavLink to="/">고객센터</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink className={styles.font} to="/login">
                  로그인
                </NavLink>
              </li>
              <li> | </li>
              <li>
                <NavLink to="/member/signUp">회원가입</NavLink>
              </li>
              <li> | </li>
              <li>
                <NavLink to="/auth/seller">판매자관리</NavLink>
              </li>
              <li> | </li>
              <li>
                <NavLink to="/">고객센터</NavLink>
              </li>
            </>
          )}
        </ul>
      </Container>
      <Container className={styles.container}>
        <Link to="/">
          <img src={logoImg} alt="Main Logo" className={styles.logo} />
        </Link>
        <div className={styles.search}>
          <SearchBar />
        </div>
        <ul className={styles.nav_bottom}>
          <li>
            <NavLink to="/auth/member">마이 페이지</NavLink>
          </li>
          <li> | </li>
          <li>
            <NavLink to="/auth/cart/item">
              장바구니
              {cartItemsCount > 0 && (
                <div className={styles.cartItemsCount}>{cartItemsCount}</div>
              )}
            </NavLink>
          </li>
          <li className={styles.user}>
            <Notifications />
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Nav;
