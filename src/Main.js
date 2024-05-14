// 최상위 컴포넌트
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/shared/App";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import OrderPage from "./pages/OrderPage";
import MyPage from "./pages/MyPage";
import ProductCategoryPage from "./pages/ProductCategoryPage";
import ProductSearchPage from "./pages/ProductSearchPage";
import ProductGroupPage from "./pages/ProductGroupPage";
import ProductDeadlinePage from "./pages/ProductDeadlinePage";
import ProductRankingPage from "./pages/ProductRankingPage";
import ProductSubscriptionPage from "./pages/ProductSubscriptionPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Description from "./components/detail/Description";
import ReviewPage from "./pages/ReviewPage";
import QuestionPage from "./pages/QuestionPage";
import InquiryListPage from "./pages/InquiryListPage";
import CartPage from "./pages/CartPage";
import UserIntroductionPage from "./pages/UserIntroductionPage";
import ManagementPage from "./pages/ManagementPage";
import OrderListPage from "./pages/OrderListPage";
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
          <Route path="item" element={<ProductCategoryPage />} />
          <Route path="item/search" element={<ProductSearchPage />} />
          <Route path="groupItem" element={<ProductGroupPage />} />
          <Route path="item/deadline" element={<ProductDeadlinePage />} />
          <Route path="item/ranking" element={<ProductRankingPage />} />
          <Route
            path="item/subscription"
            element={<ProductSubscriptionPage />}
          />
          <Route path="item/:id" element={<ProductDetailPage />}>
            <Route index element={<Description />} />
            <Route path="review" element={<ReviewPage />} />
            <Route path="question" element={<QuestionPage />} />
          </Route>
          <Route path="inquiry" element={<InquiryListPage />} />
          <Route path="my" element={<MyPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="introduction" element={<UserIntroductionPage />} />
          <Route path="management" element={<ManagementPage />} />
          <Route path="seller/order-status" element={<OrderListPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
