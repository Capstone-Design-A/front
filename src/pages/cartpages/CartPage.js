import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/shared/Container";
import TotalCart from "./TotalCart";
import CartHeader from "./CartHeader";
import ProductList from "./ProductList";
import Button from "../../components/button/Button";
import Warn from "../../components/shared/Warn";
import styles from "./CartPage.module.css";

function CartPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "item1",
      price: 20000,
      quantity: 1,
      image: "imageURL1",
      isChecked: false,
    },
    {
      id: 2,
      name: "item2",
      price: 18000,
      quantity: 2,
      image: "imageUrl2",
      isChecked: false,
    },
    {
      id: 3,
      name: "item 3",
      price: 18000,
      quantity: 2,
      image: "imageUrl3",
      isChecked: false,
    },
  ]);
  
  const [allChecked, setAllChecked] = useState(false);

  const handleAllChecked = () => {
    const newAllChecked = !allChecked;
    setAllChecked(newAllChecked);
    setProducts(products.map(product => ({ ...product, isChecked: newAllChecked })));
  };

  const handleProductChecked = (productId) => {
    const nextProducts = products.map(product => {
      if (product.id === productId) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setProducts(nextProducts);
    setAllChecked(nextProducts.every(product => product.isChecked));
  };

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
        <ul className={styles.items}>
          {products.map((product) => (
            <li key={product.id} className={styles.item}>
              <ProductList
                product={product}
                products={products}
                setProducts={setProducts}
                onProductChecked={handleProductChecked}
              />
            </li>
          ))}
        </ul>
      )}
      <TotalCart products={products} />
    </Container>
  );
}




export default CartPage;
