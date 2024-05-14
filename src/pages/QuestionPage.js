import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getInquiryList } from "../api/api.js";
import Container from "../components/shared/Container";
import QuestionList from "../components/question/QuestionList";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function QuestionPage() {
  const navigate = useNavigate();
  const query = useQuery();
  const itemId = query.get("itemId");
  const page = query.get("page") || 1;
  const size = query.get("size") || 6;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(Number(page));
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (!itemId) {
          console.log("No item ID found, navigating to home.");
          navigate("/");
          return;
        }

        const token = "YOUR_JWT_TOKEN_HERE";
        console.log(
          `Fetching questions for item ID: ${itemId}, page: ${currentPage}, size: ${size}`
        );

        const questionList = await getInquiryList(
          itemId,
          currentPage,
          size,
          token
        );
        console.log("Questions fetched:", questionList);

        setQuestions(questionList);
        setTotalPages(questionList.totalPages || 1);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [itemId, currentPage, size, navigate]);

  if (loading) {
    return (
      <Container>
        <div>로딩 중입니다...</div>
      </Container>
    );
  }

  return (
    <Container>
      <QuestionList
        questions={questions}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
}

export default QuestionPage;
