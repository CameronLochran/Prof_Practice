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
    <main class=''> 
    <div className='quizcategory'>

      <h1 className='heading'>Select Quiz and Difficulty</h1>
      <br /><br /><br />
      <div className="home-container">
        
        
        <p className='software-current-progress'>Current Progress: {progress}%</p>
        <p className='maths-current-progress'>Current Progress: {progress}%</p>
        <p className='english-current-progress'>Current Progress: {progress}%</p>

        </div>
      {/* Button to Start the Software Quiz */}
      <section class = "content">

      
      <Link to="/softwarequiz">
        <button className="software-button">Software</button>
      </Link><br /><br />
      <Link to="/mathsquiz">
        <button className="maths-button">Maths</button>
      </Link><br /><br />
      <Link to="/englishquiz">
        <button className="english-button">English</button>
      </Link><br /><br />
      </section>

      <Link to="/">
        <button className="back-button">Back</button>
      </Link>
    
    </div>
    </main>
  );
}

export default QuizCategoryAndDifficulty;
