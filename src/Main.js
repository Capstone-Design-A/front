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
import InquiryListPage from "./pages/InquiryListPage";
import CartPage from "./pages/CartPage";
import SellerIntroductionPage from "./pages/SellerIntroductionPage";
import ManagementPage from "./pages/ManagementPage";
import SellerOrderListPage from "./pages/SellerOrderListPage";
import SellerItemListPage from "./pages/SellerItemListPage";
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
          </Route>
          <Route path="inquiry" element={<InquiryListPage />} />
          <Route path="my" element={<MyPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="introduction" element={<SellerIntroductionPage />} />
          <Route path="management" element={<ManagementPage />} />
          <Route path="seller/order-status" element={<SellerOrderListPage />} />
          <Route path="seller/items" element={<SellerItemListPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
