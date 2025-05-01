import React from 'react';
import { Link } from 'react-router-dom'; // For navigation between pages
import ScoreCard from '../ScoreCard'; // Component to display latest and best scores
import './MathsModeSelect.css'; // Import associated CSS styles

// Functional component for selecting the Maths quiz mode
const MathsModeSelector = () => {
  return (
    <div className='maths-mode-selector'> {/* Main container with background and layout styling */}
      
      {/* Page heading */}
      <h1 className="maths-mode-h1">Select Maths Quiz Mode</h1>

      {/* Button container */}
      <div className="maths-mode-buttons">
        
        {/* Button for Normal Mode, navigates to Maths Quiz (normal difficulty) */}
        <Link to="/mathsquiz">
          <button className="maths-mode-button">Normal Mode</button>
        </Link>
        <br /><br /><br />

        {/* Button for Hard Mode, navigates to Maths Quiz (hard difficulty) */}
        <Link to="/mathsquizhard">
          <button className="maths-mode-button">Hard Mode</button>
        </Link>
        <br /><br /><br />
      </div>

      {/* Score display area, showing latest and best scores from localStorage */}
      <div className="score-row">
        <ScoreCard
          data={{
            latest: localStorage.getItem("mathsLatestScore"),
            best: localStorage.getItem("mathsBestScore")
          }}
          className="maths-score"
        />
      </div>

      {/* Back button to return to the quiz category selection page */}
      <Link to="/categorySelection">
        <button className="back-button">Back to Categories</button>
      </Link>
    </div>
  );
};

export default MathsModeSelector; // Exporting the component for use in the app
