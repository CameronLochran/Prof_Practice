import { useState, useEffect } from "react"; // Importing React hooks
import React from "react"; // Importing React
import { Link } from "react-router-dom"; // Importing Link component for navigation
import '../../styles/SoftwareQuiz.css'; // Importing custom styles

// Main functional component for the Software Quiz
export default function SoftwareQuizHard() {
  // State hooks for various quiz-related data
  const [questions, setQuestions] = useState([]); // Holds the list of quiz questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks current question index
  const [selectedAnswer, setSelectedAnswer] = useState(""); // Tracks the user's selected answer
  const [correctAnswer, setCorrectAnswer] = useState(""); // Correct answer for the current question
  const [correctAnswers, setCorrectAnswers] = useState(0); // Number of correct answers
  const [quizCompleted, setQuizCompleted] = useState(false); // Flag to check if the quiz is completed

  // Fetching questions from the API when the component mounts
  useEffect(() => {
    fetch("http://localhost:3000/api/questions")
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        if (Array.isArray(data)) {
          // Filter out questions based on category and difficulty
          const filteredQuestions = data.filter(
            (q) => q.category === "Software Dev" && q.difficulty === "Hard"
          );
          setQuestions(filteredQuestions); // Set the filtered questions
        } else {
          setQuestions([]); // If the data is not an array, set questions to an empty array
        }
      })
      .catch((error) => console.error("Error fetching questions:", error)); // Log any errors
  }, []); // Dependency array is empty, so this runs only once when the component mounts

  // UseEffect to handle saving progress and score to localStorage
  useEffect(() => {
    // Store current progress and correct answers count in localStorage
    localStorage.setItem("softwareQuizProgress", currentQuestionIndex);
    localStorage.setItem("softwareCorrectAnswers", correctAnswers);

    // Save the score and check for best score when quiz completes
    if (questions.length && currentQuestionIndex >= questions.length && !quizCompleted) {
      setQuizCompleted(true); // Mark the quiz as completed
      localStorage.setItem("softwareLatestScore", correctAnswers); // Store the latest score

      // Check if the latest score is higher than the best score and update if necessary
      const bestScore = Number(localStorage.getItem("softwareBestScore")) || 0;
      if (correctAnswers > bestScore) {
        localStorage.setItem("softwareBestScore", correctAnswers); // Update best score
      }
    }
  }, [currentQuestionIndex, correctAnswers, questions, quizCompleted]); // Dependencies

  // Display a loading message if there are no questions yet
  if (!questions.length) return <p className="text-center">Loading Software Questions...</p>;

  // If all questions have been answered, display the final score and a "Back" button
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

  // Get the current question to display
  const question = questions[currentQuestionIndex];

  // Handle the user's answer selection
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer); // Set the selected answer
    setCorrectAnswer(question.answer); // Set the correct answer for comparison

    // If the selected answer is correct, increase the correctAnswers count
    if (answer === question.answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  // Move to the next question
  const nextQuestion = () => {
    setSelectedAnswer(""); // Clear the selected answer
    setCorrectAnswer(""); // Clear the correct answer
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Increment the question index
  };

  // Calculate progress as a percentage
  const progress = (currentQuestionIndex / questions.length) * 100;

  return (
    <>
      <main>
        <header><br/><br/></header>
        <center>
          <div className="software-quiz-container">
            <h1 className="software-h1">Software Quiz</h1>

            {/* Progress Bar */}
            <div className="software-progress-bar-container">
              <div className="software-progress-bar" style={{ width: `${progress}%` }}></div>
            </div>

            {/* Display the current question */}
            <h2 className="question">{question.question}</h2>

            {/* Display the options for the current question */}
            <div className="options-grid">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)} // Handle answer selection
                  className={`option-button ${
                    selectedAnswer
                      ? option === correctAnswer
                        ? "bg-green-500" // Correct answer highlighted in green
                        : option === selectedAnswer
                        ? "bg-red-500" // Incorrect answer highlighted in red
                        : "bg-gray-200" // Unanswered options in gray
                      : "bg-gray-200"
                  }`}
                  disabled={!!selectedAnswer} // Disable button after answer is selected
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Show feedback after the user selects an answer */}
            {selectedAnswer && (
              <p className="right-or-wrong">
                {selectedAnswer === correctAnswer
                  ? "✅ Correct!" // Display correct message
                  : `❌ Wrong! The correct answer is: ${correctAnswer}`}
              </p>
            )}

            {/* Show "Next Question" button after an answer is selected */}
            {selectedAnswer && (
              <button onClick={nextQuestion} className="next-question">
                Next Question →
              </button>
            )}

            <br />
            {/* Link to go back to the category selection page */}
            <Link to="/categorySelection">
              <button className="back-button">Back</button>
            </Link>
          </div>
        </center>
      </main>
    </>
  );
}
