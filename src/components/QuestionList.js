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

  async function handleDelete(id) {
    await fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    });

    setQuestions(questions.filter(question => question.id !== id));
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
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
