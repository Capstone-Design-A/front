// 헤더(네비바) 컴포넌트
import { Link, NavLink } from "react-router-dom";
import Container from "../shared/Container";
import Notifications from "./Notifications";
import logoImg from "../../assets/logoVer2.png";
import styles from "./Nav.module.css";
import SearchBar from "./SearchBar";

function Nav() {
  return (
    <div className={styles.nav}>
      <Container className={styles.container_top}>
        <ul className={styles.nav_top}>
          <li>
            <NavLink className={styles.font} to="/login">
              로그인
            </NavLink>
          </li>
          <li> | </li>
          <li>
            <NavLink to="/signup">회원가입</NavLink>
          </li>
          <li> | </li>
          <li>
            <NavLink to="/order">주문배송</NavLink>
          </li>
          <li> | </li>
          <li>
            <NavLink to="/signup">고객센터</NavLink>
          </li>
        </ul>
      </Container>
      <Container className={styles.container}>
        <Link to="/">
          <img src={logoImg} alt="Main Logo" className={styles.logo} />
        </Link>
        <SearchBar />
        <ul className={styles.nav_bottom}>
          <li>
            <NavLink to="/my">마이 페이지</NavLink>
          </li>
          <li> | </li>
          <li>
            <NavLink to="/cart">장바구니</NavLink>
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
