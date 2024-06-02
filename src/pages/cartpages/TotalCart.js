import styles from "./TotalCart.module.css";
import plus from "../../assets/icon-plus-line.svg";

function TotalCart({ products, totalDeliveryCharge }) {
  const checkedProducts = products.filter((product) => product.isChecked);
  const totalAmount = checkedProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <div className={styles.total}>
      <div className={styles.total_price}>
        <p className={styles.cart_product_total_price}>총 상품금액</p>
        <p className={styles.cart_product_price}>{totalAmount}원</p>
      </div>
      <div className={styles.pay_plus}>
        <img src={plus} alt="plus" />
      </div>
      <div className={styles.delivery}>
        <p className={styles.cart_product_delivery}>배송비</p>
        <p className={styles.cart_product_delivery_price}>
          {totalDeliveryCharge}원
        </p>
      </div>
      <div className={styles.payment}>
        <p className={styles.cart_prouct_payment}>결제 예정 금액</p>
        <p className={styles.cart_prouct_payment_price}>
          {totalAmount + totalDeliveryCharge}원
        </p>
      </div>
      <div className={styles.cart_product_price}>
        <p className={styles.total_price}></p>
        <p>
          <button className={styles.btn_submit}>주문하기</button>
        </p>
      </div>
    </div>
  );
}

export default TotalCart;
