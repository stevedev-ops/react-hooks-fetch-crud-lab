import React, { useState, memo } from "react";

const QuestionItem = memo(({ question, onDelete, onUpdateCorrectIndex }) => {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedIndex, setSelectedIndex] = useState(correctIndex);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {
    onDelete(id);
  }

  async function handleChange(event) {
    const updatedCorrectIndex = parseInt(event.target.value, 10);
    setSelectedIndex(updatedCorrectIndex);

    await fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: updatedCorrectIndex }),
    });

    // Update the correctIndex in the parent component (QuestionList)
    onUpdateCorrectIndex(id, updatedCorrectIndex);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={selectedIndex} onChange={handleChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
});

export default QuestionItem;
