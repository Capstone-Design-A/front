import styles from "./ProductList.module.css";

function ProductList() {
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
          src="/images/icon-minus-line.svg"
          alt="minus"
        />

        <div className={styles.count}>
          <span>5</span>
        </div>
        <img
          className={styles.plus}
          src="/images/icon-plus-line.svg"
          alt="plus"
        />
      </div>

      <div className={styles.cart_product_price}>
        <p className={styles.total_price}></p>
        <button className={styles.btn_submit}>주문하기</button>
      </div>

      <div className={styles.product_remove}>
        <img src="/images/icon-delete.svg" alt="delete" />
      </div>
    </section>
  );
}

export default ProductList;
