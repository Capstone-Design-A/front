import styles from "./Rating.module.css";

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selected = false, rating = 0, onSelect, onHover }) {
  const className = `${styles.star} ${selected ? styles.selected : ""}`;

  const handleClick = onSelect ? () => onSelect(rating) : undefined;

  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      ★
    </span>
  );
}

function Rating({ className, value = 0, onSelect, onHover, onMouseOut }) {
  return (
    <div className={className} onMouseOut={onMouseOut}>
      {RATINGS.map((rating) => (
        <Star
          key={rating}
          selected={value >= rating} // 실제 값(value)과 비교
          rating={rating}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </div>
  );
}

export default Rating;
