import { useState, useEffect } from "react"; // Import React hooks for state and side effects
import React from "react"; // Import React to create the component
import { Link } from "react-router-dom"; // Import Link for routing between pages
import '../../styles/SoftwareQuiz.css'; // Import CSS for styling the quiz component

// The SoftwareQuiz component renders the quiz interface and manages quiz logic
export default function SoftwareQuiz() {
  // State hooks for quiz data and logic
  const [questions, setQuestions] = useState([]); // Holds the list of quiz questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Keeps track of the current question index
  const [selectedAnswer, setSelectedAnswer] = useState(""); // Stores the user's selected answer
  const [correctAnswer, setCorrectAnswer] = useState(""); // Stores the correct answer for the current question
  const [correctAnswers, setCorrectAnswers] = useState(0); // Tracks the number of correct answers
  const [quizCompleted, setQuizCompleted] = useState(false); // Flag to check if the quiz is completed

  // Fetch questions from the API when the component mounts
  useEffect(() => {
    fetch("http://localhost:3000/api/questions")
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        if (Array.isArray(data)) {
          // Filter questions by category and difficulty
          const filteredQuestions = data.filter(
            (q) => q.category === "Software Dev" && q.difficulty === "Normal"
          );
          setQuestions(filteredQuestions); // Set the filtered questions to state
        } else {
          setQuestions([]); // If no valid data, set questions to an empty array
        }
      })
      .catch((error) => console.error("Error fetching questions:", error)); // Handle fetch errors
  }, []); // The empty dependency array ensures the effect runs only once on mount

  // Effect to save quiz progress to localStorage and handle quiz completion
  useEffect(() => {
    // Save the current question index and correct answers count
    localStorage.setItem("softwareQuizProgress", currentQuestionIndex);
    localStorage.setItem("softwareCorrectAnswers", correctAnswers);

    // Save score and update best score when quiz completes
    if (questions.length && currentQuestionIndex >= questions.length && !quizCompleted) {
      setQuizCompleted(true); // Mark quiz as completed
      localStorage.setItem("softwareLatestScore", correctAnswers); // Save the latest score

      const bestScore = Number(localStorage.getItem("softwareBestScore")) || 0; // Get the best score from localStorage
      if (correctAnswers > bestScore) {
        localStorage.setItem("softwareBestScore", correctAnswers); // Update best score if needed
      }
    }
  }, [currentQuestionIndex, correctAnswers, questions, quizCompleted]); // Runs every time these values change

  // If no questions are loaded yet, show a loading message
  if (!questions.length) return <p className="text-center">Loading Software Questions...</p>;

  // If the quiz is completed, display the result and the option to go back
  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="software-quiz-container">
        <h1 className="software-h1">🎉 Quiz Completed! 🎉</h1>
        <p className="text-2xl font-bold">You got {correctAnswers} correct.</p>
        <Link to="/categorySelection">
          <button className="back-button">Back to Categories</button>
        </Link>
      </div>
    );
  }

  const question = questions[currentQuestionIndex]; // Get the current question

  // Handle when the user selects an answer
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer); // Set the selected answer
    setCorrectAnswer(question.answer); // Set the correct answer

    // Increment correctAnswers if the selected answer is correct
    if (answer === question.answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  // Move to the next question
  const nextQuestion = () => {
    setSelectedAnswer(""); // Reset selected answer
    setCorrectAnswer(""); // Reset correct answer
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Increment the current question index
  };

  // Calculate the progress as a percentage
  const progress = (currentQuestionIndex / questions.length) * 100;

  return (
    <>
      <main>
        <header><br /><br /></header>
        <center>
          <div className="software-quiz-container">
            <h1 className="software-h1">Software Quiz</h1>

            {/* Progress Bar showing quiz progress */}
            <div className="software-progress-bar-container">
              <div className="software-progress-bar" style={{ width: `${progress}%` }}></div>
            </div>

            {/* Display the current question */}
            <h2 className="question">{question.question}</h2>
            <div className="options-grid">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)} // Handle answer selection
                  className={`option-button ${
                    selectedAnswer
                      ? option === correctAnswer
                        ? "bg-green-500" // Green for correct answer
                        : option === selectedAnswer
                        ? "bg-red-500" // Red for wrong answer
                        : "bg-gray-200"
                      : "bg-gray-200"
                  }`}
                  disabled={!!selectedAnswer} // Disable the button once an answer is selected
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Display feedback after an answer is selected */}
            {selectedAnswer && (
              <p className="right-or-wrong">
                {selectedAnswer === correctAnswer
                  ? "✅ Correct!"
                  : `❌ Wrong! The correct answer is: ${correctAnswer}`}
              </p>
            )}

            {/* Show the "Next Question" button after an answer is selected */}
            {selectedAnswer && (
              <button onClick={nextQuestion} className="next-question">
                Next Question →
              </button>
            )}

            <br />
            {/* Link to navigate back to category selection */}
            <Link to="/categorySelection">
              <button className="back-button">Back</button>
            </Link>
          </div>
        </center>
      </main>
    </>
  );
}
