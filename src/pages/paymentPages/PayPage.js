import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PayAddress from "./PayAddress";
import ProductList from "./ProductList";
import PayMethod from "./PayMethod";
import styles from "./PayPage.module.css";
import { fakePayment, clearCartItems } from "../../api/api";

function PayPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { products, totalAmount } = location.state;

  const handlePayment = async () => {
    try {
      const response = await fakePayment({ itemInfoList: products });
      if (response.isSuccess) {
        console.log("결제 성공:", response.message);
        const clearResponse = await clearCartItems();
        if (clearResponse.isSuccess) {
          console.log("장바구니 비우기 성공:", clearResponse.message);
          navigate("/payment/complete", { state: { products, totalAmount } });
        } else {
          console.error("장바구니 비우기 실패:", clearResponse.message);
        }
      } else {
        console.error("결제 실패:", response.message);
      }
    } catch (error) {
      console.error("결제 오류:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <PayAddress />
      </div>
      <div className={styles.form}>
        <ProductList products={products} totalAmount={totalAmount} />
      </div>
      <div className={styles.form}>
        <PayMethod />
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.paybutton} onClick={handlePayment}>
          결제하기
        </button>
      </div>
    </div>
  );
}

export default PayPage;
