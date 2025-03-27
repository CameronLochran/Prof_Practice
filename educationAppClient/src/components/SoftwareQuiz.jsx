import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import '../styles/SoftwareQuiz.css';

export default function SoftwareQuiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0); // Track correct answers

  // Fetch questions and load progress
  useEffect(() => {
    fetch("http://localhost:3000/api/questions")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const filteredQuestions = data.filter(
            (q) => q.category === "Software Dev" && q.difficulty === "Normal"
          );
          setQuestions(filteredQuestions);
        } else {
          setQuestions([]);
        }
      })
      .catch((error) => console.error("Error fetching questions:", error));

    // Load saved progress
    const savedProgress = localStorage.getItem("quizProgress");
    const savedCorrectAnswers = localStorage.getItem("correctAnswers");

    if (savedProgress) setCurrentQuestionIndex(Number(savedProgress));
    if (savedCorrectAnswers) setCorrectAnswers(Number(savedCorrectAnswers));
  }, []);

  // Save progress when currentQuestionIndex or correctAnswers change
  useEffect(() => {
    localStorage.setItem("quizProgress", currentQuestionIndex);
    localStorage.setItem("correctAnswers", correctAnswers);
  }, [currentQuestionIndex, correctAnswers]);

  if (!questions.length) return <p className="text-center">Loading software questions...</p>;
  if (currentQuestionIndex >= questions.length)
    return <p className="text-center text-2xl font-bold">🎉 Quiz Completed! 🎉 You got {correctAnswers} correct.</p>;

  const question = questions[currentQuestionIndex];

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setCorrectAnswer(question.answer);

    if (answer === question.answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  // Move to the next question
  const nextQuestion = () => {
    setSelectedAnswer("");
    setCorrectAnswer("");
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  if(correctAnswers > 19) return <div className="progress-bar color-lightblue"></div>
  const progress = (currentQuestionIndex / questions.length) * 100;

  
  return (
    <>
      <main>
        <h1 className="software-h1">Software Quiz</h1>

        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        
        <h2 className="question">{question.question}</h2>
        <div className="options-grid mt-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`option-button ${
                selectedAnswer
                  ? option === correctAnswer
                    ? "bg-green-500"
                    : option === selectedAnswer
                    ? "bg-red-500"
                    : "bg-gray-200"
                  : "bg-gray-200"
              }`}
              disabled={!!selectedAnswer}
            >
              {option}
            </button>
          ))}
        </div>

        {selectedAnswer && (
          <p className="mt-2 font-semibold text-white">
            {selectedAnswer === correctAnswer ? "✅ Correct!" : `❌ Wrong! The correct answer is: ${correctAnswer}`}
          </p>
        )}

        {selectedAnswer && (
          <button onClick={nextQuestion} className="next-question">
            Next Question →
          </button>
        )}

        <br />
        <Link to="/categorySelection">
          <button className="back-button">Back</button>
        </Link>
      </main>
    </>
  );
}
