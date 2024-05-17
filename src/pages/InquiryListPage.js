import React, { useState, useEffect } from "react";
import { getInquiryList } from "../api/api.js";
import Container from "../components/shared/Container";
import Button from "../components/button/Button";
import InquiryForm from "../components/question/InquiryForm.js";
import InquiryList from "../components/question/InquiryList";
import styles from "./InquiryListPage.module.css";

const InquiryListPage = ({ itemId }) => {
  const [inquiryList, setInquiryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchInquiryList = async () => {
      try {
        const token = "JWT_TOKEN";
        const page = 1;
        const size = 6;

        const result = await getInquiryList(itemId, page, size, token);
        setInquiryList(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchInquiryList();
  }, [itemId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const toggleFormVisibility = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  return (
    <>
      <h1 className={styles.title}>상품 문의</h1>
      <Container className={styles.InquiryList}>
        <div className={styles.create}>
          <Button variant="round" onClick={toggleFormVisibility}>
            문의 작성하기
          </Button>
        </div>
        {isFormVisible && (
          <InquiryForm onCancel={() => setIsFormVisible(false)} />
        )}
        <InquiryList inquiryList={inquiryList} />
      </Container>
    </>
  );
};

export default InquiryListPage;
