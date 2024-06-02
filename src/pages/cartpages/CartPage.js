import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/shared/Container";
import TotalCart from "./TotalCart";
import CartHeader from "./CartHeader";
import ProductList from "./ProductList";
import Button from "../../components/button/Button";
import Warn from "../../components/shared/Warn";
import styles from "./CartPage.module.css";
import { getCartItems, deleteCartItems } from "../../api/api"; // import deleteCartItems 함수 추가

function CartPage() {
  const [products, setProducts] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [totalDeliveryCharge, setTotalDeliveryCharge] = useState(0);

  // 장바구니 데이터를 가져오는 함수
  const fetchCartItems = async () => {
    try {
      const response = await getCartItems();
      if (response.isSuccess) {
        const carts = response.result.carts;
        setProducts(
          carts.map((cart) => ({
            id: cart.id,
            name: cart.item.name,
            price: cart.item.price,
            quantity: cart.quantity,
            image: cart.item.imageUrl,
            isChecked: false,
          }))
        );
        setTotalDeliveryCharge(response.result.sumDeliveryCharge);
      } else {
        console.error("Failed to fetch cart items:", response.message);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    // 페이지가 마운트될 때 장바구니 데이터를 가져옴
    fetchCartItems();
  }, []);

  // 장바구니 상품 삭제 함수
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await deleteCartItems(productId);
      if (response.isSuccess) {
        // 상품 삭제 후 장바구니 데이터 다시 가져옴
        fetchCartItems();
      } else {
        console.error("Failed to delete product:", response.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAllChecked = () => {
    const newAllChecked = !allChecked;
    setAllChecked(newAllChecked);
    setProducts(
      products.map((product) => ({ ...product, isChecked: newAllChecked }))
    );
  };

  const handleProductChecked = (productId) => {
    const nextProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setProducts(nextProducts);
    setAllChecked(nextProducts.every((product) => product.isChecked));
  };

  // 나머지 함수들은 유지됨

  return (
    <Container className={styles.container}>
      <h1 className={styles.title}>장바구니</h1>
      <CartHeader allChecked={allChecked} onAllChecked={handleAllChecked} />
      {products.length === 0 ? (
        <>
          <Warn
            className={styles.emptyList}
            title="장바구니에 담긴 상품이 없어요."
            description="원하는 상품을 찾아 추가해보세요."
          />
          <div className={styles.link}>
            <Link to="/">
              <Button className={styles.button} as="div">
                상품 둘러보기
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <ul className={styles.items}>
            {products.map((product) => (
              <li key={product.id} className={styles.item}>
                <ProductList
                  product={product}
                  products={products}
                  setProducts={setProducts}
                  onProductChecked={handleProductChecked}
                  onDeleteProduct={handleDeleteProduct}
                />
              </li>
            ))}
          </ul>
          <TotalCart
            products={products}
            totalDeliveryCharge={totalDeliveryCharge}
          />
        </>
      )}
    </Container>
  );
}

export default CartPage;
