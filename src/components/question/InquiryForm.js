import React, { useState } from "react";
import FileInput from "../review/FileInput";
import Button from "../button/Button";
import OrderButton from "../button/OrderButton";
import styles from "./InquiryForm.module.css";

const INITIAL_VALUES = {
  title: "",
  content: "",
  imgFile: null,
};

function InquiryForm({
  initialValues = INITIAL_VALUES,
  initialPreview,
  onCancel,
  onSubmitSuccess,
}) {
  const [values, setValues] = useState(initialValues);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: values.title,
      content: values.content,
      imgFile: values.imgFile,
    };

    console.log("Form Submitted:", formData);

    setValues(INITIAL_VALUES);
    if (onSubmitSuccess) onSubmitSuccess(formData);
  };

  return (
    <form className={styles.InquiryForm} onSubmit={handleSubmit}>
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
        placeholder="문의 내용을 입력하세요"
      />
      <div className={styles.buttonContainer}>
        {onCancel && (
          <OrderButton
            variant="round"
            className={styles.buttonCancel}
            onClick={(e) => {
              e.preventDefault();
              onCancel();
            }}
          >
            작성 취소
          </OrderButton>
        )}
        <Button variant="round" className={styles.button} type="submit">
          작성 완료
        </Button>
      </div>
    </form>
  );
}

export default InquiryForm;
