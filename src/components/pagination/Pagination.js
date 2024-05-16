import React from "react";
import PropTypes from "prop-types";
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // 페이지 번호 버튼을 클릭할 때 실행되는 함수
  const handlePageClick = (pageNumber) => {
    // 해당 페이지 번호를 부모 컴포넌트로 전달
    onPageChange(pageNumber);
  };

  return (
    <div className={styles.pagination}>
      {[...Array(totalPages).keys()].map((pageNumber) => (
        <button
          key={pageNumber + 1}
          onClick={() => handlePageClick(pageNumber + 1)}
          className={`${styles.pageButton} ${
            pageNumber + 1 === currentPage ? styles.active : ""
          }`}
        >
          {pageNumber + 1}
        </button>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
