import styles from "./ProductList.module.css";
import closeButton from "../../assets/closeButton.svg";
import plus from "../../assets/icon-plus-line.svg";
import minus from "../../assets/icon-minus-line.svg";

function ProductList({
  products,
  setProducts,
  onProductChecked,
  onDeleteProduct,
}) {
  const handleDelete = async (productId) => {
    try {
      await onDeleteProduct(productId);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleIncrease = (productId) => {
    const nextProducts = products.map((prod) => {
      if (prod.id === productId) {
        return { ...prod, quantity: prod.quantity + 1 };
      }
      return prod;
    });
    setProducts(nextProducts);
  };

  const handleDecrease = (productId) => {
    const nextProducts = products.map((prod) => {
      if (prod.id === productId && prod.quantity > 1) {
        return { ...prod, quantity: prod.quantity - 1 };
      }
      return prod;
    });
    setProducts(nextProducts);
  };

  console.log("products:", products);

  return (
    <div className={styles.cart_product_list_container}>
      {products.map((product) => (
        <section key={product.id} className={styles.cart_product_list}>
          <input
            type="checkbox"
            checked={product.isChecked}
            onChange={() => onProductChecked(product.id)}
          />
          <div className={styles.cart_product_wrap}>
            <div className={styles.cart_product_image}>
              <img src={product.image} alt="product-img" />
            </div>
            <div className={styles.cart_product_info}>
              <p>{product.name}</p>
            </div>
          </div>

          <div className={styles.cart_product_count}>
            <img
              className={styles.minus}
              src={minus}
              alt="minus"
              onClick={() => handleDecrease(product.id)}
            />
            <div className={styles.count}>
              <span>{product.quantity}</span>
            </div>
            <img
              className={styles.plus}
              src={plus}
              alt="plus"
              onClick={() => handleIncrease(product.id)}
            />
          </div>

          <div className={styles.cart_product_price}>
            <p className={styles.total_price}>
              {product.price * product.quantity}원
            </p>
          </div>

          <div className={styles.product_remove}>
            <img
              src={closeButton}
              alt="닫기"
              onClick={() => handleDelete(product.id)}
            />
          </div>
        </section>
      ))}
    </div>
  );
}

export default ProductList;
