import React, { useState, useEffect } from "react";
import { getInquiryList } from "../api/api.js";

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
    <div>
      <h1>상품 문의</h1>
      <ul>
        {inquiryList.map((inquiry) => (
          <li key={inquiry.id}>
            <strong>작성자: {inquiry.fromMemberNickname}</strong>
            <p>답변 상태: {inquiry.status}</p>
            <p>문의 내용: {inquiry.content}</p>
            <p>답변 내용: {inquiry.answer}</p>
            <p>작성일: {new Date(inquiry.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InquiryListPage;
