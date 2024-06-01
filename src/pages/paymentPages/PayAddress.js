import React from "react";
import styles from "./PayAddress.module.css"; // 필요한 경우 스타일링 추가

function PayAddress() {
  return (
    <div>
      <h1 className={styles.title}>결제 페이지</h1>
      <br />
      <h2>배송지</h2>
      <div className={styles.addressList}>
        <p className={styles.user_name}>손영호</p>
        <p className={styles.user_phone}>010-6402-1140</p>
        <p className={styles.user_address}>
          부산광역시 사상구 백양대로934번길 20 (모라동, 삼정그린코아아파트)
          102동 902호(46928)
        </p>
        <form>
          <select className={styles.selectBox} defaultValue="">
            <option value="default">배송 메모를 선택해 주세요</option>
            <option value="first">집 앞에 놓고 가주세요</option>
            <option value="second">경비실에 놓고 가주세요</option>
            <option value="third">초인종을 누르지 말아 주세요</option>
          </select>
        </form>
      </div>
    </div>
  );
}

export default PayAddress;
