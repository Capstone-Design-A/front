import { useState } from "react";
import minus from "../../assets/icon-minus-line.svg";
import plus from "../../assets/icon-plus-line.svg";
import styles from "./Amount.module.css";

function Amount() {
  const [count, setCount] = useState(1);

  const handleQuantity = (type) => {
    if (type === "plus") {
      setCount(count + 1);
    } else {
      if (count === 1) return;
      setCount(count - 1);
    }
  };

  return (
    <div className={styles.number}>
      <div className={styles.amount}>
        <img
          className={styles.minus}
          src={minus}
          alt="minus"
          onClick={() => handleQuantity("minus")}
        />

        <div className={styles.count}>
          <span>{count}</span>
        </div>

        <img
          className={styles.plus}
          src={plus}
          alt="plus"
          onClick={() => handleQuantity("plus")}
        />
      </div>
    </div>
  );
}

export default Amount;
