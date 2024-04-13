// 최상위 컴포넌트
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import OrderPage from './pages/OrderPage';
import MyPage from './pages/MyPage';
import CoursePage from './pages/ProductDetailPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import QuestionPage from './pages/QuestionPage';
import QuestionList from './components/question/QuestionList';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="products">
            <Route index element={<ProductListPage />} />
            <Route path=":productSlug" element={<CoursePage />} />
          </Route>
          <Route path="product-detail" element={<ProductDetailPage />} />
          <Route path="questions">
            <Route index element={<QuestionList />} />
            <Route path=":questionId" element={<QuestionPage />} />
          </Route>
          <Route path="my" element={<MyPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;

