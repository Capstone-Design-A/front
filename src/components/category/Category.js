// CSS 수정해야됨 - 폰트색상, ...
// NavLink 수정 - 이건 데이터 정리되면 하기
// 카테고리 목록 배열로 받아오기
import { NavLink } from 'react-router-dom';
import Container from '../shared/Container';
import styles from './Category.module.css';

function Category() {
  return (
    <div className={styles.category}>
      <Container className={styles.container}>
        <ul className={styles.menu}>
          <h1 className={styles.h1}>카테고리</h1>
          <li className={styles.link}>
            <NavLink to="/products">
              과일
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink to="/products">
              채소
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink to="/products">
              축산
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink to="/products">
              쌀/잡곡
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink to="/products">
              가공
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink to="/products">
              김치
            </NavLink>
          </li>
          <li className={styles.home}>
            <NavLink to="/">
              Home
            </NavLink>
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Category;