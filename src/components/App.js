// 모든 페이지에 Nav, Footer 컴포넌트를 고정해준다
import { Outlet } from 'react-router-dom';
import Nav from '../components/header/Nav';
import Footer from '../components/footer/Footer';
import styles from './App.module.css';
import './App.font.css';

function App() {
  return (
    <>
      <Nav className={styles.nav} />
      <div className={styles.body}><Outlet /></div>
      <Footer className={styles.footer} />
    </>
  );
}

export default App;