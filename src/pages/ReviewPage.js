import { useCallback, useEffect, useState } from "react";
import ReviewList from "../components/review/ReviewList";
import ReviewForm from "../components/review/ReviewForm";
import {
  createReview,
  deleteReview,
  getReviews,
  updateReview,
} from "../api/api.js";
import useAsync from "../hooks/useAsync";
import styles from "./ReviewPage.module.css";
import Button from "../components/button/Button";

const LIMIT = 5;

function ReviewPage() {
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews);
  const [items, setItems] = useState([]);
  const sortedItems = items.sort((a, b) => b[order] - a[order]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleNewestClick = () => setOrder("createdAt");

  const handleBestClick = () => setOrder("rating");

  const handleDelete = async (id) => {
    const result = await deleteReview(id);
    if (!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleLoad = useCallback(
    async (options) => {
      const result = await getReviewsAsync(options);
      if (!result) return;

      const { paging, reviews } = result;
      if (options.offset === 0) {
        setItems(reviews);
      } else {
        setItems((prevItems) => [...prevItems, ...reviews]);
      }
      setOffset(options.offset + options.limit);
      setHasNext(paging.hasNext);
    },
    [getReviewsAsync]
  );

  const handleLoadMore = async () => {
    await handleLoad({ order, offset, limit: LIMIT });
  };

  const handleCreateSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  };

  const handleUpdateSuccess = (review) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id);
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order, handleLoad]);

  const toggleFormVisibility = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  return (
    <div>
      <div className={styles.button}>
        <div className={styles.sort}>
          <button onClick={handleNewestClick}>최신순</button>
          <div> | </div>
          <button onClick={handleBestClick}>별점 높은 순</button>
        </div>
        <div className={styles.create}>
          <Button variant="round" onClick={toggleFormVisibility}>
            리뷰 작성하기
          </Button>
        </div>
      </div>
      {/* ReviewForm이 활성화된 경우에만 렌더링 */}
      {isFormVisible && (
        <ReviewForm
          onSubmit={createReview}
          onSubmitSuccess={handleCreateSuccess}
        />
      )}
      <ReviewList
        items={sortedItems}
        onDelete={handleDelete}
        onUpdate={updateReview}
        onUpdateSuccess={handleUpdateSuccess}
      />
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default ReviewPage;
