import React from "react";
import styles from "./QuestionList.module.css";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, totalPages, currentPage, setCurrentPage }) {
  // 페이지 번호 버튼
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className={styles.questionList}>
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionItem key={question.id} question={question} />
          ))
        ) : (
          <div className={styles.noQuestions}>문의가 없습니다.</div>
        )}
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
