import styles from "./CartHeader.module.css";

function CartHeader({ allChecked, onAllChecked }) {
  return (
    <div className={styles.cart_title_wrap}>
      <div className={styles.tab_title}>
        <input type="checkbox" checked={allChecked} onChange={onAllChecked} />
        <span>상품정보</span>
        <span>수량</span>
        <span>상품금액</span>
        <p>전체선택</p>
      </div>
    </div>
  );
}

export default CartHeader;
