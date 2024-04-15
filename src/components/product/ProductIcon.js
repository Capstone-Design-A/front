// 상품 이미지 컴포넌트
import classNames from "classnames";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";
import img5 from "../../assets/img5.png";
import img6 from "../../assets/img6.png";
import styles from "./ProductIcon.module.css";

const ICONS = {
  img1: img1,
  img2: img2,
  img3: img3,
  img4: img4,
  img5: img5,
  img6: img6,
};

function ProductIcon({ className, photoUrl = "default" }) {
  return (
    <img
      className={classNames(styles.courseIcon, className)}
      src={ICONS[photoUrl]}
      alt={photoUrl}
    />
  );
}

export default ProductIcon;
