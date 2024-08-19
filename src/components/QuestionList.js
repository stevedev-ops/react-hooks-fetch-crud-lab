import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((questions) => setQuestions(questions));
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedQuestions = questions.filter((q) => q.id !== id);
      setQuestions(updatedQuestions);
    });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionItem key={question.id} question={question} onDelete={handleDelete} />
          ))
        ) : (
          <p>No questions available</p>
        )}
      </ul>
    </section>
  );
}

export default QuestionList;
