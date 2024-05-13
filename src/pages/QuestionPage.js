import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getInquiryList } from "../api/api.js";
import Container from "../components/shared/Container";
import QuestionList from "../components/question/QuestionList";

function QuestionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (!id) {
          navigate("/");
          return;
        }

        const token = "YOUR_JWT_TOKEN_HERE";
        const page = 1;
        const size = 6;

        const questionList = await getInquiryList(id, page, size, token);
        setQuestions(questionList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [id, navigate]);

  if (loading) {
    return (
      <Container>
        <div>로딩 중입니다...</div>
      </Container>
    );
  }

  return (
    <Container>
      <QuestionList questions={questions} />
    </Container>
  );
}

export default QuestionPage;
