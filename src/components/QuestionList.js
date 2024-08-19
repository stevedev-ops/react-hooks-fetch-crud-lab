import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const response = await fetch("http://localhost:4000/questions");
      const data = await response.json();
      setQuestions(data);
    }

    fetchQuestions();
  }, []);

  function handleDelete(id) {
    setQuestions((prevQuestions) => prevQuestions.filter(question => question.id !== id));

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    });
  }

  function handleUpdateCorrectIndex(id, correctIndex) {
    setQuestions((prevQuestions) => 
      prevQuestions.map((question) =>
        question.id === id ? { ...question, correctIndex } : question
      )
    );
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => (
          <QuestionItem 
            key={question.id} 
            question={question} 
            onDelete={handleDelete} 
            onUpdateCorrectIndex={handleUpdateCorrectIndex} 
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
