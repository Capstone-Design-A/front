import React from "react";
import styles from "./PayMethod.module.css";

function PayMethod() {
  return (
    <div className={styles.paylist}>
      <h2 className={styles.header}>결제수단</h2>
      <input type="radio" id="bankPayment" name="paymentMethod" />
      <label htmlFor="bankPayment">계좌 간편결제</label>
      <hr className={styles.separator} />
      <input type="radio" id="cardPayment" name="paymentMethod" />
      <label htmlFor="cardPayment">카드 간편결제</label>
    </div>
  );
}

export default PayMethod;
