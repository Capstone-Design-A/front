import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../../components/header/Nav";
import Footer from "../../components/footer/Footer";
import styles from "./App.module.css";
import "./App.font.css";

function App({ isLoggedIn, onLogout, onLogin }) {
  return (
    <>
      <Nav className={styles.nav} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className={styles.body}>
        <Outlet context={{ onLogin }} />
      </div>
      <Footer className={styles.footer} />
    </>
  );
}

export default App;
