import React, { useState } from "react";
import Button from "../button/Button";
import OrderButton from "../button/OrderButton";
import styles from "./InquiryForm.module.css";
import { postInquiry } from "../../api/api";

function InquiryForm({ itemId, onCancel, onSubmitSuccess }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postInquiry(itemId, content);
      console.log("Inquiry posted successfully:", response);
      setContent("");
      if (onSubmitSuccess) onSubmitSuccess(response);
    } catch (error) {
      console.error("Failed to post inquiry:", error.message);
      setError(error.message);
    }
  };

  return (
    <form className={styles.InquiryForm} onSubmit={handleSubmit}>
      <textarea
        name="content"
        value={content}
        onChange={handleChange}
        placeholder="문의 내용을 입력하세요"
        required
      />
      <div className={styles.buttonContainer}>
        <OrderButton
          variant="round"
          className={styles.buttonCancel}
          onClick={onCancel}
        >
          작성 취소
        </OrderButton>
        <Button variant="round" className={styles.button} type="submit">
          작성 완료
        </Button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}

export default InquiryForm;
