// 상품 이미지 컴포넌트
import classNames from "classnames";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";
import img5 from "../../assets/img5.png";
import img6 from "../../assets/img6.png";
import imgGroup from "../../assets/img-group.png";
import imgMeat3 from "../../assets/img-meat-3.png";
import imgMeat4 from "../../assets/img-meat-4.png";
import imgMeat5 from "../../assets/img-meat-5.png";
import imgMeat6 from "../../assets/img-meat-6.png";
import imgMeat7 from "../../assets/img-meat-7.png";
import imgMeat8 from "../../assets/img-meat-8.png";
import styles from "./ProductIcon.module.css";

const ICONS = {
  img1: img1,
  img2: img2,
  img3: img3,
  img4: img4,
  img5: img5,
  img6: img6,
  imgGroup: imgGroup,
  imgMeat3: imgMeat3,
  imgMeat4: imgMeat4,
  imgMeat5: imgMeat5,
  imgMeat6: imgMeat6,
  imgMeat7: imgMeat7,
  imgMeat8: imgMeat8,
};

function ProductIcon({ className, imageUrl = "default" }) {
  return (
    <img
      className={classNames(styles.image, className)}
      src={ICONS[imageUrl]}
      alt={imageUrl}
    />
  );
}

export default ProductIcon;
