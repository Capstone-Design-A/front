import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductList.module.css";
import closeButton from "../../assets/closeButton.svg";
import plus from "../../assets/icon-plus-line.svg";
import minus from "../../assets/icon-minus-line.svg";
import { updateCartItemQuantity } from "../../api/api";

function ProductList({
  product,
  onProductChecked,
  onDeleteProduct,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {
  const handleDelete = async () => {
    try {
      await onDeleteProduct(product.id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleQuantityChange = async (updateQuantity) => {
    try {
      await updateCartItemQuantity(product.id, updateQuantity);
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  return (
    <div className={styles.cart_product_list}>
      <input
        type="checkbox"
        checked={product.isChecked}
        onChange={() => onProductChecked(product.id)}
      />
      <div className={styles.cart_product_wrap}>
        <Link to={`/item/${product.itemId}`}>
          <div className={styles.cart_product_image}>
            <img src={product.image} alt="product-img" />
          </div>
        </Link>
        <Link to={`/item/${product.itemId}`}>
          <div className={styles.cart_product_info}>
            <p>{product.name}</p>
          </div>
        </Link>
        <div className={styles.cart_product_count}>
          <img
            className={styles.minus}
            src={minus}
            alt="minus"
            onClick={() => {
              const updateQuantity = Math.max(product.quantity - 1, 1);
              onDecreaseQuantity(product.id, updateQuantity);
              handleQuantityChange(updateQuantity);
            }}
          />
          <div className={styles.count}>
            <span>{product.quantity}</span>
          </div>
          <img
            className={styles.plus}
            src={plus}
            alt="plus"
            onClick={() => {
              const updateQuantity = product.quantity + 1;
              onIncreaseQuantity(product.id, updateQuantity);
              handleQuantityChange(updateQuantity);
            }}
          />
        </div>
        <div className={styles.cart_product_price}>
          <p className={styles.total_price}>
            {product.price * product.quantity}원
          </p>
        </div>
        <div className={styles.product_remove}>
          <img src={closeButton} alt="닫기" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default ProductList;
