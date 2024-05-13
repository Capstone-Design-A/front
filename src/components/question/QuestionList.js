// 상품 문의 게시판
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getQuestions } from "../../api";
import styles from "./QuestionList.module.css";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const initKeyword = searchParams.get("keyword");
  const questions = getQuestions(initKeyword);

  const LIMIT = 5;

  const totalPages = Math.ceil(questions.length / LIMIT);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * LIMIT;
  const endIndex = startIndex + LIMIT;
  const currentPageQuestions = questions.slice(startIndex, endIndex);

  return (
    <>
      <div className={styles.questionList}>
        {currentPageQuestions.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </div>
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`${styles.pageButton} ${
                pageNumber === currentPage ? styles.active : ""
              }`}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </>
  );
}

export default QuestionList;

/*
return (
  <>
  {items &&
        items.map((item) => {
          if (item.id === editingId) {
            const { id, imgUrl, title, rating, content } = item;
            const initialValues = { title, rating, content, imgFile: null };

            const handleSubmit = (formData) => onUpdate(id, formData);

            const handleSubmitSuccess = (review) => {
              onUpdateSuccess(review);
              setEditingId(null);
            };
    <li key={item.id}>
      <ReviewForm
        initialValues={initialValues}
        initialPreview={imgUrl}
        onSubmit={handleSubmit}
        onSubmitSuccess={handleSubmitSuccess}
        onCancel={handleCancel}
      />
    </li>
    <div className={styles.reviewList}>
      {currentPageQuestions.map((item) => (
        <ReviewItem key={item.id} item={item} />
      ))}
    </div> 
    <div>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`${styles.pageButton} ${
              pageNumber === currentPage ? styles.active : ""
            }`}
          >
            {pageNumber}
          </button>
        )
      )}
    </div>
  </>
);
}
*/
