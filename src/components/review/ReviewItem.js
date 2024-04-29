import { useState } from "react";
import Card from "../shared/Card";
import DateText from "../shared/DateText";
import Rating from "./Rating";
// import Container from "../../components/shared/Container";
import styles from "./ReviewItem.module.css";

function ReviewItem({ item, onDelete, onEdit }) {
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const handleDeleteClick = () => {
    onDelete(item.id);
  };

  const handleEditClick = () => {
    onEdit(item.id);
  };

  const handleTitleClick = () => {
    setIsDetailVisible(!isDetailVisible);
  };

  return (
    <Card className={styles.reviewItem} key={item.id}>
      <div className={styles.info}>
        <Rating className={styles.rating} value={item.rating} />
        <p className={styles.title} onClick={handleTitleClick}>
          {item.title}
        </p>
        {/*<p className={styles.writer}>{item.writer}</p> */}
        <p className={styles.writer}>작성자 이름</p>
        <p className={styles.date}>
          <DateText value={item.createdAt} />
        </p>
      </div>
      {isDetailVisible && (
        <>
          <div className={styles.detail}>
            <div className={styles.detailContent}>
              <img className={styles.img} src={item.imgUrl} alt={item.title} />
              <p className={styles.content}>{item.content}</p>
            </div>
            <div className={styles.buttonAll}>
              <button className={styles.button} onClick={handleEditClick}>
                {"수정"}
              </button>
              <button className={styles.button} onClick={handleDeleteClick}>
                {"삭제"}
              </button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}

export default ReviewItem;
