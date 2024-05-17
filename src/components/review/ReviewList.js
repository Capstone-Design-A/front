import React, { useState } from "react";
import ReviewItem from "./ReviewItem";
import styles from "./ReviewList.module.css";

function ReviewList({ reviewList }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviewList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className={styles.reviewList}>
        {currentItems && currentItems.length > 0 ? (
          currentItems.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))
        ) : (
          <div className={styles.noReviewList}>작성된 후기가 없습니다.</div>
        )}
      </div>
      <div className={styles.pagination}>
        {Array.from(
          { length: Math.ceil(reviewList.length / itemsPerPage) },
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

export default ReviewList;
