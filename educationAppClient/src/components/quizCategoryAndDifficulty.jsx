import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/QuizCategory.css';

const QuizCategoryAndDifficulty = () => {
  // State to hold the latest and best scores for each quiz category
  const [scores, setScores] = useState({
    software: { latest: null, best: null },
    maths: { latest: null, best: null },
    english: { latest: null, best: null },
    pccomponents: { latest: null, best: null },
  });

  // useEffect hook to load the scores from localStorage when the component mounts
  useEffect(() => {
    // Function to load latest and best scores for each quiz category from localStorage
    const loadScores = (prefix) => {
      // Retrieve the latest and best score from localStorage for the given quiz category
      const latest = localStorage.getItem(`${prefix}LatestScore`);
      const best = localStorage.getItem(`${prefix}BestScore`);
      // If scores exist in localStorage, convert them to numbers, otherwise set as null
      return {
        latest: latest !== null ? Number(latest) : null,
        best: best !== null ? Number(best) : null,
      };
    };

    // Load scores for all quiz categories and update the state
    setScores({
      software: loadScores("software"),   // For software quiz category
      maths: loadScores("maths"),         // For maths quiz category
      english: loadScores("english"),     // For English quiz category
      pccomponents: loadScores("pccomponents"), // For PC components quiz category
    });
  }, []); // This effect runs only once when the component is mounted

  return (
    <main>
      <div className="quizcategory">
        {/* Heading for the quiz category selection */}
        <h1 className="heading">Select Quiz</h1>
        <br /><br />
        
        <div className="content">
          <div className="buttons-row">
            {/* Links to the various quiz categories */}
            <Link to="/softwarequizmode">
              <button className="software-button">Software</button>
            </Link>
            <Link to="/mathsquizmode">
              <button className="maths-button">Maths</button>
            </Link>
            <Link to="/englishquizmode">
              <button className="english-button">English</button>
            </Link>
            <Link to="/pccomponentsmode">
              <button className="pccomponents-button">PC Components</button>
            </Link> 
          </div>
        </div>

        {/* Button to go back to the home page */}
        <a href="/">
          <button className="back-button">Back</button>
        </a>
      </div>
    </main>
  );
};

export default QuizCategoryAndDifficulty;
