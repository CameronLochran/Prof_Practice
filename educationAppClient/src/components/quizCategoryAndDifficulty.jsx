import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/QuizCategory.css';

const QuizCategoryAndDifficulty = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Get the saved progress from localStorage
    const savedProgress = localStorage.getItem('quizProgress');
    if (savedProgress) {
      setProgress((Number(savedProgress) / 20) * 100); // Adjust based on total questions
    }
  }, []);

  return (
    <main> 
    <div className='quizcategory'>

      <h1 className='selecting-quiz-header'>Select Quiz and Difficulty</h1>
      <br /><br /><br />
      <div className="home-container">

        <div className="progress-bar-container">
          <div className="" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Display the current progress */}
        <p>Current Progress: {progress}%</p>
      </div>

      {/* Button to Start the Software Quiz */}
      <Link to="/softwarequiz">
        <button className="software-button">Software</button>
      </Link>
    </div>
    </main>
  );
}

export default QuizCategoryAndDifficulty;
