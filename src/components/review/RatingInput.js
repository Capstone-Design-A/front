import { useState } from "react";
import Rating from "./Rating";
import styles from "./RatingInput.module.css";

function RatingInput({ name, value, onChange }) {
  const [rating, setRating] = useState(value);

  const handleSelect = (nextValue) => onChange(name, nextValue);

  const handleMouseOut = () => setRating(value);

  return (
    <Rating
      className={styles.RatingInput}
      value={rating}
      onSelect={handleSelect}
      onHover={setRating}
      onMouseOut={handleMouseOut}
    />
  );
}

export default RatingInput;
