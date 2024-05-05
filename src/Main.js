// 최상위 컴포넌트
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/shared/App";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import OrderPage from "./pages/OrderPage";
import MyPage from "./pages/MyPage";
import ProductDeadlinePage from "./pages/ProductDeadlinePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Description from "./components/detail/Description";
import ReviewPage from "./pages/ReviewPage";
import ProductListPage from "./pages/ProductListPage";
import ProductCategoryPage from "./pages/ProductCategoryPage";
import QuestionPage from "./pages/QuestionPage";
import CartPage from "./pages/CartPage";
import NotFoundPage from "./pages/NotFoundPage";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="item/deadline" element={<ProductDeadlinePage />} />
          <Route path="new-products" element={<ProductListPage />} />
          <Route path="purchase-ranking" element={<ProductListPage />} />
          <Route path="products">
            <Route index element={<ProductListPage />} />
            <Route path=":productSlug" element={<ProductDetailPage />}>
              <Route index element={<Description />} />
              <Route path="description" element={<Description />} />
              <Route path="review" element={<ReviewPage />} />
              <Route path="question" element={<QuestionPage />} />
            </Route>
          </Route>
          <Route path="item/:categoryId" element={<ProductCategoryPage />} />
          <Route path="my" element={<MyPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
