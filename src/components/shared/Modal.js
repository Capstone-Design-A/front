import React from "react";
import styles from "./Modal.module.css";

function Modal({ isOpen, onClose, children }) {
  return (
    <div>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button onClick={onClose}>닫기</button>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
