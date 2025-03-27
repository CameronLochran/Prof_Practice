import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import '../styles/SoftwareQuiz.css';

export default function SoftwareQuiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  // Fetch questions and set initial progress
  useEffect(() => {
    // Fetch questions
    fetch("http://localhost:3000/api/questions")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Debugging log
        if (Array.isArray(data)) {
          // Ensure both category and difficulty match
          const filteredQuestions = data.filter(
            (q) => q.category === "Software Dev" && q.difficulty === "Normal"
          );
          setQuestions(filteredQuestions);
        } else {
          console.error("API response is not an array:", data);
          setQuestions([]); // Prevents map errors
        }
      })
      .catch((error) => console.error("Error fetching questions:", error));

    // Load the saved progress (current question index) from localStorage
    const savedProgress = localStorage.getItem('quizProgress');
    if (savedProgress) {
      setCurrentQuestionIndex(Number(savedProgress)); // Start from the saved question index
    }
  }, []);

  // Save progress whenever the current question index changes
  useEffect(() => {
    localStorage.setItem('quizProgress', currentQuestionIndex); // Store current question index
  }, [currentQuestionIndex]);

  // Handle selecting an answer
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setCorrectAnswer(questions[currentQuestionIndex].answer); // Store the correct answer
  };

  // Move to the next question
  const nextQuestion = () => {
    setSelectedAnswer(""); // Reset selection
    setCorrectAnswer(""); // Reset correct answer display
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Move to next question
  };

  // Handle quiz completion
  const progress = ((currentQuestionIndex) / questions.length) * 100; // Calculate progress percentage

  // If no questions are loaded yet
  if (!questions.length) return <p className="text-center">Loading software questions...</p>;

  // If quiz is completed
  if (currentQuestionIndex >= questions.length)
    return <p className="text-center text-2xl font-bold">🎉 Quiz Completed! 🎉</p>;

  const question = questions[currentQuestionIndex]; // Get the current question

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Software Quiz</h1>

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
                  ? "bg-green-500" // Correct Answer (green)
                  : option === selectedAnswer
                  ? "bg-red-500" // Wrong Answer (red)
                  : "bg-gray-200"
                : "bg-gray-200"
            }`}
            disabled={!!selectedAnswer} // Disable buttons after selecting
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
        <button
          onClick={nextQuestion}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Next Question →
        </button>
      )}

      <br /><br /><br /><br /><br />
      <Link to="/categorySelection">
        <button className="back-button">Back</button>
      </Link>
    </>
  );
}
