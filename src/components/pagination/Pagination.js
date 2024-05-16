import React from "react";
import PropTypes from "prop-types";
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (pageNumber) => {
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
          disabled={currentPage === totalPages && pageNumber + 1 === totalPages}
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
