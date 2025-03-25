// ProgressContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  return useContext(ProgressContext);
};

export const ProgressProvider = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    Number(localStorage.getItem('quizProgress')) || 0
  );

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions and set them
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
  }, []);

  useEffect(() => {
    // Save currentQuestionIndex to localStorage
    localStorage.setItem('quizProgress', currentQuestionIndex);
  }, [currentQuestionIndex]);

  const progress = (questions.length > 0) ? ((currentQuestionIndex) / questions.length) * 100 : 0;

  return (
    <ProgressContext.Provider value={{ currentQuestionIndex, setCurrentQuestionIndex, progress, questions }}>
      {children}
    </ProgressContext.Provider>
  );
};
