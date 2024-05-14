import React, { useState } from "react";
import styles from "./QuestionList.module.css";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, totalPages, currentPage, setCurrentPage }) {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  // 페이지 번호 버튼
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.questionList}>
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </div>
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={`${styles.pageButton} ${
                pageNumber === currentPage ? styles.active : ""
              }`}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default QuestionList;
