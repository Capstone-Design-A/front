import { useState } from "react";
import useAsync from "../../hooks/useAsync";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import styles from "./ReviewForm.module.css";
import Button from "../button/Button";
import OrderButton from "../button/OrderButton";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function ReviewForm({
  initialValues = INITIAL_VALUES,
  initialPreview,
  onCancel,
  onSubmit,
  onSubmitSuccess,
}) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);

    const result = await onSubmitAsync(formData);
    if (!result) return;

    const { review } = result;
    setValues(INITIAL_VALUES);
    onSubmitSuccess(review);
  };

  return (
    <form className={styles.ReviewForm} onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        initialPreview={initialPreview}
        onChange={handleChange}
      />
      <input
        name="title"
        value={values.title}
        onChange={handleInputChange}
        placeholder="제목을 입력하세요"
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
        placeholder="상세 리뷰를 입력하세요"
      />
      <RatingInput
        name="rating"
        value={values.rating}
        onChange={handleChange}
      />
      {onCancel && (
        <OrderButton
          variant="round"
          className={styles.buttonCancel}
          onClick={onCancel}
        >
          작성 취소
        </OrderButton>
      )}
      <Button
        variant="round"
        className={styles.button}
        disabled={isSubmitting}
        type="submit"
      >
        작성 완료
      </Button>
      {submittingError && <div>{submittingError.message}</div>}
    </form>
  );
}

export default ReviewForm;
