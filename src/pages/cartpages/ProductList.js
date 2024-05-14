import styles from "./ProductList.module.css";
import closeButton from "../../assets/closeButton.svg";
import plus from "../../assets/icon-plus-line.svg";
import minus from "../../assets/icon-minus-line.svg";
import { useState } from "react";

function ProductList() {
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
    <section className={styles.cart_product_list}>
      <input type="checkbox" />
      <div className={styles.cart_product_wrap}>
        <div className={styles.cart_product_image}>
          <img src="images/image001.png" alt="product-img" />
        </div>

        <div className={styles.cart_product_info}>
          <p className={styles.seller_store}>아이돈케어</p>
          <p className={styles.product_name}>노트북 파우치</p>
          <p className={styles.price}>1000원</p>
          <p className={styles.delivery}>택배배송 / 무료배송</p>
        </div>
      </div>

      <div className={styles.cart_product_count}>
        <img
          className={styles.minus}
          src={minus}
          alt="minus"
        />

        <div className={styles.count}>
          <span>5</span>
        </div>
        <img
          className={styles.plus}
          src={plus}
          alt="plus"
        />
      </div>

      <div className={styles.cart_product_price}>
        <p className={styles.total_price}></p>
        <button className={styles.btn_submit}>주문하기</button>
      </div>

      <div className={styles.product_remove}>
      <img
         src={closeButton}
          alt="닫기"
       />
      </div>
    </section>
    
      


    
  );
}

export default ProductList;