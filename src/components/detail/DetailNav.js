import { NavLink, useParams } from "react-router-dom";
import styles from "./DetailNav.module.css";

function DetailNav() {
  const { productSlug } = useParams();

  return (
    <ul className={styles.menu}>
      <li className={styles.line}>
        <NavLink
          to={`/products/${productSlug}/description`}
          className={({ isActive }) =>
            isActive ? styles.activeLinkStyle : styles.inactiveLinkStyle
          }
        >
          상품 상세 정보
        </NavLink>
      </li>
      <li className={styles.line}>
        <NavLink
          to={`/products/${productSlug}/review`}
          className={({ isActive }) =>
            isActive ? styles.activeLinkStyle : styles.inactiveLinkStyle
          }
        >
          상품 후기
        </NavLink>
      </li>
      <li className={styles.line}>
        <NavLink
          to={`/products/${productSlug}/question`}
          className={({ isActive }) =>
            isActive ? styles.activeLinkStyle : styles.inactiveLinkStyle
          }
        >
          상품 문의
        </NavLink>
      </li>
    </ul>
  );
}

export default DetailNav;
