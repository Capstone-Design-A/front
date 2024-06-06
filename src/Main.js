import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/shared/App";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import OrderPage from "./pages/OrderPage";
import MyPage from "./pages/MyPage";
import Notifications from "./components/header/Notifications";
import ProductCategoryPage from "./pages/ProductCategoryPage";
import ProductSearchPage from "./pages/ProductSearchPage";
import ProductGroupPage from "./pages/ProductGroupPage";
import ProductDeadlinePage from "./pages/ProductDeadlinePage";
import ProductRankingPage from "./pages/ProductRankingPage";
import ProductSubscriptionPage from "./pages/ProductSubscriptionPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductGroupDetailPage from "./pages/ProductGroupDetailPage";
import Description from "./components/detail/Description";
import InquiryListPage from "./pages/InquiryListPage";
import ReviewListPage from "./pages/ReviewListPage";
import CartPage from "./pages/cartpages/CartPage";
import ProductRegistrationPage from "./pages/ProductRegistrationPage";
import PostRegistrationPage from "./pages/PostRegistrationPage";
import SellerIntroductionPage from "./pages/SellerIntroductionPage";
import ManagementPage from "./pages/ManagementPage";
import SellerOrderListPage from "./pages/SellerOrderListPage";
import SellerItemListPage from "./pages/SellerItemListPage";
import NotFoundPage from "./pages/NotFoundPage";
import PayPage from "./pages/paymentPages/PayPage";
import CompletePaymentPage from "./pages/CompletePaymentPage";

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <App
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout}
              onLogin={handleLogin}
            />
          }
        >
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="member/signUp" element={<SignUpPage />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="item" element={<ProductCategoryPage />} />
          <Route path="item/search" element={<ProductSearchPage />} />
          <Route path="alarm" element={<Notifications />} />
          <Route path="groupItem" element={<ProductGroupPage />} />
          <Route path="item/deadline" element={<ProductDeadlinePage />} />
          <Route path="item/ranking" element={<ProductRankingPage />} />
          <Route
            path="item/subscription"
            element={<ProductSubscriptionPage />}
          />
          <Route path="item/:id" element={<ProductDetailPage />}>
            <Route index element={<Description />} />
          </Route>
          <Route path="groupItem/:id" element={<ProductGroupDetailPage />}>
            <Route index element={<Description />} />
          </Route>
          <Route path="inquiry" element={<InquiryListPage />} />
          <Route path="review" element={<ReviewListPage />} />
          <Route path="auth/member" element={<MyPage />} />
          <Route path="auth/cart/item" element={<CartPage />} />
          <Route path="/auth/paymemt" element={<PayPage />} />
          <Route path="/payment/complete" element={<CompletePaymentPage />} />
          <Route path="auth/item" element={<ProductRegistrationPage />} />
          <Route path="auth/posts" element={<PostRegistrationPage />} />
          <Route path="intro/:memberId" element={<SellerIntroductionPage />} />
          <Route path="auth/seller" element={<ManagementPage />} />
          <Route
            path="auth/seller/order-status"
            element={<SellerOrderListPage />}
          />
          <Route path="auth/seller/items" element={<SellerItemListPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
