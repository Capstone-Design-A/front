import React, { useState } from "react";
import styles from "./InquiryList.module.css";
import InquiryItem from "./InquiryItem";

function InquiryList({ inquiryList }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inquiryList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className={styles.inquiryList}>
        {currentItems && currentItems.length > 0 ? (
          currentItems.map((inquiry) => (
            <InquiryItem key={inquiry.id} inquiry={inquiry} />
          ))
        ) : (
          <div className={styles.noInquiryList}>작성된 문의가 없습니다.</div>
        )}
      </div>
      <div className={styles.pagination}>
        {Array.from(
          { length: Math.ceil(inquiryList.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? styles.active : ""}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default InquiryList;
