import { useState } from "react";
import ReviewItem from "./ReviewItem";
import ReviewForm from "./ReviewForm";
import styles from "./ReviewList.module.css";

function ReviewList({ items, onUpdate, onUpdateSuccess, onDelete }) {
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => setEditingId(null);

  const LIMIT = 5;
  const totalPages = Math.ceil(items.length / LIMIT);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * LIMIT;
  const endIndex = startIndex + LIMIT;
  const currentPageQuestions = items.slice(startIndex, endIndex);

  const { id, imgUrl, title, rating, content } = items;
  const initialValues = { title, rating, content, imgFile: null };

  const handleSubmit = (formData) => onUpdate(id, formData);

  const handleSubmitSuccess = (review) => {
    onUpdateSuccess(review);
    setEditingId(null);
  };

  return (
    <>
      <div className={styles.reviewList}>
        {currentPageQuestions.map((item) => (
          <ReviewItem
            key={item.id}
            item={item}
            onDelete={onDelete}
            onEdit={setEditingId}
          />
        ))}
      </div>
      <div>
        {/* 페이지 번호 표시 */}
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
      {editingId && (
        <li key={id}>
          <ReviewForm
            initialValues={initialValues}
            initialPreview={imgUrl}
            onSubmit={handleSubmit}
            onSubmitSuccess={handleSubmitSuccess}
            onCancel={handleCancel}
          />
        </li>
      )}
    </>
  );
}

export default ReviewList;

/*
return (
    <ul>
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

            return (
              <li key={item.id}>
                <ReviewForm
                  initialValues={initialValues}
                  initialPreview={imgUrl}
                  onSubmit={handleSubmit}
                  onSubmitSuccess={handleSubmitSuccess}
                  onCancel={handleCancel}
                />
              </li>
            );
          }
          return (
            <div className={styles.reviewList} key={item.id}>
              <ReviewItem
                item={item}
                onDelete={onDelete}
                onEdit={setEditingId}
              />
            </div>
          );
        })}
    </ul>
  );
*/
