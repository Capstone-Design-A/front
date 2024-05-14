// test
import React, { useState, useEffect } from "react";
import { getInquiryList } from "../api/api.js";

const InquiryListPage = () => {
  const [inquiryList, setInquiryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInquiryList = async () => {
      try {
        const token = "JWT_TOKEN";
        const itemId = 1;
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Inquiry List</h1>
      <ul>
        {inquiryList.map((inquiry) => (
          <li key={inquiry.id}>
            <strong>From: {inquiry.fromMemberNickname}</strong>
            <p>Status: {inquiry.status}</p>
            <p>Content: {inquiry.content}</p>
            <p>Answer: {inquiry.answer}</p>
            <p>Created At: {new Date(inquiry.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InquiryListPage;
