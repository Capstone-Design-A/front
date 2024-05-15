import React, { useState, useEffect } from "react";
import { getInquiryList } from "../api/api.js";
import Container from "../components/shared/Container";
import InquiryList from "../components/question/InquiryList";
import styles from "./InquiryListPage.module.css";

const InquiryListPage = ({ itemId }) => {
  const [inquiryList, setInquiryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <>
      <h1 className={styles.title}>상품 문의</h1>
      <Container className={styles.InquiryList}>
        <InquiryList inquiryList={inquiryList} />
      </Container>
    </>
  );
};

export default InquiryListPage;
