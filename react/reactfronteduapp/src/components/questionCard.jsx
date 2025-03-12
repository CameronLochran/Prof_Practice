import React from "react";

const QuestionCard = ({
  question,
  options,
  selectedAnswer,
  handleAnswerSelect,
  correctAnswer,
  isAnswered,
}) => {
  return (
    <div className="question-card">
      <h2>{question}</h2>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            className={
              isAnswered
                ? option === selectedAnswer
                  ? option === correctAnswer
                    ? "correct"
                    : "incorrect"
                  : ""
                : ""
            }
            disabled={isAnswered}
          >
            {option}
          </button>
        ))}
      </div>
      {isAnswered && (
        <div className="answer-feedback">
          {selectedAnswer === correctAnswer ? (
            <p className="correct-answer">Correct!</p>
          ) : (
            <p className="incorrect-answer">
              Incorrect! The correct answer is: {correctAnswer}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
