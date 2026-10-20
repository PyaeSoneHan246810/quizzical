import { useState } from "react";
import { clsx } from "clsx";

function QuestionsPage({ questions, onPlayAgain }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [showResults, setShowResults] = useState(false);

  function handleSelectAnswer(questionIndex, answer) {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  }

  function handleCheckAnswers() {
    setShowResults(true);
  }

  function handlePlayAgain() {
    setShowResults(false);
    setSelectedAnswers({});
    onPlayAgain();
  }

  const score = questions.reduce((count, question, index) => {
    return selectedAnswers[index] === question.correctAnswer
      ? count + 1
      : count;
  }, 0);

  const questionsList = questions.map((question, index) => (
    <Question
      key={question.question}
      question={question}
      selectedAnswer={selectedAnswers[index]}
      showResults={showResults}
      onSelected={(answer) => handleSelectAnswer(index, answer)}
    />
  ));

  return (
    <div className="questions-container">
      {questionsList}
      <div className="results-container">
        {showResults && (
          <p className="score-text">
            You scored {score}/{questions.length} correct answers
          </p>
        )}
        <button
          className="btn-primary"
          onClick={showResults ? handlePlayAgain : handleCheckAnswers}
        >
          {showResults ? "Play again" : "Check Answers"}
        </button>
      </div>
    </div>
  );
}

function Question({ question, selectedAnswer, showResults, onSelected }) {
  return (
    <div className="question">
      <h3>{question.question}</h3>
      <div className="answers">
        {question.allAnswers.map((answer) => {
          const isSelected = answer === selectedAnswer;
          const isCorrect = answer === question.correctAnswer;
          const buttonClass = clsx("btn-answer", {
            "selected-answer": !showResults && isSelected,
            "correct-answer": showResults && isCorrect,
            "incorrect-answer": showResults && !isCorrect && isSelected,
            "dimmed-answer": showResults && !isCorrect && !isSelected,
          });
          return (
            <button
              key={answer}
              className={buttonClass}
              disabled={showResults}
              onClick={() => onSelected(answer)}
            >
              {answer}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionsPage;
